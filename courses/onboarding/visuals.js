const diagrams = [
 ['測試環境配置','工作站|開啟 IDE 與遠端桌面','測試 VM|安裝 AVEVA 與執行元件','SQL Server|保存測試組態與資料'],
 ['Galaxy 設計到執行','IDE|編輯設備物件','Galaxy Repository|保存組態','AppEngine|執行已部署物件'],
 ['一個範本對應多台設備','AHU 範本|定義共同欄位','AHU001／AHU002|各自的設備實例','SupplyTemp|每台設備各自的溫度'],
 ['一筆溫度如何進入畫面','模擬設備|送風溫度 24 °C','OPC UA Server|提供值、品質與時間','AVEVA Attribute|供圖控讀取與呈現'],
 ['從資料到操作判斷','設備狀態|送風溫度達 30 °C','SCADA 畫面|顯示高溫警報','操作人員|確認設備與通訊狀態'],
 ['即時值與歷史趨勢','即時取樣|09:00 讀到 24 °C','測試歷史庫|保存時間、數值與品質','查詢趨勢|比對升溫與恢復時間'],
 ['測試變更與回復','備份|記錄版本與回復點','測試部署|檢查 Engine、點位與畫面','回復演練|以同一張表重新驗證'],
 ['整合專案的驗收證據','來源端|模擬值與點位對照','監控端|圖控、警報與歷史樣本','交付|測試結果及回復紀錄']
];
const icons = [
 '<rect x="3" y="4" width="26" height="18" rx="3"/><path d="M10 28h12m-6-6v6"/>',
 '<path d="M4 8h24v6H4zm0 10h24v6H4zM8 11h2m-2 10h2"/>',
 '<path d="M4 17h5l4-8 6 15 4-7h5"/>'
];
function buildDiagram([title,...nodes]){
 return '<figure class="lesson-figure"><figcaption>'+title+'</figcaption><ol class="flow">'+nodes.map((node,index)=>{
  const [label,detail]=node.split('|');
  return '<li><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">'+icons[index]+'</svg><strong>'+label+'</strong><span>'+detail+'</span></li>';
 }).join('')+'</ol></figure>';
}
const panels=document.querySelectorAll('#lessons details');
panels.forEach((panel,index)=>panel.querySelector('summary').insertAdjacentHTML('afterend',buildDiagram(diagrams[index])));
function renderAirflow(){
 const healthy=byId('comm').checked;
 byId('ahuVisual').dataset.state=healthy?(running?'running':'stopped'):'unknown';
 byId('airflowStatus').textContent=healthy?(running?'模擬風向 · 回風 → 風機 → 送風':'風機停止 · 風向動畫暫停'):'通訊異常 · 目前風向未知';
}
for(const [id,event] of [['on','click'],['off','click'],['comm','change']]){
 byId(id).addEventListener(event,renderAirflow);
}
renderAirflow();
