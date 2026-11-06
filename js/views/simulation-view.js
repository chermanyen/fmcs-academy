(function (app) {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const svg = (label, body, view = "0 0 480 180") =>
    `<svg viewBox="${view}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  const flow = (labels) =>
    `<div class="flow-diagram">${labels.map((s, i) => `${i ? '<b aria-hidden="true">→</b>' : ""}<span>${s}</span>`).join("")}</div>`;
  app.createSimulationView = function () {
    return {
      mount() {
        const hardware = document.createElement("section");
        hardware.id = "hardware";
        hardware.innerHTML = `<p class="eyebrow">MEET THE HARDWARE</p><h2>FMCS 的現場基礎：感測器與 PLC</h2><p class="muted">從左向右看：感測器提供訊號，PLC 判斷條件，再讓輸出設備動作。點選模組查看說明。</p>
<div class="hardware-board"><div class="field-device">${svg("感測器偵測工件", '<rect x="30" y="50" width="60" height="70" rx="8" class="diagram-box"/><circle cx="60" cy="75" r="10" class="signal-dot"/><path d="M90 85h40m-10-12 12 12-12 12" class="wire"/><rect x="145" y="50" width="45" height="70" rx="4" class="part"/>', "0 0 220 160")}<strong>感測器／按鈕</strong><small>現場輸入訊號</small></div><b class="board-arrow">→</b><div class="hardware-modules">
<button data-module="power" aria-pressed="false"><span class="led"></span><b>24V</b><small>電源</small></button><button data-module="di" aria-pressed="true"><span class="led"></span><b>DI</b><small>數位輸入</small></button><button data-module="cpu" aria-pressed="false"><span class="led"></span><b>CPU</b><small>邏輯運算</small></button><button data-module="do" aria-pressed="false"><span class="led"></span><b>DO</b><small>數位輸出</small></button></div><b class="board-arrow">→</b><div class="field-device">${svg("輸出控制指示燈與馬達", '<circle cx="75" cy="70" r="32" class="signal-dot"/><path d="M55 100h40v20H55z" class="wire"/><circle cx="160" cy="83" r="30" class="diagram-box"/><text x="160" y="90" text-anchor="middle">M</text>', "0 0 220 160")}<strong>指示燈／繼電器</strong><small>現場輸出設備</small></div></div>
<div class="module-detail" id="moduleDetail" aria-live="polite"></div><p class="muted">這是功能示意，非接線圖。DO 通常透過適當的繼電器／接觸器驅動大功率設備；電源與接線以設備手冊為準。</p>`;
        $("#roadmap").before(hardware);
        const lessonVisuals = [
          [
            "FMCS 的五層資料路徑",
            flow(["現場設備", "PLC", "採集服務", "FMCS／資料庫"]),
            "先分清控制、採集與監控各層的責任。",
            "#fmcs",
          ],
          [
            "從系統找出監控對象",
            flow(["電力／空調", "給排水／氣體", "設備與量測點"]),
            "以補水水箱為例，先辨認設備、量測與運轉回饋。",
            "#tankLab",
          ],
          [
            "從 I/O 走到 Tag",
            flow(["感測器", "DI／AI 輸入", "DO／AO 輸出"]),
            "量測、命令與回饋要分開，並標註型別與工程單位。",
            "#hardware",
          ],
          [
            "控制在 PLC，監控在 FMCS",
            flow(["讀取輸入", "執行邏輯", "更新輸出"]),
            "操作掃描模型，再用水箱觀察上下限與保持狀態。",
            "#scan",
          ],
          [
            "先對照點表，再讀取資料",
            flow(["Client 請求", "設備位址／型別", "Server 回應"]),
            "TCP 與 RTU 的連線設定不同，資料映射仍需逐點核對。",
            "#fmcs",
          ],
          [
            "資料交換包含品質與時間",
            flow(["Endpoint／NodeId", "讀取或訂閱", "Value＋Quality＋Time"]),
            "這是流程圖；網站沒有實際 OPC UA 連線。",
            "#fmcs",
          ],
          [
            "失聯時保留最後值，標示過期",
            flow(["Tag 定義", "值與單位", "時間與品質"]),
            "試按「模擬通訊中斷」，再調整水箱，比較監控最後值與現場值。",
            "#fmcs",
          ],
          [
            "採集服務的處理順序",
            flow(["讀取", "檢查／逾時", "紀錄／有限重試"]),
            "C# 採集服務屬課外實作，本網站僅模擬資料品質。",
            "#fmcs",
          ],
          [
            "讓操作員看懂設備",
            flow(["數值與單位", "運轉與模式", "警報與品質"]),
            "用水箱監控示例練習分辨控制狀態與通訊狀態。",
            "#fmcs",
          ],
          [
            "警報確認不等於恢復",
            flow(["發生", "確認／處理", "條件恢復"]),
            "水箱可顯示超高警報；確認流程與歷史趨勢請以文件練習。",
            "#tankLab",
          ],
          [
            "資料落地前先定義欄位",
            flow(["TagId／Value", "Quality／時間", "資料庫／報表"]),
            "先規劃時間基準與保存策略；網站不連接資料庫。",
            "#resources",
          ],
          [
            "把整合成果交付給維護者",
            flow(["架構與點表", "正常／異常測試", "備份與 SOP"]),
            "驗收涵蓋失聯、恢復、警報、權限與復原情境。",
            "#sim",
          ],
        ];
        document.querySelectorAll("#lessons details").forEach((detail, i) => {
          const [title, diagram, caption, link] = lessonVisuals[i];
          const figure = document.createElement("figure");
          figure.className = "lesson-visual";
          figure.innerHTML = `<div class="visual-title"><span>${String(i + 1).padStart(2, "0")}</span><strong>${title}</strong></div>${diagram}<figcaption>${caption}</figcaption><a href="${link}">前往相關圖解／實驗 →</a>`;
          detail.querySelector("summary").after(figure);
        });

        // A. A deliberate toggle makes the static input state visible to beginners.
        $("#lampLab pre").outerHTML =
          `<div id="ladder" class="ladder">${svg("X0 常開邏輯接點控制 Y0 線圈", '<path d="M20 30v100m440-100v100" class="wire"/><path d="M20 80h120m30 0h130m65 0h95" class="wire rung"/><path d="M140 55v50m30-50v50" class="wire contact"/><path d="M330 55q-30 25 0 50m10-50q30 25 0 50" class="wire coil"/><path d="M140 80h30" class="contact-bridge"/><text x="155" y="35" text-anchor="middle">X0</text><text x="337" y="35" text-anchor="middle">Y0</text><text x="240" y="155" text-anchor="middle" class="svg-small">亮色路徑 = 條件成立</text>')}</div><div class="lamp-display"><span id="lampIcon" class="lamp-icon" aria-hidden="true">☀</span><p id="lampExplain">X0 = 0，常開邏輯接點不成立，Y0 = 0。</p></div>`;
        $("#motorLab pre").insertAdjacentHTML(
          "beforebegin",
          `<div class="conveyor" id="conveyor" aria-hidden="true"><span class="package">工件</span><span class="detector">◈</span><div class="belt"></div></div><p id="motorExplain">待機：按 Start 啟動。</p>`,
        );
        $("#tankLab .tank").insertAdjacentHTML(
          "beforeend",
          '<span class="tank-mark high">80%</span><span class="tank-mark low">30%</span>',
        );
        $("#tankLab .sim").insertAdjacentHTML(
          "afterend",
          `<div class="pump-pipe" id="pumpPipe" aria-hidden="true"><span class="pump-wheel">✣</span><span>補水 → 水箱</span></div><div class="controls"><button class="button" id="autoTank" aria-pressed="false">開始自動演示</button><button class="button secondary" id="resetTank">重設水箱</button></div><p id="tankReason" aria-live="polite">50%：起始幫浦為 OFF，尚未低於啟動門檻。</p><p id="tankAlarm" class="alarm" role="status">液位正常</p><p class="muted">演示每秒：補水 +8%、用水 −3%。手動拖曳可測試門檻；≥95% 為超高液位警報。警報僅作顯示，未實作完整設備保護。</p>`,
        );
        const scan = document.createElement("section");
        scan.id = "scan";
        scan.innerHTML = `<p class="eyebrow">ONE CYCLE AT A TIME</p><h2>PLC 掃描週期：訊號不是瞬間穿過</h2><p class="muted">這是刻意放慢的基本循環模型；實際 PLC 的任務、即時 I/O 與更新時機依品牌設定不同。</p><div class="scan-panel"><div class="controls"><button id="scanInput" class="button secondary" aria-pressed="false">現場 X0：OFF</button><button id="scanStep" class="button">下一步</button><button id="scanAuto" class="button secondary" aria-pressed="false">自動播放</button><button id="scanReset" class="button secondary">重設</button></div><ol class="scan-stages"><li>01 讀取輸入</li><li>02 執行邏輯</li><li>03 更新輸出</li></ol><div class="scan-values"><span>現場訊號 <b id="physical">0</b></span><span>輸入映像 <b id="imageInput">0</b></span><span>邏輯結果 <b id="logicResult">0</b></span><span>實體輸出 <b id="scanOutput">0</b></span></div><p id="scanExplain" aria-live="polite">先切換現場 X0，再按「下一步」觀察三個階段。</p></div>`;
        $("#sim").after(scan);
        const fmcs = document.createElement("section");
        fmcs.id = "fmcs";
        fmcs.innerHTML = `<p class="eyebrow">FROM CONTROL TO MONITORING</p><h2>FMCS 監控與資料品質示例</h2><p class="muted">此畫面連動上方水箱模擬，示意 Tag、警報與資料品質；沒有連接真實 PLC 或網路服務。</p>${flow(["液位感測器", "PLC", "Modbus / OPC UA", "C# / FMCS"])}<div class="monitor"><div><small>LT-001 · 液位</small><strong id="fmcsLevel">50%</strong></div><div><small>P-001 · 補水幫浦</small><strong id="fmcsPump">OFF</strong></div><div><small>QUALITY · 資料品質</small><strong id="fmcsQuality">Good（模擬）</strong></div></div><div class="controls"><button class="button secondary" id="disconnect" aria-pressed="false">模擬通訊中斷</button><a href="#tankLab">回到水箱調整液位 →</a></div><p id="fmcsNote" aria-live="polite">資料連線正常（瀏覽器內部模擬）。</p>`;
        $("#hardware").before(fmcs);
      },
      renderModule(key) {
        const copy = app.courseData.moduleCopy[key];
        $("#moduleDetail").innerHTML =
          `<strong>${copy[0]}</strong><p>${copy[1]}</p>`;
        document
          .querySelectorAll("[data-module]")
          .forEach((button) =>
            button.setAttribute("aria-pressed", button.dataset.module === key),
          );
      },
      render(state, playback) {
        const {
          lamp,
          run,
          sensor,
          level,
          pumping,
          disconnected,
          monitorLevel,
          monitorPumping,
          physical,
          inputImage,
          logic,
          output,
          activePhase,
        } = state;
        $("#x0").textContent = lamp ? "ON" : "OFF";
        $("#y0").textContent = lamp ? "燈亮" : "燈滅";
        $("#y0").classList.toggle("on", lamp);
        $("#lampBtn").textContent = lamp ? "切換 X0 為 OFF" : "切換 X0 為 ON";
        $("#lampBtn").setAttribute("aria-pressed", lamp);
        $("#ladder").classList.toggle("energized", lamp);
        $("#lampIcon").classList.toggle("lit", lamp);
        $("#lampExplain").textContent = lamp
          ? "X0 = 1，常開邏輯接點成立，Y0 = 1。"
          : "X0 = 0，常開邏輯接點不成立，Y0 = 0。";
        $("#sensor").checked = sensor;
        $("#motor").textContent = run ? "ON" : "OFF";
        $("#motor").classList.toggle("on", run);
        $("#conveyor").classList.toggle("moving", run);
        $("#conveyor").classList.toggle("arrived", sensor);
        $("#motorExplain").textContent = sensor
          ? "工件到位：已停止並解除保持。"
          : run
            ? "Run 保持中，放開 Start 仍持續運轉。"
            : "待機：需再按 Start 才會運轉。";
        $("#level").value = level;
        $("#levelLabel").textContent = level + "%";
        $("#water").style.height = level + "%";
        $("#pump").textContent = pumping ? "ON" : "OFF";
        $("#pump").classList.toggle("on", pumping);
        $("#pumpPipe").classList.toggle("flowing", pumping);
        $("#tankReason").textContent =
          level < 30
            ? `${level}%：低於 30%，啟動補水。`
            : level >= 80
              ? `${level}%：達到 80%，停止補水。`
              : `${level}%：門檻之間，保持先前的 ${pumping ? "ON" : "OFF"} 狀態。`;
        $("#tankAlarm").textContent =
          level >= 95
            ? "超高液位警報 ≥95%"
            : level < 10
              ? "低液位提醒 <10%"
              : "液位正常";
        $("#tankAlarm").classList.toggle("active", level >= 95 || level < 10);
        $("#autoTank").textContent = playback.tankPlaying
          ? "暫停自動演示"
          : "開始自動演示";
        $("#autoTank").setAttribute("aria-pressed", playback.tankPlaying);
        $("#physical").textContent = +physical;
        $("#imageInput").textContent = +inputImage;
        $("#logicResult").textContent = +logic;
        $("#scanOutput").textContent = +output;
        $("#scanInput").textContent = "現場 X0：" + (physical ? "ON" : "OFF");
        $("#scanInput").setAttribute("aria-pressed", physical);
        document
          .querySelectorAll(".scan-stages li")
          .forEach((el, i) =>
            el.classList.toggle("current", i === activePhase),
          );
        const scanCopy = [
          "讀取輸入：把此刻現場 X0 複製到輸入映像。",
          "執行邏輯：本例 Y0 = 輸入映像 X0；本階段切換現場不會改變已讀取的映像。",
          "更新輸出：將邏輯結果寫到 Y0。下一步開始新一輪讀取。",
        ];
        $("#scanExplain").textContent =
          scanCopy[activePhase] ||
          "先切換現場 X0，再按「下一步」觀察三個階段。";
        $("#scanAuto").textContent = playback.scanPlaying
          ? "暫停播放"
          : "自動播放";
        $("#scanAuto").setAttribute("aria-pressed", playback.scanPlaying);
        $("#fmcsLevel").textContent = monitorLevel + "%";
        $("#fmcsPump").textContent = monitorPumping ? "ON" : "OFF";
        $("#disconnect").textContent = disconnected
          ? "恢復模擬通訊"
          : "模擬通訊中斷";
        $("#disconnect").setAttribute("aria-pressed", disconnected);
        $("#fmcsQuality").textContent = disconnected
          ? "Bad / 過期"
          : "Good（模擬）";
        $(".monitor").classList.toggle("stale", disconnected);
        $("#fmcsNote").textContent = disconnected
          ? "通訊中斷：顯示最後一次數值，已標記過期。水箱控制仍由模擬 PLC 獨立執行。"
          : level >= 95
            ? "液位超高警報：LT-001 ≥95%。"
            : "資料連線正常（瀏覽器內部模擬）。";
      },
    };
  };
})((window.FMCSAcademy = window.FMCSAcademy || {}));
