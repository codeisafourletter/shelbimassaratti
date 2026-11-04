(function(root){
  'use strict';
  const SERVICES = {'artist-direction':'Artist direction','release-planning':'Release planning','booking':'Shows & booking','branding':'Branding & promotion','media':'Media & opportunities'};
  const FIELDS=['kind','service','name','city','contact','music','goal','audience','budget','date','venue','stage'];
  const LIMITS={kind:12,service:32,name:120,city:120,contact:200,music:2000,goal:2000,audience:600,budget:200,date:10,venue:300,stage:40};
  function fields(raw){
    if(!raw || typeof raw!=='object' || Array.isArray(raw))throw new Error('This is not an inquiry record.');
    const result={};
    for(const key of FIELDS){
      if(raw[key]!=null && typeof raw[key]!=='string')throw new Error(`Invalid ${key} field.`);
      result[key]=(raw[key]||'').trim();
      if(result[key].length>LIMITS[key])throw new Error(`${key} is too long.`);
    }
    return result;
  }
  function validDate(value){
    return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0,10)===value;
  }
  function issues(raw){
    const r=fields(raw),errors={};
    if(!['artist','event'].includes(r.kind))errors.kind='Choose artist support or an event inquiry.';
    if(!Object.hasOwn(SERVICES,r.service))errors.service='Choose what you need help with.';
    for(const key of ['name','city','contact','goal'])if(!r[key])errors[key]=`Add ${key==='contact'?'an email or social handle':key==='goal'?'your goal and what help you need':key==='name'?'your name or artist name':'your city or market'}.`;
    if(r.kind==='artist'&&!r.music)errors.music='Add at least one music link.';
    if(r.music){
      const links=r.music.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
      if(links.length>3)errors.music='Use up to three links, one per line.';
      for(const link of links){try{const u=new URL(link);if(!['https:','http:'].includes(u.protocol)||u.username||u.password)throw Error();}catch{errors.music='Use full public https:// or http:// music links without passwords.';}}
    }
    if(r.date&&!validDate(r.date))errors.date='Choose a valid date.';
    if(r.kind==='event'&&!r.date)errors.date='Add the requested event date.';
    if(r.kind==='event'&&!r.venue)errors.venue='Add the venue or planned event location.';
    return errors;
  }
  function nextSteps(r){
    const steps=['Review the brief for accuracy. Copy it and send it through the contact channel below.'];
    if(r.kind==='artist'&&r.stage!=='finished')steps.push('Make clear which music is finished and what is still in progress.');
    if(!r.budget)steps.push('Prepare a realistic budget range to discuss. No price has been quoted.');
    if(!r.audience)steps.push('Add useful audience, performance, or expected attendance context when you follow up.');
    if(r.date)steps.push('Ask whether the requested date is available. This brief does not reserve a date.');
    steps.push('Keep the sent message and any reply together. A request becomes an agreement only after the details are confirmed.');
    return steps;
  }
  function identityOf(value){
    if(!value || typeof value.id!=='string' || !/^[a-zA-Z0-9-]{8,80}$/.test(value.id) || typeof value.createdAt!=='string' || !/^\d{4}-\d{2}-\d{2}T/.test(value.createdAt) || Number.isNaN(Date.parse(value.createdAt)))throw new Error('Invalid saved inquiry identity.');
    return {id:value.id,createdAt:value.createdAt};
  }
  function create(raw,{id,createdAt,updatedAt}={}){
    const r=fields(raw),errors=issues(r);if(Object.keys(errors).length)throw new Error(Object.values(errors).join(' '));
    const now=new Date().toISOString();
    if(id)identityOf({id,createdAt:createdAt||now});
    return {schemaVersion:1,id:id||globalThis.crypto.randomUUID(),createdAt:createdAt||now,updatedAt:updatedAt||now,request:r};
  }
  function parse(value){
    if(!value||value.schemaVersion!==1||typeof value.id!=='string'||!/^[a-zA-Z0-9-]{8,80}$/.test(value.id))throw new Error('Unsupported inquiry file. Choose a version 1 inquiry brief.');
    for(const key of ['createdAt','updatedAt'])if(typeof value[key]!=='string'||!/^\d{4}-\d{2}-\d{2}T/.test(value[key])||Number.isNaN(Date.parse(value[key])))throw new Error('Invalid inquiry timestamp.');
    return create(value.request,{id:value.id,createdAt:value.createdAt,updatedAt:value.updatedAt});
  }
  function message(brief){
    const b=parse(brief),r=b.request;
    return [`INQUIRY · ${SERVICES[r.service]}`,`Reference: ${b.id}`,`From: ${r.name}`,`City / market: ${r.city}`,`Reply contact: ${r.contact}`,r.kind==='event'?'Event inquiry':'Artist inquiry',r.music?`Music:\n${r.music}`:'',`Goal / requested help:\n${r.goal}`,r.audience?`Audience / shows: ${r.audience}`:'',r.budget?`Budget context: ${r.budget}`:'Budget: to discuss',r.date?`Requested date: ${r.date} (not reserved)`:'',r.venue?`Venue / location: ${r.venue}`:'','This is an inquiry, not a confirmed booking.'].filter(Boolean).join('\n\n');
  }
  const api={SERVICES,FIELDS,fields,issues,validDate,identityOf,create,parse,message,nextSteps};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.BriefModel=api;
})(typeof globalThis!=='undefined'?globalThis:this);
