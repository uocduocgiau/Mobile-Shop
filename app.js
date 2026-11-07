const products = [
  { id: "iphone-17-pro", name: "iPhone 17 Pro", brand: "Apple", price: 28990000, oldPrice: 31990000, badge: "BÁN CHẠY", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=82", bg: "#e9ebdc", storage: "256GB", color: "Titan Sa Mạc", screen: "6.3 inch", camera: "48MP", stock: true, rating: "4.9", reviews: 182, description: "Hiệu năng chuyên nghiệp trong thiết kế titan bền bỉ. Hệ thống camera Pro cho hình ảnh sắc nét trong mọi điều kiện ánh sáng." },
  { id: "samsung-s26-ultra", name: "Galaxy S26 Ultra", brand: "Samsung", price: 31990000, oldPrice: 33990000, badge: "MỚI VỀ", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=82", bg: "#e4eaf3", storage: "512GB", color: "Titan Xám", screen: "6.9 inch", camera: "200MP", stock: true, rating: "4.8", reviews: 96, description: "Màn hình lớn sống động, camera độ phân giải cao và bút S Pen tích hợp cho công việc lẫn sáng tạo." },
  { id: "xiaomi-15-ultra", name: "Xiaomi 15 Ultra", brand: "Xiaomi", price: 24990000, oldPrice: 27990000, badge: "-11%", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=82", bg: "#f0e5dc", storage: "512GB", color: "Đen", screen: "6.73 inch", camera: "50MP Leica", stock: true, rating: "4.8", reviews: 74, description: "Chất ảnh Leica giàu cảm xúc cùng hiệu năng flagship trong một thiết kế tinh tế, đậm chất nhiếp ảnh." },
  { id: "iphone-16", name: "iPhone 16", brand: "Apple", price: 19990000, oldPrice: 21990000, badge: "GIÁ TỐT", image: "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?auto=format&fit=crop&w=900&q=82", bg: "#e2efe9", storage: "128GB", color: "Xanh Lưu Ly", screen: "6.1 inch", camera: "48MP", stock: true, rating: "4.9", reviews: 213, description: "Chiếc iPhone cân bằng hoàn hảo cho mỗi ngày, với camera linh hoạt và nút điều khiển tiện dụng." },
  { id: "pixel-10-pro", name: "Google Pixel 10 Pro", brand: "Google", price: 23990000, oldPrice: null, badge: "ĐỘC QUYỀN", image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=900&q=82", bg: "#e5e6f4", storage: "256GB", color: "Porcelain", screen: "6.3 inch", camera: "50MP", stock: true, rating: "4.7", reviews: 48, description: "Trải nghiệm Android tinh gọn với những tính năng AI thông minh và camera computational photography." },
  { id: "samsung-z-flip7", name: "Galaxy Z Flip7", brand: "Samsung", price: 26990000, oldPrice: 28990000, badge: "QUÀ 2 TRIỆU", image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=900&q=82", bg: "#f1e4dc", storage: "256GB", color: "Coral Red", screen: "6.9 inch", camera: "50MP", stock: true, rating: "4.8", reviews: 61, description: "Gập gọn phong cách, mở ra không gian sử dụng rộng rãi. Màn hình ngoài linh hoạt cho mọi khoảnh khắc." },
  { id: "oppo-find-x8", name: "OPPO Find X8 Pro", brand: "OPPO", price: 22990000, oldPrice: 25990000, badge: "-12%", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=82", bg: "#e8ebdc", storage: "512GB", color: "Trắng Ngọc", screen: "6.78 inch", camera: "50MP Hasselblad", stock: true, rating: "4.7", reviews: 53, description: "Thiết kế thanh lịch, camera Hasselblad tông màu tự nhiên và pin bền bỉ cho ngày dài năng động." },
  { id: "redmi-note-15", name: "Redmi Note 15 Pro+", brand: "Xiaomi", price: 11990000, oldPrice: 13990000, badge: "GIÁ TỐT", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=82", bg: "#e8e4f0", storage: "256GB", color: "Tím Khói", screen: "6.67 inch", camera: "200MP", stock: false, rating: "4.6", reviews: 129, description: "Lựa chọn hiệu năng cao trong tầm giá dễ tiếp cận, trang bị màn hình sáng và camera độ phân giải lớn." }
];

const addedModels = [
  { id: "oneplus-13", name: "OnePlus 13", brand: "OnePlus", price: 24990000, storage: "512GB", color: "Đen Vũ Trụ", screen: "6.82 inch", camera: "50MP Hasselblad" },
  { id: "oneplus-13r", name: "OnePlus 13R", brand: "OnePlus", price: 16990000, storage: "256GB", color: "Đen", screen: "6.78 inch", camera: "50MP" },
  { id: "oneplus-nord-5", name: "OnePlus Nord 5", brand: "OnePlus", price: 12990000, storage: "256GB", color: "Xám", screen: "6.83 inch", camera: "50MP" },
  { id: "oneplus-nord-ce5", name: "OnePlus Nord CE5", brand: "OnePlus", price: 8990000, storage: "256GB", color: "Đen", screen: "6.77 inch", camera: "50MP" },
  { id: "oneplus-open", name: "OnePlus Open", brand: "OnePlus", price: 32990000, storage: "512GB", color: "Đen Ngọc", screen: "7.82 inch gập", camera: "48MP Hasselblad" },
  { id: "vivo-x200-pro", name: "vivo X200 Pro", brand: "Vivo", price: 29990000, storage: "512GB", color: "Xanh Titan", screen: "6.78 inch", camera: "50MP ZEISS" },
  { id: "vivo-x200", name: "vivo X200", brand: "Vivo", price: 21990000, storage: "256GB", color: "Đen", screen: "6.67 inch", camera: "50MP ZEISS" },
  { id: "vivo-v50", name: "vivo V50", brand: "Vivo", price: 13990000, storage: "256GB", color: "Hồng Mộng Mơ", screen: "6.77 inch", camera: "50MP ZEISS" },
  { id: "vivo-y300-pro", name: "vivo Y300 Pro", brand: "Vivo", price: 9990000, storage: "256GB", color: "Titan Bạc", screen: "6.77 inch", camera: "50MP" },
  { id: "vivo-y300", name: "vivo Y300", brand: "Vivo", price: 7490000, storage: "128GB", color: "Xanh Đại Dương", screen: "6.67 inch", camera: "50MP" },
  { id: "tecno-camon-40-premier", name: "TECNO Camon 40 Premier 5G", brand: "Tecno", price: 10990000, storage: "512GB", color: "Đen", screen: "6.67 inch", camera: "50MP Sony" },
  { id: "tecno-camon-40-pro", name: "TECNO Camon 40 Pro 5G", brand: "Tecno", price: 8490000, storage: "256GB", color: "Xanh Ngọc", screen: "6.78 inch", camera: "50MP" },
  { id: "tecno-pova-7-ultra", name: "TECNO Pova 7 Ultra 5G", brand: "Tecno", price: 7990000, storage: "256GB", color: "Đen", screen: "6.67 inch", camera: "108MP" },
  { id: "tecno-spark-40-pro-plus", name: "TECNO Spark 40 Pro+", brand: "Tecno", price: 5990000, storage: "256GB", color: "Trắng Ngọc", screen: "6.78 inch", camera: "50MP" },
  { id: "tecno-phantom-v-fold2", name: "TECNO Phantom V Fold2", brand: "Tecno", price: 24990000, storage: "512GB", color: "Xám", screen: "7.85 inch gập", camera: "50MP" },
  { id: "honor-magic7-pro", name: "HONOR Magic7 Pro", brand: "Honor", price: 26990000, storage: "512GB", color: "Đen", screen: "6.8 inch", camera: "50MP AI Falcon" },
  { id: "honor-magic-v3", name: "HONOR Magic V3", brand: "Honor", price: 32990000, storage: "512GB", color: "Xanh Lá", screen: "7.92 inch gập", camera: "50MP" },
  { id: "honor-400-pro", name: "HONOR 400 Pro", brand: "Honor", price: 17990000, storage: "512GB", color: "Đen Nguyệt Thực", screen: "6.7 inch", camera: "200MP AI" },
  { id: "honor-x9c", name: "HONOR X9c", brand: "Honor", price: 8490000, storage: "256GB", color: "Tím", screen: "6.78 inch", camera: "108MP" },
  { id: "honor-x8c", name: "HONOR X8c", brand: "Honor", price: 6990000, storage: "256GB", color: "Xanh Mây", screen: "6.7 inch", camera: "108MP" }
];

const addedProductImages = {
  OnePlus: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=82",
  Vivo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=82",
  Tecno: "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?auto=format&fit=crop&w=900&q=82",
  Honor: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=82"
};
const addedProductBackgrounds = { OnePlus: "#e6eadb", Vivo: "#dfe9ef", Tecno: "#efe7dc", Honor: "#e9e3ed" };
products.push(...addedModels.map((product, index) => ({
  ...product,
  oldPrice: null,
  badge: index % 5 === 0 ? "MỚI VỀ" : "CHÍNH HÃNG",
  image: addedProductImages[product.brand],
  bg: addedProductBackgrounds[product.brand],
  stock: true,
  rating: "4.7",
  reviews: 28 + index * 7,
  description: `${product.name} thuộc dòng ${product.brand} chính hãng, cấu hình ${product.storage} và camera ${product.camera}. Liên hệ Mobile Shop để xác nhận phiên bản, màu sắc và tồn kho.`
})));

const state = {
  category: "Tất cả",
  brands: new Set(),
  query: "",
  sort: "featured",
  maxPrice: 50000000,
  stockOnly: false,
  favoritesOnly: false,
  favorites: new Set(JSON.parse(localStorage.getItem("mobi-favorites") || "[]")),
  cart: JSON.parse(localStorage.getItem("mobi-cart") || "[]"),
  coupon: "",
  user: null
};

const $ = (selector, root = document) => root.querySelector(selector);
const money = (amount) => new Intl.NumberFormat("vi-VN").format(amount) + "₫";
const safeText = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
let toastTimer;

function renderIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

async function authRequest(action, payload) {
  if (location.protocol === "file:") throw new Error("Website chưa cấu hình API tài khoản.");
  const options = { method: payload ? "POST" : "GET", credentials: "include", headers: { "Content-Type": "application/json" } };
  if (payload) options.body = JSON.stringify(payload);
  let response;
  try {
    response = await fetch(`/api/auth/${action}`, options);
  } catch {
    throw new Error("Dịch vụ tài khoản chưa được kết nối. Vui lòng triển khai backend đăng nhập trước.");
  }
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 0 || response.status === 404) throw new Error("Website chưa cấu hình API tài khoản.");
    const detail = typeof result.detail === "string" ? result.detail : "";
    throw new Error(result.message || detail || "Không thể xử lý yêu cầu. Vui lòng thử lại.");
  }
  return result;
}

function renderAccount() {
  const label = $("#accountButtonLabel");
  const name = state.user?.name || "Đăng nhập";
  label.textContent = state.user ? name.split(" ")[0] : "Đăng nhập";
  $("#accountButton").classList.toggle("is-authenticated", Boolean(state.user));
  $("#accountButton").setAttribute("aria-label", state.user ? `Tài khoản của ${name}` : "Đăng nhập tài khoản");
  $("#accountPanelName").textContent = name;
  $("#accountPanelEmail").textContent = state.user?.email || "";
  $("#accountAvatar").textContent = name.trim().charAt(0).toLocaleUpperCase("vi") || "M";
}

function setAuthStatus(message = "", kind = "error") {
  const status = $("#authStatus");
  status.textContent = message;
  status.classList.toggle("success", kind === "success");
  status.classList.toggle("error", kind === "error");
}

function setAuthView(view) {
  const views = {
    login: ["Đăng nhập", "Đăng nhập để theo dõi đơn hàng và nhận ưu đãi riêng."],
    register: ["Tạo tài khoản", "Tham gia Mobile Shop để trải nghiệm mua sắm thuận tiện hơn."],
    forgot: ["Đặt lại mật khẩu", "Nhập email, chúng tôi sẽ gửi hướng dẫn nếu tài khoản tồn tại."],
    reset: ["Tạo mật khẩu mới", "Chọn mật khẩu mới có ít nhất 8 ký tự."],
    account: ["Tài khoản của bạn", "Thông tin tài khoản đang đăng nhập."]
  };
  $("#authTitle").textContent = views[view][0];
  $("#authDescription").textContent = views[view][1];
  $("#authTabs").hidden = view === "forgot" || view === "reset" || view === "account";
  $("[data-auth-panel='login']").hidden = view !== "login";
  $("[data-auth-panel='register']").hidden = view !== "register";
  $("[data-auth-panel='forgot']").hidden = view !== "forgot";
  $("[data-auth-panel='reset']").hidden = view !== "reset";
  $("[data-auth-panel='account']").hidden = view !== "account";
  document.querySelectorAll(".auth-password input").forEach((input) => {
    input.value = "";
    input.type = "password";
  });
  document.querySelectorAll(".password-toggle").forEach((toggle) => {
    toggle.setAttribute("aria-label", "Hiện mật khẩu");
    toggle.title = "Hiện mật khẩu";
    toggle.innerHTML = '<i data-lucide="eye" aria-hidden="true"></i>';
  });
  document.querySelectorAll("[data-auth-tab]").forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.authTab === view)));
  setAuthStatus();
  renderIcons();
}

function openAuthDialog() {
  setAuthView(state.user ? "account" : "login");
  $("#authDialog").showModal();
  $(state.user ? "#logoutButton" : "#authLoginForm input").focus();
}

async function restoreAuthSession() {
  try {
    const result = await authRequest("me");
    state.user = result.user || null;
    renderAccount();
  } catch {
    state.user = null;
  }
}

async function submitAuthForm(form) {
  const formData = new FormData(form);
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  setAuthStatus("Đang xử lý...");
  try {
    if (form.id === "authLoginForm") {
      const email = formData.get("email").trim();
      const result = await authRequest("login", { email, password: formData.get("password"), remember: formData.has("remember") });
      state.user = result.user || { name: email.split("@")[0], email };
      renderAccount();
      setAuthView("account");
    } else if (form.id === "authRegisterForm") {
      const result = await authRequest("register", { name: formData.get("name").trim(), email: formData.get("email").trim(), password: formData.get("password"), terms: formData.has("terms") });
      state.user = result.user || { name: formData.get("name").trim(), email: formData.get("email").trim() };
      renderAccount();
      setAuthView("account");
    } else if (form.id === "authResetForm") {
      const password = formData.get("password");
      if (password !== formData.get("confirmPassword")) throw new Error("Hai mật khẩu chưa trùng khớp.");
      await authRequest("reset-password", { token: formData.get("token"), password });
      setAuthView("login");
      setAuthStatus("Mật khẩu đã cập nhật. Hãy đăng nhập bằng mật khẩu mới.", "success");
    } else {
      await authRequest("forgot-password", { email: formData.get("email").trim() });
      setAuthStatus("Nếu email có tài khoản, hướng dẫn đặt lại mật khẩu sẽ được gửi đến hộp thư.", "success");
    }
  } catch (error) {
    setAuthStatus(error.message);
  } finally {
    submitButton.disabled = false;
  }
}

async function signOut() {
  try {
    await authRequest("logout", {});
    state.user = null;
    renderAccount();
    setAuthView("login");
  } catch (error) {
    setAuthStatus(error.message);
  }
}

function saveState() {
  localStorage.setItem("mobi-favorites", JSON.stringify([...state.favorites]));
  localStorage.setItem("mobi-cart", JSON.stringify(state.cart));
}

function renderCategories() {
  const brands = ["Tất cả", ...new Set(products.map((product) => product.brand))];
  $("#categoryList").innerHTML = brands.map((brand) => `<button class="category-button ${state.category === brand ? "active" : ""}" data-category="${safeText(brand)}" type="button">${safeText(brand)}</button>`).join("");
  const counts = products.reduce((result, product) => ({ ...result, [product.brand]: (result[product.brand] || 0) + 1 }), {});
  $("#brandOptions").innerHTML = Object.entries(counts).map(([brand, count]) => `<label class="brand-option"><input type="checkbox" value="${safeText(brand)}" ${state.brands.has(brand) ? "checked" : ""}><span class="brand-check"></span>${safeText(brand)}<span class="brand-total">${count}</span></label>`).join("");
}

function renderRepairOptions() {
  const brands = [...new Set(products.map((product) => product.brand))].sort((a, b) => a.localeCompare(b, "vi"));
  $("#repairBrand").innerHTML = `<option value="">Chọn hãng</option>${brands.map((brand) => `<option value="${safeText(brand)}">${safeText(brand)}</option>`).join("")}`;
  updateRepairModels();
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  $("#repairDate").min = today.toISOString().slice(0, 10);
}

function updateRepairModels() {
  const selectedBrand = $("#repairBrand").value;
  const models = [...new Set(products.filter((product) => !selectedBrand || product.brand === selectedBrand).map((product) => product.name))];
  $("#repairModels").innerHTML = models.map((model) => `<option value="${safeText(model)}"></option>`).join("");
}

function setRepairStatus(message = "", kind = "error") {
  const status = $("#repairStatus");
  status.textContent = message;
  status.classList.toggle("success", kind === "success");
  status.classList.toggle("error", kind === "error");
}

function selectRepairType(type) {
  $("#repairType").value = type;
  document.querySelectorAll("[data-repair-type]").forEach((button) => button.classList.toggle("active", button.dataset.repairType === type));
  setRepairStatus();
}

async function submitRepairForm(form) {
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  setRepairStatus("Đang gửi yêu cầu...");
  const data = Object.fromEntries(new FormData(form));
  try {
    const response = await fetch("/api/repairs", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail = typeof result.detail === "string" ? result.detail : "";
      throw new Error(detail || "Chưa gửi được yêu cầu. Vui lòng kiểm tra thông tin và thử lại.");
    }
    form.reset();
    selectRepairType("battery");
    updateRepairModels();
    setRepairStatus(`Đã nhận lịch ${result.booking.code}. Mobile Shop sẽ gọi xác nhận ngày hẹn.`, "success");
  } catch (error) {
    setRepairStatus(error.message || "Không kết nối được máy chủ. Hãy thử lại sau.");
  } finally {
    submitButton.disabled = false;
  }
}

function filteredProducts() {
  let visible = products.filter((product) => {
    const text = `${product.name} ${product.brand} ${product.storage}`.toLocaleLowerCase("vi");
    return (state.category === "Tất cả" || product.brand === state.category)
      && (!state.brands.size || state.brands.has(product.brand))
      && (!state.query || text.includes(state.query.toLocaleLowerCase("vi")))
      && product.price <= state.maxPrice
      && (!state.stockOnly || product.stock)
      && (!state.favoritesOnly || state.favorites.has(product.id));
  });
  if (state.sort === "price-asc") visible.sort((a, b) => a.price - b.price);
  if (state.sort === "price-desc") visible.sort((a, b) => b.price - a.price);
  if (state.sort === "name") visible.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  return visible;
}

function productCard(product, index) {
  const favorite = state.favorites.has(product.id);
  return `<article class="product-card" style="--product-bg:${product.bg};animation-delay:${Math.min(index, 6) * 45}ms">
    <div class="product-image-wrap">
      <span class="product-badge ${product.badge.startsWith("-") ? "sale" : ""}">${safeText(product.badge)}</span>
      <button class="favorite-button ${favorite ? "active" : ""}" data-favorite="${product.id}" type="button" aria-label="${favorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}" title="${favorite ? "Bỏ yêu thích" : "Yêu thích"}"><i data-lucide="heart" aria-hidden="true"></i></button>
      <img src="${product.image}" alt="Xem ${safeText(product.name)}" data-detail="${product.id}" role="button" tabindex="0" loading="lazy">
      <button class="quick-add" data-add="${product.id}" type="button" ${product.stock ? "" : "disabled"}><i data-lucide="shopping-bag" aria-hidden="true"></i>${product.stock ? "Thêm vào giỏ" : "Tạm hết hàng"}</button>
    </div>
    <div class="product-info"><p class="product-brand">${safeText(product.brand)}</p><h3 class="product-title" data-detail="${product.id}" tabindex="0">${safeText(product.name)}</h3><div class="product-specs"><span>${safeText(product.storage)}</span><span class="spec-dot"></span><span>${safeText(product.color)}</span></div><div class="product-price-row"><strong class="product-price">${money(product.price)}</strong>${product.oldPrice ? `<span class="old-price">${money(product.oldPrice)}</span>` : ""}<span class="product-stock ${product.stock ? "" : "out"}">${product.stock ? "Còn hàng" : "Hết hàng"}</span></div></div>
  </article>`;
}

function renderProducts() {
  const visible = filteredProducts();
  $("#productGrid").innerHTML = visible.map(productCard).join("");
  $("#productGrid").hidden = !visible.length;
  $("#emptyState").hidden = Boolean(visible.length);
  $("#resultsCount").textContent = `${visible.length} sản phẩm`;
  $("#showFavorites").classList.toggle("active", state.favoritesOnly);
  const filters = Number(state.maxPrice < 50000000) + Number(state.stockOnly) + Number(state.brands.size > 0);
  $("#filterCount").textContent = filters ? `(${filters})` : "";
  renderIcons();
}

function renderCart() {
  const quantity = state.cart.reduce((total, item) => total + item.quantity, 0);
  $("#cartCount").textContent = quantity;
  $("#drawerItemCount").textContent = quantity ? `(${quantity})` : "";
  $("#cartEmpty").hidden = state.cart.length > 0;
  $("#cartSummary").hidden = !state.cart.length;
  $("#cartItems").innerHTML = state.cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return "";
    return `<article class="cart-item"><div class="cart-item-image"><img src="${product.image}" alt="" loading="lazy"></div><div class="cart-item-copy"><h3>${safeText(product.name)}</h3><p>${safeText(product.storage)} · ${safeText(product.color)}</p><div class="quantity-control"><button type="button" data-quantity="${product.id}" data-delta="-1" aria-label="Giảm số lượng">−</button><span>${item.quantity}</span><button type="button" data-quantity="${product.id}" data-delta="1" aria-label="Tăng số lượng">+</button></div></div><div class="cart-item-end"><strong>${money(product.price * item.quantity)}</strong><button class="remove-item" data-remove="${product.id}" type="button" aria-label="Xóa ${safeText(product.name)}"><i data-lucide="trash-2" aria-hidden="true"></i></button></div></article>`;
  }).join("");
  const subtotal = state.cart.reduce((total, item) => total + (products.find((product) => product.id === item.id)?.price || 0) * item.quantity, 0);
  const discount = ["SHOP10", "MOBI10"].includes(state.coupon) ? Math.round(subtotal * .1) : 0;
  const shipping = subtotal >= 5000000 ? 0 : 30000;
  $("#subtotalValue").textContent = money(subtotal);
  $("#shippingValue").textContent = shipping ? money(shipping) : "Miễn phí";
  $("#discountRow").hidden = !discount;
  $("#discountValue").textContent = `-${money(discount)}`;
  $("#totalValue").textContent = money(subtotal + shipping - discount);
  renderIcons();
}

