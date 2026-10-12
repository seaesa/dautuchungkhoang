/* Trang tin tức gắn theo mã cổ phiếu */
(function () {
  const { icon, fmt, Charts, store, toast, escapeHtml, newsItem } = UI;
  const D = APP_DATA;
  const ALL = "ALL";
  const PAGE = 4;
  const FKEY = "dtcv-follow";

  const params = new URLSearchParams(location.search);
  const initial = params.has("ma") ? (params.get("ma") || ALL).toUpperCase() : "MBB";
  let ticker = initial === ALL || D.tickers.some((t) => t.code === initial) ? initial : "MBB";
  let cat = "all";
  let limit = PAGE;
  let follows = store.get(FKEY, []);

  const listEl = document.querySelector("[data-ticker-list]");
  const filterEl = document.getElementById("ticker-filter");
  const quoteEl = document.querySelector("[data-quote]");
  const titleEl = document.querySelector("[data-news-title]");
  const newsEl = document.querySelector("[data-news-list]");
  const moreWrap = document.querySelector("[data-load-more-wrap]");
  const followBtn = document.querySelector("[data-follow]");
  const catTabs = document.querySelector("[data-cat-tabs]");

  const countFor = (code) => (code === ALL ? D.news.length : D.news.filter((n) => n.ticker === code).length);

  /* ----- Banner decoration ----- */
  const art = document.querySelector("[data-banner-art]");
  if (art) {
    art.innerHTML = Charts.candles(Charts.ohlc(46, "news-banner", 100, 0.05, 0.02), { w: 1200, h: 220, up: "#38bdf8", down: "#1e5bd8", ma: false });
    art.style.opacity = ".22";
    art.style.maskImage = "linear-gradient(90deg, transparent 20%, #000 80%)";
    art.style.webkitMaskImage = art.style.maskImage;
  }

  /* ----- Ticker list ----- */
  function renderTickers() {
    const q = filterEl.value.trim().toUpperCase();
    const items = [{ code: ALL, label: "Toàn thị trường" }].concat(D.tickers.map((t) => ({ code: t.code, label: t.code, t })));
    listEl.innerHTML = items
      .filter((x) => !q || x.code === ALL || x.code.includes(q))
      .map(
        (x) =>
          '<li><button type="button" data-ticker="' + x.code + '" aria-pressed="' + (x.code === ticker) + '">' +
          "<b>" + (x.t ? '<i style="background:' + x.t.color + '"></i>' : "") + x.label + (follows.includes(x.code) ? ' <span title="Đang theo dõi" style="color:var(--gold-500)">★</span>' : "") + "</b>" +
          '<span class="cnt">' + countFor(x.code) + "</span>" +
          (x.t ? '<span class="chg num ' + fmt.cls(x.t.change) + '">' + fmt.price(x.t.price) + " " + fmt.pct(x.t.change) + "</span>" : "") +
          "</button></li>"
      )
      .join("");
  }

  /* ----- Quote card ----- */
  function renderQuote() {
    if (ticker === ALL) {
      const v = D.indices[0];
      const pct = (v.change / (v.value - v.change)) * 100;
      quoteEl.innerHTML =
        '<div class="quote-logo" style="background:var(--navy-800)">VNI</div>' +
        '<div><h3>VN-Index</h3><p class="co">Chỉ số sàn HOSE</p><div class="quote-price"><strong class="num">' + fmt.index(v.value) + '</strong><span class="num ' + fmt.cls(v.change) + '">' + fmt.change(v.change) + " (" + fmt.pct(pct) + ")</span></div></div>" +
        '<div class="quote-spark">' + Charts.spark(Charts.walk(60, "vni", 1200, 0.02, 0.0012), { w: 300, h: 64, color: "#16a34a" }) + "</div>";
      titleEl.textContent = "Tin tức toàn thị trường";
      followBtn.hidden = true;
      return;
    }
    const t = D.tickers.find((x) => x.code === ticker);
    const color = t.change >= 0 ? "#16a34a" : "#e0393e";
    const diff = t.price - t.price / (1 + t.change / 100);
    quoteEl.innerHTML =
      '<div class="quote-logo" style="background:' + t.color + '">' + t.code + "</div>" +
      "<div><h3>" + t.code + ' <span class="badge badge--soft">' + t.sector + '</span></h3><p class="co">' + t.name + "</p>" +
      '<div class="quote-price"><strong class="num">' + fmt.price(t.price) + '</strong><span class="num ' + fmt.cls(t.change) + '">' + fmt.pct(t.change) + " (" + (diff >= 0 ? "+" : "") + fmt.int(Math.round(diff * 1000)) + ")</span></div></div>" +
      '<div class="quote-spark" aria-label="Diễn biến giá 3 tháng (minh họa)">' + Charts.spark(Charts.walk(60, t.code, t.price, 0.03, t.change / 1500), { w: 300, h: 64, color }) + "</div>";
    titleEl.textContent = "Tin tức liên quan đến " + t.code;
    followBtn.hidden = false;
    const on = follows.includes(ticker);
    followBtn.setAttribute("aria-pressed", on);
    followBtn.innerHTML = icon(on ? "check" : "plus") + "<span>" + (on ? "Đang theo dõi" : "Theo dõi " + t.code) + "</span>";
  }

  /* ----- Categories ----- */
  catTabs.innerHTML = D.newsCategories
    .map((c) => '<button class="tab" role="tab" aria-selected="' + (c.id === cat) + '" data-value="' + c.id + '">' + c.label + "</button>")
    .join("");
  UI.tabs(catTabs, (v) => {
    cat = v;
    limit = PAGE;
    renderNews();
  });

  /* ----- News list ----- */
  function filtered() {
    return D.news.filter((n) => (ticker === ALL || n.ticker === ticker) && (cat === "all" || n.cat === cat));
  }
  function renderNews() {
    const list = filtered();
    if (!list.length) {
      const name = ticker === ALL ? "thị trường" : ticker;
      newsEl.innerHTML =
        '<div class="empty-state">' + icon("newspaper") + "<h3>Chưa có bài viết cho " + name + " trong mục này</h3>" +
        "<p>Chọn mục Tất cả hoặc xem tin của toàn thị trường.</p>" +
        '<button class="btn btn--outline" type="button" data-ticker="' + ALL + '">Xem tin toàn thị trường</button></div>';
      moreWrap.hidden = true;
      return;
    }
    newsEl.innerHTML = list.slice(0, limit).map((n) => newsItem(n, { showCat: true, tag: ticker === ALL })).join("");
    newsEl.querySelectorAll(".news-item").forEach((el, i) => (el.id = "bai-" + list[i].id));
    moreWrap.hidden = list.length <= limit;
  }

  function setTicker(code, opts) {
    ticker = code;
    limit = PAGE;
    renderTickers();
    renderQuote();
    renderNews();
    const url = new URL(location.href);
    url.searchParams.set("ma", code === ALL ? "" : code);
    url.hash = "";
    history.replaceState(null, "", url);
    if (opts && opts.scroll) titleEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ticker]");
    if (b) setTicker(b.dataset.ticker, { scroll: window.matchMedia("(max-width: 960px)").matches || !!b.closest(".empty-state") });
  });

  document.querySelector("[data-load-more]").addEventListener("click", () => {
    limit += PAGE;
    renderNews();
  });

  followBtn.addEventListener("click", () => {
    const on = follows.includes(ticker);
    follows = on ? follows.filter((c) => c !== ticker) : follows.concat(ticker);
    store.set(FKEY, follows);
    toast(on ? "Đã bỏ theo dõi " + ticker : "Đã theo dõi " + ticker + ". Tin mới sẽ xuất hiện trong trang Tổng quan.");
    renderQuote();
    renderTickers();
  });

  filterEl.addEventListener("input", renderTickers);

  /* ----- Banner search combobox ----- */
  const input = document.getElementById("ticker-search");
  const box = document.getElementById("ticker-suggest");
  let active = -1;
  let matches = [];
  function norm(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toUpperCase();
  }
  function openSuggest() {
    const q = norm(input.value.trim());
    if (!q) return closeSuggest();
    matches = D.tickers.filter((t) => t.code.startsWith(q) || norm(t.name).includes(q)).slice(0, 6);
    active = matches.length ? 0 : -1;
    box.innerHTML = matches.length
      ? matches
          .map((t, i) => '<button type="button" role="option" id="opt-' + t.code + '" aria-selected="' + (i === active) + '" data-pick="' + t.code + '"><b>' + t.code + "</b><span>" + escapeHtml(t.name) + "</span></button>")
          .join("")
      : '<p class="none">Không tìm thấy mã phù hợp.</p>';
    box.hidden = false;
    input.setAttribute("aria-expanded", "true");
    input.setAttribute("aria-activedescendant", active >= 0 ? "opt-" + matches[active].code : "");
  }
  function closeSuggest() {
    box.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
  }
  function pick(code) {
    input.value = code;
    closeSuggest();
    setTicker(code, { scroll: true });
  }
  function moveActive(d) {
    if (!matches.length) return;
    active = (active + d + matches.length) % matches.length;
    box.querySelectorAll("[role=option]").forEach((o, i) => o.setAttribute("aria-selected", i === active));
    input.setAttribute("aria-activedescendant", "opt-" + matches[active].code);
  }
  input.addEventListener("input", openSuggest);
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); moveActive(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); moveActive(-1); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0) pick(matches[active].code);
      else if (input.value.trim()) toast("Không có mã " + input.value.trim().toUpperCase() + " trong danh sách theo dõi.", "info");
    } else if (e.key === "Escape") closeSuggest();
  });
  box.addEventListener("mousedown", (e) => e.preventDefault()); // giữ focus khi click gợi ý
  box.addEventListener("click", (e) => {
    const b = e.target.closest("[data-pick]");
    if (b) pick(b.dataset.pick);
  });
  input.addEventListener("blur", () => setTimeout(closeSuggest, 100));

  /* ----- Init ----- */
  renderTickers();
  renderQuote();
  renderNews();

  if (location.hash === "#tim-ma") {
    input.focus();
  } else if (/^#bai-\d+$/.test(location.hash)) {
    const id = +location.hash.slice(5);
    const idx = filtered().findIndex((n) => n.id === id);
    if (idx >= limit) {
      limit = idx + 1;
      renderNews();
    }
    const el = document.getElementById("bai-" + id);
    if (el) {
      el.style.background = "var(--gold-50)";
      el.scrollIntoView({ block: "center" });
    }
  }
})();
