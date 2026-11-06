(function (app) {
  "use strict";
  // All control rules live here. No DOM, event handlers or timers.
  app.createSimulationModel = function () {
    let lamp = false,
      run = false,
      sensor = false;
    let level = 50,
      pumping = false,
      disconnected = false;
    let monitorLevel = level,
      monitorPumping = pumping;
    let physical = false,
      inputImage = false,
      logic = false,
      output = false;
    let phase = 0,
      activePhase = -1;
    function syncMonitor() {
      if (!disconnected) {
        monitorLevel = level;
        monitorPumping = pumping;
      }
    }
    function setLevel(value) {
      const number = Number(value);
      if (!Number.isFinite(number)) return;
      level = Math.max(0, Math.min(100, number));
      if (level < 30) pumping = true;
      else if (level >= 80) pumping = false;
      syncMonitor();
    }
    return {
      snapshot() {
        return {
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
        };
      },
      toggleLamp() {
        lamp = !lamp;
      },
      startMotor() {
        run = !sensor;
      },
      stopMotor() {
        run = false;
      },
      setSensor(value) {
        sensor = Boolean(value);
        if (sensor) run = false;
      },
      setLevel,
      tickTank() {
        setLevel(level + (pumping ? 8 : 0) - 3);
      },
      resetTank() {
        pumping = false;
        setLevel(50);
      },
      toggleConnection() {
        disconnected = !disconnected;
        syncMonitor();
      },
      togglePhysical() {
        physical = !physical;
      },
      stepScan() {
        activePhase = phase;
        if (phase === 0) inputImage = physical;
        else if (phase === 1) logic = inputImage;
        else output = logic;
        phase = (phase + 1) % 3;
      },
      resetScan() {
        physical = inputImage = logic = output = false;
        phase = 0;
        activePhase = -1;
      },
    };
  };
})((window.FMCSAcademy = window.FMCSAcademy || {}));
