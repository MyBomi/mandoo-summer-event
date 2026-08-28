/* ============================================================
   전체 페이지 공용 카운트다운 타이머
   index.html 최초 진입 시점부터 1시간을 재고, localStorage에
   저장된 시작 시각을 기준으로 페이지 이동/새로고침에도 유지된다.
   ============================================================ */
(function () {
  var START_KEY = "mandoo_timer_start";
  var DURATION_MS = 60 * 60 * 1000; // 1시간

  var start = Number(localStorage.getItem(START_KEY));
  if (!start) {
    start = Date.now();
    localStorage.setItem(START_KEY, String(start));
  }

  var el = document.createElement("div");
  el.id = "game-timer";
  el.className = "game-timer";
  document.body.appendChild(el);

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function format(ms) {
    var totalSec = Math.max(0, Math.ceil(ms / 1000));
    var h = Math.floor(totalSec / 3600);
    var m = Math.floor((totalSec % 3600) / 60);
    var s = totalSec % 60;
    return pad(h) + ":" + pad(m) + ":" + pad(s);
  }

  var timerHandle = null;

  function tick() {
    var remaining = DURATION_MS - (Date.now() - start);
    if (remaining <= 0) {
      el.textContent = "00:00:00";
      el.classList.add("timeup");
      clearInterval(timerHandle);
      return;
    }
    el.textContent = format(remaining);
    el.classList.toggle("low", remaining <= 5 * 60 * 1000);
  }

  tick();
  timerHandle = setInterval(tick, 1000);
})();
