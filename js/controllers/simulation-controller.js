(function (app) {
  "use strict";
  app.createSimulationController = function (model, view, clock) {
    let tankTimer = null,
      scanTimer = null;
    function render() {
      view.render(model.snapshot(), {
        tankPlaying: tankTimer !== null,
        scanPlaying: scanTimer !== null,
      });
    }
    function stopTank() {
      clock.clearInterval(tankTimer);
      tankTimer = null;
    }
    function stopScan() {
      clock.clearInterval(scanTimer);
      scanTimer = null;
    }
    function bind(selector, action, eventName = "click") {
      document.querySelector(selector).addEventListener(eventName, (event) => {
        action(event);
        render();
      });
    }
    return {
      start() {
        view.mount();
        view.renderModule("di");
        render();
        document
          .querySelectorAll("[data-module]")
          .forEach((button) =>
            button.addEventListener("click", () =>
              view.renderModule(button.dataset.module),
            ),
          );
        bind("#lampBtn", () => model.toggleLamp());
        bind("#start", () => model.startMotor());
        bind("#stop", () => model.stopMotor());
        bind(
          "#sensor",
          (event) => model.setSensor(event.target.checked),
          "change",
        );
        bind("#level", (event) => model.setLevel(event.target.value), "input");
        bind("#autoTank", () => {
          if (tankTimer !== null) stopTank();
          else
            tankTimer = clock.setInterval(() => {
              model.tickTank();
              render();
            }, 1000);
        });
        bind("#resetTank", () => {
          stopTank();
          model.resetTank();
        });
        bind("#scanInput", () => model.togglePhysical());
        bind("#scanStep", () => {
          stopScan();
          model.stepScan();
        });
        bind("#scanAuto", () => {
          if (scanTimer !== null) stopScan();
          else {
            model.stepScan();
            scanTimer = clock.setInterval(() => {
              model.stepScan();
              render();
            }, 1400);
          }
        });
        bind("#scanReset", () => {
          stopScan();
          model.resetScan();
        });
        bind("#disconnect", () => model.toggleConnection());
        document.addEventListener("visibilitychange", () => {
          if (document.hidden) {
            stopTank();
            stopScan();
            render();
          }
        });
      },
    };
  };
})((window.FMCSAcademy = window.FMCSAcademy || {}));
