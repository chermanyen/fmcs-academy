(function (app) {
  "use strict";
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
  const moduleCopy = {
    power: [
      "電源｜提供工作能量",
      "常見控制電源為 24V DC。電源供應器把電能提供給 PLC 與相容的現場元件；不是資料訊號。",
    ],
    di: [
      "DI｜把現場 ON / OFF 讀進來",
      "按鈕按下、近接感測器偵測到工件，會形成數位輸入狀態。X0 是本網站使用的示例位址，各品牌命名不同。",
    ],
    cpu: [
      "CPU｜依程式判斷",
      "讀取輸入映像 → 執行控制邏輯 → 更新輸出。CPU 決定條件成立時要做什麼，不是直接提供馬達動力。",
    ],
    do: [
      "DO｜把控制結果送出去",
      "Y0 是示例數位輸出位址。輸出可驅動相容的指示燈，或經適當介面控制繼電器／接觸器，再帶動負載。",
    ],
  };
  app.courseData = { weeks, quiz, terms, moduleCopy };
})((window.PLCAcademy = window.PLCAcademy || {}));
