(function (app) {
  "use strict";
  app.createLearningView = function (data) {
    const $ = (selector) => document.querySelector(selector);
    return {
      mount() {
        const role = document.createElement("section");
        role.id = "engineer";
        role.innerHTML = `<p class="eyebrow">ROLE-BASED LEARNING</p><h2>${data.role.title}</h2><p>${data.role.summary}</p><p class="muted">輕量學習單元：以下是設計案例與實作清單，沿用現有水箱模擬；未新增三類即時監控、歷史資料庫或執行中的 API。</p><div class="grid">${data.role.cases.map((item) => `<article class="card"><h3>${item.title}</h3><p><b>監控點：</b>${item.points}</p><p><b>警報：</b>${item.alarm}</p><p><b>趨勢：</b>${item.trend}</p><p><b>交付物：</b>${item.deliverable}</p><a href="#week-9">第 9 週｜畫面練習 →</a></article>`).join("")}</div><details><summary>工程師的四項交付成果</summary><ol>${data.role.outputs.map((item) => `<li>${item}</li>`).join("")}</ol><p><a href="#week-8">第 8 週｜採集入庫</a> · <a href="#week-10">第 10 週｜警報與趨勢</a> · <a href="#week-11">第 11 週｜報表與 API</a></p></details>`;
        $("#roadmap").before(role);
        $("#lessons").innerHTML = data.weeks
          .map(
            (week, i) =>
              `<details id="week-${i + 1}"><summary></summary><p><b>觀念：</b>${week[1]}</p><p><b>實作：</b>${week[2]}</p><p><b>重點：</b>${week[3]}</p>${data.practiceLists[i].length ? `<div class="practice-list"><h3>工程師實作清單</h3><ul>${data.practiceLists[i].map((item) => `<li>${item}</li>`).join("")}</ul></div>` : ""}<label><input type="checkbox" data-week="${i}"> 我已完成本週練習</label></details>`,
          )
          .join("");
        $("#questions").innerHTML = data.quiz
          .map(
            (q, i) =>
              `<div class="quiz-item"><b>${i + 1}. ${q[0]}</b><div>${q[1].map((answer, j) => `<button data-q="${i}" data-a="${j}">${answer}</button>`).join("")}</div><p id="feedback${i}" class="muted"></p></div>`,
          )
          .join("");
      },
      renderProgress({ completed, legacyCompleted, storageAvailable }) {
        document.querySelectorAll("[data-week]").forEach((el) => {
          const i = Number(el.dataset.week),
            checked = completed.includes(i);
          el.checked = checked;
          el.closest("details").querySelector("summary").textContent =
            `第 ${i + 1} 週｜${data.weeks[i][0]}${checked ? " ✓" : ""}`;
        });
        $("#progress").value = completed.length;
        $("#progressLabel").textContent = `${completed.length} / 12 週完成`;
        $("#legacyProgress").textContent = legacyCompleted.length
          ? `舊版 PLC 課程：${legacyCompleted.length} / 12 週完成，已保留在本瀏覽器，不計入本版 FMCS 進度。`
          : "FMCS 使用獨立進度；若本瀏覽器有舊版 PLC 進度，原資料會保留。";
        $("#storageNote").textContent = storageAvailable
          ? "完成狀態儲存在目前瀏覽器，不會上傳伺服器。"
          : "瀏覽器目前無法讀取或儲存進度；本次仍可學習，關閉後可能無法保留。";
      },
      renderAnswer(i, choice, result) {
        document.querySelectorAll(`[data-q="${i}"]`).forEach((button) => {
          button.classList.remove("correct", "wrong");
          if (Number(button.dataset.a) === choice)
            button.classList.add(result.correct ? "correct" : "wrong");
        });
        $("#feedback" + i).textContent =
          (result.correct ? "答對。" : "再複習：") + result.explanation;
        $("#score").textContent =
          `目前答對 ${result.score} / ${result.answered} 題`;
      },
      renderDictionary(terms) {
        $("#dictionary").innerHTML =
          terms
            .map(
              (term) =>
                `<div class="card"><h3>${term[0]}</h3><p>${term[1]}</p></div>`,
            )
            .join("") || "<p>找不到符合的術語</p>";
      },
    };
  };
})((window.FMCSAcademy = window.FMCSAcademy || {}));
