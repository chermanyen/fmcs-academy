const weeks = [
  [
    "PLC 是什麼？",
    "PLC 是專為工業控制設計的可程式邏輯控制器。認識 CPU、電源模組、I/O 模組與掃描週期。",
    "畫出按鈕 → PLC → 指示燈的資料流，並解釋每個角色。",
    "PLC 不是單純的 PC；它具備工業 I/O、控制任務與現場可靠性設計。",
  ],
  [
    "電氣與訊號基礎",
    "認識 DC/AC、24V DC、接點、繼電器、感測器、PNP/NPN、DI/DO。",
    "將按鈕、近接感測器、指示燈、電磁閥分類成輸入或輸出。",
    "DI 是數位輸入；DO 是數位輸出。實體接線需確認電壓、極性與電氣安全。",
  ],
  [
    "Ladder 梯形圖",
    "常開 NO、常閉 NC、線圈、串聯 AND、並聯 OR，以及 PLC 掃描。",
    "寫出兩個按鈕都 ON 才亮燈的邏輯。",
    "梯形圖中的常開/常閉指邏輯指令，須區分現場實體接點。",
  ],
  [
    "自保持與互鎖",
    "Start、Stop、自保持 Seal-in、互鎖 Interlock、Reset。",
    "完成按一下 Start 持續運轉、按 Stop 停止的模擬。",
    "控制停止與安全停止是不同層級，不可將一般軟體停止當成急停。",
  ],
  [
    "Timer 與 Counter",
    "TON 延時接通、TOF 延時斷開、CTU 計數、Reset。",
    "按 Start 後等待 5 秒點亮燈，累計 10 件產品。",
    "計時器須理解時間基準、預置值與完成位元。",
  ],
  [
    "AI / AO 類比訊號",
    "0–10V、4–20mA、工程單位 Scaling、量測誤差。",
    "將 4–20mA 對應成 0–100% 液位，計算 12mA 對應 50%。",
    "AI/AO 與 DI/DO 不同，類比訊號可表示連續數值。",
  ],
  [
    "水箱與幫浦控制",
    "Auto/Manual、上下限、遲滯 Hysteresis、Alarm、設備保護。",
    "模擬低於 30% 補水，達 80% 停止，並加入超高液位警報。",
    "實際控制需加入乾轉保護、回饋確認與硬體安全條件。",
  ],
  [
    "設備狀態機",
    "Idle、Ready、Running、Fault、Reset、Timeout、Alarm。",
    "設計幫浦控制的狀態轉換表及故障復歸條件。",
    "狀態機讓流程清楚、易於測試與故障追蹤。",
  ],
  [
    "Modbus TCP",
    "Client/Server、TCP Port 502、Coil、Holding Register、Function Code。",
    "使用模擬 Modbus Server，讀取 Coil 與 Holding Register。",
    "注意 0-based 位址、文件 4xxxx 表示法與 Unit ID 差異。",
  ],
  [
    "C# 讀取 PLC",
    "NModbus、輪詢 Polling、Timeout、重試、斷線重連。",
    "建立 .NET Console，讀取模擬 PLC 並記錄資料。",
    "連線失敗不能默認設備正常，需保留通訊品質狀態。",
  ],
  [
    "SCADA / FMCS",
    "Tag、HMI、Alarm、Trend、Historian、OPC UA、SQL Server。",
    "設計幫浦與水箱監控頁，包含警報及歷史趨勢。",
    "SCADA 負責監控及資料採集，底層控制由 PLC 等控制器執行。",
  ],
  [
    "整合專題與驗收",
    "I/O List、Tag List、FAT、SAT、備份、維運 SOP。",
    "完成虛擬水箱控制＋PLC 模擬＋C# 監控＋歷史紀錄。",
    "驗收需覆蓋正常流程、通訊中斷、故障、復歸及權限。",
  ],
];
let storageAvailable = true;
let saved = [];
try {
  const data = JSON.parse(localStorage.getItem("plcWeeks") || "[]");
  if (Array.isArray(data))
    saved = [
      ...new Set(data.filter((i) => Number.isInteger(i) && i >= 0 && i < 12)),
    ];
} catch {
  storageAvailable = false;
}
function saveProgress() {
  try {
    localStorage.setItem("plcWeeks", JSON.stringify(saved));
  } catch {
    storageAvailable = false;
  }
  if (!storageAvailable)
    document.querySelector("#storageNote").textContent =
      "瀏覽器目前無法儲存進度；本次仍可學習，關閉後可能無法保留。";
}
if (!storageAvailable)
  document.querySelector("#storageNote").textContent =
    "無法讀取已存進度；本次可繼續學習。";
