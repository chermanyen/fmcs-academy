(function (app) {
  "use strict";
  // Storage is injected so this model can run without a browser or DOM.
  app.createLearningModel = function (data, getStorage) {
    let completed = [],
      storageAvailable = true;
    let legacyCompleted = [];
    const progressKey = data.progressKey;
    const answers = {};
    try {
      const saved = JSON.parse(getStorage().getItem(progressKey) || "[]");
      if (Array.isArray(saved))
        completed = [...new Set(saved.filter(validWeek))];
    } catch {
      storageAvailable = false;
    }
    // The old PLC course is a different curriculum; read but never migrate or overwrite it.
    try {
      const legacy = JSON.parse(getStorage().getItem("plcWeeks") || "[]");
      if (Array.isArray(legacy))
        legacyCompleted = [...new Set(legacy.filter(validWeek))];
    } catch {
      /* Unreadable legacy data must not prevent the FMCS course from working. */
    }
    function validWeek(i) {
      return Number.isInteger(i) && i >= 0 && i < data.weeks.length;
    }
    return {
      progress() {
        return {
          completed: [...completed],
          legacyCompleted: [...legacyCompleted],
          storageAvailable,
        };
      },
      completeWeek(i, checked) {
        if (!validWeek(i)) return;
        if (checked && !completed.includes(i)) completed.push(i);
        if (!checked) completed = completed.filter((value) => value !== i);
        try {
          getStorage().setItem(progressKey, JSON.stringify(completed));
          storageAvailable = true;
        } catch {
          storageAvailable = false;
        }
      },
      answer(i, choice) {
        const question = data.quiz[i];
        if (
          !question ||
          !Number.isInteger(choice) ||
          choice < 0 ||
          choice >= question[1].length
        )
          return null;
        answers[i] = choice;
        return {
          correct: choice === question[2],
          explanation: question[3],
          score: Object.keys(answers).filter(
            (key) => answers[key] === data.quiz[key][2],
          ).length,
          answered: Object.keys(answers).length,
        };
      },
      search(query = "") {
        return data.terms.filter((term) =>
          term.join(" ").toLowerCase().includes(query.toLowerCase()),
        );
      },
    };
  };
})((window.FMCSAcademy = window.FMCSAcademy || {}));
