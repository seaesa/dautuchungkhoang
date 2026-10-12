# Đầu tư cùng Vũ — website tĩnh (HTML/CSS/JS)

Dựng lại 6 trang từ `design.jpeg` (ảnh cắt từng trang nằm ở `design-crops/`).

| Trang | File |
|---|---|
| Trang chủ | `index.html` |
| Khóa học (lộ trình 5 cấp độ) | `khoa-hoc.html` |
| Tin tức theo mã cổ phiếu | `tin-tuc.html` |
| Mở tài khoản | `mo-tai-khoan.html` |
| Dashboard (sau đăng nhập) | `dashboard.html` |
| Premium | `premium.html` |

## Chạy thử

```bash
python3 -m http.server 5173
# mở http://127.0.0.1:5173
```

Mở trực tiếp file `index.html` cũng chạy được; không cần build.

## Cấu trúc

```
assets/
  css/core.css      tokens màu/chữ, header, footer, nút, tab, thẻ, modal, toast
  css/pages.css     style riêng của từng trang
  js/data.js        dữ liệu mẫu (chỉ số, mã CP, khóa học, tin tức, CTCK)
  js/ui.js          header/footer dùng chung, đăng nhập giả lập, icon, biểu đồ SVG, ảnh minh họa SVG
  js/pages/*.js     logic từng trang
  img/logo.svg
```

## Lưu ý khi đưa lên thật

- **Dữ liệu**: toàn bộ giá, chỉ số, tin tức trong `data.js` là dữ liệu minh họa. Thay bằng API thật (giá realtime, CMS tin tức).
- **Đăng nhập**: chỉ giả lập bằng `localStorage` (`dtcv-user`). Nút "Dùng tài khoản demo" đăng nhập với quyền Premium. Cần backend xác thực thật.
- **Khóa nội dung Premium**: hiện chỉ làm mờ ở phía trình duyệt. Nội dung trả phí phải được chặn từ server.
- **Logo công ty chứng khoán**: đang hiển thị dạng chữ. Dùng logo thật cần có thỏa thuận liên kết.
- **Form mở tài khoản**: đã validate phía client, chưa gửi đi đâu. Cần nối với CRM hoặc API của đối tác.
