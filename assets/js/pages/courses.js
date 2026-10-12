/* Trang khóa học */
(function () {
  const { icon, store, auth, courseCard, escapeHtml, toast, Art, url } = UI;
  const D = APP_DATA;
  const PKEY = "dtcv-progress";
  const PREVIEW = 5;

  // progress[i] = số bài đã hoàn thành ở cấp độ i (bản demo: 2 bài ở cấp 1)
  let progress = store.get(PKEY, null) || [2, 0, 0, 0, 0];
  const params = new URLSearchParams(location.search);
  let level = Math.min(Math.max((parseInt(params.get("cap"), 10) || 1) - 1, 0), D.path.length - 1);
  let expanded = false;

  const navEl = document.querySelector("[data-path-nav]");
  const levelEl = document.querySelector("[data-level]");
  const allEl = document.querySelector("[data-all-courses]");
  const allEmpty = document.querySelector("[data-all-empty]");
  const mineEl = document.querySelector("[data-mine]");
  const search = document.getElementById("course-search");

  const pct = (i) => Math.round((progress[i] / D.path[i].lessons.length) * 100);

  function renderNav() {
    navEl.innerHTML = D.path
      .map(
        (p, i) =>
          '<li><button type="button" class="path-step" data-step="' + i + '"' + (i === level ? ' aria-current="step"' : "") + ">" +
          '<span class="dot" style="background:' + p.color + '">' + String(i + 1).padStart(2, "0") + "</span>" +
          "<span><b>" + p.title + "</b><small>" + p.lessons.length + " bài học" + (progress[i] ? ", xong " + pct(i) + "%" : "") + "</small>" +
          '<span class="mini-bar" aria-hidden="true"><i style="width:' + pct(i) + '%"></i></span></span></button></li>'
      )
      .join("");
  }

  function renderLevel() {
    const p = D.path[level];
    const done = progress[level];
    const total = p.lessons.length;
    const finished = done >= total;
    const shown = expanded ? p.lessons : p.lessons.slice(0, Math.max(PREVIEW, Math.min(done + 2, total)));

    levelEl.innerHTML =
      '<div class="level-head"><div><h2>Cấp độ ' + (level + 1) + ": " + p.title + "</h2><p>" + p.desc + "</p></div>" +
      (finished
        ? '<span class="badge badge--green" style="font-size:.8rem;padding:6px 12px">Đã hoàn thành</span>'
        : '<button class="btn btn--green" type="button" data-continue>' + (done ? "Tiếp tục học" : "Bắt đầu học") + icon("arrowRight") + "</button>") +
      "</div>" +
      '<div class="progress"><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + done + '" aria-label="Tiến độ cấp độ ' + (level + 1) + '"><i style="width:' + pct(level) + '%"></i></div>' +
      '<span class="progress-label">' + done + "/" + total + " bài, " + pct(level) + "%</span></div>" +
      '<ol class="lesson-list">' +
      shown
        .map((l, i) => {
          const state = i < done ? "done" : i === done ? "current" : "locked";
          const no = state === "done" ? icon("check") : i + 1;
          const stateIcon = state === "done" ? icon("checkCircle") : state === "current" ? icon("play") : icon("lock");
          const label = state === "done" ? "Đã học" : state === "current" ? "Bài tiếp theo" : "Mở khóa sau khi học bài trước";
          const title =
            state === "locked"
              ? '<span class="lesson-title">' + escapeHtml(l.t) + "</span>"
              : '<button type="button" class="lesson-title" data-lesson="' + i + '">' + escapeHtml(l.t) + "</button>";
          return (
            '<li class="lesson is-' + state + '"><span class="lesson-no">' + no + "</span>" + title +
            '<span class="lesson-time">' + l.m + ' phút</span><span class="lesson-state" title="' + label + '"><span class="sr-only">' + label + "</span>" + stateIcon + "</span></li>"
          );
        })
        .join("") +
      "</ol>" +
      (shown.length < total || expanded
        ? '<button class="lesson-more" type="button" data-expand aria-expanded="' + expanded + '">' + (expanded ? "Thu gọn danh sách" : "Xem thêm " + (total - shown.length) + " bài") + "</button>"
        : "") +
      '<div class="unlock-note">' + icon("shield") +
      "<p>Hoàn thành khóa học và mở tài khoản, nạp từ 50 triệu đồng để <strong>nhận miễn phí toàn bộ khóa học và tin tức độc quyền</strong>.</p>" +
      '<a class="btn btn--gold btn--sm" href="' + url("mo-tai-khoan/") + '#dang-ky">Mở tài khoản ngay</a></div>';
  }

  function save() {
    store.set(PKEY, progress);
  }

  function completeLesson(i) {
    const p = D.path[level];
    if (i === progress[level] && progress[level] < p.lessons.length) {
      progress[level]++;
      save();
      toast("Đã hoàn thành bài: " + p.lessons[i].t);
    } else {
      toast("Đang mở lại bài: " + p.lessons[i].t);
    }
    renderNav();
    renderLevel();
  }

  navEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-step]");
    if (!b) return;
    level = +b.dataset.step;
    expanded = false;
    renderNav();
    renderLevel();
    if (window.matchMedia("(max-width: 960px)").matches) levelEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  levelEl.addEventListener("click", (e) => {
    if (e.target.closest("[data-continue]")) completeLesson(progress[level]);
    const l = e.target.closest("[data-lesson]");
    if (l) completeLesson(+l.dataset.lesson);
    if (e.target.closest("[data-expand]")) {
      expanded = !expanded;
      renderLevel();
    }
  });

  /* ----- All courses + search ----- */
  function normalize(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
  }
  function renderAll() {
    const q = normalize(search.value.trim());
    const list = D.courses.filter((c) => !q || normalize(c.title + " " + c.tag).includes(q));
    allEl.innerHTML = list.map(courseCard).join("");
    allEmpty.hidden = list.length > 0;
  }

  /* ----- Mine ----- */
  function renderMine() {
    const u = auth.user();
    if (!u) {
      mineEl.innerHTML =
        '<div class="panel empty-state">' + icon("user") +
        "<h3>Đăng nhập để xem khóa học của bạn</h3><p>Tiến độ học sẽ được lưu lại để bạn học tiếp trên mọi thiết bị.</p>" +
        '<button class="btn btn--navy" type="button" data-login>Đăng nhập</button></div>';
      return;
    }
    const started = D.path.map((p, i) => ({ p, i })).filter((x) => progress[x.i] > 0);
    if (!started.length) {
      mineEl.innerHTML =
        '<div class="panel empty-state">' + icon("book") +
        "<h3>Bạn chưa bắt đầu khóa học nào</h3><p>Chọn cấp độ 1 trong lộ trình để học bài đầu tiên, chỉ mất khoảng 12 phút.</p>" +
        '<button class="btn btn--green" type="button" data-goto-path="0">Bắt đầu cấp độ 1</button></div>';
      return;
    }
    const arts = ["candles", "bars", "towers", "skyline-night", "pie"];
    mineEl.innerHTML =
      '<div class="mine-list">' +
      started
        .map(
          (x) =>
            '<article class="panel mine-item"><div class="course-thumb">' + Art.thumb(arts[x.i], "mine" + x.i) + "</div>" +
            "<div><h3>Cấp độ " + (x.i + 1) + ": " + x.p.title + "</h3>" +
            '<div class="progress"><div class="progress-track"><i style="width:' + pct(x.i) + '%"></i></div><span class="progress-label">' + progress[x.i] + "/" + x.p.lessons.length + " bài</span></div></div>" +
            '<button class="btn btn--outline" type="button" data-goto-path="' + x.i + '">' + (pct(x.i) === 100 ? "Ôn tập" : "Học tiếp") + "</button></article>"
        )
        .join("") +
      "</div>";
  }

  /* ----- Tabs ----- */
  const panels = { path: "panel-path", all: "panel-all", mine: "panel-mine" };
  const tabCtl = UI.tabs(document.querySelector("[data-course-tabs]"), (v) => {
    Object.keys(panels).forEach((k) => (document.getElementById(panels[k]).hidden = k !== v));
    if (v === "all") renderAll();
    if (v === "mine") renderMine();
    const url = new URL(location.href);
    if (v === "path") url.searchParams.delete("tab");
    else url.searchParams.set("tab", v);
    history.replaceState(null, "", url);
  });

  mineEl.addEventListener("click", (e) => {
    const g = e.target.closest("[data-goto-path]");
    if (!g) return;
    level = +g.dataset.gotoPath;
    renderNav();
    renderLevel();
    tabCtl.select("path");
  });

  search.addEventListener("input", () => {
    if (document.getElementById("panel-all").hidden) tabCtl.select("all");
    else renderAll();
  });

  document.addEventListener("auth:change", () => {
    if (!document.getElementById("panel-mine").hidden) renderMine();
  });

  renderNav();
  renderLevel();
  const tab = params.get("tab");
  if (tab === "all" || tab === "mine") tabCtl.select(tab);
})();
