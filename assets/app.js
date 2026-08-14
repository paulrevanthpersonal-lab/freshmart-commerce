const PRODUCTS = [
  { id: "apple", name: "Honeycrisp apples", category: "Produce", price: 2.49, unit: "1 lb", icon: "🍎", tone: "coral", rank: 1 },
  { id: "avocado", name: "Hass avocados", category: "Produce", price: 4.29, unit: "bag of 4", icon: "🥑", tone: "lime", rank: 2 },
  { id: "bread", name: "Sourdough loaf", category: "Bakery", price: 3.89, unit: "18 oz", icon: "🥖", tone: "sand", rank: 3 },
  { id: "eggs", name: "Pasture-raised eggs", category: "Dairy", price: 5.79, unit: "dozen", icon: "🥚", tone: "cream", rank: 4 },
  { id: "milk", name: "Whole milk", category: "Dairy", price: 3.69, unit: "1 gallon", icon: "🥛", tone: "sky", rank: 5 },
  { id: "salmon", name: "Atlantic salmon", category: "Seafood", price: 8.99, unit: "1 lb", icon: "🐟", tone: "blue", rank: 6 },
  { id: "rice", name: "Jasmine rice", category: "Pantry", price: 4.49, unit: "2 lb", icon: "🍚", tone: "cream", rank: 7 },
  { id: "coffee", name: "Desert roast coffee", category: "Pantry", price: 12.50, unit: "12 oz", icon: "☕", tone: "coffee", rank: 8 }
];
const CATEGORIES = ["All", ...new Set(PRODUCTS.map(product => product.category))];
const core = window.FreshMartCore;
const saved = JSON.parse(localStorage.getItem("freshmart-cart") || "{}");
const state = { query: "", category: "All", sort: "featured", cart: saved, discount: false, delivery: true };
const $ = selector => document.querySelector(selector);

function persist() { localStorage.setItem("freshmart-cart", JSON.stringify(state.cart)); }
function notify(message) {
  const toast = $("#toast"); toast.textContent = message; toast.classList.add("visible");
  clearTimeout(notify.timer); notify.timer = setTimeout(() => toast.classList.remove("visible"), 1600);
}
function visibleProducts() {
  return core.sortProducts(core.filterProducts(PRODUCTS, state.query, state.category), state.sort);
}
function renderCategories() {
  $("#categories").innerHTML = CATEGORIES.map(category =>
    `<button class="category ${category === state.category ? "active" : ""}" data-category="${category}">${category}</button>`
  ).join("");
}
function renderProducts() {
  const products = visibleProducts();
  $("#resultCount").textContent = `${products.length} products`;
  $("#catalog").innerHTML = products.length ? products.map(product => `
    <article class="product-card">
      <div class="product-art ${product.tone}"><span>${product.icon}</span><small>${product.category}</small></div>
      <div class="product-info">
        <p class="unit">${product.unit}</p><h3>${product.name}</h3>
        <div><strong>${core.money(product.price)}</strong><button data-add="${product.id}">Add +</button></div>
      </div>
    </article>`).join("") : `<p class="empty-state">No market items match that search.</p>`;
}
function lines() {
  return Object.entries(state.cart).map(([id, quantity]) => ({ ...PRODUCTS.find(p => p.id === id), quantity })).filter(line => line.id);
}
function renderCart() {
  const items = lines();
  $("#cartCount").textContent = items.reduce((sum, item) => sum + item.quantity, 0);
  $("#cartItems").innerHTML = items.length ? items.map(item => `
    <article class="cart-line"><span class="cart-icon">${item.icon}</span><div><strong>${item.name}</strong><small>${core.money(item.price)} · ${item.unit}</small></div>
      <div class="stepper"><button aria-label="Remove one ${item.name}" data-step="-1" data-id="${item.id}">−</button><span>${item.quantity}</span><button aria-label="Add one ${item.name}" data-step="1" data-id="${item.id}">+</button></div>
    </article>`).join("") : `<div class="empty-basket"><span>◎</span><h3>Your basket is clear</h3><p>Add something fresh from the market shelf.</p></div>`;
  const totals = core.calculateTotals(items, state.discount);
  $("#subtotal").textContent = core.money(totals.subtotal); $("#tax").textContent = core.money(totals.tax);
  $("#discount").textContent = `−${core.money(totals.discount)}`; $("#total").textContent = core.money(totals.total);
  $("#discountRow").hidden = !state.discount;
}
function openCart() {
  $("#cartDrawer").classList.add("open"); $("#cartDrawer").setAttribute("aria-hidden", "false");
  $("#openCart").setAttribute("aria-expanded", "true"); $("#scrim").hidden = false; $("#closeCart").focus();
}
function closeCart() {
  $("#cartDrawer").classList.remove("open"); $("#cartDrawer").setAttribute("aria-hidden", "true");
  $("#openCart").setAttribute("aria-expanded", "false"); $("#scrim").hidden = true; $("#openCart").focus();
}
document.addEventListener("click", event => {
  const category = event.target.closest("[data-category]");
  if (category) { state.category = category.dataset.category; renderCategories(); renderProducts(); }
  const add = event.target.closest("[data-add]");
  if (add) { state.cart[add.dataset.add] = (state.cart[add.dataset.add] || 0) + 1; persist(); renderCart(); notify("Added to your basket"); }
  const step = event.target.closest("[data-step]");
  if (step) { const next = (state.cart[step.dataset.id] || 0) + Number(step.dataset.step); if (next <= 0) delete state.cart[step.dataset.id]; else state.cart[step.dataset.id] = next; persist(); renderCart(); }
});
$("#search").addEventListener("input", event => { state.query = event.target.value; renderProducts(); });
$("#sort").addEventListener("change", event => { state.sort = event.target.value; renderProducts(); });
$("#openCart").addEventListener("click", openCart); $("#closeCart").addEventListener("click", closeCart); $("#scrim").addEventListener("click", closeCart);
$("#toggleDelivery").addEventListener("click", event => { state.delivery = !state.delivery; event.target.previousElementSibling.textContent = state.delivery ? "Today · 5–7 PM" : "Pickup · after 4 PM"; event.target.textContent = state.delivery ? "Switch to pickup" : "Switch to delivery"; });
$("#applyPromo").addEventListener("click", () => { const code = $("#promo").value.trim().toUpperCase(); state.discount = code === "FRESH10"; renderCart(); notify(state.discount ? "FRESH10 applied" : "Try FRESH10 for this demo"); });
$("#checkout").addEventListener("click", () => notify(lines().length ? "Checkout is a demonstration" : "Your basket is empty"));
window.addEventListener("keydown", event => { if (event.key === "Escape" && $("#cartDrawer").classList.contains("open")) closeCart(); if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); $("#search").focus(); } });
renderCategories(); renderProducts(); renderCart();
