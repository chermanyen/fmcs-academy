const advancedLabs = [
 ['07','範本預設值與執行值','先用下方雙設備示範調整 AHU001，再到測試環境做一次。',
  ['在 IDE 開啟訓練範本的 Attributes，查看 SupplyTemp 的組態初值。用同一範本建立 AHU001 和 AHU002，確認兩個實例都有該欄位。','將兩個實例部署到測試 AppEngine。在 Object Viewer 監看兩台設備的 SupplyTemp。若已接模擬來源，只改 AHU001 對應的來源值。','將 AHU001 的測試來源由 24 調為 32 °C，分別記錄範本初值、AHU001 執行值與 AHU002 執行值。'],
  '在範例配置下可分別記錄 24、32、24 °C。三欄代表不同層級。','如果兩台一起變，核對來源參照是否重複。若執行值未更新，查看部署、品質及時間戳。','https://docs.aveva.com/bundle/sp-omi/page/248519.html'],
 ['08','Galaxy Security · 帳號、角色與物件範圍','先在下方切換角色看預期權限，再由有權限的管理員在獨立訓練 Galaxy 驗證。',
  ['先記錄現有驗證模式、已授權的管理員與回復方式。用訓練帳號區分檢視、編輯和部署三種職責。','在 IDE 的 Security 設定中核對 Authentication Mode、Roles、Security Groups 和 Manage Permissions。先確認帳號如何驗證，再核對角色授權的動作以及物件所屬群組。','以不同訓練帳號重新登入，逐項測試檢視 AHU001、編輯組態及部署到訓練 Engine，並記錄允許與拒絕的結果。'],
  '檢視角色可檢視授權的物件，編輯與部署分別依設定驗證。','若結果與預期不符，先確認登入身分、角色歸屬、角色的動作權限與物件群組，再重新驗證。','https://docs.aveva.com/bundle/sp-appserver/page/510020.html'],
 ['09','故障排查 · 從來源到圖控','用一筆變動中的溫度判斷資料在哪一層停止。',
  ['在模擬來源把送風從 24 改為 26 °C。記錄來源節點、時間戳與品質。','在 Object Viewer 看 AHU001.SupplyTemp。若來源有更新而這裡停住，檢查 I/O 參照、部署版本與 AppEngine。','若 Object Viewer 已更新而圖控未更新，核對圖形綁定的實例、屬性和執行宿主。修正後重測正常與斷線兩種情境。'],
  '能指出第一個與上游結果不一致的環節，並留下前後比對紀錄。','以同一個點位、同一段時間比對，避免拿不同設備或不同時間的數值混查。','https://docs.aveva.com/bundle/system-platform/page/663644.html']
];
byId('toolLessons').insertAdjacentHTML('beforeend',advancedLabs.map(([number,title,goal,steps,expected,repair,source])=>
 '<details id="aveva-'+number+'"><summary>'+number+'｜'+title+'</summary><p>'+goal+'</p><ol class="tool-steps">'+
 steps.map(step=>'<li>'+step+'</li>').join('')+'</ol><div class="tool-result"><p><strong>預期結果</strong>　'+expected+'</p><p><strong>卡住時先查</strong>　'+repair+'</p></div><p><a href="'+source+'">AVEVA 官方參考 →</a></p></details>').join(''));
const roles=[
 ['允許','拒絕','拒絕'],
 ['允許','允許','拒絕'],
 ['允許','拒絕','允許']
];
function renderRole(){
 byId('roleOutput').querySelectorAll('td').forEach((cell,index)=>{
  const allowed=roles[Number(byId('trainingRole').value)][index]==='允許';
  cell.textContent=allowed?'允許':'拒絕';
  cell.className=allowed?'allowed':'denied';
 });
}
byId('trainingRole').onchange=renderRole;
renderRole();
function renderRuntime(){
 byId('runtimeAhu1').textContent=byId('runtimeSlider').value+' °C';
}
byId('runtimeSlider').oninput=renderRuntime;
renderRuntime();
