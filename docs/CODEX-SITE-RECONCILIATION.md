# Codex Task: Reconcile and Complete the Shelbi Massaratti Website

## Why this task exists

The repository has oscillated between two incompatible directions:

- commit `06e8e59e21cdf8938d62fefedaf0868de9844e6f` used a rapper-focused management and lead-generation structure;
- commit `bf382e02f78d07791e96e4fac125750e9f7c39a7` intentionally replaced it with a biography-first accomplishments site.

The new approved direction is neither extreme. Shelbi should remain the recognizable subject, but the homepage must again function as a clear management, booking, promotion, and rollout site for independent rap and hip-hop artists.

The current production site does not satisfy that direction. It is too third-person, résumé-like, explanatory, and biography-heavy. It also contains public qualifiers that should be solved by accurate labeling or omission rather than displayed as research disclaimers.

## Goal

Deliver a polished, natural, first-person-led website that feels written by Shelbi after professional editing. It should establish her personality and history while converting qualified artists into useful inquiries.

Do not merely swap paragraphs. Rebuild the homepage hierarchy and copy as a coherent whole.

## Required homepage structure

Use the following order unless a tested design reason requires a small adjustment:

1. Navigation
2. Hero
3. Culture/proof strip
4. What I Do / services
5. Artist Fit
6. About Shelbi
7. Plattinum Management
8. Selected Work / track record
9. Music & Media
10. Contact
11. Footer

Use commit `06e8e59e21cdf8938d62fefedaf0868de9844e6f` as the structural reference for services and Artist Fit. Do not restore its copy word-for-word.

## Copy requirements

### Point of view

- Homepage offer and story: primarily first person.
- Press kit: concise third-person biography.
- Metadata: factual third person as needed.

### Hero

The opening screen must establish:

- Shelbi Massaratti / The Real Miss Texas;
- independent rap and hip-hop as the audience;
- management, booking, promotion, or rollouts as the work;
- a direct CTA to send music or tap in;
- a supporting CTA to see selected work.

The hero must not open with a long list of Shelbi's titles.

### Services

Explain these practical lanes in natural language:

- artist direction;
- release planning and rollouts;
- shows and booking;
- branding and promotional content;
- promotion, media, and relationship-based opportunities;
- organization and follow-through.

Do not market legal or contract-review services. Paralegal education may support credibility in the About section without requiring a large disclaimer in the sales flow.

### Artist Fit

Qualify artists using finished music, work rate, coachability, realistic expectations, and consistency. Keep the tone firm but not insulting or performatively harsh.

### About

Explain how Shelbi's experience across management, promotion, events, media, independent music, and formal education fits together. Keep this shorter than the current biography-first treatment.

### Track record

Use categories and individual items with accurate role labels. Do not display an undifferentiated roster or celebrity list.

Safe public anchors include:

- Plattinum Management;
- A.A.S. in Paralegal Studies from San Antonio College;
- “Lolli Pop” featuring Hakeem Kydavii, released in 2021;
- Pink TalkO as a 2020 media project;
- the July 22, 2023 Killeen promotional event featuring Bone The Mack, only if described as promotional/event history;
- selected Plattinum roster/development/promotional names only where the wording makes the specific category clear.

Do not publish “Gun It,” “Lollipop (O Lawd),” “Not Today,” or unverified artist-management relationships until retained evidence is added. Public follower totals are allowed when they come from visible platform counts or retained screenshots. Label them as approximate where appropriate and include an “as of” date if practical. A combined total must clearly identify which platforms were included and must not imply unique individuals.

Do not add a paragraph explaining all possible non-relationships. Label every item narrowly enough that a global disclaimer is unnecessary.

### Music & Media

Feature the verified “Lolli Pop” release and Pink TalkO. Link to the official release destination and the confirmed public channel/profile destinations. A YouTube channel link is acceptable, but do not claim a catalog that could not be independently recovered.

### Contact

Use a clear instruction such as:

- introduce yourself or the artist;
- send links to the best two or three finished records;
- include city/market;
- include current audience or performance context;
- state the actual goal and what help is needed.

Do not use a vague “connect through active public channels” paragraph.

## Press-kit requirements

Rewrite `press-kit.html` to match the corrected public positioning:

- 100–150 word third-person biography;
- concise roles and services;
- selected verified milestones;
- verified music/media links;
- no inflated roster statement;
- public follower totals may be included when they are visible or retained, dated where practical, and labeled accurately;
- one compact non-attorney note only if contract-aware work is explicitly mentioned;
- contact CTA consistent with the homepage.

## Metadata and SEO

Homepage title target:

`Shelbi Massaratti | Hip-Hop Artist Management & Booking`

Keep “The Real Miss Texas” in Open Graph or other social metadata.

Homepage description should clearly mention Shelbi, Plattinum Management, independent rappers/hip-hop artists, and the principal services without keyword stuffing.

Add or verify:

- unique title and description on each public page;
- canonical URLs;
- Open Graph and Twitter metadata;
- one H1 per page;
- sensible internal anchors;
- structured data only where every property is supported.

## Design implementation

Preserve the current editorial system where useful, but change the layout enough to support the corrected hierarchy.

Requirements:

- black/ivory/wine/deep-pink/platinum palette;
- large editorial typography;
- visible rap/hip-hop audience signal in the hero;
- no generic white-card consulting layout;
- no neon-purple template treatment;
- no large decorative element above the core mobile message;
- current abstract/monogram visual may remain only as a clear placeholder;
- do not add unapproved images or remote social images;
- make later replacement with a real portrait straightforward.

## Technical requirements

Preserve the static source split:

- `index.html`
- `body_part1.html`
- `body_part2.html`
- `body_part3.html`
- `styles1.css`
- `styles2.css`
- `styles3.css`
- `script.js`
- secondary pages and build tools

Do not edit generated `_site/index.html`.

Run:

```bash
python tools/build_site.py
python tools/validate_site.py --site _site
```

Improve validation only where it enforces a durable rule rather than freezing one exact sentence.

## Visual QA

Render and inspect at approximately:

- 390 px;
- 768 px;
- 1440 px.

Check:

- no horizontal overflow;
- hero hierarchy;
- mobile menu and ARIA state;
- visible keyboard focus;
- contrast;
- touch target sizes;
- reduced motion;
- anchor navigation;
- CTA destinations;
- no unresolved template includes;
- no missing local assets.

Attach screenshots or a visual summary to the pull request.

## Required deliverables

1. Revised homepage source and styles
2. Revised press kit
3. Any necessary metadata, accessibility, and validation corrections
4. Passing build and validation logs
5. A factual-change summary distinguishing removals, rewrites, and retained claims
6. Desktop and mobile visual evidence
7. Draft pull request only; do not merge

## Acceptance test

A qualified independent rapper should be able to answer these questions within one scroll:

- Who is Shelbi?
- Is this site meant for an artist like me?
- What does she actually help with?
- What does she expect from an artist?
- Why should I believe she understands this work?
- What exactly should I send her?

The copy fails if it sounds like a corporate agency, legal disclaimer, research report, résumé, or caricature of a rapper.
