# Mobile-Shop

## Mobi House

Website bán điện thoại responsive, viết bằng HTML, CSS và JavaScript thuần. Không cần cài dependency hoặc build tool; mở `index.html` trực tiếp trong trình duyệt để trải nghiệm.

### Tính năng

- Tìm kiếm, lọc thương hiệu, khoảng giá và tình trạng hàng; sắp xếp theo giá hoặc tên.
- Xem chi tiết sản phẩm, lưu yêu thích và giỏ hàng được giữ trong trình duyệt.
- Áp mã `MOBI10`, tính phí giao hàng và điền biểu mẫu đặt hàng demo.
- Giao diện đăng nhập, đăng ký, quên mật khẩu và trạng thái tài khoản.
- Đăng ký nhận tin giao diện, không gửi dữ liệu ra máy chủ.

### Lưu ý

Đây là bản front-end demo. Đơn hàng, thanh toán và đăng ký nhận tin chưa kết nối backend. Giao diện tài khoản gọi API cùng origin: `GET /api/auth/me`, `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/forgot-password` và `POST /api/auth/logout`. Backend cần trả JSON `{ "user": { "name": "...", "email": "..." } }` khi đăng nhập/đăng ký thành công và quản lý session bằng cookie `HttpOnly`, `Secure`, `SameSite`; mật khẩu không được lưu ở trình duyệt. Dữ liệu giỏ hàng và yêu thích chỉ lưu trên thiết bị hiện tại. Ảnh sản phẩm và font chữ được tải từ Unsplash và Google Fonts.