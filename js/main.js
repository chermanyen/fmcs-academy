(function (app) {
  "use strict";
  // Deferred scripts load in index.html order; no bundler or server runtime required.
  const learningModel = app.createLearningModel(
    app.courseData,
    () => window.localStorage,
  );
  const learningView = app.createLearningView(app.courseData);
  app.createLearningController(learningModel, learningView).start();

  const simulationModel = app.createSimulationModel();
  const simulationView = app.createSimulationView();
  app
    .createSimulationController(simulationModel, simulationView, window)
    .start();
})(window.PLCAcademy);
