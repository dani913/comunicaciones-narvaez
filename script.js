const products = [
  {
    id: 1,
    name: "Samsung Galaxy A54",
    category: "smartphone",
    image: "📱",
    tag: "Popular",
    price: 399,
    oldPrice: 499,
    featured: true
  },
  {
    id: 2,
    name: "iPhone 13 Pro",
    category: "smartphone",
    image: "📲",
    tag: "Top",
    price: 799,
    oldPrice: 899,
    featured: true
  },
  {
    id: 3,
    name: "AirPods Pro",
    category: "audio",
    image: "🎧",
    tag: "Audio",
    price: 129,
    oldPrice: 179,
    featured: true
  },
  {
    id: 4,
    name: "Smartwatch X9",
    category: "accessory",
    image: "⌚",
    tag: "Wearable",
    price: 199,
    oldPrice: 249,
    featured: true
  },
  {
    id: 5,
    name: "Cargador rápido 65W",
    category: "accessory",
    image: "🔌",
    tag: "Accesorio",
    price: 49,
    oldPrice: 69,
    featured: false
  },
  {
    id: 6,
    name: "Audífonos Bluetooth",
    category: "audio",
    image: "🎵",
    tag: "Nuevo",
    price: 89,
    oldPrice: 119,
    featured: false
  },
  {
    id: 7,
    name: "Xiaomi Redmi Note 12",
    category: "smartphone",
    image: "📱",
    tag: "Ofertado",
    price: 299,
    oldPrice: 349,
    featured: false
  },
  {
    id: 8,
    name: "Funda Protectora",
    category: "accessory",
    image: "🧤",
    tag: "Protección",
    price: 29,
    oldPrice: 39,
    featured: false
  }
];

const productGrid = document.getElementById("product-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartCount = document.querySelector(".cart-count");

let currentFilter = "all";

function formatPrice(value) {
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

function renderProducts() {
  const filteredProducts = currentFilter === "all"
    ? products
    : products.filter((product) => product.category === currentFilter);

  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card" data-category="${product.category}">
          <div class="product-image" aria-hidden="true">${product.image}</div>
          <div class="product-body">
            <span class="product-tag">${product.tag}</span>
            <h3>${product.name}</h3>
            <div class="product-meta">
              <div>
                <div class="product-price">${formatPrice(product.price)}</div>
                <span class="product-old-price">${formatPrice(product.oldPrice)}</span>
              </div>
            </div>
            <div class="product-actions">
              <button class="product-btn add-to-cart" data-name="${product.name}">Agregar</button>
              <button class="favorite-btn" aria-label="Guardar favorito">♡</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    renderProducts();
  });
});

document.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-to-cart");
  const favoriteButton = event.target.closest(".favorite-btn");

  if (addButton) {
    const currentValue = Number(cartCount.textContent || "0");
    cartCount.textContent = String(currentValue + 1);
    addButton.textContent = "Añadido";
    addButton.disabled = true;
    setTimeout(() => {
      addButton.textContent = "Agregar";
      addButton.disabled = false;
    }, 900);
  }

  if (favoriteButton) {
    favoriteButton.textContent = "♥";
    favoriteButton.style.color = "#f97316";
  }
});

renderProducts();
