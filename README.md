# Mobile-Shop

## Mobi House

[Deploy lên Render](https://render.com/deploy?repo=https://github.com/uocduocgiau/Mobile-Shop)

Website bán điện thoại responsive, viết bằng HTML, CSS và JavaScript thuần. Không cần cài dependency hoặc build tool; mở `index.html` trực tiếp trong trình duyệt để trải nghiệm.

### Tính năng

- Tìm kiếm, lọc thương hiệu, khoảng giá và tình trạng hàng; sắp xếp theo giá hoặc tên.
- Xem chi tiết sản phẩm, lưu yêu thích và giỏ hàng được giữ trong trình duyệt.
- Áp mã `MOBI10`, tính phí giao hàng và điền biểu mẫu đặt hàng demo.
- Giao diện đăng nhập, đăng ký, quên mật khẩu và trạng thái tài khoản.
- Đăng ký nhận tin giao diện, không gửi dữ liệu ra máy chủ.

### Lưu ý

Website có API FastAPI trong `server.py`, lưu tài khoản trong SQLite, băm mật khẩu, cấp session cookie `HttpOnly`, giới hạn thử đăng nhập và hỗ trợ đăng xuất. Các API tài khoản gồm `GET /api/auth/me`, `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/logout`, `POST /api/auth/forgot-password` và `POST /api/auth/reset-password`. Email đặt lại mật khẩu cần SMTP; cấu hình bằng các biến môi trường trong `render.yaml` và đặt `PUBLIC_ORIGIN` thành URL HTTPS của website.

Để chạy local, cài Python 3.11 trở lên, sau đó chạy `pip install -r requirements.txt` và `uvicorn server:app --reload`. Chạy test bằng `pip install -r requirements-dev.txt` rồi `pytest -q`.

Trên Render, tạo Blueprint từ `render.yaml`, sau đó cấu hình `PUBLIC_ORIGIN` thành URL HTTPS mà Render cấp. Điền `SMTP_HOST`, `SMTP_PORT`, `SMTP_FROM`, `SMTP_USERNAME` và `SMTP_PASSWORD` để bật gửi email khôi phục; không commit các giá trị bí mật vào Git. Blueprint dùng gói Starter và persistent disk để database SQLite tồn tại qua các lần deploy; Render có thể tính phí cho các tài nguyên này. GitHub Pages không thể chạy backend; hãy phục vụ frontend và API từ cùng origin để cookie hoạt động an toàn. Đơn hàng/thanh toán và đăng ký nhận tin vẫn là demo; dữ liệu giỏ hàng/yêu thích lưu trên thiết bị. Ảnh và font tải từ Unsplash, Google Fonts.