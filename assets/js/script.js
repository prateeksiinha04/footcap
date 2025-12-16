'use strict';

/* =========================
   AUTH
========================= */
const user = localStorage.getItem("loggedInUser");

function getCartKey() {
  return user ? `cart_${user}` : null;
}

/* =========================
   CART STORAGE
========================= */
let cart = [];

if (user) {
  cart = JSON.parse(localStorage.getItem(getCartKey())) || [];
}

/* =========================
   ADD TO CART
========================= */
function addToCart(product) {
  if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  cart.push(product);
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
  updateCartUI();
  alert("Added to cart");
}

/* =========================
   REMOVE FROM CART
========================= */
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
  renderCart();
  updateCartUI();
}

/* =========================
   UPDATE HEADER CART
========================= */
function updateCartUI() {
  const count = document.getElementById("cartCount");
  const totalText = document.getElementById("cartTotal");

  let total = cart.reduce((sum, item) => sum + item.price, 0);

  if (count) count.textContent = cart.length;
  if (totalText) totalText.textContent = `Rs ${total.toFixed(2)}`;
}

/* =========================
   RENDER CART PAGE
========================= */
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const grandTotal = document.getElementById("cartGrandTotal");

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `<tr><td colspan="3">Cart is empty</td></tr>`;
    grandTotal.textContent = "";
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart.map((item, i) => {
    total += item.price;
    return `
      <tr>
        <td>${item.name}</td>
        <td>Rs ${item.price.toFixed(2)}</td>
        <td>
          <button class="btn btn-secondary" onclick="removeFromCart(${i})">
            Remove
          </button>
        </td>
      </tr>
    `;
  }).join("");

  grandTotal.textContent = `Total: Rs ${total.toFixed(2)}`;
}
/* ======================
   FAVORITES (WISHLIST)
====================== */
const favKey = user ? `favorites_${user}` : null;
let favorites = user ? JSON.parse(localStorage.getItem(favKey)) || [] : [];

/* ADD TO FAVORITES */
function addToFavorites(product) {
  if (!user) {
    alert("Please login to add favorites");
    window.location.href = "login.html";
    return;
  }

  if (favorites.find(p => p.name === product.name)) {
    alert("Already in favorites");
    return;
  }

  favorites.push(product);
  localStorage.setItem(favKey, JSON.stringify(favorites));
  alert("Added to favorites");
}

/* REMOVE FROM FAVORITES */
function removeFromFavorites(index) {
  favorites.splice(index, 1);
  localStorage.setItem(favKey, JSON.stringify(favorites));
  renderFavorites();
}

/* RENDER FAVORITES PAGE */
function renderFavorites() {
  const body = document.getElementById("favoriteItems");
  if (!body) return;

  if (favorites.length === 0) {
    body.innerHTML = `<tr><td colspan="4">No favorite items</td></tr>`;
    return;
  }

  body.innerHTML = favorites.map((item, i) => `
    <tr>
      <td>
        <img src="${item.image}" width="80" height="80" style="object-fit:contain">
      </td>
      <td><strong>${item.name}</strong></td>
      <td>Rs ${item.price.toFixed(2)}</td>
      <td>
        <button class="btn btn-secondary" onclick="removeFromFavorites(${i})">
          Remove
        </button>
      </td>
    </tr>
  `).join("");
}


/* =========================
   PRODUCTS
========================= */
  const products = [
  {
    id: 0,
    name: "Running Sneaker Shoes",
    price: 180.85,
    image: "./assets/images/product-1.jpg"
  },
  {
    id: 1,
    name: "Leather Mens Slipper",
    price: 190.85,
    image: "./assets/images/product-2.jpg"
  },
  {
    id: 2,
    name: "Simple Fabric Shoe",
    price: 160.85,
    image: "./assets/images/product-3.jpg"
  },
  {
    id: 3,
    name: "Air Jordan 7 Retro",
    price: 170.85,
    image: "./assets/images/product-4.jpg"
  },
  {
    id: 4,
    name: "Nike Air Max 270 SE",
    price: 120.85,
    image: "./assets/images/product-5.jpg"
  },
  {
    id: 5,
    name: "Adidas Sneakers Shoes",
    price: 100.85,
    image: "./assets/images/product-6.jpg"
  },
  {
    id: 6,
    name: "Nike Basketball Shoes",
    price: 120.85,
    image: "./assets/images/product-7.jpg"
  },
  {
    id: 7,
    name: "Simple Fabric Shoe",
    price: 100.85,
    image: "./assets/images/product-8.jpg"
  }
];




document.querySelectorAll(".product-card").forEach((card, index) => {
  const buttons = card.querySelectorAll(".card-action-btn");

  // Cart button (first)
  buttons[0]?.addEventListener("click", () => {
    addToCart(products[index]);
  });

  // Favorite button (second)
  buttons[1]?.addEventListener("click", () => {
    addToFavorites(products[index]);
  });
});

/* =========================
   LOAD PRODUCTS
========================= */
function loadProductDetails() {
  const container = document.getElementById("productDetails");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const product = products.find(p => p.id === id);
  if (!product) return;

  container.innerHTML = `
    <div style="display:flex;gap:30px">
      <img src="${product.image}" width="300">
      <div>
        <h2>${product.name}</h2>
        <p><strong>Price:</strong> Rs ${product.price}</p>

        <button class="btn btn-primary" onclick="addToCart(products[${id}])">
          Add to Cart
        </button>

        <button class="btn btn-secondary" onclick="addToFavorites(products[${id}])">
          Add to Favorites
        </button>

        <button class="btn btn-secondary" onclick="addToCompare(products[${id}])">
          Compare
        </button>
      </div>
    </div>
  `;
}

/* =========================
   INIT
========================= */
updateCartUI();
renderCart();
renderFavorites();
loadProductDetails();


