/* =========================
   HELPER FUNCTIONS
========================= */
const select = (el) => document.querySelector(el);
const selectAll = (el) => document.querySelectorAll(el);

/* =========================
   NAVBAR TOGGLE (MOBILE)
========================= */
const header = select("[data-header]");
const nav = select("[data-navbar]");
const navOpenBtn = select("[data-nav-open-btn]");
const navCloseBtn = select("[data-nav-close-btn]");
const overlay = select("[data-overlay]");

if (navOpenBtn && navCloseBtn) {
  navOpenBtn.addEventListener("click", () => {
    nav.classList.add("active");
    overlay.classList.add("active");
  });

  navCloseBtn.addEventListener("click", () => {
    nav.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    nav.classList.remove("active");
    overlay.classList.remove("active");
  });
}

/* =========================
   STICKY HEADER + GO TOP
========================= */
const goTopBtn = select("[data-go-top]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

/* =========================
   SIMPLE CART (LOCALSTORAGE)
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCountEl = select("#cartCount");
const cartTotalEl = select("#cartTotal");

/* Update cart UI */
function updateCartUI() {
  if (!cartCountEl || !cartTotalEl) return;

  cartCountEl.textContent = cart.length;

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalEl.textContent = `Rs ${total.toFixed(2)}`;
}

/* Add to cart buttons */
selectAll(".card-action-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    if (!card) return;

    const title = card.querySelector(".h3")?.innerText || "Product";
    const priceText = card.querySelector(".card-price")?.innerText || "Rs0";
    const price = parseFloat(priceText.replace("Rs", ""));

    cart.push({ title, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUI();
    alert(`${title} added to cart`);
  });
});

/* =========================
   FAVORITES (LOCALSTORAGE)
========================= */
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

selectAll(".card-action-btn ion-icon[name='heart-outline']").forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.stopPropagation();

    const card = icon.closest(".product-card");
    const title = card.querySelector(".h3")?.innerText || "Product";

    if (!favorites.includes(title)) {
      favorites.push(title);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${title} added to favorites`);
    }
  });
});

/* =========================
   INIT
========================= */
updateCartUI();
