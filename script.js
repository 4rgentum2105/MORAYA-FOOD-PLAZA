let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartEl = document.getElementById("cart");

document.getElementById("open-cart").onclick = () => cartEl.classList.add("open");
document.getElementById("close-cart").onclick = () => cartEl.classList.remove("open");

document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    saveAndRender();
  });
});

function saveAndRender() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name}</span>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty('${item.name}', -1)">−</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.name}', 1)">+</button>
      </div>
    `;
    cartItemsEl.appendChild(li);
  });

  cartTotalEl.textContent = total.toFixed(2);
}

function changeQty(name, change) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.name !== name);
  }
  saveAndRender();
}

document.getElementById("checkout").onclick = () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let summary = "Order Summary:\n\n";
  cart.forEach(i => {
    summary += `${i.name} x${i.qty} = ₹${i.qty * i.price}\n`;
  });
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  summary += `\nTotal: ₹${total.toFixed(2)}\n\nThank you for ordering with Moraya Food Plaza!`;

  alert(summary);
  cart = [];
  saveAndRender();
  cartEl.classList.remove("open");
};
