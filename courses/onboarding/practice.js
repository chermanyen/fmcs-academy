const exercises = [
 ['測試環境與回復','測試 VM 已有基準快照，SQL 也已備份。你只想把測試資料庫還原至備份時間。',
  ['回復整台 VM 的快照','將 SQL 備份還原成獨立的測試資料庫','重新安裝 Windows Server'],1,
  '以另一個測試資料庫名稱還原，可比較備份內容與現況，也能保留原資料庫供核對。',
  '環境盤點表','VM 名稱｜Windows 版本｜SQL 執行個體｜快照日期｜備份日期｜還原驗證結果'],
 ['Galaxy 與 AppEngine','你已在 IDE 編輯 AHU001，執行中的監控畫面仍顯示舊設定。已確認畫面綁定正確。下一步查哪裡？',
  ['確認變更是否已部署，並檢查目標 AppEngine','重新建立 SQL 執行個體','重建所有畫面'],0,
  'IDE 中的組態與執行中的物件有各自的狀態。先在測試環境比對部署版本與 Engine 狀態。',
  '設計與執行對照表','物件名稱｜IDE 組態版本｜目標 AppEngine｜部署狀態｜執行驗證'],
 ['AHU 範本與實例','AHU001 與 AHU002 都要新增送風溫度欄位，但各自讀取不同來源。應如何安排？',
  ['兩台設備共用同一個即時溫度值','把溫度存成文字，靠畫面解析','在 AHU 範本定義欄位，各實例配置自己的來源'],2,
  '範本讓欄位名稱與型別一致。每台設備的實例綁定獨立來源，畫面與歷史資料才能追溯到正確設備。',
  'AHU 點位表','設備｜Attribute｜型別｜工程單位｜來源節點\nAHU001｜SupplyTemp｜Float｜°C｜模擬節點 A\nAHU002｜SupplyTemp｜Float｜°C｜模擬節點 B'],
 ['OPC UA 點位與品質','畫面原本顯示 24 °C，通訊中斷後來源回報品質不良。操作員應看到什麼？',
  ['將溫度顯示為 0 °C','標示溫度不可用，並顯示通訊異常','維持 24 °C 且顯示正常'],1,
  '品質不良時應標示資料不可用。若要保留最後有效值，還應清楚標示該值的時間與狀態。',
  '資料來源對照表','來源節點｜AVEVA Attribute｜工程單位｜有效值｜品質｜時間戳｜斷線時預期畫面'],
 ['SCADA 畫面與警報','站內 AHU 模擬門檻是 30 °C。通訊正常、風機運轉，送風從 24 °C 調到 32 °C。',
  ['風機運轉，送風 32 °C，顯示高溫警報','風機停止並顯示通訊異常','畫面自動把溫度改回 24 °C'],0,
  '風機運轉與高溫警報是獨立狀態。到 AHU 面板把送風調到 32 °C，可直接對照。',
  '圖控測試表','案例｜風機狀態｜送風｜資料品質｜預期警報｜實際畫面'],
 ['歷史資料與查詢','四筆送風紀錄依序為 09:00／24 °C、09:05／32 °C、09:10／品質不良、09:15／26 °C。哪些時間可用來描述高溫？',
  ['09:10 為確定恢復正常','09:05 有有效高溫值，09:15 首次觀察到恢復正常','從 09:05 到 09:15 持續高溫'],1,
  '09:10 的品質不良留下觀測空窗。查詢結果可指出有效樣本時間，無法推得實際恢復的精確時刻。',
  '歷史樣本紀錄','設備｜點位｜時間｜數值｜品質\nAHU001｜SupplyTemp｜09:05｜32｜良好\nAHU001｜SupplyTemp｜09:10｜空值｜不良'],
 ['測試部署與回復','測試部署後 AppEngine 正常，但 AHU 畫面溫度停在舊值。接下來要怎麼定位？',
  ['只看 Engine 狀態就簽收','直接重啟所有測試伺服器','依序比對來源、Attribute 的品質與時間戳，以及畫面綁定'],2,
  'Engine 正常只表示其中一層運作。從來源一路比對到畫面，可定位是哪一層的資料停止更新。',
  '部署與回復檢查表','變更版本｜回復點｜Engine｜來源更新｜Attribute 品質與時間｜畫面｜回復後重驗'],
 ['整合驗收與交接','畫面可顯示溫度，專案也有點位表。還需要哪一組證據，才能完成整合驗收？',
  ['正常、高溫與斷線的測試結果，以及歷史和回復紀錄','只有一張正常畫面截圖','只有安裝套件清單'],0,
  '把正常與異常情境的預期、實測與證據寫進同一份驗收表，交接時即可重做。',
  'AHU 整合驗收表','情境｜輸入｜預期結果｜實測結果｜證據\n正常｜24 °C、通訊正常｜顯示溫度\n高溫｜32 °C、通訊正常｜顯示高溫\n斷線｜通訊異常｜溫度不可用']
];
const practiceKey='fmcs-weekly-practice-v1';
let completedWeeks=[];
try{const value=JSON.parse(localStorage.getItem(practiceKey));if(Array.isArray(value))completedWeeks=value;}catch{}
const cards=[...document.querySelectorAll('#weeks .card')];
function updatePracticeProgress(){
 byId('weekProgress').textContent='選修自我檢查 '+completedWeeks.length+' / '+exercises.length+' 週答對';
 cards.forEach((card,index)=>card.querySelector('.week-state').textContent=completedWeeks.includes(index)?'情境題已答對':'可開始學習');
}
exercises.forEach(([title,scenario,choices,answer,explanation,artifact,template],index)=>{
 const lesson=byId('lesson-'+(index+1));
 const card=cards[index];
 card.insertAdjacentHTML('beforeend','<p class="week-state"></p><a class="week-link" href="#'+lesson.id+'">開始第 '+(index+1)+' 週教學 →</a>');
 card.querySelector('a').addEventListener('click',()=>{lesson.open=true;lesson.querySelector('summary').focus({preventScroll:true});});
 const form=document.createElement('form');
 form.className='practice';
 form.innerHTML='<h3>'+title+'｜情境練習</h3><fieldset><legend>'+scenario+'</legend>'+
 choices.map((choice,choiceIndex)=>'<label><input type="radio" name="choice" value="'+choiceIndex+'" required> '+choice+'</label>').join('')+
 '</fieldset><button type="submit">核對答案</button><p class="result" role="status"></p>'+
 ([3,4,7].includes(index)?'<p><a href="#lab">到 AHU 實驗室操作 →</a></p>':'')+
 '<details class="artifact"><summary>本週交付物 · '+artifact+'</summary><pre></pre></details>';
 form.querySelector('pre').textContent=template;
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const correct=Number(new FormData(form).get('choice'))===answer;
  form.querySelector('.result').textContent=correct?'答對了。'+explanation:'再試一次。先用上方流程圖找出這個情境涉及的環節。';
  if(correct&&!completedWeeks.includes(index)){
   completedWeeks.push(index);
   try{localStorage.setItem(practiceKey,JSON.stringify(completedWeeks));}catch{}
   updatePracticeProgress();
  }
 });
 const toolLinks=['01','01','02','04','05','06','03','03'];
 const guide=document.createElement('p');
 guide.innerHTML='<a href="#aveva-'+toolLinks[index]+'">跟著 AVEVA 工具教學做 →</a>';
 guide.firstElementChild.onclick=()=>{byId('aveva-'+toolLinks[index]).open=true;};
 const review=document.createElement('details');
 review.innerHTML='<summary>學完後自我檢查與交付物</summary>';
 review.append(form);
 lesson.append(guide,review);
});
function openLinkedLesson(){const linked=document.getElementById(location.hash.slice(1));if(linked?.matches('#lessons > details'))linked.open=true;}
window.addEventListener('hashchange',openLinkedLesson);
openLinkedLesson();
updatePracticeProgress();
