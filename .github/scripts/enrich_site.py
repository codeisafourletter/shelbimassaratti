from pathlib import Path

INDEX = Path("index.html")
PRESS = Path("press-kit.html")

CSS = r'''
.timeline-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:36px}.timeline-item{min-height:245px;padding:27px;border-radius:23px;border:1px solid var(--line);background:linear-gradient(145deg,rgba(255,255,255,.065),rgba(255,255,255,.025))}.timeline-year{color:var(--pink2);font-size:.7rem;font-weight:950;letter-spacing:.15em;text-transform:uppercase}.timeline-item h3{margin:46px 0 13px}.timeline-item p{color:#ad9fa8;font-size:.92rem}.source-link{display:inline-flex;margin-top:11px;color:#ffd4e8;font-size:.72rem;font-weight:950;letter-spacing:.05em;text-decoration:none;text-transform:uppercase}.source-link:hover{text-decoration:underline}.credits-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:22px}.credit-list{display:grid;gap:11px;margin-top:23px}.credit-row{display:grid;grid-template-columns:90px 1fr;gap:18px;padding:16px 0;border-bottom:1px solid rgba(255,255,255,.09)}.credit-row:last-child{border:0}.credit-row b{color:var(--pink2)}.credit-row span{color:var(--muted)}.source-note{margin-top:24px;color:#9f909a!important;font-size:.8rem}
'''.strip()

TIMELINE = r'''
<section id="timeline"><div class="wrap"><span class="kicker">02 / Verified Timeline</span><div class="head" style="margin-top:10px"><h2>A public record beyond the headline.</h2><p class="intro">These milestones come from Shelbi’s public professional profile, Plattinum Management’s own archive, and major music and podcast platforms. The wording stays narrow so the page does not imply management relationships the sources do not establish.</p></div><div class="timeline-grid"><article class="timeline-item"><span class="timeline-year">Since 2001</span><h3>Entertainment foundation</h3><p>Plattinum Management’s official biography says Shelbi has worked in and around the entertainment industry since 2001.</p><a class="source-link" href="https://shelbimassaratti.wixsite.com/plattinummanagement/about" target="_blank" rel="noopener">Official company bio ↗</a></article><article class="timeline-item"><span class="timeline-year">2007–2012</span><h3>Education with legal depth</h3><p>Her public professional profile records a GED in October 2007, San Antonio College studies from 2009–2012, an A.A.S. in Paralegal Studies, honors, and Phi Theta Kappa involvement.</p><a class="source-link" href="https://www.linkedin.com/in/shelbimassaratti" target="_blank" rel="noopener">Professional profile ↗</a></article><article class="timeline-item"><span class="timeline-year">By 2014</span><h3>Plattinum in motion</h3><p>Public business profiles document work in artist development, event planning, marketing, management, promotion, and booking, with a focus on pop, hip-hop, and R&amp;B.</p><a class="source-link" href="https://galaxyofstars.org/business-tag/artist-development/" target="_blank" rel="noopener">Business listing ↗</a></article><article class="timeline-item"><span class="timeline-year">2014–2015 archive</span><h3>Regional artists on larger bills</h3><p>Plattinum’s archive documents its artists appearing on bills connected to Too Short and E-40, Curren$y, Juicy J, Rittz, and Michael “5000” Watts—support and event credits, not claims that Shelbi managed those headliners.</p><a class="source-link" href="https://shelbimassaratti.wixsite.com/plattinummanagement/events" target="_blank" rel="noopener">Event archive ↗</a></article><article class="timeline-item"><span class="timeline-year">Dec. 28, 2020</span><h3>Pink TalkO premiere</h3><p>Amazon Music’s podcast listing identifies Shelbi Massaratti and Hakeem the Dream as the featured voices in the soft opening of Pink TalkO Radio.</p><a class="source-link" href="https://music.amazon.com/podcasts/6419fb06-f122-4e00-90e2-07c32f132119/episodes/35c72f3f-2708-4ae0-8781-22c42207c185/pink-talko-new-recording-draft" target="_blank" rel="noopener">Episode listing ↗</a></article><article class="timeline-item"><span class="timeline-year">2021</span><h3>Recording-artist release</h3><p>“Lolli Pop,” featuring Hakeem Kydavii, was released as a single in 2021 and remains listed under Shelbi Massaratti on major music services.</p><a class="source-link" href="https://music.apple.com/us/artist/shelbi-massaratti/1586873919" target="_blank" rel="noopener">Apple Music ↗</a></article></div></div></section>
'''.strip()

