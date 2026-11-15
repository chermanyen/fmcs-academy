const byId = id => document.getElementById(id);
const weeks = [
['Windows Server／SQL Server／VM','建立可還原的測試環境'],
['AVEVA System Platform','認識 Galaxy、IDE、AppEngine'],
['Tag／Attribute／Template','建立可重用的設備物件'],
['PLC／OPC UA／Kepware','讀取模擬資料並檢查品質'],
['InTouch／SCADA／圖控','完成設備監控畫面'],
['Script／SQL／MXAccess','理解資料處理與系統整合'],
['GRAccess／部署／維運','演練測試部署與監控'],
['FMCS 整合專案','完成 AHU 監控及驗收']
];
byId('weeks').innerHTML = weeks.map(([title, output], index) => '<article class="card"><div class="eyebrow">WEEK 0'+(index+1)+'</div><h3>'+title+'</h3><p class="muted">'+output+'</p></article>').join('');
const lessons = [
 ['搭建可還原的環境','VM 是隔離的練習機。快照可回到某個 VM 狀態，SQL 備份則用於資料庫還原。',['畫出工作站、測試 VM 與測試 SQL 的連線圖。','盤點作業系統、SQL 執行個體、名稱解析及授權來源。','有測試 VM 時，記錄基準快照與 SQL 備份位置，演練還原。'],'能分別說明 VM 與資料庫的回復方式。'],
 ['看懂 Galaxy 和執行環境','Galaxy 是專案組態的集合。Galaxy Repository 保存組態，IDE 用來編輯，AppEngine 執行部署後的應用物件。',['畫出 IDE → Galaxy 組態 → AppEngine 執行的關係。','用 AHU001 舉例，分別描述設計時與執行時的工作。','在核准測試環境辨認 Galaxy、Platform、Engine 和 Area。'],'能指出應到哪裡編輯物件，以及到哪裡檢查執行狀態。'],
 ['把 AHU 做成可重用物件','Template 定義共同結構，Instance 代表一台設備，Attribute 表示該設備的單一資料欄位。',['參考實驗室 Tag 表，寫出送風溫度、風機狀態與通訊狀態的型別。','用同一份 AHU 範本規劃 AHU001 和 AHU002，為兩台設備填不同的值。','有測試 Galaxy 時，建立範本與實例，檢查欄位繼承。'],'兩台設備共用欄位結構，且有各自的資料來源。'],
 ['把設備資料送入平台','OPC UA Client 向 Server 讀取或訂閱資料。判斷讀值是否可用時，要同時看數值、品質與時間戳。',['畫出模擬設備 → OPC UA Server → AVEVA Attribute 的對照圖。','為送風溫度列出來源節點、目標欄位、單位與資料型別。','關閉實驗室的通訊開關，觀察畫面如何標示無效資料。'],'能區分 0 °C、尚未收到值與通訊品質不良。'],
 ['設計一張可判讀的 SCADA 畫面','FMCS 提供廠務設備的集中監控。SCADA 畫面把設備數值、運轉狀態與警報呈現給操作人員。',['畫出 AHU 單頁草圖，放入風機、送回風溫度及警報。','在模擬面板依序測試停機、高溫、濾網異常和通訊中斷。','把狀態寫成文字與顏色對照，在測試圖控核對各狀態。'],'操作人員能辨別停機、高溫與通訊失效。'],
 ['處理即時值與歷史資料','即時值用來看設備現在的狀態。歷史資料用來重建趨勢，至少要能辨識設備、點位、時間、值與品質。',['模擬記錄三筆送風溫度與一筆品質不良事件。','在測試 SQL 或 Historian 查詢一段時間內的資料，核對時間排序與品質。','說明 Script 可處理衍生值，MXAccess 用於平台執行時資料存取。'],'能從樣本追溯一次高溫發生及恢復的時間。'],
 ['部署、監控與回復','GRAccess 用於 Galaxy 組態存取。部署後可依序檢查 Engine、設備物件、資料品質及畫面。',['記錄測試物件的變更前版本與還原方法。','部署一項測試變更，核對 Engine 狀態、數值、警報與畫面。','演練回復並保留部署前後的驗證紀錄。'],'能以同一份檢查表驗證部署與回復。'],
 ['完成 AHU 整合驗收','用同一個案例串起設備通訊、物件範本、監控畫面、警報、歷史資料與部署。',['依 AHU 實驗室的八項標準逐一驗收。','記錄正常、送風高溫及通訊中斷三種情境的預期與實際結果。','整理架構圖、點位表、畫面、歷史樣本與回復紀錄。'],'能用驗收紀錄說明資料從設備到畫面的完整路徑。']
];
byId('lessons').innerHTML=lessons.map(([title,concept,steps,check],index)=>'<details id="lesson-'+(index+1)+'" '+(index===0?'open':'')+'><summary>第 '+(index+1)+' 週｜'+title+'</summary><p>'+concept+'</p><ol>'+steps.map(step=>'<li>'+step+'</li>').join('')+'</ol><p><strong>驗收</strong>　'+check+'</p></details>').join('');
const days=[
['認識 FMCS','第 5 週觀念與首頁資料流',['說明 FMCS 與 SCADA 的差別','畫出設備、通訊、平台、畫面及歷史資料的概念架構','記錄 Galaxy、GR、AppEngine 三個名詞'],'一張 FMCS 架構圖'],
['建立測試 VM','第 1 週站內課程',['盤點核准的 VM 規格與安裝來源','建立或取得測試 VM 並記錄版本','建立基準快照並確認還原方式'],'一份 VM 與快照紀錄'],
['確認網路與遠端連線','第 1 週站內課程',['辨識測試機的 IP、DNS 與網段','確認核准的連線埠及遠端登入方式','記錄名稱解析與遠端連線結果'],'一張測試網路對照表'],
['檢查 SQL Server','第 1 週站內課程',['核對部門支援的 SQL Server 版本','確認測試執行個體與登入權限','以測試資料庫驗證連線與備份位置'],'一份 SQL 測試連線紀錄'],
['盤點 AVEVA 安裝與授權','課程範圍與測試環境',['記錄測試環境的目標版本與必要更新','確認測試授權有效期及更新窗口','整理 Galaxy／IDE 準備狀態與待確認事項'],'一份可交接的環境盤點表']
];
const storageKey='fmcs-training-v1';
let saved={checks:{},start:0,day:0};
try{const stored=JSON.parse(localStorage.getItem(storageKey));if(stored) saved={...saved,...stored};}catch{}
function save(){try{localStorage.setItem(storageKey,JSON.stringify(saved));}catch{}}
function renderDay(){
 const [title,material,tasks,output]=days[saved.day];
 byId('tabs').innerHTML=days.map((_,index)=>'<button aria-selected="'+(index===saved.day)+'" role="tab">D'+(index+1)+'</button>').join('');
 byId('tabs').setAttribute('role','tablist');
 Array.from(byId('tabs').children).forEach((button,index)=>button.onclick=()=>{saved.day=index;save();renderDay();byId('tabs').children[index].focus();});
 byId('day').innerHTML='<h3>Day '+(saved.day+1)+'｜'+title+'</h3><p class="muted">站內參考　'+material+'</p>'+tasks.map((task,index)=>'<label class="task"><input type="checkbox" data-key="'+saved.day+'-'+index+'" '+(saved.checks[saved.day+'-'+index]?'checked':'')+'>'+task+'</label>').join('')+'<p>當日驗收　'+output+'</p>';
 byId('day').querySelectorAll('input').forEach(input=>input.onchange=()=>{saved.checks[input.dataset.key]=input.checked;save();renderCount();});
 renderCount();
}
function renderCount(){const count=Object.values(saved.checks).filter(Boolean).length;byId('count').textContent=count+' / 15 項完成';byId('progress').value=count;}
renderDay();
const advice=['先確認可使用的測試資源，再依對應路線開始。','從 D2 建立測試 VM 和快照，再完成網路及 SQL 盤點。','從 D3、D4 驗證網路及 SQL，再依公司流程安裝 AVEVA。','先核對已安裝版本、測試授權及 Galaxy 連線，再進入第二週。','進入第二至三週，從 AHU 範本、實例與 Attribute 開始。','先從 D1 看首頁資料流，再操作 AHU 模擬並記下問題。'];
byId('start').selectedIndex=saved.start;byId('advice').textContent=advice[saved.start];
byId('start').onchange=event=>{saved.start=event.target.selectedIndex;byId('advice').textContent=advice[saved.start];save();};
const tags=[['FanRun','Boolean','風機運轉'],['SupplyTemp','Float','送風溫度'],['ReturnTemp','Float','回風溫度'],['FilterAlarm','Boolean','濾網異常'],['CommHealthy','Boolean','通訊健康']];
byId('tags').innerHTML=tags.map(([name,type,purpose])=>'<tr><td>AHU001.'+name+'</td><td>'+type+'</td><td>'+purpose+'</td></tr>').join('');
function updateSim(){
 const temp=Number(byId('slider').value), healthy=byId('comm').checked;
 byId('temp').textContent=healthy?temp:'—';byId('return').textContent=healthy?temp+3:'—';
 const alarms=healthy?[temp>=30?'高溫警報':'',byId('filter').checked?'濾網異常':''].filter(Boolean):['通訊異常 · 資料品質不良'];
 byId('alarm').textContent=alarms.join('／')||'正常';byId('alarm').classList.toggle('warn',alarms.length>0);
 byId('on').disabled=!healthy;byId('off').disabled=!healthy;
 byId('fan').textContent=healthy?(running?'運轉':'停止'):'未知';
}
let running=true;
byId('on').onclick=()=>{running=true;updateSim();};byId('off').onclick=()=>{running=false;updateSim();};
byId('slider').oninput=updateSim;byId('comm').onchange=updateSim;byId('filter').onchange=updateSim;
byId('notes').textContent=['FMCS 新人訓練','00_新人學習進度與術語','01_WindowsServer與VM','02_SQLServer','03_AVEVA安裝與授權','04_SystemPlatform_Galaxy','05_Template_Attribute_Script','06_PLC_OPCUA_Kepware','07_InTouch_SCADA圖控','08_Historian_MXAccess_GRAccess','09_AppEngine_部署與監控','10_故障排除SOP','11_實務專案與驗收'].join('\n');
byId('copy').onclick=async()=>{try{await navigator.clipboard.writeText(byId('notes').textContent);byId('copyStatus').textContent=' 已複製';}catch{byId('copyStatus').textContent=' 請選取下方文字複製';}};
