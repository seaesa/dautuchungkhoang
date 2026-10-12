/* Trang mở tài khoản */
(function () {
  const { icon, Charts, escapeHtml, setFieldError, url } = UI;
  const D = APP_DATA;

  const spark = document.querySelector("[data-phone-spark]");
  if (spark) spark.innerHTML = Charts.spark(Charts.walk(40, "phone", 100, 0.04, 0.004), { w: 200, h: 60, color: "#16a34a" });

  /* ----- Brokers ----- */
  const grid = document.querySelector("[data-brokers]");
  const selectedLabel = document.querySelector("[data-selected-broker]");
  grid.innerHTML = D.brokers
    .map(
      (b, i) =>
        '<div class="broker"><input type="radio" name="broker" id="bk-' + b.id + '" value="' + b.name + '"' + (i === 0 ? " checked" : "") + ">" +
        '<label for="bk-' + b.id + '"><span class="wm" style="color:' + b.color + ";background:" + b.bg + '">' + b.name + "</span><small>" + b.note + "</small>" +
        '<span class="tick">' + icon("check") + "</span></label></div>"
    )
    .join("");
  grid.addEventListener("change", (e) => {
    if (e.target.name === "broker") selectedLabel.textContent = e.target.value;
  });

  /* ----- Form ----- */
  const form = document.querySelector("[data-signup-form]");
  const consentErr = document.querySelector("[data-consent-error]");
  const PHONE = /^(0|\+?84)(3|5|7|8|9)\d{8}$/;
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate() {
    let ok = true;
    const name = form.fullname.value.trim();
    const phone = form.phone.value.replace(/[\s.-]/g, "");
    const email = form.email.value.trim();
    if (name.length < 2) { setFieldError(form.fullname, "Nhập họ và tên của bạn."); ok = false; } else setFieldError(form.fullname, "");
    if (!PHONE.test(phone)) { setFieldError(form.phone, "Số điện thoại cần 10 số, bắt đầu bằng 03, 05, 07, 08 hoặc 09."); ok = false; } else setFieldError(form.phone, "");
    if (email && !EMAIL.test(email)) { setFieldError(form.email, "Email chưa đúng định dạng, ví dụ ten@gmail.com."); ok = false; } else setFieldError(form.email, "");
    if (!form.consent.checked) { consentErr.textContent = "Đánh dấu đồng ý để chúng tôi có thể liên hệ hỗ trợ bạn."; ok = false; } else consentErr.textContent = "";
    return ok;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      const first = form.querySelector('[aria-invalid="true"]') || form.consent;
      first.focus();
      return;
    }
    const broker = selectedLabel.textContent;
    const name = form.fullname.value.trim();
    const box = document.querySelector("[data-signup]");
    box.innerHTML =
      '<div class="form-success" tabindex="-1">' + icon("checkCircle") +
      "<h2>Đã gửi đăng ký</h2>" +
      "<p>Cảm ơn " + escapeHtml(name) + ". Chuyên viên " + escapeHtml(broker) + " sẽ gọi cho bạn trong 15 phút để hướng dẫn eKYC.</p>" +
      '<p style="font-size:.875rem;color:var(--muted)">Trong lúc chờ, bạn có thể học bài đầu tiên của lộ trình.</p>' +
      '<a class="btn btn--navy" href="' + url("khoa-hoc/") + '">Học bài đầu tiên</a></div>';
    box.querySelector(".form-success").focus();
  });

  // Xóa lỗi khi người dùng sửa
  form.addEventListener("input", (e) => {
    if (e.target.getAttribute("aria-invalid") === "true") setFieldError(e.target, "");
    if (e.target.name === "consent") consentErr.textContent = "";
  });
})();
