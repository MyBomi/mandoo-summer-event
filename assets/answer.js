/* ============================================================
   공용 정답 체크 스크립트
   각 페이지 하단 <script>에서 initAnswerForm(...)을 호출해서 사용합니다.
   ============================================================ */

/**
 * @param {Object} opts
 * @param {string}   opts.formId       정답 입력 <form>의 id
 * @param {string}   opts.inputId      정답 입력 <input>의 id
 * @param {string}   opts.errorId      에러 메시지 표시할 element id
 * @param {string[]} opts.answers      정답으로 인정할 문자열 목록(소문자/공백 무시 비교)
 * @param {string}   opts.nextUrl      정답일 때 이동할 경로 (예: "../door/")
 * @param {string}   [opts.failUrl]    오답일 때 이동할 경로 (기본: "../fail/")
 * @param {number}   [opts.failAfterTries]  이 횟수 이상 틀리면 실패 페이지로 이동
 *                                          (기본: 1 = 한 번 틀리면 바로 오답 페이지로 이동)
 * @param {Function} [opts.onSuccess]  정답일 때 nextUrl 이동 대신 실행할 콜백
 *                                          (같은 페이지 안에서 다음 단계를 보여줄 때 사용)
 */
function initAnswerForm(opts) {
  const form = document.getElementById(opts.formId);
  const input = document.getElementById(opts.inputId);
  const errorEl = document.getElementById(opts.errorId);
  const failUrl = opts.failUrl || "../fail/";
  const maxTries = opts.failAfterTries || 1;
  let tries = 0;

  if (!form) return;

  const normalize = (s) =>
    (s || "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");

  const normalizedAnswers = opts.answers.map(normalize);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const val = normalize(input.value);

    if (val.length === 0) {
      showError("정답을 입력해 주세요.");
      return;
    }

    if (normalizedAnswers.includes(val)) {
      form.querySelector("button[type=submit]") &&
        (form.querySelector("button[type=submit]").disabled = true);
      errorEl.textContent = "";
      errorEl.classList.remove("show");
      input.style.borderColor = "var(--success)";
      setTimeout(() => {
        if (typeof opts.onSuccess === "function") {
          opts.onSuccess();
        } else {
          window.location.href = opts.nextUrl;
        }
      }, 350);
    } else {
      tries++;
      if (tries >= maxTries) {
        setTimeout(() => {
          window.location.href = failUrl;
        }, 300);
        showError("정답이 아닙니다... 기록을 확인하는 중.");
      } else {
        showError(`정답이 아닙니다. 다시 시도해 보세요. (${tries}/${maxTries})`);
      }
    }
  });

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.remove("show");
    // reflow to restart animation
    void errorEl.offsetWidth;
    errorEl.classList.add("show");
    input.style.borderColor = "";
  }
}