function renderWeeks() {
  document.querySelector("#lessons").innerHTML = weeks
    .map(
      (w, i) =>
        "<details><summary>第 " +
        (i + 1) +
        " 週｜" +
        w[0] +
        " " +
        (saved.includes(i) ? "✓" : "") +
        "</summary><p><b>觀念：</b>" +
        w[1] +
        "</p><p><b>實作：</b>" +
        w[2] +
        "</p><p><b>重點：</b>" +
        w[3] +
        '</p><label><input type="checkbox" data-week="' +
        i +
        '" ' +
        (saved.includes(i) ? "checked" : "") +
        "> 我已完成本週練習</label></details>",
    )
    .join("");
  document.querySelector("#progress").value = saved.length;
  document.querySelector("#progressLabel").textContent =
    saved.length + " / 12 週完成";
  document.querySelectorAll("[data-week]").forEach(
    (el) =>
      (el.onchange = () => {
        let i = Number(el.dataset.week);
        let p = saved.indexOf(i);
        if (el.checked && p < 0) saved.push(i);
        if (!el.checked && p >= 0) saved.splice(p, 1);
        saveProgress();
        el.closest("details").querySelector("summary").textContent =
          "第 " + (i + 1) + " 週｜" + weeks[i][0] + (el.checked ? " ✓" : "");
        document.querySelector("#progress").value = saved.length;
        document.querySelector("#progressLabel").textContent =
          saved.length + " / 12 週完成";
      }),
  );
}
renderWeeks();
const quiz = [
  [
    "PLC 的主要功能是？",
    ["控制工業設備", "只儲存影片", "只編輯文件"],
    0,
    "PLC 接收輸入並依控制邏輯更新輸出。",
  ],
  [
    "DI 的意思是？",
    ["數位輸出", "數位輸入", "類比輸出"],
    1,
    "DI = Digital Input，接收 ON/OFF 訊號。",
  ],
  [
    "兩個常開接點串聯對應？",
    ["AND", "OR", "NOT"],
    0,
    "串聯通常代表兩條件同時成立。",
  ],
  [
    "Modbus TCP 常見預設連接埠？",
    ["80", "502", "1433"],
    1,
    "Modbus TCP 常見預設 TCP 連接埠為 502。",
  ],
  [
    "SCADA 主要用途？",
    ["監控與資料採集", "機械加工", "取代所有安全 PLC"],
    0,
    "SCADA 用於監控、資料採集、警報與歷史趨勢。",
  ],
  [
    "通訊中斷時應該？",
    ["顯示品質異常", "維持正常標示", "自動假設數值為零且有效"],
    0,
    "失聯應標記資料品質不可靠並依系統設計處理。",
  ],
];
let answers = {};
document.querySelector("#questions").innerHTML = quiz
  .map(
    (q, i) =>
      '<div class="quiz-item"><b>' +
      (i + 1) +
      ". " +
      q[0] +
      "</b><div>" +
      q[1]
        .map(
          (a, j) =>
            '<button data-q="' + i + '" data-a="' + j + '">' + a + "</button>",
        )
        .join("") +
      '</div><p id="feedback' +
      i +
      '" class="muted"></p></div>',
  )
  .join("");
document.querySelectorAll("[data-q]").forEach(
  (b) =>
    (b.onclick = () => {
      let i = +b.dataset.q,
        j = +b.dataset.a;
      answers[i] = j;
      document.querySelectorAll('[data-q="' + i + '"]').forEach((x) => {
        x.classList.remove("correct", "wrong");
        if (+x.dataset.a === j)
          x.classList.add(j === quiz[i][2] ? "correct" : "wrong");
      });
      document.querySelector("#feedback" + i).textContent =
        (j === quiz[i][2] ? "答對。" : "再複習：") + quiz[i][3];
      document.querySelector("#score").textContent =
        "目前答對 " +
        Object.keys(answers).filter((k) => answers[k] === quiz[k][2]).length +
        " / " +
        Object.keys(answers).length +
        " 題";
    }),
);
const terms = [
  ["PLC", "可程式邏輯控制器：讀取輸入、執行控制邏輯、更新輸出。"],
  ["CPU", "PLC 的運算核心。"],
  ["DI", "Digital Input：數位輸入。"],
  ["DO", "Digital Output：數位輸出。"],
  ["AI", "Analog Input：類比輸入。"],
  ["AO", "Analog Output：類比輸出。"],
  ["Ladder", "梯形圖，PLC 常用程式語言。"],
  ["NO / NC", "Normally Open / Normally Closed，常開／常閉。"],
  ["Scan Cycle", "PLC 週期性執行控制任務的掃描循環。"],
  ["Interlock", "互鎖或連鎖條件，用於限制不允許的動作。"],
  ["TON", "On-delay Timer，延時接通計時器。"],
  ["Counter", "計數器。"],
  ["Modbus TCP", "以 TCP/IP 傳輸 Modbus 資料的工業通訊方式。"],
  ["Coil", "Modbus 可讀寫的單一位元資料類型。"],
  ["Holding Register", "Modbus 16 位元可讀寫暫存器。"],
  ["OPC UA", "工業系統間安全且可互通的資料交換架構。"],
  ["SCADA", "監控與資料採集系統。"],
  ["FMCS", "廠務監控與控制系統。"],
  ["HMI", "人機介面。"],
  ["Tag", "監控系統中的資料點名稱或變數。"],
  ["Alarm", "警報事件。"],
  ["Historian", "保存製程歷史資料的系統。"],
  ["FAT / SAT", "工廠驗收測試／現場驗收測試。"],
  ["Auto / Manual", "自動／手動操作模式。"],
  ["Hysteresis", "遲滯：使用不同啟停門檻，減少設備反覆切換。"],
];
function dict(q = "") {
  document.querySelector("#dictionary").innerHTML =
    terms
      .filter((t) => t.join(" ").toLowerCase().includes(q.toLowerCase()))
      .map(
        (t) =>
          '<div class="card"><h3>' + t[0] + "</h3><p>" + t[1] + "</p></div>",
      )
      .join("") || "<p>找不到符合的術語</p>";
}
dict();
document.querySelector("#search").oninput = (e) => dict(e.target.value);
