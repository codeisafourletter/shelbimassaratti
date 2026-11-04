const {test,expect}=require('@playwright/test');
const fs=require('node:fs/promises');const M=require('../brief-model.js');
const source={kind:'artist',service:'release-planning',name:'Sample Artist',city:'San Antonio',contact:'@sample_artist',music:'https://example.com/song',goal:'Plan a release',stage:'finished'};
async function artist(page){
 await page.getByLabel('My music / an artist',{exact:false}).check();
 await page.getByLabel('The main thing you need').selectOption('release-planning');
 await page.getByRole('button',{name:'Continue',exact:true}).click();
 await page.getByLabel('Your name / artist or organization').fill(source.name);
 await page.getByLabel('City / market',{exact:true}).fill(source.city);
 await page.getByLabel('Where should I reply?').fill(source.contact);
 await page.getByLabel('Music links — up to three').fill(source.music);
 await page.getByRole('button',{name:'Continue',exact:true}).click();
 await page.getByLabel('Your goal and the help you need').fill(source.goal);
 await page.getByRole('button',{name:'Review my brief'}).click();
 await expect(page.locator('#brief-preview')).toHaveValue(/not a confirmed booking/);
}
for(const width of [390,768,1440])test(`artist journey, download and no form requests at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.goto('/inquire.html');await page.waitForLoadState('networkidle');
 const requests=[];page.on('request',r=>requests.push(r.url()));
 await artist(page);
 await expect(page.getByRole('link',{name:'Open Instagram to send'})).toHaveAttribute('href','https://www.instagram.com/plattinum817/');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{throw Error('denied')}},configurable:true}));
 await page.getByRole('button',{name:'Copy inquiry'}).click();await expect(page.locator('#journey-status')).toContainText('selected');
 await page.getByText('Keep a copy of your brief',{exact:true}).click();
 const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Save inquiry file'}).click();
 const download=await pending;const brief=M.parse(JSON.parse(await fs.readFile(await download.path(),'utf8')));expect(brief.request.name).toBe(source.name);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(requests).toEqual([]);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
 await page.evaluate(()=>{window.scrollTo(0,0);document.getElementById('brief-preview').scrollTop=0;});
 await page.screenshot({path:`test-results/inquiry-${width}.png`,fullPage:true});
});
test('event route, required details, opt-in draft restore and clear',async({page})=>{
 await page.goto('/inquire.html');await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.locator('#form-error')).toContainText('Choose');
 await page.getByLabel('A show / an event',{exact:false}).check();await page.getByLabel('The main thing you need').selectOption('booking');await page.getByRole('button',{name:'Continue',exact:true}).click();
 await page.getByLabel('Your name / artist or organization').fill('Example Events');await page.getByLabel('City / market',{exact:true}).fill('Austin');await page.getByLabel('Where should I reply?').fill('@event');
 await page.getByLabel('Save my draft on this device').check();await page.reload();await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.locator('#name')).toHaveValue('Example Events');
 await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByLabel('Your goal and the help you need').fill('Discuss a show');await page.getByRole('button',{name:'Review my brief'}).click();await expect(page.locator('#form-error')).toContainText('date');
 await page.getByLabel('Requested event / release date').fill('2027-02-20');await page.getByLabel('Venue or event location').fill('Example Hall');await page.getByRole('button',{name:'Review my brief'}).click();await expect(page.locator('#brief-preview')).toHaveValue(/not reserved/);
 page.on('dialog',d=>d.accept());await page.getByRole('button',{name:'Clear this draft and saved copy'}).click();await expect(page.locator('#journey-status')).toContainText('cleared');expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
test('inquiry import is validated and text stays inert',async({page})=>{
 await page.goto('/inquire.html');await page.getByText('Reopen a saved inquiry',{exact:true}).click();
 const brief=M.create({...source,name:'<img src=x onerror=alert(1)>'});
 await page.locator('#import-brief').setInputFiles({name:'brief.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(brief))});await expect(page.locator('#brief-preview')).toHaveValue(/<img/);expect(await page.locator('img').count()).toBe(0);
 await page.locator('#import-brief').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"schemaVersion":2}')});await expect(page.locator('#form-error')).toContainText('Unsupported');
});
test('operator import, pipeline, notes, persistence, duplicate safety and removal',async({page})=>{
 await page.goto('http://127.0.0.1:8055');const b=M.create(source);const file={name:'brief.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(b))};
 await page.locator('#desk-import').setInputFiles(file);await expect(page.locator('#desk-detail h2')).toHaveText(source.name);
 await page.locator('#record-stage').selectOption('awaiting-reply');await page.locator('#record-note').fill('Discuss release schedule');await page.locator('#record-follow-up').fill('2027-01-02');
 await page.getByLabel('Keep this desk in this browser').check();await page.reload();await expect(page.locator('#record-note')).toHaveValue('Discuss release schedule');await expect(page.locator('#record-stage')).toHaveValue('awaiting-reply');
 await page.locator('#desk-import').setInputFiles(file);await expect(page.locator('#desk-status')).toContainText('1 duplicate');await expect(page.locator('#record-note')).toHaveValue('Discuss release schedule');
 await page.locator('#desk-search').fill('unmatched');await expect(page.locator('#desk-list')).toContainText('No inquiries');await page.locator('#desk-search').fill('Sample');
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export desk backup'}).click();const backup=JSON.parse(await fs.readFile(await (await download).path(),'utf8'));expect(backup.records[0].note).toBe('Discuss release schedule');
 page.on('dialog',d=>d.accept());await page.getByRole('button',{name:'Remove inquiry',exact:true}).click();await expect(page.locator('#desk-detail')).toContainText('Start with a real inquiry');await page.reload();await expect(page.locator('#desk-detail')).toContainText('Start with a real inquiry');
});
test('demo is explicit and cannot overwrite a saved real desk',async({page})=>{
 await page.goto('http://127.0.0.1:8055');await page.locator('#desk-import').setInputFiles({name:'brief.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(M.create(source)))});await page.getByLabel('Keep this desk in this browser').check();page.on('dialog',d=>d.accept());
 await page.getByRole('button',{name:'Explore synthetic example'}).click();await expect(page.locator('.synthetic')).toContainText('not a real inquiry');await page.getByLabel('Keep this desk in this browser').click();await expect(page.locator('#desk-remember')).not.toBeChecked();await page.getByRole('button',{name:'Clear synthetic example'}).click();await page.reload();await expect(page.locator('#desk-detail h2')).toHaveText(source.name);
});
test('no-JavaScript visitor has real contact route; desk server does not serve repository files',async({browser,request})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto('http://127.0.0.1:8770/inquire.html');await expect(page.locator('noscript a')).toHaveAttribute('href','https://www.instagram.com/plattinum817/');await expect(page.locator('#journey')).toBeHidden();await context.close();
 expect((await request.get('http://127.0.0.1:8055/.git/config')).status()).toBe(404);expect((await request.get('http://127.0.0.1:8055/',{headers:{Host:'untrusted.example'}})).status()).toBe(403);
});

test('saved completed inquiry keeps its reference after reload and review',async({page})=>{
 await page.goto('/inquire.html');await artist(page);await page.getByLabel('Save my draft on this device').check();
 const before=await page.locator('#brief-preview').inputValue();const id=before.match(/Reference: ([^\n]+)/)[1];
 await page.reload();await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('button',{name:'Review my brief'}).click();await expect(page.locator('#brief-preview')).toHaveValue(new RegExp(id));
});
