// ===============================
// Mini boutique e-commerce (JS)
// ===============================
// allProducts : catalogue complet chargé depuis products.json
// cart        : panier utilisateur en mémoire
let allProducts = [];
let cart = [];
const CART_KEY = "boutique_demo_cart";

// Récupération des éléments DOM principaux
const productsGrid = document.getElementById("productsGrid");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const cartBody = document.getElementById("cartBody");
const cartTotal = document.getElementById("cartTotal");
const cartEmpty = document.getElementById("cartEmpty");
const clearCartBtn = document.getElementById("clearCartBtn");

// Formate le prix avec l'unité XAF
function formatPrice(price) {
  return `${price} XAF`;
}

// Sauvegarde le panier dans le navigateur
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Charge le panier depuis le navigateur (si disponible)
function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cart = parsed;
    }
  } catch (error) {
    console.warn("Panier localStorage invalide :", error.message);
    cart = [];
  }
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
  // Nettoie la grille avant d'afficher la nouvelle liste
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
  // Crée une liste unique des catégories
  const categories = [...new Set(products.map((p) => p.category))];
  for (let i = 0; i < categories.length; i += 1) {
    const category = categories[i];
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  }
}

// Applique recherche + filtre catégorie + tri prix
function applyFilters() {
  let result = [...allProducts];

  const searchValue = (searchInput.value || "").trim().toLowerCase();
  const categoryValue = categoryFilter.value;
  const sortValue = sortSelect.value;

  if (searchValue) {
    result = result.filter((p) => p.name.toLowerCase().includes(searchValue));
  }

  if (categoryValue !== "all") {
    result = result.filter((p) => p.category === categoryValue);
  }

  switch (sortValue) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  renderProducts(result);
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
  // Calcule le total général du panier
  let total = 0;
  for (let i = 0; i < cart.length; i += 1) {
    total += cart[i].price * cart[i].qty;
  }
  return total;
}

function renderCart() {
  // Réaffiche entièrement le tableau panier
  cartBody.innerHTML = "";

  if (!cart.length) {
    cartEmpty.style.display = "block";
    cartTotal.textContent = "Total : 0 XAF";
    saveCart();
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
  saveCart();
}

function updateCartItem(productId, action) {
  // Met à jour la quantité d'un article selon l'action
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
  // Supprime complètement une ligne du panier
  cart = cart.filter((c) => c.id !== productId);
  renderCart();
}

async function loadProducts() {
  // Charge les produits depuis le JSON.
  // Si ça échoue (ex: ouverture locale sans serveur), on utilise un fallback.
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

// Filtrage du catalogue par catégorie
categoryFilter.addEventListener("change", () => {
  applyFilters();
});

// Recherche en direct
searchInput.addEventListener("input", () => {
  applyFilters();
});

// Tri du catalogue
sortSelect.addEventListener("change", () => {
  applyFilters();
});

// Vider complètement le panier
clearCartBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});

// Délégation d'événements sur le tableau panier :
// un seul listener gère +, -, supprimer
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

// Initialisation de la page
loadCartFromStorage();
loadProducts();
renderCart();
