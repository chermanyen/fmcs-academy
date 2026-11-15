const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');const {JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..');const lessons=JSON.parse(fs.readFileSync(path.join(root,'lesson-kits.json'),'utf8'));
const source=fs.readFileSync(path.join(root,'lesson-kit.js'),'utf8');
async function load({course,blocked=false}={}){
 const html=course?fs.readFileSync(path.join(root,course==='foundation'?'academy.html':'courses/'+course+'/index.html'),'utf8'):fs.readFileSync(path.join(root,'study.html'),'utf8');
 const dom=new JSDOM(html,{url:'https://chermanyen.github.io/fmcs-academy/study.html?course=intouch',runScripts:'outside-only'}),w=dom.window,d=w.document;
 w.scrollTo=()=>{};w.fetch=async()=>({ok:true,json:async()=>lessons});
 Object.defineProperty(d,'currentScript',{value:{src:'https://chermanyen.github.io/fmcs-academy/lesson-kit.js',dataset:course?{course}:{}},configurable:true});
 if(blocked)Object.defineProperty(w,'localStorage',{get(){throw Error('blocked');}});
 w.eval(source);await new Promise(r=>setImmediate(r));return dom;
}
(async()=>{
 assert.equal(lessons.length,118);assert.equal(new Set(lessons.map(l=>l.id)).size,118);
 for(const c of JSON.parse(fs.readFileSync(path.join(root,'catalog.json'),'utf8'))){const html=fs.readFileSync(path.join(root,c.path),'utf8');assert(html.includes('lesson-kit.js'),c.id+' supplement loader');assert(html.includes('data-course="'+c.id+'"'),c.id+' supplement identity');}
 for(const l of lessons){assert(l.points.length>=2,l.id);assert.equal(l.quiz.length,5,l.id);assert(l.faq.length>=3);assert(l.cards.length>=3);assert(fs.existsSync(path.join(root,l.download)));assert(fs.existsSync(path.join(root,l.figure.path)));
  for(const q of l.quiz){assert(q.question&&q.explanation);assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3);}
 }
 const dom=await load(),w=dom.window,d=w.document,l=lessons.find(x=>x.course==='intouch');
 assert.equal(d.querySelectorAll('.lk-quiz fieldset').length,5);assert.equal(d.querySelectorAll('.lk-faq details').length,3);
 const submit=()=>d.querySelector('.lk-quiz').dispatchEvent(new w.Event('submit',{cancelable:true}));submit();assert.match(d.querySelector('.lk-score').textContent,/請先完成/);
 l.quiz.forEach((q,i)=>d.querySelector(`input[name="${l.id}-q${i}"][value="${q.answer}"]`).checked=true);submit();assert.match(d.querySelector('.lk-score').textContent,/5 \/ 5/);assert.equal(d.querySelectorAll('.lk-feedback:not([hidden])').length,5);
 const note=d.querySelector('.lk-notes');note.value='我的讀值驗證紀錄';note.dispatchEvent(new w.Event('input'));assert.equal(JSON.parse(w.localStorage.getItem('fmcsLessonV1:'+l.id)).notes,note.value);
 d.querySelector('.lk-reset').click();assert.equal(d.querySelectorAll('.lk-quiz input:checked').length,0);assert.equal(d.querySelectorAll('.lk-feedback:not([hidden])').length,0);
 w.location.hash='intouch--application';await new Promise(r=>setTimeout(r,20));assert.equal(d.querySelector('.lk-panel').dataset.lessonKit,'intouch--application');assert.equal(d.querySelector('.lk-notes').value,'');dom.window.close();
 const intro=await load({course:'intro'});assert.equal(intro.window.document.querySelectorAll('.lk-panel').length,4);intro.window.close();
 for(const [course,count] of [['intouch',8],['ahu',13],['modbus',16]]){const page=await load({course});assert.equal(page.window.document.querySelectorAll('.lk-panel').length,count,course);page.window.close();}
 const blocked=await load({blocked:true});const b=blocked.window.document.querySelector('.lk-notes');b.value='test';b.dispatchEvent(new blocked.window.Event('input'));assert.match(blocked.window.document.querySelector('.lk-save-status').textContent,/無法儲存/);blocked.window.close();
 console.log('PASS: 118 illustrated lesson kits, 590 questions, all cards, scoring/explanations, resets, independent notes, static injection and unavailable storage.');
})().catch(e=>{console.error(e);process.exitCode=1;});
