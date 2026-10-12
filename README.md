# Đầu tư cùng Vũ — website tĩnh (HTML/CSS/JS)

Dựng lại 6 trang từ `design.jpeg` (ảnh cắt từng trang nằm ở `design-crops/`).

| Trang | URL | File gốc (sửa ở đây) |
|---|---|---|
| Trang chủ | `/` hoặc `/index.html` | `index.html` |
| Khóa học (lộ trình 5 cấp độ) | `/khoa-hoc/` hoặc `/khoa-hoc.html` | `khoa-hoc/index.html` |
| Tin tức theo mã cổ phiếu | `/tin-tuc/` hoặc `/tin-tuc.html` | `tin-tuc/index.html` |
| Mở tài khoản | `/mo-tai-khoan/` hoặc `/mo-tai-khoan.html` | `mo-tai-khoan/index.html` |
| Dashboard (sau đăng nhập) | `/dashboard/` hoặc `/dashboard.html` | `dashboard/index.html` |
| Premium | `/premium/` hoặc `/premium.html` | `premium/index.html` |

## Hai URL cho mỗi trang

Cả `/tin-tuc/` và `/tin-tuc.html` đều hiển thị trang đầy đủ, không redirect qua lại, không cần cấu hình server:

- `tin-tuc/index.html` là **bản gốc**. Mọi chỉnh sửa làm ở đây.
- `tin-tuc.html` ở thư mục gốc là **bản sinh ra** bằng `python3 scripts/sync-pages.py`, chỉ khác đường dẫn `../assets/` thành `assets/` và có thêm `<link rel="canonical">` trỏ về `/tin-tuc/` để công cụ tìm kiếm không coi là trùng nội dung.
- **Sửa xong một trang thì chạy lại `python3 scripts/sync-pages.py`**, nếu không hai bản sẽ lệch nhau.
- Link trong site luôn trỏ tới dạng `/slug/`. Link do JS sinh ra dùng `UI.url("khoa-hoc/?tab=all")`, tính từ vị trí `assets/js/ui.js`, nên đúng ở cả hai dạng URL và khi site đặt trong thư mục con.

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
