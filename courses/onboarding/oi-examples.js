const oiDrivers = [
  ['ABCIP', 'Allen-Bradley 冰水泵運轉與故障'],
  ['ABTCP', '相容的 Allen-Bradley 舊設備與集水井水位'],
  ['TWINCAT', 'Beckhoff 空調箱風機轉速與濾網壓差'],
  ['GESRTP', 'GE 冷卻水塔風機狀態與出水溫度'],
  ['SIM', '模擬冰水泵運轉、故障與壓力'],
  ['MELSEC', 'Mitsubishi 空壓機運轉與故障'],
  ['MBTCP', 'Modbus TCP 電表電壓、即時功率及累積用電'],
  ['OMRONFINS', 'Omron 補水箱水位與高低液位'],
  ['SOMAC', '相容的 Schneider 控制器與泵浦狀態'],
  ['SIDIRECT', 'Siemens 冰水主機供回水溫度及溫差'],
  ['BACLITE', '相容的樓宇空調設備監看'],
  ['CODESYS', '相容控制器的排風機轉速與狀態'],
  ['Gateway', '彙整相容的上游資料來源'],
  ['MQTT', '機房溫濕度與資料更新狀態'],
  ['SNMP', '交換器埠狀態或 UPS 電池容量'],
  ['WEBSVC', '相容 Web 服務的狀態與最後更新時間'],
  ['TI500', '相容的 TI 泵浦盤運轉與故障']
];

document.getElementById('lesson-4').insertAdjacentHTML('beforeend', `
  <section class="it-terms" id="ocmc-drivers">
    <h3>OCMC 通訊驅動與 FMCS 圖控對照</h3>
    <p>OCMC 像 IT 系統的資料來源管理。驅動讀取設備資料，Galaxy Attribute 接收點位，InTouch 或 OMI 再把點位畫成設備圖示、數值、趨勢與警報。</p>
    <details><summary>查看 OCMC 驅動清單截圖</summary>
      <img src="ocmc-drivers.png" width="580" height="899" loading="lazy" style="max-width:100%;height:auto" alt="OCMC 驅動清單，展開 MBTCP 實例與 PLC 設備節點">
    </details>
    <table><thead><tr><th scope="col">驅動</th><th scope="col">FMCS 畫面範例</th></tr></thead>
      <tbody>${oiDrivers.map(([name, example]) => `<tr><th scope="row">${name}</th><td>${example}</td></tr>`).join('')}</tbody>
    </table>
    <p>先依設備型號與已啟用的協定選驅動。截圖中的 <code>OI.MBTCP.1 → Configuration → PORT → PLC</code> 是設定樹，可到 Diagnostics 核對點位讀值與品質。</p>
    <p><a href="#pump-graphics">到第 5 週做冰水泵圖控練習</a></p>
    <p><a href="https://docs.aveva.com/bundle/sp-cdp-drivers-2023">AVEVA Communication Drivers Pack 官方文件</a></p>
  </section>
`);

document.getElementById('lesson-5').insertAdjacentHTML('beforeend', `
  <section class="it-terms" id="pump-graphics">
    <h3>冰水泵圖控練習</h3>
    <p>先用 SIM 模擬資料，再用 MBTCP 測試來源。畫面綁定同一組 Galaxy Attribute，切換來源時保留原本的畫面設計。</p>
    <table><thead><tr><th scope="col">測試條件</th><th scope="col">預期畫面</th></tr></thead><tbody>
      <tr><td><code>CHWP01.Run</code> 切換</td><td>運轉綠色，停止灰色。</td></tr>
      <tr><td><code>CHWP01.Fault</code> 為真</td><td>顯示紅色「泵浦故障」與發生時間。</td></tr>
      <tr><td><code>CHWP01.DischargePressure</code> 變化</td><td>以 kPa 顯示即時出口壓力，並核對趨勢。</td></tr>
      <tr><td>資料品質不良或斷線</td><td>顯示「通訊中斷」，壓力用「—」標示，避免誤判為零。</td></tr>
    </tbody></table>
  </section>
`);

function openOiLesson() {
  const id = window.location.hash.slice(1);
  if (id === 'ocmc-drivers' || id === 'pump-graphics') {
    const section = document.getElementById(id);
    section.closest('details').open = true;
    section.scrollIntoView();
  }
}
window.addEventListener('hashchange', openOiLesson);
openOiLesson();