CREDITS = r'''
<section id="credits"><div class="wrap credits-grid"><article class="panel"><span class="kicker">03 / Documented Credits</span><h2 style="margin-top:12px">Management, events, radio and service.</h2><div class="credit-list"><div class="credit-row"><b>Company</b><span>Founder, manager, and booking agent behind Plattinum Management’s independent-artist work.</span></div><div class="credit-row"><b>Events</b><span>Public archive includes San Antonio showcases, “Stop the Violence,” Battle of the Beat Makers, and support appearances around nationally known touring acts.</span></div><div class="credit-row"><b>Media</b><span>Public career history includes radio and live-audio programming, while Pink TalkO’s 2020 premiere is preserved on Amazon Music.</span></div><div class="credit-row"><b>Education</b><span>Paralegal studies, contract-law coursework, legal research and writing, honors, and Phi Theta Kappa participation.</span></div><div class="credit-row"><b>Community</b><span>Her public profile documents volunteer service connected to poverty relief, Special Olympics, hurricane relief, and campus food-and-clothing programs.</span></div></div><p class="source-note">Career and volunteer details are based on Shelbi’s public professional profile; music, podcast, and event claims link to platform or company archives.</p></article><aside class="panel facts"><div class="fact"><b>Official Plattinum Bio</b>Career since 2001 · A.A.S. in 2012 · manager/booking agent</div><div class="fact"><b>Education Record</b>GED 2007 · San Antonio College 2009–2012 · honors · Phi Theta Kappa</div><div class="fact"><b>Event Archive</b>Regional artist appearances on bills with major hip-hop names</div><div class="fact"><b>Media Archive</b>Pink TalkO Radio premiere · live-audio programming</div><div class="fact"><b>Music Catalog</b>“Lolli Pop” feat. Hakeem Kydavii · 2021</div></aside></div></section>
'''.strip()


