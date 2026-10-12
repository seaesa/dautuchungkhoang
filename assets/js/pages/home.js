/* Trang chủ */
(function () {
  const { Charts, Art, fmt, icon, rng, courseCard, escapeHtml } = UI;
  const D = APP_DATA;

  /* ----- Hero skyline (decorative) ----- */
  function skyline() {
    const W = 1440, H = 260, r = rng("hero-sky");
    let s = '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMax slice" aria-hidden="true">';
    [{ c: "#123a7a", op: 0.5, min: 60, max: 200 }, { c: "#06142e", op: 1, min: 40, max: 150 }].forEach((L, li) => {
      let x = li * 14 - 20;
      while (x < W) {
        const w = 26 + r() * 46, h = L.min + r() * (L.max - L.min);
        s += '<rect x="' + x.toFixed(0) + '" y="' + (H - h).toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + h.toFixed(0) + '" fill="' + L.c + '" opacity="' + L.op + '"/>';
        if (li === 1) {
          for (let wy = H - h + 10; wy < H - 8; wy += 14) {
            for (let wx = x + 6; wx < x + w - 6; wx += 10) {
              if (r() > 0.82) s += '<rect x="' + wx.toFixed(0) + '" y="' + wy.toFixed(0) + '" width="4" height="6" fill="#f6c64a" opacity=".55"/>';
            }
          }
        }
        x += w + 3;
      }
    });
    return s + "</svg>";
  }
  const sky = document.querySelector("[data-hero-skyline]");
  if (sky) sky.innerHTML = skyline();

  /* ----- Hero candlestick chart ----- */
  const chartEl = document.querySelector("[data-hero-chart]");
  const frames = { "1M": 22, "3M": 40, "1Y": 52 };
  function drawHero(tf) {
    const bars = Charts.ohlc(frames[tf], "vni-" + tf, 1180, 0.022, 0.03);
    chartEl.innerHTML = Charts.candles(bars, { w: 600, h: 240, animate: true });
  }
  if (chartEl) {
    drawHero("3M");
    document.querySelectorAll("[data-tf]").forEach((b) => {
      b.addEventListener("click", () => {
        document.querySelectorAll("[data-tf]").forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
        drawHero(b.dataset.tf);
      });
    });
    const vni = D.indices[0];
    document.querySelector("[data-hero-value]").textContent = fmt.index(vni.value);
    const pct = (vni.change / (vni.value - vni.change)) * 100;
    const ch = document.querySelector("[data-hero-change]");
    ch.textContent = fmt.change(vni.change) + " (" + fmt.pct(pct) + ")";
    ch.className = "chg num " + fmt.cls(vni.change);
  }

  /* ----- Featured courses ----- */
  const fc = document.querySelector("[data-featured-courses]");
  if (fc) fc.innerHTML = D.courses.slice(0, 4).map(courseCard).join("");

  /* ----- News by topic ----- */
  const newsEl = document.querySelector("[data-home-news]");
  function renderNews(topic) {
    const list = D.news.filter((n) => n.market === topic);
    const pool = list.length >= 4 ? list : list.concat(D.news.filter((n) => n.market !== topic));
    const [lead, ...rest] = pool;
    const tk = lead.ticker && D.tickers.find((t) => t.code === lead.ticker);
    newsEl.innerHTML =
      '<article class="panel news-feature">' +
      '<div class="news-thumb">' + Art.thumb(lead.art, "n" + lead.id, tk && tk.color) + "</div>" +
      '<div><h3><a href="tin-tuc.html' + (lead.ticker ? "?ma=" + lead.ticker : "") + '">' + escapeHtml(lead.title) + "</a></h3>" +
      '<p class="news-excerpt">' + escapeHtml(lead.excerpt) + '</p><p class="news-date"><time>' + lead.date + "</time></p></div></article>" +
      '<ul class="panel headline-list">' +
      rest
        .slice(0, 4)
        .map(
          (n) =>
            '<li><a href="tin-tuc.html' + (n.ticker ? "?ma=" + n.ticker : "") + '"><span class="hl-ico">' + icon("newspaper") + "</span><span>" + escapeHtml(n.title) + "<time>" + n.date + "</time></span></a></li>"
        )
        .join("") +
      "</ul>";
  }
  const tabList = document.querySelector("[data-home-news-tabs]");
  if (newsEl && tabList) {
    UI.tabs(tabList, renderNews);
    renderNews("thi-truong");
  }
})();
