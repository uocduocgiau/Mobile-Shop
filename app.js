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
  coupon: ""
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
  const discount = state.coupon === "MOBI10" ? Math.round(subtotal * .1) : 0;
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
  const total = subtotal + (subtotal >= 5000000 ? 0 : 30000) - (state.coupon === "MOBI10" ? Math.round(subtotal * .1) : 0);
  $("#checkoutContent").innerHTML = `<div class="checkout-content"><p class="eyebrow">MỘT BƯỚC CUỐI CÙNG</p><h2 id="checkoutTitle">Thông tin nhận hàng</h2><p>Điền thông tin để Mobi House chuẩn bị đơn hàng cho bạn.</p><form id="checkoutForm"><div class="checkout-fields"><label class="checkout-field">Họ và tên<input name="name" autocomplete="name" required placeholder="Nguyễn Minh Anh"></label><label class="checkout-field">Số điện thoại<input name="phone" type="tel" autocomplete="tel" pattern="[0-9+ ()-]{9,15}" required placeholder="09xx xxx xxx"></label><label class="checkout-field full">Địa chỉ nhận hàng<input name="address" autocomplete="street-address" required placeholder="Số nhà, đường, phường/xã, tỉnh/thành"></label><label class="checkout-field full">Phương thức thanh toán<select name="payment"><option>Thanh toán khi nhận hàng</option><option>Chuyển khoản ngân hàng</option><option>Thẻ tín dụng / trả góp 0%</option></select></label><label class="checkout-field full">Ghi chú<textarea name="note" placeholder="Thời gian nhận hàng hoặc lưu ý khác"></textarea></label></div><div class="checkout-review"><p><span>${state.cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm · giao hàng ${subtotal >= 5000000 ? "miễn phí" : money(30000)}</span><strong>${money(total)}</strong></p></div><button class="button button-dark checkout-submit" type="submit">Xác nhận đặt hàng <i data-lucide="arrow-right" aria-hidden="true"></i></button></form></div>`;
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
  } else if (target.id === "openCart") setCartOpen(true);
  else if (target.id === "closeCart" || target.id === "continueShopping") setCartOpen(false);
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
    navigator.clipboard?.writeText("MOBI10").then(() => showToast("Đã sao chép mã MOBI10.")).catch(() => showToast("Mã ưu đãi: MOBI10"));
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
  if (value === "MOBI10") {
    state.coupon = value;
    $("#couponMessage").textContent = "Áp dụng thành công: giảm 10% đơn hàng.";
  } else {
    state.coupon = "";
    $("#couponMessage").textContent = "Mã chưa hợp lệ. Thử mã MOBI10 nhé.";
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
  $("#checkoutContent").innerHTML = `<div class="success-content"><span class="success-mark"><i data-lucide="check" aria-hidden="true"></i></span><p class="eyebrow">ĐẶT HÀNG THÀNH CÔNG</p><h2>Cảm ơn ${name}!</h2><p>Đơn hàng <strong>${orderNumber}</strong> đã được ghi nhận. Nhân viên Mobi House sẽ liên hệ xác nhận sớm.</p><button class="button button-dark" id="finishOrder" type="button">Tiếp tục mua sắm</button></div>`;
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
renderProducts();
renderCart();
renderIcons();