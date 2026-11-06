const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
// These models must load and work without document, localStorage or timers.
const context = vm.createContext({ window: {} });
for (const name of [
  "data/course-data",
  "models/learning-model",
  "models/simulation-model",
]) {
  vm.runInContext(
    fs.readFileSync(path.join(root, "js", name + ".js"), "utf8"),
    context,
  );
}
const app = context.window.FMCSAcademy;
const model = app.createSimulationModel();
model.startMotor();
model.setSensor(true);
model.setSensor(false);
assert.equal(
  model.snapshot().run,
  false,
  "sensor release must not restart motor",
);
model.setLevel(29);
model.setLevel(30);
model.setLevel(79);
assert.equal(model.snapshot().pumping, true);
model.setLevel(80);
model.setLevel(30);
assert.equal(model.snapshot().pumping, false);
model.setLevel(95);
model.toggleConnection();
model.setLevel(10);
assert.equal(model.snapshot().monitorLevel, 95);
model.toggleConnection();
assert.equal(model.snapshot().monitorLevel, 10);
model.setLevel(NaN);
assert.equal(model.snapshot().level, 10);
model.setLevel(999);
assert.equal(model.snapshot().level, 100);
model.resetTank();
assert.equal(model.snapshot().level, 50);
model.togglePhysical();
model.stepScan();
model.togglePhysical();
model.stepScan();
model.stepScan();
assert.equal(
  model.snapshot().output,
  true,
  "scan must use captured input image",
);
model.stepScan();
model.stepScan();
model.stepScan();
assert.equal(model.snapshot().output, false);
const snapshot = model.snapshot();
snapshot.level = -10;
assert.equal(
  model.snapshot().level,
  50,
  "view cannot mutate model through snapshot",
);
let stored = '[0,0,11,99,"3"]';
const learning = app.createLearningModel(app.courseData, () => ({
  getItem(key) {
    return key === "fmcsWeeksV1" ? stored : "[0,1,2]";
  },
  setItem(key, value) {
    assert.equal(key, "fmcsWeeksV1");
    stored = value;
  },
}));
assert.equal(learning.progress().completed.length, 2);
assert.equal(learning.progress().legacyCompleted.length, 3);
learning.completeWeek(3, true);
learning.completeWeek(99, true);
assert.deepEqual(JSON.parse(stored), [0, 11, 3]);
learning.progress().completed.push(8);
assert.equal(learning.progress().completed.length, 3);
assert.equal(learning.answer(0, 0).score, 1);
assert.equal(learning.answer(0, 1).score, 0);
assert.equal(learning.answer(0, -1), null);
assert.equal(learning.search("MODBUS").length, 3);
const blocked = app.createLearningModel(app.courseData, () => {
  throw Error("blocked");
});
blocked.completeWeek(1, true);
assert.equal(blocked.progress().completed.length, 1);
assert.equal(blocked.progress().storageAvailable, false);
console.log(
  "PASS: models work without DOM; motor, hysteresis, stale data, scan image, storage and state isolation.",
);
