'use strict';

/* =====================
   CART STORAGE
===================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =====================
   ADD TO CART
===================== */
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  alert("Product added to cart");
}

/* =====================
   REMOVE FROM CART
===================== */
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

/* =====================
   RENDER CART PAGE
===================== */
function renderCart() {
  const body = document.getElementById("cartItems");
  const totalBox = document.getElementById("cartGrandTotal");

  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `<tr><td colspan="4">Cart is empty</td></tr>`;
    totalBox.textContent = "";
    return;
  }

  let total = 0;

  body.innerHTML = cart.map((item, i) => {
    total += item.price;

    return `
      <tr>
        <td>
          <img src="${item.image}" width="80" height="80" style="object-fit:contain">
        </td>

        <td>
          <strong>${item.name}</strong>
        </td>

        <td>
          Rs ${item.price.toFixed(2)}
        </td>

        <td>
          <button class="btn btn-secondary" onclick="removeFromCart(${i})">
            Remove
          </button>
        </td>
      </tr>
    `;
  }).join("");

  totalBox.textContent = `Total: Rs ${total.toFixed(2)}`;
}


/* =====================
   UPDATE CART BADGE
===================== */
function updateCartBadge() {
  const badge = document.querySelector(".nav-action-badge");
  if (badge) badge.textContent = cart.length;
}

/* =====================
   INIT
===================== */
renderCart();
updateCartBadge();
