const toolLessons = [
 ['01','IDE · 連線至訓練 Galaxy','在 IDE 辨認目前連線的 Galaxy，以及範本、設備和部署視圖。',
  ['啟動 System Platform IDE。在 Galaxy 連線畫面選擇核准的 Galaxy Repository 節點與訓練 Galaxy。範例名稱為 FMCS_AHU_Training。','連線後先核對 Galaxy 名稱。切換 Template Toolbox、Model View 與 Deployment View，分別找範本、設備區域與執行宿主。','在 Deployment View 找到測試 WinPlatform 與 AppEngine。將其名稱和對應的 VM 寫進環境盤點表。'],
  '能指出目前 Galaxy、測試 VM 與目標 AppEngine。','清單沒有 Galaxy 時，先核對 GR 節點、名稱解析、Galaxy 是否已建立以及帳號權限。',
  'https://docs.aveva.com/bundle/system-platform/page/1253915.html'],
 ['02','IDE · 建立 AHU 範本和實例','先建立可在本機測試的數值，再加入 OPC UA 來源。',
  ['在 Template Toolbox 選擇訓練環境允許使用的基底，例如可用的 UserDefined 範本，建立衍生範本 $AHU_Training。','開啟範本編輯器，在 Attributes 加入 SupplyTemp（Float）、ReturnTemp（Float）、FanRun（Boolean）。先給訓練初值 24、27、True。儲存並 Check In。','從 $AHU_Training 建立 AHU001。開啟物件屬性，確認 Attributes 清單、資料型別與範本來源。'],
  'AHU001 繼承三個欄位，能辨識 AHU001.SupplyTemp。','看不到欄位時，核對範本是否已 Check In，以及 AHU001 的衍生來源。',
  'https://docs.aveva.com/bundle/sp-omi/page/248519.html'],
 ['03','IDE 與 Object Viewer · 部署並讀值','先確認測試物件能執行，再調查畫面或通訊。',
  ['在 Deployment View 核對測試 WinPlatform、AppEngine 及設備所屬 Area 的宿主關係。先確認所需上層宿主已部署。','從 IDE 對測試物件執行 Deploy，檢查結果訊息。啟動 Object Viewer，在訓練執行環境選擇 AHU001。','把 SupplyTemp 和 FanRun 放入監看清單，記錄數值與品質。先使用訓練初值核對 24 °C 與風機運轉。'],
  '能分辨 IDE 中的組態與 Object Viewer 中的執行值。','物件缺席時查部署與宿主。物件存在但值無效時，查執行狀態和 I/O 參照。',
  'https://docs.aveva.com/bundle/sp-omi/page/248519.html'],
 ['04','OI Gateway · 接入 OPC UA 模擬點位','先完成一個唯讀溫度點，再擴充其他欄位。',
  ['從測試 OPC UA Server 記錄 Endpoint、NodeId、資料型別和安全設定。用核准的測試 Client 確認能讀到變動的值。','在 OI Server Manager 找到已安裝的 Gateway Communication Driver，依其版本說明設定 OPC UA 連線及必要憑證信任，驗證測試點位。','在 IDE 依訓練環境的 I/O 配置，把測試點位映射到 AHU001.SupplyTemp。更新部署後，在 Object Viewer 比對來源值與品質。'],
  '把來源從 24 改為 26，Object Viewer 跟著更新。中斷測試來源後，記錄品質變化。','先在來源端驗證 Endpoint 與信任，再比對 NodeId、型別及 I/O 參照。',
  'https://docs.aveva.com/bundle/intouch-hmi-2023/page/316388.html'],
 ['05','Industrial Graphics · 綁定即時畫面','用一個溫度數字與一個風機指示做出第一張圖控。',
  ['在訓練 Galaxy 的圖形資產區建立獨立圖形 AHU_Overview，開啟 Industrial Graphic 編輯器。','放入送風溫度文字及風機指示。以數值顯示動畫綁定 AHU001.SupplyTemp，風機指示使用 AHU001.FanRun 作為狀態來源。','將圖形放入訓練專案現有的 OMI ViewApp 或適用的 InTouch 宿主。用執行畫面比對 Object Viewer，再測試高溫與品質不良的顯示。'],
  '兩個工具看見的有效溫度一致，停機與通訊異常有各自的狀態。','數值沒顯示時，先確認 Object Viewer 有有效值，再查圖形的屬性參照與宿主部署。',
  'https://docs.aveva.com/bundle/sp-omi/page/248519.html'],
 ['06','Object Viewer 與歷史工具 · 查變化','用樣本證據對照即時資料、警報與歷史資料。',
  ['在獨立測試環境記錄 24 → 32 → 26 °C 的時間點，對照 Object Viewer 與畫面。','若已配置訓練 Historian，依環境設定該 Attribute 的歷史收集，更新部署，再以核准的歷史查詢工具查詢該時間區間。','將即時值、畫面警報與歷史樣本放在同一份紀錄。指出通訊品質不良期間的觀測空窗。'],
  '能說明何時觀察到高溫與恢復，並附上品質和時間。','即時有值而歷史缺值時，先核對歷史收集設定、時間範圍及 Historian 連線。',
  'https://docs.aveva.com/bundle/system-platform/page/1253915.html']
];
byId('toolLessons').innerHTML=toolLessons.map(([number,title,goal,steps,expected,repair,source],index)=>
 '<details id="aveva-'+number+'" '+(index===0?'open':'')+'><summary>'+number+'｜'+title+'</summary><p>'+goal+'</p><ol class="tool-steps">'+
 steps.map(step=>'<li>'+step+'</li>').join('')+'</ol><div class="tool-result"><p><strong>預期結果</strong>　'+expected+'</p><p><strong>卡住時先查</strong>　'+repair+'</p></div><p><a href="'+source+'">AVEVA 官方參考 →</a></p></details>').join('');
const stages=[
 ['IDE · Galaxy','選擇 FMCS_AHU_Training','已連線。接著建立共同欄位。'],
 ['Template Toolbox','建立 $AHU_Training','範本已加入 SupplyTemp（Float）。'],
 ['Model View','從範本建立 AHU001','實例已繼承 SupplyTemp。'],
 ['Deployment View','部署至測試 AppEngine','訓練實例已部署，可以查看執行值。'],
 ['Object Viewer','監看 AHU001.SupplyTemp','AHU001.SupplyTemp = 24 °C · 品質良好']
];
let demoStage=0;
function renderToolDemo(){
 byId('demoStages').innerHTML=stages.map(([name],index)=>'<li '+(index===demoStage?'aria-current="step"':'')+'>'+name+'</li>').join('');
 byId('demoAction').textContent=stages[demoStage][1];
}
byId('demoAction').onclick=()=>{
 byId('demoResult').textContent=stages[demoStage][2];
 if(demoStage<stages.length-1){demoStage++;renderToolDemo();}
 else byId('demoAction').disabled=true;
};
byId('demoReset').onclick=()=>{demoStage=0;byId('demoAction').disabled=false;byId('demoResult').textContent='從 IDE 連線開始。';renderToolDemo();byId('demoAction').focus();};
renderToolDemo();
