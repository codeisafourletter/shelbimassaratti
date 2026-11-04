# 1.0.0-rc.2 — Inquiry journey and local operations desk

The candidate now supports a full artist/event inquiry journey and an operator follow-up workflow, rather than only a text helper.

## Outcomes

- Route an artist or event organizer through service choice, context, goals and timeline with route-specific required details.
- Produce a reviewable inquiry with a stable reference, tailored next steps, direct contact handoff, and downloadable text/portable JSON.
- Resume optional browser-local drafts, import a shared brief, and clear current and stored data.
- Import shared briefs into a separate local operator desk, track pipeline stages, follow-up dates and notes, search/filter, export backups and remove records.
- Keep demos distinct from real saved work. Duplicate references cannot silently overwrite operator notes.

## Migration

This is the first numbered release series; rc.1 was a smaller local message builder. No stable version has been deployed. Existing homepage/press/privacy paths remain. Homepage contact CTAs now lead to `/inquire.html`; direct contact links remain available, including without JavaScript. The operator desk is NOT copied to the public Pages build. Python still builds the production static artifact. Node22 plus pinned Playwright are development-only browser test tools.

Run the desk with `python tools/serve_inquiry_desk.py` (loopback8055). No backend database, credentials or paid integration is required. Browser storage is optional; there is no migration from a server data store. Backups use explicit inquiry/desk schema version1. See [operator and visitor guide](docs/INQUIRY-WORKSPACE.md).

## Validation and review gate

Python build and site validation;11 Node tests;11 complete browser journeys including390/768/1440px layouts, persistence, same-reference restore, operator actions, stale data/duplicate protection and no submission traffic. Independent review identified and prompted fixes for restored reference continuity and demo clear preserving saved owner data. No biographies, imagery or claims about artist relationships were changed. Human visual and wording review is still required for the draft PR.

## Limits

The request is sent manually through the existing contact channel; the desk does not receive messages automatically. No availability calendar, confirmed booking, quote, payment, delivery receipt, cloud sync or multiuser CRM is implied. Follow-up dates are local records, not background notifications. Local/browser storage is not encrypted by this app. Downloaded files and clipboard copies remain until removed through their respective device tools.

Pending file imports are canceled by clear or newer edits, so delayed reads cannot restore discarded personal data. Browser regression tests cover visitor and operator clearing during an import.
