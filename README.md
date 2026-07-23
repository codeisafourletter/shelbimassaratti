# Shelbi Massaratti — The Real Miss Texas

Static promotional website for Shelbi Massaratti and Plattinum Management, deployed to GitHub Pages at `shelbimassaratti.com`.

## Project structure

The homepage is deliberately split into smaller source files:

- `index.html` — document shell and metadata
- `styles1.css`, `styles2.css`, `styles3.css` — embedded stylesheet sources
- `body_part1.html`, `body_part2.html`, `body_part3.html` — homepage sections
- `script.js` — embedded homepage JavaScript
- `press-kit.html`, `privacy.html`, `404.html` — standalone pages
- `tools/build_site.py` — creates the deployable `_site` directory
- `tools/validate_site.py` — catches broken internal links, missing metadata, unresolved includes and missing assets

Do not edit `_site/index.html`; it is generated and ignored by Git.

## Local build

```bash
python tools/build_site.py
python tools/validate_site.py --site _site
python -m http.server 8000 --directory _site
```

Open `http://localhost:8000` after starting the server.

## Deployment

A push to `master` runs `.github/workflows/static.yml`. The workflow builds and validates the site before GitHub Pages receives the artifact. Pull requests run the same checks without deploying.

Repository settings should use **Settings → Pages → Source: GitHub Actions**. The custom domain and HTTPS enforcement remain managed in GitHub Pages settings.

## Editing checklist

1. Keep **The Real Miss Texas** in the page title and social metadata.
2. Run the build and validation commands.
3. Review the generated homepage and mobile layout locally.
4. Update `sitemap.xml` only when a public page is added, removed or materially changed.
5. Use a pull request for major design or copy changes so the validation workflow runs before deployment.
