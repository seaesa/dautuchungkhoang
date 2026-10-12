# Đầu tư cùng Vũ — website tĩnh (HTML/CSS/JS)

Dựng lại 6 trang từ `design.jpeg` (ảnh cắt từng trang nằm ở `design-crops/`).

| Trang | URL | File |
|---|---|---|
| Trang chủ | `/` | `index.html` |
| Khóa học (lộ trình 5 cấp độ) | `/khoa-hoc/` | `khoa-hoc/index.html` |
| Tin tức theo mã cổ phiếu | `/tin-tuc/` | `tin-tuc/index.html` |
| Mở tài khoản | `/mo-tai-khoan/` | `mo-tai-khoan/index.html` |
| Dashboard (sau đăng nhập) | `/dashboard/` | `dashboard/index.html` |
| Premium | `/premium/` | `premium/index.html` |

## URL không có `.html`

Không dùng cấu hình server (không `.htaccess`, nginx, `vercel.json`...):

- Mỗi trang là `index.html` trong thư mục riêng, nên mọi static server đều phục vụ được `/khoa-hoc/`.
- Các file `khoa-hoc.html`, `tin-tuc.html`... ở thư mục gốc chỉ còn là trang chuyển hướng bằng JS (`location.replace`, giữ nguyên `?query` và `#hash`), có `<meta refresh>` dự phòng khi tắt JS. Link cũ vẫn dùng được.
- Truy cập `/.../index.html` sẽ được `history.replaceState` rút gọn thành `/.../`.
- Link do JS sinh ra dùng `UI.url("khoa-hoc/?tab=all")`, tính từ gốc site dựa trên vị trí `assets/js/ui.js`, nên vẫn đúng khi site đặt trong thư mục con (ví dụ GitHub Pages).

## Chạy thử

```bash
python3 -m http.server 5173
# mở http://127.0.0.1:5173
```

Không cần build. Mở trực tiếp file `index.html` (giao thức `file://`) vẫn chạy, link sẽ tự trỏ tới `.../index.html`.

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
