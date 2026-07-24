# Deployment and rollback

## Required GitHub settings

- Pages source: **GitHub Actions**
- Production branch: `master`
- Custom domain: `shelbimassaratti.com`
- Enforce HTTPS: enabled after DNS and certificate checks pass

The deployment workflow is split into `build` and `deploy` jobs. Deployment cannot start unless the site builds, validates and uploads successfully.

## Before opening a pull request

1. Confirm content against the project decision log and fact register.
2. Edit source files, not `_site/`.
3. Run:

```bash
python tools/build_site.py
python tools/validate_site.py --site _site
```

4. Inspect:

- `/`
- `/press-kit.html`
- `/privacy.html`
- a nonexistent path to confirm `404.html`
- `/social-card.png`
- narrow mobile, large mobile, tablet, laptop and wide desktop widths

5. Open a draft pull request. `.github/workflows/quality.yml` must pass before merge.

## Production deployment

A merge or direct push to `master` triggers `.github/workflows/static.yml`. It rebuilds from source, validates the artifact, uploads it to GitHub Pages and deploys only after the build job succeeds.

## Rollback

Revert the problem commit on `master`. The resulting push deploys the last known-good source. Do not manually edit the generated Pages artifact; each deployment replaces it.

## Custom-domain warning

The repository's `CNAME` file is retained in the generated artifact, but the authoritative custom-domain setting for an Actions-based Pages deployment is GitHub's Pages settings. Do not change DNS merely to test a design revision.

## Repository hygiene

Do not keep unrelated public utilities, OAuth callback pages or retired one-time transformation scripts in this site repository. They create ambiguity, expand the public attack surface and make source ownership unclear.
