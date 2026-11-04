// Used by Node tests; browser desk uses the same functions through this file.
(function(root){
const M=typeof module!=='undefined'&&module.exports?require('../brief-model.js'):root.BriefModel;
const STAGES=['new','reviewing','awaiting-reply','closed'];
function record(value){
 if(!value||typeof value!=='object')throw new Error('Invalid desk record.');
 const brief=M.parse(value.brief);if(!STAGES.includes(value.stage))throw new Error('Invalid inquiry stage.');
 if(typeof value.note!=='string'||value.note.length>10000)throw new Error('Invalid desk note.');
 if(typeof value.followUp!=='string'||value.followUp&&!M.validDate(value.followUp))throw new Error('Invalid follow-up date.');
 return {brief,stage:value.stage,note:value.note,followUp:value.followUp};
}
function imported(value){
 if(value&&value.deskVersion===1){if(!Array.isArray(value.records)||value.records.length>1000)throw new Error('Desk backups can contain up to 1,000 inquiries.');return value.records.map(record);}
 return [{brief:M.parse(value),stage:'new',note:'',followUp:''}];
}
function merge(existing,added){const ids=new Set(existing.map(r=>r.brief.id));const fresh=[];let duplicates=0;for(const r of added){if(ids.has(r.brief.id)){duplicates++;continue;}ids.add(r.brief.id);fresh.push(r);}if(existing.length+fresh.length>1000)throw new Error('Desk limit reached. Export or remove old inquiries first.');return {records:[...existing,...fresh],duplicates};}
const api={STAGES,record,imported,merge};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.DeskModel=api;
})(typeof globalThis!=='undefined'?globalThis:this);
