(function (app) {
  "use strict";
  app.createLearningController = function (model, view) {
    return {
      start() {
        view.mount();
        view.renderProgress(model.progress());
        view.renderDictionary(model.search());
        document
          .querySelector("#lessons")
          .addEventListener("change", (event) => {
            if (!event.target.matches("[data-week]")) return;
            model.completeWeek(
              Number(event.target.dataset.week),
              event.target.checked,
            );
            view.renderProgress(model.progress());
          });
        document
          .querySelector("#questions")
          .addEventListener("click", (event) => {
            const button = event.target.closest("[data-q]");
            if (!button) return;
            const i = Number(button.dataset.q),
              choice = Number(button.dataset.a);
            const result = model.answer(i, choice);
            if (result) view.renderAnswer(i, choice, result);
          });
        document
          .querySelector("#search")
          .addEventListener("input", (event) =>
            view.renderDictionary(model.search(event.target.value)),
          );
      },
    };
  };
})((window.FMCSAcademy = window.FMCSAcademy || {}));
