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
        hardware.innerHTML = `<p class="eyebrow">MEET THE HARDWARE</p><h2>PLC 是設備的控制大腦</h2><p class="muted">從左向右看：感測器提供訊號，PLC 判斷條件，再讓輸出設備動作。點選模組查看說明。</p>
<div class="hardware-board"><div class="field-device">${svg("感測器偵測工件", '<rect x="30" y="50" width="60" height="70" rx="8" class="diagram-box"/><circle cx="60" cy="75" r="10" class="signal-dot"/><path d="M90 85h40m-10-12 12 12-12 12" class="wire"/><rect x="145" y="50" width="45" height="70" rx="4" class="part"/>', "0 0 220 160")}<strong>感測器／按鈕</strong><small>現場輸入訊號</small></div><b class="board-arrow">→</b><div class="hardware-modules">
<button data-module="power" aria-pressed="false"><span class="led"></span><b>24V</b><small>電源</small></button><button data-module="di" aria-pressed="true"><span class="led"></span><b>DI</b><small>數位輸入</small></button><button data-module="cpu" aria-pressed="false"><span class="led"></span><b>CPU</b><small>邏輯運算</small></button><button data-module="do" aria-pressed="false"><span class="led"></span><b>DO</b><small>數位輸出</small></button></div><b class="board-arrow">→</b><div class="field-device">${svg("輸出控制指示燈與馬達", '<circle cx="75" cy="70" r="32" class="signal-dot"/><path d="M55 100h40v20H55z" class="wire"/><circle cx="160" cy="83" r="30" class="diagram-box"/><text x="160" y="90" text-anchor="middle">M</text>', "0 0 220 160")}<strong>指示燈／繼電器</strong><small>現場輸出設備</small></div></div>
<div class="module-detail" id="moduleDetail" aria-live="polite"></div><p class="muted">這是功能示意，非接線圖。DO 通常透過適當的繼電器／接觸器驅動大功率設備；電源與接線以設備手冊為準。</p>`;
        $("#roadmap").before(hardware);
        const lessonVisuals = [
          [
            "訊號走一趟",
            flow(["按鈕 → DI", "CPU 判斷", "DO → 指示燈"]),
            "按鈕是輸入；燈是輸出。PLC 把條件轉換成動作。",
            "#hardware",
          ],
          [
            "把元件分成輸入與輸出",
            `<div class="io-pair"><div><b>DI 數位輸入</b><p>◉ 按鈕<br>◈ 近接感測器<br>▥ 液位開關</p></div><div><b>DO 數位輸出</b><p>☀ 指示燈<br>⚙ 繼電器線圈<br>◧ 電磁閥</p></div></div>`,
            "DI 接收狀態，DO 發出命令；類比訊號則表示連續數值。",
            "#hardware",
          ],
          [
            "串聯 AND：兩個條件都要成立",
            svg(
              "A 與 B 串聯控制 Y：A AND B",
              '<path d="M20 30v100M460 30v100M20 80H100M100 57v46M125 57v46M125 80H220M220 57v46M245 57v46M245 80H350M395 80H460M370 58a22 22 0 0 0 0 44M375 58a22 22 0 0 1 0 44" class="wire"/><text x="112" y="35" text-anchor="middle">A</text><text x="232" y="35" text-anchor="middle">B</text><text x="372" y="35" text-anchor="middle">Y</text>',
            ),
            "A=1 且 B=1 時，Y 才等於 1。接點符號是邏輯指令。",
            "#lampLab",
          ],
          [
            "自保持：用輸出狀態記住 Start",
            flow(["Start 瞬間啟動", "Run 保持", "Stop／到位解除"]),
            "本實驗到位會清除運轉保持；感測器解除不會自動再啟動。",
            "#motorLab",
          ],
          [
            "TON 延時接通",
            `<div class="time-track"><span>IN = 1</span><div><i></i></div><span>5 秒 → Q = 1</span></div>`,
            "TON：輸入持續成立到預置時間才完成；未達時間就解除，計時歸零。下圖只示意時間累積。",
            "#scan",
          ],
          [
            "4–20mA 對應 0–100%",
            `<div class="scale-bar"><span>4mA<br>0%</span><span>12mA<br>50%</span><span>20mA<br>100%</span></div>`,
            "液位% = (電流 − 4) ÷ 16 × 100。低於量測範圍需判斷品質，不應直接當成正常零值。",
            "#tankLab",
          ],
          [
            "兩個門檻，避免頻繁啟停",
            flow(["低於 30% 啟動", "30–80% 保持", "達 80% 停止"]),
            "先調到 20%，再調到 50%；與先調到 90% 再回 50% 比較。相同液位可有不同幫浦狀態。",
            "#tankLab",
          ],
          [
            "用狀態描述設備流程",
            flow(["Idle 待機", "Running 運轉", "Fault 故障", "Reset 復歸"]),
            "Fault 的復歸必須先滿足故障解除條件。按 Reset 不代表故障原因已消失。",
            "#fmcs",
          ],
          [
            "Modbus TCP：請求與回應",
            flow(["Client 請求", "TCP / 502", "Server 回應"]),
            "Coil 是位元；Holding Register 是 16 位元。讀取前確認位址基準與資料型別。",
            "#fmcs",
          ],
          [
            "C# 讀取時，也要記錄資料品質",
            flow(["輪詢讀取", "檢查結果／逾時", "數值＋時間＋品質"]),
            "失聯時保留最後值並標示過期，或依設計顯示無效；不要把最後值當成即時值。",
            "#fmcs",
          ],
          [
            "從現場到監控",
            flow(["感測器", "PLC 控制", "SCADA / FMCS", "歷史資料庫"]),
            "監控畫面顯示設備狀態，PLC 負責底層控制；通訊品質和警報要能區分。",
            "#fmcs",
          ],
          [
            "以情境驗收整合成果",
            `<div class="acceptance"><span>✓ 正常啟停</span><span>✓ 上下限</span><span>✓ 失聯</span><span>✓ 故障與復歸</span></div>`,
            "保留 I/O List、Tag List、測試紀錄與備份，讓下一位維護者能重現結果。",
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
        fmcs.innerHTML = `<p class="eyebrow">FROM CONTROL TO MONITORING</p><h2>把控制狀態帶到 FMCS</h2><p class="muted">此畫面連動上方水箱模擬，示意 Tag、警報與資料品質；沒有連接真實 PLC 或網路服務。</p>${flow(["液位感測器", "PLC", "Modbus / OPC UA", "C# / FMCS"])}<div class="monitor"><div><small>LT-001 · 液位</small><strong id="fmcsLevel">50%</strong></div><div><small>P-001 · 補水幫浦</small><strong id="fmcsPump">OFF</strong></div><div><small>QUALITY · 資料品質</small><strong id="fmcsQuality">Good（模擬）</strong></div></div><div class="controls"><button class="button secondary" id="disconnect" aria-pressed="false">模擬通訊中斷</button><a href="#tankLab">回到水箱調整液位 →</a></div><p id="fmcsNote" aria-live="polite">資料連線正常（瀏覽器內部模擬）。</p>`;
        scan.after(fmcs);
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
})((window.PLCAcademy = window.PLCAcademy || {}));
