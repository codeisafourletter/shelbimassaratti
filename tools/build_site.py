#!/usr/bin/env python3
"""Build the split-source website into a clean GitHub Pages artifact."""

from __future__ import annotations

import argparse
import re
import shutil
from pathlib import Path

INCLUDE_RE = re.compile(r"{%\s*include_relative\s+([^%\s]+)\s*%}")

REQUIRED_PUBLIC_FILES = (
    "press-kit.html",
    "privacy.html",
    "404.html",
    "favicon.svg",
    "apple-touch-icon.png",
    "icon-192.png",
    "icon-512.png",
    "social-card.png",
    "social-card.svg",
    "site.webmanifest",
    "robots.txt",
    "sitemap.xml",
    "CNAME",
)

OPTIONAL_PUBLIC_DIRS = ("assets",)


def strip_front_matter(text: str) -> str:
    """Remove a small Jekyll front-matter block from the beginning only."""
    lines = text.splitlines(keepends=True)
    if not lines or lines[0].strip() != "---":
        return text

    for index, line in enumerate(lines[1:], start=1):
        if line.strip() == "---":
            return "".join(lines[index + 1 :])
    raise RuntimeError("index.html starts with front matter but has no closing delimiter")


def safe_include_path(root: Path, relative_name: str) -> Path:
    relative = Path(relative_name)
    if relative.is_absolute() or ".." in relative.parts:
        raise RuntimeError(f"Unsafe include path: {relative_name}")

    root_resolved = root.resolve()
    candidate = (root / relative).resolve()
    if candidate != root_resolved and root_resolved not in candidate.parents:
        raise RuntimeError(f"Include escapes project root: {relative_name}")
    if not candidate.is_file():
        raise FileNotFoundError(f"Missing include file: {relative_name}")
    return candidate


def expand_includes(text: str, root: Path, stack: tuple[Path, ...] = ()) -> str:
    """Recursively expand Jekyll include_relative markers without running Jekyll."""

    def replacement(match: re.Match[str]) -> str:
        include_path = safe_include_path(root, match.group(1))
        if include_path in stack:
            chain = " -> ".join(path.name for path in (*stack, include_path))
            raise RuntimeError(f"Circular include detected: {chain}")
        included = include_path.read_text(encoding="utf-8")
        return expand_includes(included, root, (*stack, include_path))

    expanded = INCLUDE_RE.sub(replacement, text)
    if "{% include_relative" in expanded:
        raise RuntimeError("An unresolved include_relative marker remains")
    return expanded


def copy_required_files(root: Path, output: Path) -> None:
    for name in REQUIRED_PUBLIC_FILES:
        source = root / name
        if not source.is_file():
            raise FileNotFoundError(f"Missing required public file: {name}")
        shutil.copy2(source, output / name)

    for name in OPTIONAL_PUBLIC_DIRS:
        source = root / name
        if source.is_dir():
            shutil.copytree(source, output / name)


def build(root: Path, output: Path) -> None:
    root = root.resolve()
    output = output.resolve()
    index = root / "index.html"
    if not index.is_file():
        raise FileNotFoundError(f"Missing source homepage: {index}")
    if output == root or root in output.parents and output.name in {".", ".."}:
        raise RuntimeError("Refusing to build over the project root")

    if output.exists():
        shutil.rmtree(output)
    output.mkdir(parents=True)

    source = strip_front_matter(index.read_text(encoding="utf-8"))
    homepage = expand_includes(source, root)
    (output / "index.html").write_text(homepage, encoding="utf-8")

    copy_required_files(root, output)
    (output / ".nojekyll").touch()
    print(f"Built {output}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path.cwd())
    parser.add_argument("--output", type=Path, default=Path("_site"))
    args = parser.parse_args()

    output = args.output if args.output.is_absolute() else args.root / args.output
    build(args.root, output)


if __name__ == "__main__":
    main()