function setFavorite(productId) {
  if (state.favorites.has(productId)) state.favorites.delete(productId);
  else state.favorites.add(productId);
  saveState();
  renderProducts();
}

function addToCart(productId) {
  const product = products.find((entry) => entry.id === productId);
  if (!product?.stock) return showToast("Sản phẩm đang tạm hết hàng.");
  const existing = state.cart.find((item) => item.id === productId);
  if (existing) existing.quantity += 1;
  else state.cart.push({ id: productId, quantity: 1 });
  saveState();
  renderCart();
  showToast(`${product.name} đã được thêm vào giỏ hàng.`);
}

function setCartOpen(open) {
  $("#overlay").hidden = !open;
  $("#cartDrawer").classList.toggle("open", open);
  $("#cartDrawer").setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
  if (open) $("#closeCart").focus();
}

function openProduct(productId) {
  const product = products.find((entry) => entry.id === productId);
  if (!product) return;
  $("#productDetail").innerHTML = `<div class="product-detail-layout"><div class="detail-image" style="background:${product.bg}"><img src="${product.image}" alt="${safeText(product.name)}"></div><div class="detail-copy"><p class="eyebrow">${safeText(product.brand)} · CHÍNH HÃNG</p><h2>${safeText(product.name)}</h2><div class="detail-rating">★★★★★ <span>${product.rating} · ${product.reviews} đánh giá</span></div><p class="detail-price">${money(product.price)}</p><p class="detail-description">${safeText(product.description)}</p><div class="detail-specs"><div>Bộ nhớ<strong>${safeText(product.storage)}</strong></div><div>Màu sắc<strong>${safeText(product.color)}</strong></div><div>Màn hình<strong>${safeText(product.screen)}</strong></div><div>Camera<strong>${safeText(product.camera)}</strong></div></div><button class="button button-dark detail-add" data-detail-add="${product.id}" type="button" ${product.stock ? "" : "disabled"}>${product.stock ? "Thêm vào giỏ hàng" : "Tạm hết hàng"}<i data-lucide="arrow-right" aria-hidden="true"></i></button></div></div>`;
  $("#productDialog").showModal();
  renderIcons();
}

