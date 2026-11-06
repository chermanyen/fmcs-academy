(function (app) {
  "use strict";
  app.createLearningView = function (data) {
    const $ = (selector) => document.querySelector(selector);
    return {
      mount() {
        $("#lessons").innerHTML = data.weeks
          .map(
            (week, i) =>
              `<details><summary></summary><p><b>觀念：</b>${week[1]}</p><p><b>實作：</b>${week[2]}</p><p><b>重點：</b>${week[3]}</p><label><input type="checkbox" data-week="${i}"> 我已完成本週練習</label></details>`,
          )
          .join("");
        $("#questions").innerHTML = data.quiz
          .map(
            (q, i) =>
              `<div class="quiz-item"><b>${i + 1}. ${q[0]}</b><div>${q[1].map((answer, j) => `<button data-q="${i}" data-a="${j}">${answer}</button>`).join("")}</div><p id="feedback${i}" class="muted"></p></div>`,
          )
          .join("");
      },
      renderProgress({ completed, storageAvailable }) {
        document.querySelectorAll("[data-week]").forEach((el) => {
          const i = Number(el.dataset.week),
            checked = completed.includes(i);
          el.checked = checked;
          el.closest("details").querySelector("summary").textContent =
            `第 ${i + 1} 週｜${data.weeks[i][0]}${checked ? " ✓" : ""}`;
        });
        $("#progress").value = completed.length;
        $("#progressLabel").textContent = `${completed.length} / 12 週完成`;
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
})((window.PLCAcademy = window.PLCAcademy || {}));
