(function (app) {
  "use strict";
  // Storage is injected so this model can run without a browser or DOM.
  app.createLearningModel = function (data, getStorage) {
    let completed = [],
      storageAvailable = true;
    const answers = {};
    try {
      const saved = JSON.parse(getStorage().getItem("plcWeeks") || "[]");
      if (Array.isArray(saved))
        completed = [...new Set(saved.filter(validWeek))];
    } catch {
      storageAvailable = false;
    }
    function validWeek(i) {
      return Number.isInteger(i) && i >= 0 && i < data.weeks.length;
    }
    return {
      progress() {
        return { completed: [...completed], storageAvailable };
      },
      completeWeek(i, checked) {
        if (!validWeek(i)) return;
        if (checked && !completed.includes(i)) completed.push(i);
        if (!checked) completed = completed.filter((value) => value !== i);
        try {
          getStorage().setItem("plcWeeks", JSON.stringify(completed));
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
})((window.PLCAcademy = window.PLCAcademy || {}));
