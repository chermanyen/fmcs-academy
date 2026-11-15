/* Model: catalogue and resume state. View: navigation/cards/results. Controller: route/search. */
(() => {
 'use strict';
 const $ = id => document.getElementById(id);
 const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const Model = {courses: [], current: null, framePath: null,
  resume() {try {return localStorage.getItem('fmcsPortalResumeV1');} catch {return null;}},
  save(id) {try {localStorage.setItem('fmcsPortalResumeV1', id);} catch {}}
 };
 const View = {
  init() {
   $('course-nav').innerHTML = Model.courses.map((c,i) => `<a class="nav-course" data-course="${c.id}" href="#course/${c.id}"><span class="number">${String(i+1).padStart(2,'0')}</span><span>${esc(c.title)}<small>${esc(c.level)} · ${esc(c.duration)}</small></span></a>`).join('');
   $('course-cards').innerHTML = Model.courses.map((c,i) => `<a class="course-card" href="#course/${c.id}"><div class="card-top"><b>UNIT ${String(i+1).padStart(2,'0')}</b><span class="tag">${esc(c.level)}</span></div><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p><div class="card-bottom"><span>${esc(c.duration)} · 圖文與練習</span><b>↗</b></div></a>`).join('');
   const resume = Model.courses.find(c => c.id === Model.resume());
   if (resume) {$('resume').href = '#course/'+resume.id; $('resume').textContent = '繼續上次學習 ↗';}
  },
  show(id) {if(id!=='reader'&&Model.framePath){$('lesson-frame').removeAttribute('src');Model.framePath=null;}['dashboard','reader','results'].forEach(x => $(x).hidden = x !== id); $('course-actions').hidden = id !== 'reader';},
  search(q) {
   View.show('results');
   const words=q.toLocaleLowerCase().split(/\s+/).filter(Boolean);
   const matches=Model.courses.filter(c => words.every(w => (c.title+' '+c.description+' '+c.search).toLocaleLowerCase().includes(w)));
   $('result-count').textContent=q ? `「${q}」找到 ${matches.length} 個相關單元` : '輸入關鍵字，搜尋八個單元的教材。';
   $('result-list').innerHTML=q ? matches.map(c => {
    const topics=c.sections.filter(s=>words.every(w=>s.title.toLocaleLowerCase().includes(w))).slice(0,8);
    return `<article class="result-card"><h2><a href="#course/${c.id}">${esc(c.title)} →</a></h2><p>${esc(c.description)}</p><div class="topic-links">${topics.map(s=>`<a href="#course/${c.id}/${encodeURIComponent(s.anchor)}">${esc(s.title)}</a>`).join('')}</div></article>`;
   }).join('') || '<p>沒有符合的教材。試試「AHU」、「Modbus」、「警報」或「腳本」。</p>' : '';
   $('status').textContent='跨課程搜尋 · '+matches.length+' 個相關單元';
  },
  course(c,anchor) {
   View.show('reader');
   $('reader-title').textContent=c.title; $('reader-level').textContent=c.level+' · '+c.duration;
   const url=c.path+(anchor?'#'+encodeURIComponent(anchor):'');
   $('standalone').href=url;
   if (Model.framePath!==url) {$('frame-status').hidden=false; $('lesson-frame').src=url; Model.framePath=url;}
   $('lesson-frame').title=c.title+'：課程內容';
   const i=Model.courses.indexOf(c);
   for(const [id,n] of [['previous',i-1],['next',i+1]]) {
    $(id).hidden=!Model.courses[n];
    if(Model.courses[n]) $(id).href='#course/'+Model.courses[n].id;
   }
   $('status').textContent=`單元 ${i+1} / ${Model.courses.length} · 進度儲存在目前瀏覽器`;
  }
 };
 function route() {
  let parts;try {parts=location.hash.slice(1).split('/').map(decodeURIComponent);} catch {location.hash='home';return;}
  const c=parts[0]==='course' ? Model.courses.find(x=>x.id===parts[1]) : null;
  Model.current=c;
  document.querySelectorAll('[data-course]').forEach(a=>{a.classList.toggle('active',a.dataset.course===c?.id);if(a.dataset.course===c?.id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  if (c) {Model.save(c.id);View.course(c,parts.slice(2).join('/'));document.title=c.title+'｜FMCS × AVEVA';}
  else if(parts[0]==='search') {const q=parts.slice(1).join('/');$('search').value=q;View.search(q);document.title='教材搜尋｜FMCS × AVEVA';}
  else {const saved=Model.courses.find(x=>x.id===Model.resume());if(saved){$('resume').href='#course/'+saved.id;$('resume').textContent='繼續上次學習 ↗';}View.show('dashboard');$('status').textContent='8 個單元 · 既有教材與互動完整保留';document.title='FMCS × AVEVA｜整合學習中心';}
  $('sidebar').classList.remove('open');$('menu').setAttribute('aria-expanded','false');
  window.scrollTo(0,0);
 }
 $('menu').addEventListener('click',()=>{$('menu').setAttribute('aria-expanded',String($('sidebar').classList.toggle('open')));});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('sidebar').classList.remove('open');$('menu').setAttribute('aria-expanded','false');}});
 $('search-form').addEventListener('submit',e=>{e.preventDefault();location.hash='search/'+encodeURIComponent($('search').value.trim());});
 $('lesson-frame').addEventListener('load',()=>{
  $('frame-status').hidden=true;
  try {
   const win=$('lesson-frame').contentWindow;
   const sync=()=>{
    if(!Model.current)return;
    const anchor=win.location.hash.slice(1);
    const course=Model.current;
    Model.framePath=course.path+(anchor?'#'+anchor:'');
    $('standalone').href=Model.framePath;
    history.replaceState(null,'','#course/'+course.id+(anchor?'/'+anchor:''));
   };
   win.addEventListener('hashchange',sync);
   sync();
  } catch { /* Full-page link remains available if the frame is unavailable. */ }
 });
 window.addEventListener('hashchange',route);
 fetch('catalog.json?v=20261115').then(r=>{if(!r.ok)throw Error('catalog');return r.json();}).then(courses=>{Model.courses=courses;View.init();route();}).catch(()=>{$('load-error').hidden=false;$('status').textContent='課程目錄載入失敗';});
})();
