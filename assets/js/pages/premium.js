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
      '<div><span class="sector">' + a.sector + '</span><span class="lock-pill">' + icon("lock") + 'Premium</span><h3><a href="#" data-premium-link>' + a.title + "</a></h3><time>" + a.date + "</time></div></article>"
    );
  }).join("");

  function gate(user, compact) {
    const login = user ? "" : '<button class="btn btn--navy btn--sm" type="button" data-login>Đăng nhập</button>';
    const signup = '<a class="btn btn--gold btn--sm" href="' + url("mo-tai-khoan/") + '#dang-ky">Mở tài khoản</a>';
    if (compact) {
      return (
        '<div class="lock-box lock-box--row" tabindex="-1">' + icon("lock") +
        "<p><b>4 bài phân tích đang khóa.</b> " + (user ? "Nâng cấp Premium để đọc toàn bộ và mở thư viện báo cáo ngành." : "Đăng nhập hoặc mở tài khoản để đọc toàn bộ và mở thư viện báo cáo ngành.") + "</p>" +
        '<div class="row">' + login + signup + "</div></div>"
      );
    }
    const title = user ? "Nâng cấp Premium để đọc trọn bản tin" : "Đọc trọn bản tin với tài khoản Premium";
    const text = user
      ? "Mở tài khoản chứng khoán liên kết và nạp từ 50 triệu đồng để kích hoạt Premium miễn phí."
      : "Đăng nhập nếu bạn đã là thành viên, hoặc mở tài khoản để nhận quyền truy cập miễn phí.";
    return '<div class="lock-box" tabindex="-1">' + icon("lock") + "<h3>" + title + "</h3><p>" + text + '</p><div class="row">' + login + signup + "</div></div>";
  }

  function isUnlocked() {
    const u = auth.user();
    return !!(u && u.premium);
  }

  function applyLock() {
    const u = auth.user();
    const unlocked = isUnlocked();
    document.querySelectorAll("[data-lockable]").forEach((el) => {
      el.classList.toggle("is-locked", !unlocked);
      const slot = el.querySelector("[data-lock-gate]");
      if (slot) slot.innerHTML = unlocked ? "" : gate(u, el.hasAttribute("data-compact"));
    });
    document.querySelector("[data-lock-status]").innerHTML = unlocked
      ? icon("checkCircle") + "Bạn đang là thành viên Premium"
      : icon("lock") + "Cần tài khoản Premium";
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-premium-link]");
    if (!link) return;
    e.preventDefault();
    if (isUnlocked()) {
      toast("Bài viết đầy đủ sẽ hiển thị khi kết nối với hệ thống nội dung.", "info");
      return;
    }
    // Đang khóa: đưa người dùng tới hộp mời mở khóa gần nhất
    const box = link.closest("[data-lockable]")?.querySelector(".lock-box");
    if (box) {
      box.scrollIntoView({ behavior: "smooth", block: "center" });
      box.focus({ preventScroll: true });
    }
    toast("Bài này dành cho thành viên Premium.", "lock");
  });

  document.addEventListener("auth:change", applyLock);
  applyLock();
})();
