# Artist and event inquiry workspace

## Visitor journey

Open `/inquire.html` from the homepage CTA. Choose artist support or an event inquiry, choose the service, add identity/contact/music, then describe the goal, audience, budget and date/venue. The artist route requires music; the event route requires date and venue. Review the structured brief and context-specific next steps. Copy the inquiry, open the existing Instagram contact destination and send it yourself. No request is submitted automatically and a date is never represented as reserved.

Save a text copy or a version1 inquiry JSON file. The JSON can be reopened by the visitor or shared directly with the operator for desk import. A shared reference persists when a saved completed inquiry is reopened, preventing duplicate operator records.

Browser persistence is off by default. Turning on “Save my draft on this device” stores the current draft locally. Turning it off removes the saved copy, and Clear removes both current and stored copies after confirmation. Downloaded files and clipboard contents are outside the page’s deletion control. Storage failure falls back to in-page use and explicit downloads.

## Operator journey

Run:

```bash
python tools/serve_inquiry_desk.py
```

Open `http://127.0.0.1:8055/`. The launcher serves only the desk’s static assets, binds loopback, rejects unrelated Host headers and does not accept uploads or expose the repository. The operator desk is excluded from `_site` and production Pages artifacts.

Import an inquiry JSON file shared with you. Review the brief, choose New/Reviewing/Awaiting reply/Closed, add a follow-up date and private working notes. Search or filter by pipeline stage. Copy contact/next-step text for your own reply. Export a desk backup or individual record; imports preserve existing notes when the same reference reappears. Removing a record also removes its notes from the current/saved desk. Follow-up dates are tracked locally; no notification, message, contract, quote, or booking is generated.

Persistence is opt-in and private to the browser profile; no encryption or shared-team authentication is claimed. Start with the labeled synthetic example if needed. Demo operations do not overwrite saved real desk data; clearing the demo preserves that saved copy. Reload restores saved real data. Export before replacing an unsaved real view with a demo. Use owner-controlled devices and protect downloaded backups.

## Verification

- Build/validator covers the public page and linked static assets.
- Eleven Node unit tests cover inquiry structure, route requirements, URL/date/schema limits, text-safe output, desk roundtrip and duplicate preservation (including the original quick-message tests).
- Eleven Playwright browser journeys cover mobile/tablet/desktop, artist and event flows, download/parse, draft persistence and reference stability, clear, safe import, operator status/notes/search/export/remove, demo isolation, no-JS contact fallback, and loopback server file/Host guards.
- Browser tests intercept no real contacts, accounts or private user data; all fixtures use `example.com` and synthetic names.

```bash
python tools/build_site.py
python tools/validate_site.py --site _site
npm ci
npm test
npx playwright install chromium
npm run test:browser
```

This is a candidate branch, not a deployed intake backend. Human visual/wording approval remains required before merging. Existing biographies, imagery and contact destinations are unchanged.

Pending file imports are canceled by clear or newer edits, so delayed reads cannot restore discarded personal data. Browser regression tests cover visitor and operator clearing during an import.
