const { JSDOM } = require("jsdom");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
function load(saved = "[0,3,11]", blocked = false) {
  const dom = new JSDOM(
    fs.readFileSync(path.join(root, "index.html"), "utf8"),
    {
      url: "https://chermanyen.github.io/plc-academy/",
      runScripts: "outside-only",
    },
  );
  const w = dom.window;
  if (blocked)
    Object.defineProperty(w, "localStorage", {
      get() {
        throw Error("blocked");
      },
    });
  else w.localStorage.setItem("plcWeeks", saved);
  let timers = new Map(),
    id = 0;
  w.setInterval = (fn) => {
    timers.set(++id, fn);
    return id;
  };
  w.clearInterval = (id) => timers.delete(id);
  for (const script of w.document.querySelectorAll("script[src]")) {
    w.eval(
      fs.readFileSync(path.join(root, script.getAttribute("src")), "utf8"),
    );
  }
  return { w, d: w.document, timers };
}
const { w, d, timers } = load();
const $ = (s) => d.querySelector(s);
const click = (s) => $(s).click();
assert.equal(d.querySelectorAll("#lessons details").length, 12);
assert.equal(d.querySelectorAll(".lesson-visual").length, 12);
assert.equal($("#progress").value, 3);
const detail = $("#lessons details");
detail.open = true;
click('[data-week="1"]');
assert.equal(detail.open, true);
assert.deepEqual(JSON.parse(w.localStorage.getItem("plcWeeks")), [0, 3, 11, 1]);
assert.equal(d.querySelectorAll(".lesson-visual").length, 12);
assert.equal(
  load(w.localStorage.getItem("plcWeeks")).d.querySelector("#progress").value,
  4,
);
click("#lampBtn");
assert.equal($("#y0").textContent, "燈亮");
assert($("#ladder").classList.contains("energized"));
click("#lampBtn");
assert.equal($("#y0").textContent, "燈滅");
click("#start");
assert.equal($("#motor").textContent, "ON");
click("#sensor");
assert.equal($("#motor").textContent, "OFF");
click("#sensor");
assert.equal($("#motor").textContent, "OFF");
click("#start");
click("#stop");
assert.equal($("#motor").textContent, "OFF");
click("#sensor");
click("#start");
assert.equal($("#motor").textContent, "OFF");
click("#sensor");
function level(v) {
  $("#level").value = v;
  $("#level").dispatchEvent(new w.Event("input"));
}
level(30);
assert.equal($("#pump").textContent, "OFF");
level(29);
assert.equal($("#pump").textContent, "ON");
level(50);
assert.equal($("#pump").textContent, "ON");
level(79);
assert.equal($("#pump").textContent, "ON");
level(80);
assert.equal($("#pump").textContent, "OFF");
level(50);
assert.equal($("#pump").textContent, "OFF");
level(95);
assert.match($("#tankAlarm").textContent, /超高/);
click("#disconnect");
level(20);
assert.equal($("#fmcsLevel").textContent, "95%");
assert.equal($("#pump").textContent, "ON");
assert.match($("#fmcsQuality").textContent, /Bad/);
click("#disconnect");
assert.equal($("#fmcsLevel").textContent, "20%");
click("#autoTank");
const tick = [...timers.values()][0];
tick();
assert.equal($("#level").value, "25");
click("#resetTank");
assert.equal(timers.size, 0);
assert.equal($("#level").value, "50");
assert.equal($("#pump").textContent, "OFF");
click("#scanInput");
click("#scanStep");
assert.equal($("#imageInput").textContent, "1");
assert.equal($("#scanOutput").textContent, "0");
click("#scanInput");
click("#scanStep");
assert.equal($("#logicResult").textContent, "1");
click("#scanStep");
assert.equal($("#scanOutput").textContent, "1");
click("#scanStep");
assert.equal($("#imageInput").textContent, "0");
click("#scanStep");
click("#scanStep");
assert.equal($("#scanOutput").textContent, "0");
click("#scanAuto");
assert.equal(timers.size, 1);
click("#scanReset");
assert.equal(timers.size, 0);
assert.equal($("#scanOutput").textContent, "0");
click("#autoTank");
click("#scanAuto");
assert.equal(timers.size, 2);
Object.defineProperty(d, "hidden", { configurable: true, value: true });
d.dispatchEvent(new w.Event("visibilitychange"));
assert.equal(timers.size, 0, "hidden tab pauses both automatic simulations");
assert.equal($("#autoTank").getAttribute("aria-pressed"), "false");
assert.equal($("#scanAuto").getAttribute("aria-pressed"), "false");
click('[data-q="0"][data-a="0"]');
assert.match($("#score").textContent, /1 \/ 1/);
click('[data-q="0"][data-a="1"]');
assert.match($("#score").textContent, /0 \/ 1/);
$("#search").value = "modbus";
$("#search").dispatchEvent(new w.Event("input"));
assert($("#dictionary").textContent.includes("Modbus"));
$("#search").value = "not-found";
$("#search").dispatchEvent(new w.Event("input"));
assert.match($("#dictionary").textContent, /找不到/);
assert.equal(load("broken").d.querySelectorAll(".lesson-visual").length, 12);
assert.equal(load('[0,0,99,"1",2]').d.querySelector("#progress").value, 2);
assert.equal(
  load("[]", true).d.querySelectorAll("#questions .quiz-item").length,
  6,
);
const ids = [...d.querySelectorAll("[id]")].map((e) => e.id);
assert.equal(new Set(ids).size, ids.length);
for (const a of d.querySelectorAll('a[href^="#"]'))
  assert(d.getElementById(a.hash.slice(1)), `broken anchor ${a.hash}`);
console.log(
  "PASS: 12 lessons, progress compatibility, unavailable storage, ladder, motor restart interlock, tank thresholds/auto/reset/alarm, FMCS stale values/recovery, scan process image, quiz, dictionary, anchors.",
);
w.close();
