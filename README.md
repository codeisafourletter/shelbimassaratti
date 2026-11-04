# Shelbi Massaratti — The Real Miss Texas

Static promotional website for Shelbi Massaratti and Plattinum Management, deployed to GitHub Pages at `shelbimassaratti.com`.

## Status

Candidate: **1.0.0-rc.2** adds a complete artist/event inquiry journey and a local operator desk. See [release notes](RELEASE-NOTES.md) and the [workflow guide](docs/INQUIRY-WORKSPACE.md). Candidate changes are not deployed until the draft PR is reviewed and merged.

Maintained production website. Pull requests build and validate the generated Pages artifact; publishing remains a separate deployment step.

## Sources of truth

The production implementation lives in this repository. Strategy, fact status, preferred copy, structure and design decisions are maintained in the Shelbi project-context folder. A deployed claim is not automatically approved: when repository copy conflicts with the decision log or fact register, correct the repository.

For major content changes, update the project context first, then implement the approved change here on a branch.

## Project structure

The homepage is split into smaller source files:

- `index.html` — document shell and homepage metadata
- `styles-foundation.css`, `styles-sections.css`, `styles-artist-services.css` — embedded homepage stylesheet sources
- `sections-navigation-services.html`, `sections-about-work.html`, `sections-music-contact.html` — homepage sections
- `script.js` — embedded homepage JavaScript
- `secondary.css` — shared styles for the press kit, privacy page and 404 page
- `press-kit.html`, `privacy.html`, `404.html` — standalone pages
- `tools/build_site.py` — creates the deployable `_site` directory
- `tools/validate_site.py` — validates links, anchors, metadata, headings, manifests and required assets
- `DEPLOYMENT.md` — deployment, review and rollback rules

Do not edit `_site/index.html`; it is generated and ignored by Git.

Unrelated utility pages and one-time content transformation scripts do not belong in this repository.

Historical photographs, saved reference pages, and HTML experiments formerly stored in
`MEADOWGLEN/`, `cl_recalls/`, `reviews/`, `table/`, and `testhtml/` are preserved in the
private [personal reference archive](https://github.com/codeisafourletter/personal-reference-archive).
All five directory trees were verified against archive commit
`904eeab7f6217785ff842d3f8801c9bfac2cd41e` before removal from the website source.
These files were not part of the generated website. Their original versions also remain
in this repository’s Git history; no history was rewritten.

## Local build

```bash
python tools/build_site.py
python tools/validate_site.py --site _site
node --test tests/*.test.cjs
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

## Inquiry operations

Visitors prepare portable briefs at `/inquire.html`; sending happens through the existing Instagram link. To review shared inquiry files locally, run `python tools/serve_inquiry_desk.py` and open the printed loopback URL. The desk is excluded from the public build. It tracks local stages, follow-ups and notes with optional browser persistence and explicit import/export. It does not claim bookings or automatically receive/send messages.

Browser journey checks use `npm ci`, `npx playwright install chromium`, then `npm run test:browser` after building. See the workflow guide for privacy, demo isolation, and migration details.
