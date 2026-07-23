#!/usr/bin/env python3
"""Validate the generated site using only the Python standard library."""

from __future__ import annotations

import argparse
import json
import struct
import sys
import xml.etree.ElementTree as ET
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

DOMAIN = "https://shelbimassaratti.com"
REQUIRED_FILES = {
    "index.html",
    "404.html",
    "press-kit.html",
    "privacy.html",
    "favicon.svg",
    "apple-touch-icon.png",
    "icon-192.png",
    "icon-512.png",
    "social-card.png",
    "social-card.svg",
    "site.webmanifest",
    "robots.txt",
    "sitemap.xml",
    ".nojekyll",
}


class AuditParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.references: list[tuple[str, str]] = []
        self.errors: list[str] = []
        self.warnings: list[str] = []
        self.meta: dict[str, str] = {}
        self.links: dict[str, str] = {}
        self.html_lang = ""
        self.title_parts: list[str] = []
        self.in_title = False

    @staticmethod
    def attrs_dict(attrs: list[tuple[str, str | None]]) -> dict[str, str]:
        return {key.lower(): (value or "") for key, value in attrs}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = self.attrs_dict(attrs)
        tag = tag.lower()

        if tag == "html":
            self.html_lang = data.get("lang", "")
        if tag == "title":
            self.in_title = True
        if "id" in data:
            self.ids.append(data["id"])

        if tag == "meta":
            key = data.get("name") or data.get("property")
            if key:
                self.meta[key.lower()] = data.get("content", "")

        if tag == "link":
            for rel in data.get("rel", "").lower().split():
                self.links[rel] = data.get("href", "")
            href = data.get("href")
            if href:
                self.references.append(("href", href))

        if tag == "a":
            href = data.get("href")
            if href:
                self.references.append(("href", href))
            if data.get("target") == "_blank":
                rel = set(data.get("rel", "").lower().split())
                if "noopener" not in rel:
                    self.errors.append(f'Link to {href!r} uses target="_blank" without rel="noopener"')

        if tag in {"img", "script", "source", "video", "audio", "iframe"}:
            source = data.get("src")
            if source:
                self.references.append(("src", source))

        if tag == "img" and "alt" not in data:
            self.errors.append(f"Image {data.get('src', '<unknown>')!r} has no alt attribute")

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_parts.append(data)

    @property
    def title(self) -> str:
        return "".join(self.title_parts).strip()


def local_target(site: Path, page: Path, value: str) -> tuple[Path, str] | None:
    parsed = urlparse(value)
    if parsed.scheme in {"http", "https", "mailto", "tel", "sms", "data", "javascript"} or parsed.netloc:
        return None

    fragment = unquote(parsed.fragment)
    raw_path = unquote(parsed.path)
    if not raw_path:
        return page, fragment
    if raw_path == "/":
        return site / "index.html", fragment

    candidate = site / raw_path.lstrip("/") if raw_path.startswith("/") else page.parent / raw_path
    if raw_path.endswith("/"):
        candidate /= "index.html"
    return candidate.resolve(), fragment


def read_png_size(path: Path) -> tuple[int, int]:
    with path.open("rb") as handle:
        if handle.read(8) != b"\x89PNG\r\n\x1a\n":
            raise ValueError(f"{path.name} is not a PNG")
        length = struct.unpack(">I", handle.read(4))[0]
        if handle.read(4) != b"IHDR" or length < 8:
            raise ValueError(f"{path.name} has no valid IHDR chunk")
        return struct.unpack(">II", handle.read(8))


def parse_html(path: Path) -> AuditParser:
    text = path.read_text(encoding="utf-8")
    parser = AuditParser()
    parser.feed(text)
    parser.close()
    if "{% include_relative" in text:
        parser.errors.append("Unresolved include_relative marker")
    if text.startswith("---"):
        parser.errors.append("Jekyll front matter remains in the built file")
    return parser


