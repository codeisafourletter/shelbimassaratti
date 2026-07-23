# Deployment and rollback

## Required GitHub settings

- Pages source: **GitHub Actions**
- Production branch: `master`
- Custom domain: `shelbimassaratti.com`
- Enforce HTTPS: enabled after DNS and certificate checks pass

The workflow is intentionally split into `build` and `deploy` jobs. A deployment cannot start unless the site builds, validates and uploads successfully.

## Before merging

Run:

```bash
python tools/build_site.py
python tools/validate_site.py --site _site
```

Then inspect:

- `/`
- `/press-kit.html`
- `/privacy.html`
- a nonexistent path to confirm `404.html`
- the social card at `/social-card.png`

## Rollback

Revert the problem commit on `master`. The resulting push triggers a new Pages deployment of the last known-good source. Do not manually edit the generated Pages artifact; it is replaced on every deployment.

## Custom-domain warning

The repository's `CNAME` file is retained as documentation and as part of the generated artifact, but the authoritative custom-domain setting for an Actions-based Pages deployment is GitHub's Pages settings. Do not change DNS merely to test a design revision.

## Retired scripts

`.github/scripts/enrich_site.py` and `.github/scripts/remove_ged.py` are not called by the current deployment workflow. They contain one-time content transformations and should be removed after confirming no manual process still relies on them. Leaving them in place creates ambiguity about which files are authoritative.