function openCheckout() {
  if (!state.cart.length) return;
  const subtotal = state.cart.reduce((total, item) => total + (products.find((product) => product.id === item.id)?.price || 0) * item.quantity, 0);
  const discount = ["SHOP10", "MOBI10"].includes(state.coupon) ? Math.round(subtotal * .1) : 0;
  const total = subtotal + (subtotal >= 5000000 ? 0 : 30000) - discount;
  $("#checkoutContent").innerHTML = `<div class="checkout-content">
    <p class="eyebrow">MỘT BƯỚC CUỐI CÙNG</p><h2 id="checkoutTitle">Thông tin nhận hàng</h2>
    <p>Điền thông tin để Mobile Shop chuẩn bị đơn hàng cho bạn.</p>
    <form id="checkoutForm"><div class="checkout-fields">
      <label class="checkout-field">Họ và tên<input name="name" autocomplete="name" required placeholder="Nguyễn Minh Anh"></label>
      <label class="checkout-field">Số điện thoại<input name="phone" type="tel" autocomplete="tel" pattern="[0-9+ ()-]{9,15}" required placeholder="09xx xxx xxx"></label>
      <label class="checkout-field full">Địa chỉ nhận hàng<input name="address" autocomplete="street-address" required placeholder="Số nhà, đường, phường/xã, tỉnh/thành"></label>
      <label class="checkout-field full">Phương thức thanh toán<select name="payment"><option>Thanh toán khi nhận hàng</option><option>Chuyển khoản ngân hàng</option><option>Thẻ tín dụng / trả góp 0%</option></select></label>
      <label class="checkout-field full">Ghi chú<textarea name="note" placeholder="Thời gian nhận hàng hoặc lưu ý khác"></textarea></label>
    </div><div class="checkout-review"><p><span>${state.cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm · giao hàng ${subtotal >= 5000000 ? "miễn phí" : money(30000)}</span><strong>${money(total)}</strong></p></div>
    <button class="button button-dark checkout-submit" type="submit">Xác nhận đặt hàng <i data-lucide="arrow-right" aria-hidden="true"></i></button></form></div>`;
  $("#checkoutDialog").showModal();
  renderIcons();
}

