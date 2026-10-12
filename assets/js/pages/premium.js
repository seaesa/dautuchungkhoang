/* Trang Premium */
(function () {
  const { icon, Charts, Art, auth, toast, url } = UI;
  const D = APP_DATA;

  const ANALYSES = [
    { sector: "Ngân hàng", code: "MBB", title: "MBB: Cơ hội tăng trưởng từ bán lẻ số", date: "10/10/2026", art: "building" },
    { sector: "Bất động sản", code: "VHM", title: "VHM: Triển vọng bàn giao năm 2027", date: "08/10/2026", art: "towers" },
    { sector: "Điện", code: "REE", title: "REE: Dòng tiền ổn định từ thủy điện", date: "06/10/2026", art: "building-2" },
    { sector: "Thép", code: "HPG", title: "HPG: Bước vào chu kỳ tăng trưởng mới", date: "03/10/2026", art: "skyline-night" },
  ];

  const today = new Date();
  document.querySelector("[data-today]").textContent = today.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

  const bannerArt = document.querySelector("[data-banner-art]");
  bannerArt.innerHTML = Charts.candles(Charts.ohlc(50, "premium", 100, 0.05, 0.03), { w: 1200, h: 220, up: "#f6c64a", down: "#b7791f", ma: false });
  bannerArt.style.opacity = ".3";
  bannerArt.style.maskImage = "linear-gradient(90deg, transparent 35%, #000 85%)";
  bannerArt.style.webkitMaskImage = bannerArt.style.maskImage;

  document.querySelector("[data-bulletin-art]").innerHTML = Art.thumb("skyline-night", "bulletin");

  document.querySelector("[data-analysis]").innerHTML = ANALYSES.map((a) => {
    const tk = D.tickers.find((t) => t.code === a.code);
    return (
      '<article class="panel analysis"><div class="thumb">' + Art.thumb(a.art, "pa" + a.code, tk && tk.color) + "</div>" +
      '<div><span class="sector">' + a.sector + '</span><h3><a href="#" data-premium-link>' + a.title + "</a></h3><time>" + a.date + "</time></div></article>"
    );
  }).join("");

  function overlay(user, compact) {
    const title = user ? "Nâng cấp để đọc nội dung này" : "Nội dung dành cho thành viên Premium";
    const text = user
      ? "Mở tài khoản chứng khoán liên kết và nạp từ 50 triệu đồng để kích hoạt Premium miễn phí."
      : "Đăng nhập nếu bạn đã là thành viên, hoặc mở tài khoản để nhận quyền truy cập miễn phí.";
    if (compact) {
      return (
        '<div class="lock-box lock-box--row">' + icon("lock") + "<p><b>Mở khóa 4 bài phân tích chuyên sâu</b> cùng thư viện báo cáo ngành.</p>" +
        (user ? "" : '<button class="btn btn--navy btn--sm" type="button" data-login>Đăng nhập</button>') +
        '<a class="btn btn--gold btn--sm" href="' + url("mo-tai-khoan/") + '#dang-ky">Mở tài khoản</a></div>'
      );
    }
    return (
      '<div class="lock-box">' + icon("lock") + "<h3>" + title + "</h3><p>" + text + '</p><div class="row">' +
      (user ? "" : '<button class="btn btn--navy" type="button" data-login>Đăng nhập</button>') +
      '<a class="btn btn--gold" href="' + url("mo-tai-khoan/") + '#dang-ky">Mở tài khoản</a></div></div>'
    );
  }

  function applyLock() {
    const u = auth.user();
    const unlocked = !!(u && u.premium);
    document.querySelectorAll("[data-lockable]").forEach((el) => {
      el.classList.toggle("is-locked", !unlocked);
      const content = el.querySelector(".lock-content");
      content.toggleAttribute("inert", !unlocked);
      content.setAttribute("aria-hidden", unlocked ? "false" : "true");
      el.querySelector("[data-lock-overlay]").innerHTML = unlocked ? "" : overlay(u, el.hasAttribute("data-compact"));
    });
    document.querySelector("[data-lock-status]").innerHTML = unlocked
      ? icon("checkCircle") + "Bạn đang là thành viên Premium"
      : icon("lock") + "Cần tài khoản Premium";
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-premium-link]")) {
      e.preventDefault();
      toast("Bài viết đầy đủ sẽ hiển thị khi kết nối với hệ thống nội dung.");
    }
  });

  document.addEventListener("auth:change", applyLock);
  applyLock();
})();
