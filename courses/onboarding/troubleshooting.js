const faults = [
 ['engine','部署失敗或 AppEngine 呈紅色',[
  '在 IDE 保存部署結果，記錄失敗時間、目標節點與第一筆錯誤。',
  '開啟 SMC／OCMC 的 Logger，對照相同時間與相關節點的訊息。',
  '核對 WinPlatform、AppEngine 宿主、節點通訊及部署狀態。',
  '依日誌指向查授權、重名或相依性。若訊息指向 Galaxy Repository 或 SQL，再查實際 SQL 執行個體與 GR 連線。',
  '修正後只在測試環境重試，使用 Object Viewer 驗證物件與執行值。']],
 ['quality','Object Viewer 有值，Quality 為 Bad 或 Uncertain',[
  '以 UAExpert 等核准測試 Client 讀同一 Endpoint 和 NodeId，確認來源已啟動。',
  '記錄來源的值、品質與時間戳。若來源本身品質不良，先處理模擬來源或連線。',
  '若來源正常，核對 OI Gateway 的連線、憑證信任、點位，以及 AVEVA Attribute 的 InputSource 或 I/O 映射。',
  '改變模擬值，再確認 Object Viewer 品質恢復且數值與時間戳更新。']],
 ['graphic','Object Viewer 正常，但 InTouch 畫面數值不動',[
  '在 Object Viewer 確認是同一實例與 Attribute，且值、品質與時間戳持續更新。',
  '傳統 InTouch 標籤路徑，在 WindowMaker 核對 Animation Link 與 Tagname Dictionary。若為 I/O Tag，再核對 Access Name 和 Item。',
  'Industrial Graphics／OMI 路徑，核對動畫運算式、實例參照與畫面執行內容。',
  '確認 WindowViewer 或 OMI 執行的是最新測試應用，改變來源值後比對兩端。']]
];
const checks=[
 ['已核對訓練 Galaxy 與 GR 節點','已辨認 Model 與 Deployment 視圖'],
 ['已核對 Attribute 名稱、型別及單位','已確認 AHU001 繼承預期欄位'],
 ['已檢查 SMC／OCMC Logger','已確認 AppEngine 與執行值'],
 ['已在 OPC UA Client 確認品質','已核對 NodeId 與 AVEVA I/O 參照'],
 ['已比對 Object Viewer 與畫面參照','已核對執行中的畫面版本'],
 ['已記錄樣本時間與品質','已核對歷史收集與查詢結果'],
 ['已分別記錄範本初值與兩個執行值','已核對兩台設備的來源各自獨立'],
 ['已核對訓練帳號與角色','已記錄檢視、編輯、部署的驗證結果'],
 ['已定位第一個異常的環節','已重測正常與斷線情境']
];
const checklistKey='fmcs-aveva-checklists-v1';
let checklistState={};
try{checklistState=JSON.parse(localStorage.getItem(checklistKey))||{};}catch{}
function addChecklist(parent,id,items){
 const box=document.createElement('fieldset');
 box.className='checklist';
 box.innerHTML='<legend>跟做檢核</legend>'+items.map((item,index)=>'<label class="task"><input type="checkbox" data-index="'+index+'">'+item+'</label>').join('')+'<p role="status"></p><button type="button">重設本清單</button>';
 const inputs=[...box.querySelectorAll('input')];
 function update(){
  box.querySelector('[role=status]').textContent=inputs.filter(input=>input.checked).length+' / '+items.length+' 項已確認';
 }
 function saveChecks(){
  checklistState[id]=inputs.map(input=>input.checked);
  try{localStorage.setItem(checklistKey,JSON.stringify(checklistState));}catch{}
  update();
 }
 inputs.forEach((input,index)=>{input.checked=checklistState[id]?.[index]===true;input.onchange=saveChecks;});
 box.querySelector('button').onclick=()=>{inputs.forEach(input=>{input.checked=false;});saveChecks();};
 parent.append(box);
 update();
}
faults.forEach(([id,title,steps],index)=>{
 const card=document.createElement('details');
 card.id='fault-'+id;
 card.open=index===0;
 card.innerHTML='<summary>'+title+'</summary><p class="muted">依序查核並勾選已驗證的步驟。</p>';
 addChecklist(card,id,steps);
 byId('faultGuides').append(card);
});
checks.forEach((items,index)=>addChecklist(byId('aveva-'+String(index+1).padStart(2,'0')),'tool-'+index,items));
for(const week of [3,4,5]){
 const links=document.createElement('p');
 links.innerHTML='<a href="#mapping">看 AHU 欄位對照與下載 →</a>　<a href="#troubleshooting">查閱除錯小百科 →</a>';
 byId('lesson-'+week).querySelector('summary').after(links);
}
function expandGuide(){
 const target=byId(location.hash.slice(1));
 if(target?.matches('#toolLessons > details, #faultGuides > details, #package-guide'))target.open=true;
}
window.addEventListener('hashchange',expandGuide);
expandGuide();
