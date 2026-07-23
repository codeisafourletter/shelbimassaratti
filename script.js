const nav=document.getElementById('nav');
const toggle=document.querySelector('.menu-toggle');
const menu=document.getElementById('site-menu');
const updateNav=()=>nav.classList.toggle('is-scrolled',window.scrollY>30);
updateNav();
window.addEventListener('scroll',updateNav,{passive:true});
toggle.addEventListener('click',()=>{
  const open=menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','Open menu');
}));
document.getElementById('year').textContent=new Date().getFullYear();

const mediaAssets={
  hero:'https://static.wixstatic.com/media/bc5d20_51c44733415545b29cfc88917c265a86.jpg',
  manager:'https://static.wixstatic.com/media/bc5d20_d1d3e4ea1ea44049b6d3faa58cfeac90.jpg',
  lolliPop:'https://linkstorage.linkfire.com/medialinks/images/462ac635-4454-427e-84b2-ed44f3442823/artwork-440x440.jpg',
  work:[
    {
      src:'https://static.wixstatic.com/media/bc5d20_be7efc8755fb4d6ba607b9d2ab765a40.jpg',
      alt:'Too Short performing at the San Antonio event documented by Plattinum Management',
      eyebrow:'Live Event Archive',
      title:'Too $hort · San Antonio'
    },
    {
      src:'https://static.wixstatic.com/media/bc5d20_02dbb38e5de5496cba5a2ed6d72c6a96.jpg',
      alt:'E-40 appearing at the San Antonio event documented by Plattinum Management',
      eyebrow:'Live Event Archive',
      title:'E-40 · San Antonio'
    },
    {
      src:'https://static.wixstatic.com/media/bc5d20_fe12f7f3741749c2b8f4d32d56241abc.jpg',
      alt:'Gabby Cashmere in the Plattinum Management event archive',
      eyebrow:'Artist Development',
      title:'Gabby Ca$hmere'
    },
    {
      src:'https://static.wixstatic.com/media/bc5d20_5d1c63bba5654918b5e4c3a354acec62.jpg',
      alt:'E-40 with San Antonio representatives at a Plattinum Management documented event',
      eyebrow:'Network & Relationships',
      title:'E-40 with the 210'
    },
    {
      src:'https://static.wixstatic.com/media/bc5d20_01bd42a121974f7dbb4cd1bb559b7b73.jpg',
      alt:'Artists and collaborators at a Plattinum Management documented event',
      eyebrow:'Behind the Scenes',
      title:'Artists, team and movement'
    }
  ]
};