def validate(site: Path) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    site = site.resolve()

    for name in sorted(REQUIRED_FILES):
        if not (site / name).exists():
            errors.append(f"Missing generated file: {name}")

    pages: dict[Path, AuditParser] = {}
    for page in sorted(site.rglob("*.html")):
        parser = parse_html(page)
        pages[page.resolve()] = parser
        prefix = page.relative_to(site)
        if not parser.html_lang:
            errors.append(f"{prefix}: missing html lang attribute")
        if not parser.title:
            errors.append(f"{prefix}: missing title")
        for message in parser.errors:
            errors.append(f"{prefix}: {message}")
        for duplicate, count in Counter(parser.ids).items():
            if duplicate and count > 1:
                errors.append(f"{prefix}: duplicate id {duplicate!r}")

    for page, parser in pages.items():
        prefix = page.relative_to(site)
        for kind, reference in parser.references:
            if reference.startswith("http://"):
                warnings.append(f"{prefix}: insecure external {kind} {reference}")
            target = local_target(site, page, reference)
            if target is None:
                continue
            target_path, fragment = target
            if not target_path.exists():
                errors.append(f"{prefix}: broken local {kind} {reference!r}")
                continue
            if fragment and target_path.suffix.lower() == ".html":
                target_parser = pages.get(target_path.resolve())
                if target_parser and fragment not in set(target_parser.ids):
                    errors.append(f"{prefix}: missing anchor #{fragment} in {target_path.relative_to(site)}")

    homepage = pages.get((site / "index.html").resolve())
    if homepage:
        expected_meta = {
            "description": None,
            "robots": None,
            "viewport": None,
            "theme-color": None,
            "og:title": "The Real Miss Texas",
            "og:description": None,
            "og:image": f"{DOMAIN}/social-card.png",
            "twitter:card": "summary_large_image",
            "twitter:image": f"{DOMAIN}/social-card.png",
        }
        for key, expected in expected_meta.items():
            value = homepage.meta.get(key, "")
            if not value:
                errors.append(f"index.html: missing metadata {key}")
            elif expected and expected not in value:
                errors.append(f"index.html: {key} should contain {expected!r}")
        if homepage.links.get("canonical") != f"{DOMAIN}/":
            errors.append("index.html: canonical URL is missing or incorrect")
        if "The Real Miss Texas" not in homepage.title:
            errors.append("index.html: primary tagline is missing from the title")

    manifest_path = site / "site.webmanifest"
    if manifest_path.exists():
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            errors.append(f"site.webmanifest: invalid JSON: {exc}")
        else:
            for key in ("name", "short_name", "start_url", "display", "icons"):
                if not manifest.get(key):
                    errors.append(f"site.webmanifest: missing {key}")
            for icon in manifest.get("icons", []):
                src = str(icon.get("src", ""))
                target = site / src.lstrip("/")
                if not src or not target.exists():
                    errors.append(f"site.webmanifest: missing icon file for {src!r}")

    robots_path = site / "robots.txt"
    if robots_path.exists():
        robots = robots_path.read_text(encoding="utf-8")
        if f"Sitemap: {DOMAIN}/sitemap.xml" not in robots:
            errors.append("robots.txt: missing canonical Sitemap directive")

    sitemap_path = site / "sitemap.xml"
    if sitemap_path.exists():
        try:
            root = ET.parse(sitemap_path).getroot()
        except ET.ParseError as exc:
            errors.append(f"sitemap.xml: invalid XML: {exc}")
        else:
            namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            urls = [node.text or "" for node in root.findall("s:url/s:loc", namespace)]
            if f"{DOMAIN}/" not in urls:
                errors.append("sitemap.xml: homepage URL is missing")
            for url in urls:
                if url and not url.startswith(f"{DOMAIN}/"):
                    errors.append(f"sitemap.xml: non-canonical URL {url}")

    expected_png_sizes = {
        "social-card.png": (1200, 630),
        "apple-touch-icon.png": (180, 180),
        "icon-192.png": (192, 192),
        "icon-512.png": (512, 512),
    }
    for name, expected in expected_png_sizes.items():
        path = site / name
        if path.exists():
            try:
                actual = read_png_size(path)
            except ValueError as exc:
                errors.append(str(exc))
            else:
                if actual != expected:
                    errors.append(f"{name}: expected {expected[0]}x{expected[1]}, got {actual[0]}x{actual[1]}")

    index_path = site / "index.html"
    if index_path.exists() and index_path.stat().st_size > 600_000:
        warnings.append("index.html exceeds 600 KB; consider optimizing embedded CSS or JavaScript")

    return errors, warnings


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", type=Path, default=Path("_site"))
    args = parser.parse_args()

    errors, warnings = validate(args.site)
    for warning in warnings:
        print(f"WARNING: {warning}")
    for error in errors:
        print(f"ERROR: {error}", file=sys.stderr)

    if errors:
        raise SystemExit(1)
    print(f"Validation passed with {len(warnings)} warning(s)")


if __name__ == "__main__":
    main()
