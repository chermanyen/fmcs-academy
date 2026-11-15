const {JSDOM}=require('jsdom');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const catalogue=JSON.parse(fs.readFileSync(path.join(root,'catalog.json'),'utf8'));
const script=fs.readFileSync(path.join(root,'portal.js'),'utf8');
async function load(hash='', blocked=false, failure=false) {
 const dom=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:'https://chermanyen.github.io/fmcs-academy/'+hash,runScripts:'outside-only'});
 const w=dom.window;
 w.scrollTo=()=>{};
 w.fetch=async()=>({ok:!failure,json:async()=>catalogue});
 if(blocked)Object.defineProperty(w,'localStorage',{get(){throw Error('blocked');}});
 else w.localStorage.setItem('fmcsWeeksV1','[0,3,11]');
 w.eval(script);
 await new Promise(resolve=>setImmediate(resolve));
 return dom;
}
(async()=>{
 assert.equal(catalogue.length,8);
 for(const c of catalogue) {
  assert(fs.existsSync(path.join(root,c.path)));
  if(!['platform','mis'].includes(c.id)) {
   const html=new JSDOM(fs.readFileSync(path.join(root,c.path),'utf8'));
   for(const s of c.sections)assert(html.window.document.getElementById(s.anchor),c.id+': '+s.anchor);
   html.window.close();
  }
 }
 const dom=await load();const w=dom.window,d=w.document;
 assert.equal(d.querySelectorAll('.course-card').length,8);
 assert.equal(w.localStorage.getItem('fmcsWeeksV1'),'[0,3,11]');
 d.getElementById('search').value='SuiteLink';
 d.getElementById('search-form').dispatchEvent(new w.Event('submit',{cancelable:true}));
 await new Promise(resolve=>setTimeout(resolve,20));
 assert.equal(d.getElementById('results').hidden,false);
 assert(d.querySelectorAll('.result-card').length>=4);
 assert(d.querySelector('#result-list a[href="#course/modbus/topic-7"]'));
 w.location.hash='course/modbus/topic-7';
 await new Promise(resolve=>setTimeout(resolve,20));
 assert.equal(d.getElementById('lesson-frame').getAttribute('src'),'courses/modbus/index.html#topic-7');
 assert.equal(d.getElementById('next').hidden,true);
 assert.equal(w.localStorage.getItem('fmcsPortalResumeV1'),'modbus');
 assert.equal(w.localStorage.getItem('fmcsWeeksV1'),'[0,3,11]');
 d.getElementById('menu').click();assert.equal(d.getElementById('menu').getAttribute('aria-expanded'),'true');
 d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape'}));assert.equal(d.getElementById('menu').getAttribute('aria-expanded'),'false');
 dom.window.close();
 const blocked=await load('#course/platform/start',true);
 assert.equal(blocked.window.document.getElementById('reader').hidden,false);blocked.window.close();
 const failure=await load('',false,true);
 assert.equal(failure.window.document.getElementById('load-error').hidden,false);failure.window.close();
 console.log('PASS: catalogue anchors, unified search, deep links, navigation, progress preservation, blocked storage and load failure.');
})().catch(e=>{console.error(e);process.exitCode=1;});
