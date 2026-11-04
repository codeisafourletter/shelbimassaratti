# 1.0.0-rc.1 — Artist inquiry preparation

First numbered candidate; the repository previously had no version or release tags.

## Result

Artists can turn their name, market, music links, audience context, and goal into a complete introduction, review it, and copy it for Instagram. Existing contact links work without JavaScript. No backend, submission, browser storage, analytics, or new production dependency is added. Clipboard-denied browsers select the message for manual copying. Editing or clearing the form removes an outdated preview.

## Verification

Build and site validator; Node 22 built-in tests for required context, link validation, formatting and markup handling; browser checks at 390, 768 and 1440 pixels, keyboard focus, clipboard success/denial, no-JavaScript fallback, clear/edit behavior, and no form network requests.

## Migration and release gate

No URL, hosting, or environment migration. Existing build expands the new `inquiry.js` source into the homepage. Node 22 is only needed to run the new unit tests; deployment still uses the static Python build. `VERSION` records the candidate version and is not a public asset. No change to biographies, claims, imagery, or contact destinations. Review the new contact section visually and approve wording before merging the draft PR. No final release or production deployment is part of candidate preparation.

## Limits

This prepares text only: it cannot submit an inquiry, check whether music URLs are reachable, or confirm delivery. Device/browser clipboard permissions may require manual copying. Information exists in the page until cleared or navigation; copied text remains on the device clipboard. Browser autofill is controlled by the visitor’s browser.
