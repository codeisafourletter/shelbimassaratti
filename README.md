# Shelbi Massaratti — The Real Miss Texas

Static promotional website for Shelbi Massaratti and Plattinum Management, deployed to GitHub Pages at `shelbimassaratti.com`.

## Sources of truth

The production implementation lives in this repository. Strategy, fact status, preferred copy, structure and design decisions are maintained in the Shelbi project-context folder. A deployed claim is not automatically approved: when repository copy conflicts with the decision log or fact register, correct the repository.

For major content changes, update the project context first, then implement the approved change here on a branch.

## Project structure

The homepage is split into smaller source files:

- `index.html` — document shell and homepage metadata
- `styles1.css`, `styles2.css`, `styles3.css` — embedded homepage stylesheet sources
- `body_part1.html`, `body_part2.html`, `body_part3.html` — homepage sections
- `script.js` — embedded homepage JavaScript
- `secondary.css` — shared styles for the press kit, privacy page and 404 page
- `press-kit.html`, `privacy.html`, `404.html` — standalone pages
- `tools/build_site.py` — creates the deployable `_site` directory
- `tools/validate_site.py` — validates links, anchors, metadata, headings, manifests and required assets
- `DEPLOYMENT.md` — deployment, review and rollback rules

Do not edit `_site/index.html`; it is generated and ignored by Git.

Unrelated utility pages and one-time content transformation scripts do not belong in this repository.

## Local build

```bash
python tools/build_site.py
python tools/validate_site.py --site _site
python -m http.server 8000 --directory _site
```

Open `http://localhost:8000` after starting the server.

## Deployment

A push to `master` runs `.github/workflows/static.yml`. The workflow builds and validates the site before GitHub Pages receives the artifact. Pull requests run the same checks through `.github/workflows/quality.yml` without deploying.

Repository settings should use **Settings → Pages → Source: GitHub Actions**. The custom domain and HTTPS enforcement remain managed in GitHub Pages settings.

## Editing checklist

1. Confirm the claim or copy is allowed by the project fact register and decision log.
2. Keep **The Real Miss Texas** in homepage social metadata.
3. Run the build and validation commands.
4. Review the generated homepage and all secondary pages on desktop and mobile.
5. Update `sitemap.xml` only when a public page is added, removed or materially changed.
6. Use a branch and draft pull request for major design, copy or workflow changes.
7. Merge only after validation and visual review pass.