const photoStyles=document.createElement('style');
photoStyles.textContent=`
  .portrait-frame.has-photo,
  .plattinum-mark.has-photo,
  .release-art.has-cover{isolation:isolate;background:#090909;}
  .portrait-frame.has-photo::before,
  .plattinum-mark.has-photo::before,
  .release-art.has-cover::before{display:none;}
  .portrait-frame.has-photo::after{content:"SHELBI MASSARATTI / ARTIST MANAGEMENT";z-index:3;background:linear-gradient(180deg,transparent,rgba(0,0,0,.7));padding:84px 24px 25px;inset:auto 0 0;border:0;}
  .portrait-frame.has-photo img,
  .plattinum-mark.has-photo img,
  .release-art.has-cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .portrait-frame.has-photo img{object-position:center 24%;filter:saturate(.88) contrast(1.06);}
  .portrait-frame.has-photo::before,
  .plattinum-mark.has-photo::before{content:none;}
  .portrait-frame.has-photo .photo-wash,
  .plattinum-mark.has-photo .photo-wash{position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(180deg,rgba(255,47,138,.08),transparent 38%,rgba(0,0,0,.7));}
  .plattinum-mark.has-photo img{object-position:center 24%;filter:saturate(.8) contrast(1.08);}
  .plattinum-mark.has-photo::after{content:"SHELBI MASSARATTI · FOUNDER / MANAGER";z-index:3;left:24px;right:24px;bottom:24px;background:var(--pink);padding:10px 12px;width:auto;}
  .release-art.has-cover{min-height:610px;padding:0;}
  .release-art.has-cover img{object-fit:cover;}
  .release-art.has-cover::after{content:"OFFICIAL RELEASE ARTWORK · 2021";z-index:2;left:22px;right:22px;bottom:22px;padding:10px;background:rgba(0,0,0,.76);color:white;}
  .work-photo-proof{margin-top:34px;border-top:3px solid var(--black);padding-top:30px;}
  .work-photo-proof__head{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:20px;}
  .work-photo-proof__head h3{margin:0;font-family:var(--display);font-size:clamp(2rem,4vw,4.2rem);line-height:.88;text-transform:uppercase;letter-spacing:-.015em;}
  .work-photo-proof__head p{max-width:530px;margin:0;color:#665f58;font-size:.9rem;}
  .work-photo-grid{display:grid;grid-template-columns:1.25fr .75fr .75fr;grid-auto-rows:245px;gap:12px;}
  .work-photo{position:relative;overflow:hidden;margin:0;border:2px solid var(--black);background:#111;box-shadow:7px 7px 0 rgba(9,9,9,.12);}
  .work-photo:first-child{grid-row:span 2;}
  .work-photo:nth-child(4){grid-column:span 2;}
  .work-photo img{width:100%;height:100%;object-fit:cover;transition:transform .35s ease,filter .35s ease;filter:saturate(.82) contrast(1.06);}
  .work-photo:hover img{transform:scale(1.035);filter:saturate(1) contrast(1.04);}
  .work-photo figcaption{position:absolute;inset:auto 0 0;padding:54px 16px 14px;color:white;background:linear-gradient(180deg,transparent,rgba(0,0,0,.88));}
  .work-photo figcaption span,.work-photo figcaption strong{display:block;}
  .work-photo figcaption span{color:#ff75b5;font-size:.6rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;}
  .work-photo figcaption strong{margin-top:4px;font-family:var(--display);font-size:1.23rem;line-height:1;text-transform:uppercase;letter-spacing:.02em;}
  .work-photo-source{margin:17px 0 0;color:#6e6861;font-size:.72rem;}
  .work-photo-source a{font-weight:900;}
  @media(max-width:900px){.work-photo-proof__head{display:grid}.work-photo-grid{grid-template-columns:1fr 1fr;grid-auto-rows:250px}.work-photo:first-child{grid-row:span 1;grid-column:span 2}.work-photo:nth-child(4){grid-column:span 1}.release-art.has-cover{min-height:520px}}
  @media(max-width:560px){.work-photo-grid{grid-template-columns:1fr;grid-auto-rows:280px}.work-photo:first-child,.work-photo:nth-child(4){grid-column:auto}.portrait-frame.has-photo img,.plattinum-mark.has-photo img{object-position:center top}.work-photo-proof__head h3{font-size:2.65rem}}
`;
document.head.appendChild(photoStyles);

const mountImage=(selector,src,alt,className)=>{
  const target=document.querySelector(selector);
  if(!target)return;
  target.classList.add(className);
  target.setAttribute('role','img');
  target.setAttribute('aria-label',alt);
  const img=document.createElement('img');
  img.src=src;
  img.alt=alt;
  img.decoding='async';
  if(selector==='.portrait-frame'){
    img.loading='eager';
    img.fetchPriority='high';
  }else{
    img.loading='lazy';
  }
  target.prepend(img);
  if(selector!=='.release-art'){
    const wash=document.createElement('span');
    wash.className='photo-wash';
    wash.setAttribute('aria-hidden','true');
    target.appendChild(wash);
  }
};

mountImage('.portrait-frame',mediaAssets.hero,'Shelbi Massaratti, founder and artist manager at Plattinum Management','has-photo');
mountImage('.plattinum-mark',mediaAssets.manager,'Shelbi Massaratti representing Plattinum Management','has-photo');
mountImage('.release-art',mediaAssets.lolliPop,'Official Lolli Pop single artwork by Shelbi Massaratti featuring Hakeem Kydavii','has-cover');

const recordGrid=document.querySelector('.record-grid');
if(recordGrid){
  const proof=document.createElement('div');
  proof.className='work-photo-proof';
  proof.setAttribute('data-reveal','');
  proof.innerHTML=`
    <div class="work-photo-proof__head">
      <div><span class="section-number">Documented Work</span><h3>In the room, not beside a stock photo.</h3></div>
      <p>Selected images from Plattinum Management’s own event archive. They show the artists, rooms and relationships behind the résumé.</p>
    </div>
    <div class="work-photo-grid">
      ${mediaAssets.work.map(item=>`<figure class="work-photo"><img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async"><figcaption><span>${item.eyebrow}</span><strong>${item.title}</strong></figcaption></figure>`).join('')}
    </div>
    <p class="work-photo-source">Source: <a href="https://shelbimassaratti.wixsite.com/plattinummanagement/gallery" target="_blank" rel="noopener noreferrer">Plattinum Management’s public event gallery</a>. Archived images are used as historical work documentation, not as claims of current affiliation or endorsement.</p>
  `;
  recordGrid.insertAdjacentElement('afterend',proof);
}

const revealItems=document.querySelectorAll('[data-reveal]');
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion:reduce)').matches){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.08});
  revealItems.forEach(item=>observer.observe(item));
}else{
  revealItems.forEach(item=>item.classList.add('visible'));
}
