/* Shared lesson supplement: the source pages keep their original MVC and simulations. */
(() => {
 'use strict';
 if(typeof fetch!=='function')return;
 const script=document.currentScript;
 const base=new URL('.',script.src);
 const course=script.dataset.course;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const url=p=>new URL(p,base).href;
 const storage={get(k,fallback){try{return JSON.parse(localStorage.getItem(k))??fallback;}catch{return fallback;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true;}catch{return false;}}};
 const deckNames={'入門':'intro','基礎':'foundation','進階':'advanced'};
 function render(l,compact=false){
  const block=document.createElement('section');block.className='lk-panel';block.dataset.lessonKit=l.id;
  block.innerHTML=`<div class="lk-heading"><div><span class="lk-eyebrow">逐課補充教材 · ${esc(l.level)}</span><h2>${esc(l.title)}</h2></div><a href="${url('study.html')}?course=${l.course}#${encodeURIComponent(l.anchor)}" target="_blank" rel="noopener">專注閱讀 ↗</a></div><p class="lk-intro">先看圖與重點，再用常見問題釐清概念。最後完成五題測驗，查看每題解析。</p><details ${compact?'':'open'}><summary>學習目標與圖文說明</summary><p><b>開始前：</b>${esc(l.prerequisite)}</p><ul>${l.goals.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><figure><a href="${url(l.figure.path)}" target="_blank" rel="noopener" aria-label="放大${esc(l.figure.alt)}"><img src="${url(l.figure.path)}" alt="${esc(l.figure.alt)}" loading="lazy"></a><figcaption>${esc(l.figure.caption)} 點圖可查看原圖。</figcaption></figure><div class="lk-points"><h3>原教材重點</h3><ol>${l.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div><p class="lk-source"><a href="${url(l.source)}" target="_blank" rel="noopener">對照原教材與互動操作 ↗</a> · ${esc(l.referenceNote)}</p></details><div class="lk-faq"><h3>常見問題與概念釐清</h3>${l.faq.map(q=>`<details><summary>${esc(q.question)}</summary><p>${esc(q.answer)}</p></details>`).join('')}</div><details class="lk-card"><summary>本課學習卡與複習</summary><p><b>記憶卡：</b>先回答，再展開查看說明。</p>${l.cards.map(q=>`<details><summary>${esc(q.front)}</summary><p>${esc(q.back)}</p></details>`).join('')}<p><b>實作任務：</b>${esc(l.practice)}</p><label class="lk-note-label">我的理解、驗證證據與待確認問題<textarea rows="4" class="lk-notes" placeholder="寫下自己的說明、預期與實際結果…"></textarea></label><p class="lk-save-status" role="status"></p><div class="lk-checks"><label><input type="checkbox" data-check="0">我能說明本課概念</label><label><input type="checkbox" data-check="1">我能指出一項常見誤解</label><label><input type="checkbox" data-check="2">我已記錄一項練習或待確認問題</label></div><div class="lk-downloads"><a href="${url(l.download)}" download>下載本課學習卡</a><a href="${url('learning-cards.zip')}" download>全部圖文學習卡 ZIP</a><a href="${url('presentations/'+deckNames[l.level]+'.pptx')}" download>${esc(l.level)}階段簡報</a></div></details><form class="lk-quiz"><h3>課後測驗 · 5 題</h3><p>以常見問題與概念判斷為主。請回答全部題目，再查看分數與答案解析。</p>${l.quiz.map((q,i)=>`<fieldset><legend>${i+1}. ${esc(q.question)}</legend>${q.options.map((option,j)=>`<label><input type="radio" name="${l.id}-q${i}" value="${j}"> ${String.fromCharCode(65+j)}. ${esc(option)}</label>`).join('')}<p class="lk-feedback" data-feedback="${i}" hidden></p></fieldset>`).join('')}<div class="lk-quiz-actions"><button type="submit">提交五題答案</button><button type="button" class="lk-reset">重新作答</button><span class="lk-score" role="status"></span></div></form>`;
  const key='fmcsLessonV1:'+l.id,quizKey=key+':'+l.revision;
  const saved=storage.get(key,{}),answers=storage.get(quizKey,{});
  const notes=block.querySelector('.lk-notes');notes.value=typeof saved.notes==='string'?saved.notes:'';
  const persist=()=>{saved.notes=notes.value;saved.checks=[...block.querySelectorAll('[data-check]')].map(x=>x.checked);const ok=storage.set(key,saved);block.querySelector('.lk-save-status').textContent=ok?'學習紀錄已儲存在此瀏覽器。':'瀏覽器無法儲存；可下載學習卡自行記錄。';};
  notes.addEventListener('input',persist);
  block.querySelectorAll('[data-check]').forEach((input,i)=>{input.checked=!!saved.checks?.[i];input.addEventListener('change',persist);});
  block.querySelectorAll('input[type=radio]').forEach(input=>{const i=Number(input.name.split('-q').pop());input.checked=answers.choices?.[i]===Number(input.value);});
  const form=block.querySelector('.lk-quiz');
  const grade=()=>{
   const choices=l.quiz.map((_,i)=>{const input=form.querySelector(`input[name="${l.id}-q${i}"]:checked`);return input?Number(input.value):null;});
   const score=block.querySelector('.lk-score');
   if(choices.some(x=>x===null)){score.textContent='請先完成全部 5 題，目前已答 '+choices.filter(x=>x!==null).length+' 題。';return;}
   let correct=0;l.quiz.forEach((q,i)=>{const ok=choices[i]===q.answer;if(ok)correct++;const p=block.querySelector(`[data-feedback="${i}"]`);p.hidden=false;p.classList.toggle('lk-correct',ok);p.textContent=(ok?'答對了。':'再想一下。')+' 正確答案：'+String.fromCharCode(65+q.answer)+'。'+q.explanation;});
   score.textContent=`${correct} / 5 題正確。可閱讀解析後重新練習。`;
   storage.set(quizKey,{choices,correct});
  };
  form.addEventListener('submit',e=>{e.preventDefault();grade();});
  form.addEventListener('change',()=>{block.querySelector('.lk-score').textContent='答案已修改，請重新提交以更新分數。';block.querySelectorAll('.lk-feedback').forEach(p=>p.hidden=true);});
  block.querySelector('.lk-reset').addEventListener('click',()=>{form.reset();block.querySelectorAll('input[type=radio]').forEach(x=>x.checked=false);block.querySelectorAll('.lk-feedback').forEach(p=>p.hidden=true);block.querySelector('.lk-score').textContent='已清除本次答案，可重新作答。';storage.set(quizKey,{});});
  if(Array.isArray(answers.choices)&&answers.choices.length===5)grade();
  return block;
 }
 function mountCourse(all){
  const lessons=all.filter(l=>l.course===course);
  const dynamic=['platform','mis'].includes(course);
  function mount(){
   if(!document?.documentElement)return;
   if(dynamic){
    const anchor=decodeURIComponent(location.hash.slice(1));const lesson=lessons.find(l=>l.anchor===anchor)||(!anchor||anchor==='home'?lessons[0]:null);
    const main=document.querySelector('#main');if(!main||!main.children.length||!lesson)return;
    if(!main.querySelector(`[data-lesson-kit="${lesson.id}"]`)){main.querySelectorAll('.lk-panel').forEach(x=>x.remove());main.append(render(lesson));}
    return;
   }
   for(const l of lessons){
    if(document.querySelector(`[data-lesson-kit="${l.id}"]`))continue;
    const anchor=document.getElementById(l.anchor);if(!anchor)continue;
    const panel=render(l,true);
    if(anchor.matches('details,article,section'))anchor.append(panel);
    else{
     const parent=anchor.closest('section')||anchor.parentElement;
     const headings=[...parent.querySelectorAll('h2')].filter(h=>!h.closest('.lk-panel'));
     const next=headings[headings.indexOf(anchor)+1];
     if(next)next.before(panel);else parent.append(panel);
    }
   }
  }
  let pending=false;const observer=new MutationObserver(()=>{if(!pending){pending=true;queueMicrotask(()=>{pending=false;mount();});}});
  observer.observe(document.body,{childList:true,subtree:true});mount();window.addEventListener('hashchange',mount);
 }
 function mountStudy(all){
  const params=new URLSearchParams(location.search),courseId=params.get('course'),stage=params.get('stage');
  const lessons=all.filter(l=>courseId?l.course===courseId:stage?l.level===stage:true);
  const nav=document.getElementById('study-nav'),main=document.getElementById('study-main');
  nav.innerHTML=lessons.map(l=>`<a href="#${encodeURIComponent(l.anchor)}" data-id="${l.id}">${esc(l.level)} · ${esc(l.title)}</a>`).join('');
  function show(){
   let anchor;try{anchor=decodeURIComponent(location.hash.slice(1));}catch{anchor='';}
   const lesson=lessons.find(l=>l.id===anchor||l.anchor===anchor)||lessons[0];if(!lesson){main.textContent='找不到課程。';return;}
   main.replaceChildren(render(lesson));document.title=lesson.title+'｜逐課學習';
   nav.querySelectorAll('a').forEach(a=>a.setAttribute('aria-current',a.dataset.id===lesson.id?'page':'false'));
   const i=lessons.indexOf(lesson);document.getElementById('study-count').textContent=`${i+1} / ${lessons.length} 課`;
   for(const [id,n] of [['study-prev',i-1],['study-next',i+1]]){const a=document.getElementById(id);a.hidden=!lessons[n];if(lessons[n])a.href='#'+lessons[n].id;}
   window.scrollTo(0,0);
  }
  // Stage views use globally unique lesson ids; course views also accept original anchors.
  nav.querySelectorAll('a').forEach(a=>a.href='#'+a.dataset.id);
  window.addEventListener('hashchange',show);show();
 }
 fetch(url('lesson-kits.json?v=kits1')).then(r=>{if(!r.ok)throw Error('load');return r.json();}).then(all=>{if(course)mountCourse(all);else mountStudy(all);}).catch(()=>{if(!course)document.getElementById('study-main').textContent='教材暫時無法載入，請重新整理，或回到原課程閱讀。';});
})();