function resetFilters() {
  state.category = "Tất cả";
  state.brands.clear();
  state.query = "";
  state.maxPrice = 50000000;
  state.stockOnly = false;
  state.favoritesOnly = false;
  $("#searchInput").value = "";
  $("#priceRange").value = state.maxPrice;
  $("#stockOnly").checked = false;
  $("#priceValue").textContent = "Dưới 50 triệu";
  renderCategories();
  renderProducts();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, [data-detail]");
  if (!target) return;
  if (target.dataset.category) {
    state.category = target.dataset.category;
    renderCategories();
    renderProducts();
  } else if (target.dataset.favorite) setFavorite(target.dataset.favorite);
  else if (target.dataset.add) addToCart(target.dataset.add);
  else if (target.dataset.detail) openProduct(target.dataset.detail);
  else if (target.dataset.detailAdd) {
    addToCart(target.dataset.detailAdd);
    $("#productDialog").close();
  } else if (target.dataset.quantity) {
    const item = state.cart.find((entry) => entry.id === target.dataset.quantity);
    if (item) item.quantity = Math.max(1, item.quantity + Number(target.dataset.delta));
    saveState();
    renderCart();
  } else if (target.dataset.remove) {
    state.cart = state.cart.filter((item) => item.id !== target.dataset.remove);
    saveState();
    renderCart();
  } else if (target.dataset.repairType) selectRepairType(target.dataset.repairType);
  else if (target.id === "openCart") setCartOpen(true);
  else if (target.id === "closeCart" || target.id === "continueShopping") setCartOpen(false);
  else if (target.id === "accountButton") openAuthDialog();
  else if (target.id === "closeAuth") $("#authDialog").close();
  else if (target.dataset.authTab) setAuthView(target.dataset.authTab);
  else if (target.dataset.authView) setAuthView(target.dataset.authView);
  else if (target.dataset.passwordToggle) {
    const input = $(`#${target.dataset.passwordToggle}`);
    input.type = input.type === "password" ? "text" : "password";
    const visible = input.type === "text";
    target.setAttribute("aria-label", visible ? "Ẩn mật khẩu" : "Hiện mật khẩu");
    target.title = visible ? "Ẩn mật khẩu" : "Hiện mật khẩu";
    target.innerHTML = `<i data-lucide="${visible ? "eye-off" : "eye"}" aria-hidden="true"></i>`;
    renderIcons();
  } else if (target.id === "logoutButton") signOut();
  else if (target.id === "checkoutButton") openCheckout();
  else if (target.id === "closeProduct") $("#productDialog").close();
  else if (target.id === "closeCheckout") $("#checkoutDialog").close();
  else if (target.id === "filterToggle") {
    const panel = $("#filterPanel");
    panel.hidden = !panel.hidden;
    target.setAttribute("aria-expanded", String(!panel.hidden));
  } else if (target.id === "showFavorites" || target.id === "favoritesShortcut") {
    state.favoritesOnly = !state.favoritesOnly;
    state.category = "Tất cả";
    window.location.hash = "products";
    renderCategories();
    renderProducts();
  } else if (target.id === "clearFilters" || target.id === "emptyReset") resetFilters();
  else if (target.id === "copyCoupon") {
    navigator.clipboard?.writeText("SHOP10").then(() => showToast("Đã sao chép mã SHOP10.")).catch(() => showToast("Mã ưu đãi: SHOP10"));
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-detail]")) {
    event.preventDefault();
    openProduct(event.target.dataset.detail);
  }
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    $("#searchInput").focus();
  }
  if (event.key === "Escape" && $("#cartDrawer").classList.contains("open")) setCartOpen(false);
});

