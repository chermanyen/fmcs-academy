/* Model: catalogue and resume state. View: navigation/cards/results. Controller: route/search. */
(() => {
 'use strict';
 const $ = id => document.getElementById(id);
 const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const stages = [
  {level:'入門',title:'認識廠務監控',goal:'從零開始，認識設備、PLC、監控畫面與資料流。',ready:'不需要 PLC 或 AVEVA 經驗。',outcome:'能說明 FMCS 的用途，分清監控與現場控制，完成低壓告警練習。'},
  {level:'基礎',title:'建立設備與圖控能力',goal:'先學設備與通訊，再建立平台物件、InTouch 畫面與 AHU 案例。',ready:'已理解 FMCS 架構及資料流。',outcome:'能看懂點位表、核對值與品質，依教材規劃一張 AHU 監控畫面。'},
  {level:'進階',title:'完成整合與維運驗證',goal:'運用前面的基礎，練習腳本、部署、故障排查及雙來源備援。',ready:'已完成平台、InTouch 與 AHU 基礎練習。',outcome:'能整理腳本觸發規則，規劃斷線、恢復與備援驗收紀錄。'}
 ];
 const Model = {courses: [], current: null, framePath: null,
  resume() {try {return localStorage.getItem('fmcsPortalResumeV1');} catch {return null;}},
  save(id) {try {localStorage.setItem('fmcsPortalResumeV1', id);} catch {}}
 };
 const View = {
  init() {
   const card = c => {const i=Model.courses.indexOf(c);return `<a class="course-card" href="#course/${c.id}"><div class="card-top"><b>UNIT ${String(i+1).padStart(2,'0')}</b><span class="tag">${esc(c.level)}</span></div><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p><div class="card-bottom"><span>${esc(c.duration)} · 圖文與練習</span><b>↗</b></div></a>`;};
   $('course-nav').innerHTML = stages.map((stage,n)=>`<section class="nav-stage"><h2>${String(n+1).padStart(2,'0')}　${stage.level}</h2>${Model.courses.filter(c=>c.level===stage.level).map(c=>`<a class="nav-course" data-course="${c.id}" href="#course/${c.id}"><span class="number">${String(Model.courses.indexOf(c)+1).padStart(2,'0')}</span><span>${esc(c.title)}<small>${esc(c.duration)}</small></span></a>`).join('')}</section>`).join('');
   $('course-cards').innerHTML = stages.map((stage,n)=>`<section class="stage-section" id="stage-${n+1}" aria-labelledby="stage-title-${n+1}"><div class="stage-heading"><span class="stage-number">${String(n+1).padStart(2,'0')}</span><div><h3 id="stage-title-${n+1}">${stage.level}｜${stage.title}</h3><p>${stage.goal}</p></div></div><p class="stage-ready"><b>開始前：</b>${stage.ready}</p><div class="course-grid">${Model.courses.filter(c=>c.level===stage.level).map(card).join('')}</div><p class="stage-outcome"><b>完成這一階段：</b>${stage.outcome}</p></section>`).join('');
   const resume = Model.courses.find(c => c.id === Model.resume());
   if (resume) {$('resume').href = '#course/'+resume.id; $('resume').textContent = '繼續上次學習 ↗';}
  },
  show(id) {if(id!=='reader'&&Model.framePath){$('lesson-frame').removeAttribute('src');Model.framePath=null;}['dashboard','reader','results'].forEach(x => $(x).hidden = x !== id); $('course-actions').hidden = id !== 'reader';},
  search(q) {
   View.show('results');
   const words=q.toLocaleLowerCase().split(/\s+/).filter(Boolean);
   const matches=Model.courses.filter(c => words.every(w => (c.level+' '+c.title+' '+c.description+' '+c.search).toLocaleLowerCase().includes(w)));
   $('result-count').textContent=q ? `「${q}」找到 ${matches.length} 個相關單元` : '輸入關鍵字，搜尋八個單元的教材。';
   $('result-list').innerHTML=q ? matches.map(c => {
    const topics=c.sections.filter(s=>words.every(w=>s.title.toLocaleLowerCase().includes(w))).slice(0,8);
    return `<article class="result-card"><h2><a href="#course/${c.id}">${esc(c.title)} →</a></h2><p>${esc(c.level)} · ${esc(c.description)}</p><div class="topic-links">${topics.map(s=>`<a href="#course/${c.id}/${encodeURIComponent(s.anchor)}">${esc(s.title)}</a>`).join('')}</div></article>`;
   }).join('') || '<p>沒有符合的教材。試試「AHU」、「Modbus」、「警報」或「腳本」。</p>' : '';
   $('status').textContent='跨課程搜尋 · '+matches.length+' 個相關單元';
  },
  course(c,anchor) {
   View.show('reader');
   $('reader-title').textContent=c.title; $('reader-level').textContent=c.level+' · '+c.duration;
   const url=c.path+(anchor?'#'+encodeURIComponent(anchor):'');
   $('standalone').href=url;document.getElementById('lesson-study-link').href='study.html?course='+c.id+(anchor?'#'+encodeURIComponent(anchor):'');
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
  else {const saved=Model.courses.find(x=>x.id===Model.resume());if(saved){$('resume').href='#course/'+saved.id;$('resume').textContent='繼續上次學習 ↗';}View.show('dashboard');$('status').textContent='入門 → 基礎 → 進階 · 8 個學習單元';document.title='FMCS × AVEVA｜整合學習中心';}
  $('sidebar').classList.remove('open');$('menu').setAttribute('aria-expanded','false');
  const stageTarget=/^stage-[1-3]$/.test(parts[0]) ? document.getElementById(parts[0]) : null;
  if(stageTarget)stageTarget.scrollIntoView();else window.scrollTo(0,0);
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
 fetch('catalog.json?v=stages1').then(r=>{if(!r.ok)throw Error('catalog');return r.json();}).then(courses=>{Model.courses=courses;View.init();route();}).catch(()=>{$('load-error').hidden=false;$('status').textContent='課程目錄載入失敗';});
})();
