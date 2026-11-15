const itLessons=[
 ['把 AVEVA 想成工業應用的開發與執行平台',[
 ['System Platform','像一整套開發與執行平台','把設備物件、通訊、警報、歷史與監控畫面串起來。'],
 ['Galaxy／Galaxy Repository','像專案及其中央組態庫','Galaxy 是整套專案；Repository 保存其物件與組態。底層使用 SQL Server。'],
 ['IDE','像 Visual Studio','建立與修改物件，也從這裡發起測試部署。'],
 ['AppEngine','像跑背景工作的 Windows Service','在執行端掃描已部署的物件，處理數值與規則。']],
 '在 IDE 儲存修改，與 AppEngine 正在執行新版，是兩個需要分開確認的狀態。'],
 ['把設備當成 C# 物件',[
 ['Template','像 class AHU','先定義所有空調箱共同的欄位與行為。'],
 ['Instance','像 new AHU() 建立的物件','AHU001 與 AHU002 共用結構，各自有讀值。'],
 ['Attribute','像物件的 Property','AHU001.SupplyTemp 是 AHU001 的送風溫度。'],
 ['Tag','像點位名稱或資料鍵','在傳統 InTouch 可指 Tagname Dictionary 的標籤；在點位表也常泛指一個監測點。']],
 '兩台設備都有 SupplyTemp。綁定圖控時，還要確認參照的是哪一台設備。'],
 ['把設備通訊當成一次資料整合',[
 ['PLC','像靠近機器的控制電腦','讀取感測器、執行控制邏輯，並操作設備輸出。'],
 ['OPC UA','像跨系統交換資料的通訊標準','Client 讀取或訂閱 Server 的點位。NodeId 用來辨識節點。'],
 ['Kepware','像整合多種設備驅動的資料閘道','可透過驅動讀取設備，再透過 OPC UA 等介面提供給上游。'],
 ['Quality','像資料可用性狀態','看數字時也要看品質和時間戳。顯示 24 °C 仍可能是舊值或品質不良。']],
 '先在 OPC UA Client 確認來源，再到 Object Viewer 核對 Attribute，逐層比對。'],
 ['把圖控想成廠務即時監控頁',[
 ['SCADA','像監控與操作平台','集中呈現設備狀態、警報和趨勢，依專案提供操作。'],
 ['InTouch','像工業 HMI 的開發與執行工具','用來製作與執行操作員看得到的監控畫面。'],
 ['圖控','像 Dashboard 元件綁定資料','畫面上的溫度、風機圖示與警報，會隨對應資料改變。']],
 'Object Viewer 已更新但圖控停住時，先核對畫面綁定的設備、欄位與執行版本。'],
 ['分清邏輯、即時資料與歷史資料',[
 ['Script','像事件處理或背景邏輯','在設定的觸發條件下執行計算或判斷，例如產生衍生狀態。'],
 ['SQL／SQL Server','像既有資料庫與查詢工作','Galaxy Repository 與獨立報表資料庫用途不同。組態透過 IDE 或支援介面管理。'],
 ['MXAccess','像向執行中的服務查即時狀態','供程式依平台介面取得執行中的物件資料，例如目前送風溫度。'],
 ['Historian','像設備資料的時間序列儲存','用來追溯某段時間的數值與變化。']],
 '想知道現在幾度，看執行值。想知道何時升到 32 °C，查有時間戳的歷史樣本。'],
 ['把變更交付當成一次測試版發布',[
 ['GRAccess','像管理專案組態的 SDK','操作的範圍在 Galaxy Repository 的組態，例如查有哪些物件。'],
 ['Deploy','像發布到指定的執行宿主','將組態交給測試環境的 Platform／AppEngine 執行。'],
 ['維運','像看服務狀態、日誌與資料健康','用 Logger 對照部署錯誤，再用 Object Viewer 核對執行值和品質。']],
 '問「專案定義了什麼」看組態。問「現在設備讀到什麼」看執行資料。'],
 ['把 FMCS 當成廠務設備的端到端監控專案',[
 ['FMCS','像面向廠務的監控與維運系統','整合空調、供電等廠務設備的狀態、警報和歷史資料。'],
 ['AHU','像這次專案要監控的一台資產','Air Handling Unit，空調箱。AHU001 是此案例的設備實例。'],
 ['整合驗收','像端到端測試','用同一點位驗證正常、高溫、斷線，並核對畫面與歷史證據。']],
 '從模擬來源送出 32 °C，追到 OPC UA、AHU001.SupplyTemp、圖控高溫警報與歷史紀錄。']
];
itLessons.forEach(([title,terms,example],index)=>{
 const lesson=byId('lesson-'+(index+2));
 const guide=document.createElement('section');
 guide.className='it-terms';
 guide.innerHTML='<div class="eyebrow">IT → FMCS</div><h3>'+title+'</h3><dl>'+
 terms.map(([term,analogy,meaning])=>'<dt>'+term+'</dt><dd><strong>'+analogy+'</strong><div>'+meaning+'</div></dd>').join('')+
 '</dl><p><strong>用 AHU001 想一次</strong>　'+example+'</p>';
 lesson.querySelector('summary').after(guide);
});
