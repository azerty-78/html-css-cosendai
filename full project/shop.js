let allProducts = [];
let cart = [];

const productsGrid = document.getElementById("productsGrid");
const categoryFilter = document.getElementById("categoryFilter");
const cartBody = document.getElementById("cartBody");
const cartTotal = document.getElementById("cartTotal");
const cartEmpty = document.getElementById("cartEmpty");
const clearCartBtn = document.getElementById("clearCartBtn");

// Formate le prix avec l'unité XAF
function formatPrice(price) {
  return `${price} XAF`;
}

// Retourne un libellé court selon la catégorie (exemple d'usage de switch)
function getCategoryBadge(category) {
  switch (category) {
    case "Informatique":
      return "Tech";
    case "Audio":
      return "Audio";
    case "Accessoires":
      return "Accessoire";
    case "Mode":
      return "Mode";
    case "Maison":
      return "Maison";
    default:
      return "Produit";
  }
}

function renderProducts(products) {
  productsGrid.innerHTML = "";

  if (!products.length) {
    productsGrid.innerHTML = `<p class="muted-text">Aucun produit dans cette catégorie.</p>`;
    return;
  }

  // Boucle classique for pour montrer une autre manière d'itérer
  for (let i = 0; i < products.length; i += 1) {
    const product = products[i];
    const card = document.createElement("article");
    card.className = "section-card";
    card.innerHTML = `
      <img class="product-image" src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="product-meta">Catégorie : ${product.category}</p>
      <p><strong>${formatPrice(product.price)}</strong></p>
      <span class="tag">${getCategoryBadge(product.category)}</span>
      <div style="margin-top:.55rem;">
      <button class="btn btn-primary" data-id="${product.id}">Ajouter au panier</button>
      </div>
    `;
    productsGrid.appendChild(card);
  }

  // Gestion des événements "Ajouter au panier"
  productsGrid.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
}

function renderCategories(products) {
  const categories = [...new Set(products.map((p) => p.category))];
  for (let i = 0; i < categories.length; i += 1) {
    const category = categories[i];
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  }
}

function addToCart(productId) {
  // Recherche de l'article dans le catalogue
  const product = allProducts.find((p) => p.id === productId);
  if (!product) return;

  // Si l'article existe déjà dans le panier, on augmente la quantité
  const item = cart.find((c) => c.id === productId);
  if (item) {
    item.qty += 1;
  } else {
    // Sinon on ajoute une nouvelle ligne
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function calculateCartTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i += 1) {
    total += cart[i].price * cart[i].qty;
  }
  return total;
}

function renderCart() {
  cartBody.innerHTML = "";

  if (!cart.length) {
    cartEmpty.style.display = "block";
    cartTotal.textContent = "Total : 0 XAF";
    return;
  }

  cartEmpty.style.display = "none";

  for (let i = 0; i < cart.length; i += 1) {
    const item = cart[i];
    const subTotal = item.price * item.qty;

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
  }

  cartTotal.textContent = `Total : ${calculateCartTotal()} XAF`;
}

function updateCartItem(productId, action) {
  const item = cart.find((c) => c.id === productId);
  if (!item) return;

  // Exemple de switch sur une action utilisateur
  switch (action) {
    case "increase":
      item.qty += 1;
      break;
    case "decrease":
      item.qty -= 1;
      break;
    default:
      break;
  }

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
      { id: 1, name: "Clavier Gamer K20", category: "Informatique", price: 2990, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=70" },
      { id: 2, name: "Souris Sans Fil M8", category: "Informatique", price: 1490, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=70" },
      { id: 3, name: "Casque Audio Hifi X2", category: "Audio", price: 3990, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=70" }
    ];
    console.warn("products.json non chargé, fallback activé :", err.message);
  }

  renderCategories(allProducts);
  renderProducts(allProducts);
}

categoryFilter.addEventListener("change", () => {
  const value = categoryFilter.value;

  // switch simple pour montrer un cas pédagogique
  switch (value) {
    case "all":
      renderProducts(allProducts);
      break;
    default:
      renderProducts(allProducts.filter((p) => p.category === value));
      break;
  }
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