$("#searchInput").addEventListener("input", (event) => { state.query = event.target.value.trim(); renderProducts(); });
$("#repairBrand").addEventListener("change", updateRepairModels);
$("#repairForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.reportValidity()) submitRepairForm(event.target);
});
$("#authContent").addEventListener("submit", (event) => {
  if (!["authLoginForm", "authRegisterForm", "authForgotForm", "authResetForm"].includes(event.target.id)) return;
  event.preventDefault();
  submitAuthForm(event.target);
});
$("#sortSelect").addEventListener("change", (event) => { state.sort = event.target.value; renderProducts(); });
$("#brandOptions").addEventListener("change", (event) => {
  if (event.target.matches("input")) {
    if (event.target.checked) state.brands.add(event.target.value);
    else state.brands.delete(event.target.value);
    renderProducts();
  }
});
$("#priceRange").addEventListener("input", (event) => {
  state.maxPrice = Number(event.target.value);
  $("#priceValue").textContent = `Dưới ${Math.round(state.maxPrice / 1000000)} triệu`;
  renderProducts();
});
$("#stockOnly").addEventListener("change", (event) => { state.stockOnly = event.target.checked; renderProducts(); });
$("#overlay").addEventListener("click", () => setCartOpen(false));
$("#couponForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const value = $("#couponInput").value.trim().toUpperCase();
  if (["SHOP10", "MOBI10"].includes(value)) {
    state.coupon = value;
    $("#couponMessage").textContent = "Áp dụng thành công: giảm 10% đơn hàng.";
  } else {
    state.coupon = "";
    $("#couponMessage").textContent = "Mã chưa hợp lệ. Thử mã SHOP10 nhé.";
  }
  renderCart();
});
$("#newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  $("#newsletterMessage").textContent = "Cảm ơn bạn! Ưu đãi mới sẽ được gửi đến hộp thư.";
  $("#emailInput").value = "";
});
$("#checkoutContent").addEventListener("submit", (event) => {
  if (event.target.id !== "checkoutForm") return;
  event.preventDefault();
  const formData = new FormData(event.target);
  const name = safeText(formData.get("name").trim());
  const orderNumber = `MH${Date.now().toString().slice(-7)}`;
  $("#checkoutContent").innerHTML = `<div class="success-content"><span class="success-mark"><i data-lucide="check" aria-hidden="true"></i></span><p class="eyebrow">ĐẶT HÀNG THÀNH CÔNG</p><h2>Cảm ơn ${name}!</h2><p>Đơn hàng <strong>${orderNumber}</strong> đã được ghi nhận. Nhân viên Mobile Shop sẽ liên hệ xác nhận sớm.</p><button class="button button-dark" id="finishOrder" type="button">Tiếp tục mua sắm</button></div>`;
  state.cart = [];
  state.coupon = "";
  saveState();
  renderCart();
  renderIcons();
});
$("#checkoutContent").addEventListener("click", (event) => {
  if (event.target.closest("#finishOrder")) {
    $("#checkoutDialog").close();
    setCartOpen(false);
  }
});
$("#productGrid").addEventListener("error", (event) => {
  if (event.target.tagName === "IMG") event.target.classList.add("image-unavailable");
}, true);

renderCategories();
renderRepairOptions();
renderProducts();
renderCart();
renderAccount();
renderIcons();
window.iconLibraryReady?.then(renderIcons);
if (location.protocol !== "file:") restoreAuthSession();
const resetToken = new URLSearchParams(location.hash.slice(1)).get("reset_token");
if (resetToken) {
  $("#authResetToken").value = resetToken;
  setAuthView("reset");
  $("#authDialog").showModal();
  history.replaceState(null, "", location.pathname);
}