(function(){
'use strict';
const M=BriefModel,form=document.getElementById('brief-form'),panels=[...document.querySelectorAll('[data-step]')],steps=[...document.querySelectorAll('.steps li')];
const error=document.getElementById('form-error'),status=document.getElementById('journey-status'),preview=document.getElementById('brief-preview'),remember=document.getElementById('remember');
const STORE='plattinum-inquiry-draft-v1';let step=0,brief=null,identity=null,revision=0;
const STEP_FIELDS=[['kind','service'],['name','city','contact','music'],['goal','date','venue']];
function values(){return M.fields(Object.fromEntries(new FormData(form)));}
function say(text){status.textContent=text;}
function save(){
 if(!remember.checked)return;
 try{localStorage.setItem(STORE,JSON.stringify({schemaVersion:1,draft:values(),identity}));}
 catch{remember.checked=false;say('This device could not save the draft. Download a completed brief to keep a copy.');}
}
function display(n,{focus=true}={}){
 step=n;panels.forEach((p,i)=>p.hidden=i!==n);steps.forEach((p,i)=>i===n?p.setAttribute('aria-current','step'):p.removeAttribute('aria-current'));
 document.getElementById('previous').hidden=n===0;document.getElementById('next').hidden=n===3;document.getElementById('next').textContent=n===2?'Review my brief':'Continue';
 if(focus){const heading=panels[n].querySelector('h2');heading.tabIndex=-1;heading.focus();}
}
function populate(r){
 for(const key of M.FIELDS){const node=form.elements.namedItem(key);if(key==='kind'){for(const radio of node)radio.checked=radio.value===r[key];}else node.value=r[key]||'';}
}
function validateStep(n){
 const errors=M.issues(values()),bad=STEP_FIELDS[n].find(key=>errors[key]);
 error.textContent=bad?errors[bad]:'';
 if(bad){const field=form.elements.namedItem(bad);(field.length&&!field.tagName?field[0]:field).focus();return false;}
 return true;
}
function review(){
 brief=M.create(values(),identity||{});identity={id:brief.id,createdAt:brief.createdAt};preview.value=M.message(brief);
 const list=document.getElementById('next-steps');list.replaceChildren();for(const text of M.nextSteps(brief.request)){const li=document.createElement('li');li.textContent=text;list.append(li);}save();
}
form.addEventListener('submit',event=>{event.preventDefault();error.textContent='';if(step>=3)return;
 try{if(!validateStep(step))return;if(step===2)review();display(step+1);}catch(e){error.textContent=e.message;}});
document.getElementById('previous').addEventListener('click',()=>{error.textContent='';say('');display(Math.max(0,step-1));});
form.addEventListener('input',()=>{revision++;brief=null;preview.value='';error.textContent='';say('');save();});
remember.addEventListener('change',()=>{if(remember.checked){save();if(remember.checked)say('Draft saved on this device.');}else{try{localStorage.removeItem(STORE);say('Saved copy removed. Your current page still has the draft.');}catch{say('The browser could not clear storage. Clear this site’s data in browser settings.');}}});
document.getElementById('clear-draft').addEventListener('click',()=>{
 if(!confirm('Clear the current draft and its saved copy on this device? Downloaded files and copied text will remain.'))return;
 revision++;form.reset();remember.checked=false;identity=null;brief=null;preview.value='';
 try{localStorage.removeItem(STORE);say('Draft cleared.');}catch{say('Page cleared. Clear this site’s browser data to remove any saved copy.');}
 error.textContent='';display(0);
});
document.getElementById('copy-brief').addEventListener('click',async()=>{
 if(!brief)return;const current=brief;
 try{await navigator.clipboard.writeText(M.message(current));if(brief===current)say('Copied. Open Instagram and paste your inquiry to Plattinum Management.');}
 catch{if(brief!==current)return;preview.focus();preview.select();say('Your inquiry is selected. Use your device’s Copy command, then paste it on Instagram.');}
});
function download(content,type,filename){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
document.getElementById('download-text').addEventListener('click',()=>{if(brief)download(M.message(brief),'text/plain','plattinum-inquiry.txt');});
document.getElementById('download-brief').addEventListener('click',()=>{if(brief)download(JSON.stringify(brief,null,2),'application/json','plattinum-inquiry.json');});
document.getElementById('import-brief').addEventListener('change',async event=>{
 const file=event.target.files[0];if(!file)return;const generation=++revision;
 try{if(file.size>100000)throw new Error('Choose an inquiry file smaller than 100 KB.');const raw=await file.text();if(generation!==revision)return;const parsed=M.parse(JSON.parse(raw));
 if(Object.values(values()).some(Boolean)&&!confirm('Replace the current draft with this inquiry file?'))return;
 populate(parsed.request);identity={id:parsed.id,createdAt:parsed.createdAt};review();display(3);say('Inquiry loaded locally. Nothing has been sent.');error.textContent='';
 }catch(e){if(generation!==revision)return;error.textContent=e instanceof SyntaxError?'This file is not valid inquiry JSON.':e.message;}
 finally{if(generation===revision)event.target.value='';}
});
try{const saved=localStorage.getItem(STORE);if(saved){const value=JSON.parse(saved);if(value.schemaVersion!==1)throw Error();populate(M.fields(value.draft));identity=value.identity?M.identityOf(value.identity):null;remember.checked=true;say('Your saved draft is restored on this device.');}}
catch{say('A saved draft could not be read. You can start a new one or clear the saved copy.');}
document.getElementById('journey').hidden=false;display(0,{focus:false});
})();
