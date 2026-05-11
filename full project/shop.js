let allProducts = [];
let cart = [];

const productsGrid = document.getElementById("productsGrid");
const categoryFilter = document.getElementById("categoryFilter");
const cartBody = document.getElementById("cartBody");
const cartTotal = document.getElementById("cartTotal");
const cartEmpty = document.getElementById("cartEmpty");
const clearCartBtn = document.getElementById("clearCartBtn");

function formatPrice(price) {
  return `${price} MAD`;
}

function renderProducts(products) {
  productsGrid.innerHTML = "";

  if (!products.length) {
    productsGrid.innerHTML = `<p class="muted-text">Aucun produit dans cette catégorie.</p>`;
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "section-card";
    card.innerHTML = `
      <img class="product-image" src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="product-meta">Catégorie : ${product.category}</p>
      <p><strong>${formatPrice(product.price)}</strong></p>
      <button class="btn btn-primary" data-id="${product.id}">Ajouter au panier</button>
    `;
    productsGrid.appendChild(card);
  });

  productsGrid.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
}

function renderCategories(products) {
  const categories = [...new Set(products.map((p) => p.category))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function addToCart(productId) {
  const product = allProducts.find((p) => p.id === productId);
  if (!product) return;

  const item = cart.find((c) => c.id === productId);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  cartBody.innerHTML = "";

  if (!cart.length) {
    cartEmpty.style.display = "block";
    cartTotal.textContent = "Total : 0 MAD";
    return;
  }

  cartEmpty.style.display = "none";

  let total = 0;
  cart.forEach((item) => {
    const subTotal = item.price * item.qty;
    total += subTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${formatPrice(item.price)}</td>
      <td>
        <div class="qty-actions">
          <button class="qty-btn" data-action="decrease" data-id="${item.id}" type="button">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-action="increase" data-id="${item.id}" type="button">+</button>
        </div>
      </td>
      <td>${formatPrice(subTotal)}</td>
      <td><button class="remove-btn" data-action="remove" data-id="${item.id}" type="button">Supprimer</button></td>
    `;
    cartBody.appendChild(row);
  });

  cartTotal.textContent = `Total : ${total} MAD`;
}

function updateCartItem(productId, action) {
  const item = cart.find((c) => c.id === productId);
  if (!item) return;

  if (action === "increase") item.qty += 1;
  if (action === "decrease") item.qty -= 1;

  cart = cart.filter((c) => c.qty > 0);
  renderCart();
}

function removeCartItem(productId) {
  cart = cart.filter((c) => c.id !== productId);
  renderCart();
}

async function loadProducts() {
  try {
    const res = await fetch("products.json");
    if (!res.ok) throw new Error("Impossible de charger products.json");
    const data = await res.json();
    allProducts = data.products || [];
  } catch (err) {
    allProducts = [
      { id: 1, name: "Clavier Gamer K20", category: "Informatique", price: 299 },
      { id: 2, name: "Souris Sans Fil M8", category: "Informatique", price: 149 },
      { id: 3, name: "Casque Audio Hifi X2", category: "Audio", price: 399 }
    ];
    console.warn("products.json non chargé, fallback activé :", err.message);
  }

  renderCategories(allProducts);
  renderProducts(allProducts);
}

categoryFilter.addEventListener("change", () => {
  const value = categoryFilter.value;
  if (value === "all") {
    renderProducts(allProducts);
    return;
  }
  renderProducts(allProducts.filter((p) => p.category === value));
});

clearCartBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});

cartBody.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const id = Number(btn.dataset.id);
  if (!id) return;

  if (action === "increase" || action === "decrease") {
    updateCartItem(id, action);
  }

  if (action === "remove") {
    removeCartItem(id);
  }
});

loadProducts();
renderCart();
