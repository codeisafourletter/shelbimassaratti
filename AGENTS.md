# AGENTS.md

## Purpose

This repository contains the production source for `shelbimassaratti.com`, a static GitHub Pages site for Shelbi Massaratti and Plattinum Management.

## Authority order

When instructions conflict, use this order:

1. The current task or pull-request description
2. `docs/CODEX-SITE-RECONCILIATION.md`
3. `docs/SHELBI-VOICE-GUIDE.md`
4. Existing validation and deployment requirements in the repository
5. Older copy and layout patterns in Git history

Do not treat the current production copy as approved merely because it is deployed. The latest production commit intentionally changed the site to a biography-first structure, but that direction has now been superseded.

## Product objective

Build a credible, culturally fluent, conversion-oriented personal and management site for Shelbi. Independent rappers and hip-hop artists are the primary audience. The site must make Shelbi the recognizable person behind the work while clearly explaining what she can do for an artist.

The intended balance is:

- Shelbi as the subject and public identity
- Plattinum Management as the operating vehicle
- management, booking, promotion, rollouts, events, branding, and media as the offer
- music and education as supporting credibility, not the main commercial offer

## Copy rules

- Prefer first person where Shelbi is speaking about herself or her work.
- Write like a clear, edited version of a real person, not a publicist, lawyer, consultant, résumé writer, or AI.
- Use short and medium-length sentences with natural contractions.
- Be direct and specific. Use cultural language sparingly and naturally.
- Do not imitate typos, private-text abbreviations, or exaggerated slang.
- Do not add research notes, evidence caveats, relationship disclaimers, or internal editorial commentary to normal visitor-facing copy.
- Omit an uncertain claim instead of laundering uncertainty through legalistic wording.
- Do not use generic promises such as “next level,” “unlock your potential,” “world-class,” or guaranteed exposure.
- Avoid repetitive lists of titles and accomplishments.

## Fact rules

Safe central facts:

- Shelbi Johnson-Wakefield professionally uses Shelbi Massaratti.
- She uses the brand title The Real Miss Texas.
- She is based in San Antonio, Texas.
- She founded and operates through Plattinum Management.
- Her work includes artist management/development, booking, promotion, events, branding, and media.
- She earned an A.A.S. in Paralegal Studies from San Antonio College.
- “Lolli Pop” featuring Hakeem Kydavii was released in 2021.
- Pink TalkO launched as a media project in 2020.

Restrictions:

- Do not imply Shelbi is an attorney or provides legal advice.
- Do not publish exact or combined follower counts without dated retained evidence.
- Do not call an artist a managed client unless that relationship is documented.
- Do not identify Jamar Chapman as Hakeem Kydavii without proof.
- Do not publish “Not Today.”
- Treat “Gun It” and “Lollipop (O Lawd)” as unconfirmed for the public site unless a live source or retained archive is added to the repository.
- Do not use celebrity proximity as proof.

When discussing paralegal education, describe the practical value without selling legal or contract-review services. This avoids turning a marketing page into a legal disclaimer page.

## Design rules

- Use the existing static architecture and build pipeline.
- Preserve the editorial black, ivory, wine/deep-pink, and platinum direction.
- The first screen must clearly signal independent rap and hip-hop.
- Avoid corporate service cards, generic luxury styling, neon-purple music-template effects, and nightclub-flyer clutter.
- Maintain strong hierarchy, large editorial typography, clean mobile behavior, and restrained motion.
- Do not deploy unapproved portraits or hotlink social-platform images.
- The current abstract/monogram visual may remain as a temporary fallback, but the markup should make later portrait replacement straightforward.

## Required workflow

1. Inspect the current repository and relevant Git history.
2. Use commit `06e8e59e21cdf8938d62fefedaf0868de9844e6f` as a structural reference for the rapper-focused services and Artist Fit flow, not as final copy.
3. Implement changes in source files, never generated `_site/index.html`.
4. Run:
   - `python tools/build_site.py`
   - `python tools/validate_site.py --site _site`
5. Inspect the rendered site at approximately 390 px, 768 px, and 1440 px widths.
6. Verify navigation, focus states, reduced motion, no horizontal overflow, and all CTAs.
7. Keep the pull request in draft until a human approves the visual result and factual wording.