def replace_required(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise RuntimeError(f"Missing expected marker: {label}")
    return text.replace(old, new, 1)


def enrich_index() -> None:
    text = INDEX.read_text(encoding="utf-8")
    if 'id="timeline"' in text:
        return

    text = text.replace(
        'content="Shelbi Massaratti — artist manager, booking agent, promoter, recording artist and founder of Plattinum Management."',
        'content="Public-source biography of Shelbi Massaratti — artist manager, booking agent, promoter, recording artist and founder of Plattinum Management."',
        1,
    )
    text = replace_required(text, '@media(max-width:880px)', CSS + '@media(max-width:880px)', "responsive CSS")
    text = text.replace(
        '.hero-grid,.head,.grid2,.music{grid-template-columns:1fr}',
        '.hero-grid,.head,.grid2,.music,.credits-grid{grid-template-columns:1fr}.timeline-grid{grid-template-columns:repeat(2,1fr)}',
        1,
    )
    text = text.replace(
        '.services{grid-template-columns:1fr}',
        '.services,.timeline-grid{grid-template-columns:1fr}.credit-row{grid-template-columns:1fr;gap:5px}',
        1,
    )
    text = replace_required(
        text,
        '<div class="links"><a href="#about">About</a><a href="#work">Work</a><a href="#music">Music</a>',
        '<div class="links"><a href="#about">About</a><a href="#timeline">Timeline</a><a href="#credits">Credits</a><a href="#music">Music</a>',
        "navigation",
    )
    text = text.replace(
        'With formal paralegal training from San Antonio College, Shelbi brings a contract-aware perspective to entertainment work. Her approach combines relationship-building, grassroots promotion, event coordination and practical artist advocacy.',
        'Her path includes a 2007 GED, honors-level paralegal studies at San Antonio College and Phi Theta Kappa involvement. Coursework in contracts, legal research and legal writing supports a contract-aware approach to artist advocacy, promotion and event coordination.',
        1,
    )
    text = text.replace(
        '<div class="fact"><b>Education</b>A.A.S. in Paralegal Studies, San Antonio College</div>',
        '<div class="fact"><b>Education</b>GED (2007) · A.A.S. Paralegal Studies with honors (2012) · Phi Theta Kappa</div>',
        1,
    )
    text = replace_required(text, '<section id="work">', TIMELINE + CREDITS + '<section id="work">', "work section")
    text = text.replace('<span class="kicker">02 / What She Does</span>', '<span class="kicker">04 / What She Does</span>', 1)
    text = text.replace('<span class="kicker">03 / Featured Release</span>', '<span class="kicker">05 / Featured Release</span>', 1)
    text = text.replace('Promotional concept page.', 'Public-source promotional profile.', 1)
    text = text.replace(
        'https://music.apple.com/us/artist/shelbi-massaratti/1586873919"],"worksFor"',
        'https://music.apple.com/us/artist/shelbi-massaratti/1586873919","https://www.linkedin.com/in/shelbimassaratti"],"worksFor"',
        1,
    )
    INDEX.write_text(text, encoding="utf-8")


def enrich_press() -> None:
    text = PRESS.read_text(encoding="utf-8")
    if 'Pink TalkO Radio' in text and 'codeisafourletter.github.io/press-kit.html' not in text:
        return
    text = text.replace('https://codeisafourletter.github.io/press-kit.html', 'https://shelbimassaratti.com/press-kit.html')
    old = '<p>Shelbi Johnson-Wakefield, professionally known as Shelbi Massaratti, is the founder of Plattinum Management. Her entertainment work combines artist management, booking, promotional strategy, independent release support and live-event development.</p><p>Her background includes formal paralegal studies at San Antonio College, giving her a contract-aware perspective on artist advocacy and entertainment relationships. She has promoted regional talent, supported live appearances around nationally recognized performers and developed a public-facing brand across music and social media.</p><p>As a recording artist, Shelbi released the 2021 single “Lolli Pop,” featuring Hakeem Kydavii, across major streaming services.</p>'
    new = '<p>Shelbi Johnson-Wakefield, professionally known as Shelbi Massaratti, is the founder, manager and booking agent behind Plattinum Management. The company’s public biography traces her entertainment experience to 2001 and describes a focus on management, promotion and venue booking across pop, hip-hop and R&amp;B.</p><p>Her public professional profile records a GED earned in 2007 and San Antonio College studies from 2009–2012, culminating in an A.A.S. in Paralegal Studies with honors and Phi Theta Kappa involvement. Listed coursework includes contract law, legal research and legal writing.</p><p>Plattinum’s public archive documents regional artists appearing on bills connected to Too Short and E-40, Curren$y, Juicy J, Rittz and Michael “5000” Watts. These are support and event credits—not claims that Shelbi managed the national headliners.</p><p>Her media record includes the December 2020 soft opening of Pink TalkO Radio with Hakeem the Dream. As a recording artist, Shelbi released the 2021 single “Lolli Pop,” featuring Hakeem Kydavii.</p>'
    text = text.replace(old, new, 1)
    text = text.replace('<div><b>Education</b>A.A.S., Paralegal Studies, San Antonio College</div>', '<div><b>Education</b>GED (2007) · A.A.S. Paralegal Studies with honors (2012) · Phi Theta Kappa</div><div><b>Media</b>Pink TalkO Radio premiere (2020) · live-audio programming</div><div><b>Selected Event Archive</b>Support/event bills connected to Too Short &amp; E-40, Curren$y, Juicy J, Rittz and Michael “5000” Watts</div>', 1)
    text = text.replace('This page is a promotional profile and should be supplemented with current booking details before publication to media outlets.', 'Public facts were checked against Plattinum Management’s archive, Shelbi’s public professional profile, Amazon Music and Apple Music. Current booking details should still be confirmed before publication to media outlets.', 1)
    PRESS.write_text(text, encoding="utf-8")


enrich_index()
enrich_press()
