const products = [
  { id:1, name:"Velvet Rose Lip",   cat:"lips",     finish:"matte",  price:799,  oldPrice:999,  rating:4.8, badge:"new",  img:"images/lip1.jpg" },
  { id:2, name:"Glow Foundation",   cat:"face",     finish:"satin",  price:1299, oldPrice:null, rating:4.9, badge:"hot",  img:"images/found1.jpg" },
  { id:3, name:"Berry Plum Liner",  cat:"eyes",     finish:"matte",  price:549,  oldPrice:699,  rating:4.7, badge:"sale", img:"images/liner1.jpg" },
  { id:4, name:"Soft Blush Duo",    cat:"face",     finish:"sheer",  price:699,  oldPrice:null, rating:4.6, badge:null,   img:"images/blush1.jpg" },
  { id:5, name:"Nude Gloss",        cat:"lips",     finish:"glossy", price:499,  oldPrice:null, rating:4.5, badge:"new",  img:"images/gloss1.jpg" },
  { id:6, name:"Smoky Eye Palette", cat:"eyes",     finish:"matte",  price:1499, oldPrice:1799, rating:4.9, badge:"hot",  img:"images/palette1.jpg" },
  { id:7, name:"Bronze Glow",       cat:"face",     finish:"sheer",  price:899,  oldPrice:null, rating:4.7, badge:null,   img:"images/powder1.jpg" },
  { id:8, name:"Rose Serum Primer", cat:"skincare", finish:"sheer",  price:1599, oldPrice:1999, rating:4.9, badge:"hot",  img:"images/serum1.jpg" },
];

let cart = 0;
let activeCat = "all", activeFinish = "", maxPrice = 2000;

function renderProducts() {
  let filtered = products.filter(p => {
    if (activeCat !== "all" && p.cat !== activeCat) return false;
    if (activeFinish && p.finish !== activeFinish) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  const sort = document.getElementById("sortSelect").value;
  if (sort === "price-low")  filtered.sort((a,b) => a.price - b.price);
  if (sort === "price-high") filtered.sort((a,b) => b.price - a.price);
  if (sort === "rating")     filtered.sort((a,b) => b.rating - a.rating);

  document.getElementById("productCount").textContent =
    `Showing ${filtered.length} products`;

  const grid = document.getElementById("productGrid");

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="no-results">No products found. Try clearing filters.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      ${p.badge ? `<span class="badge badge-${p.badge}">${p.badge}</span>` : ""}
      <img src="${p.img}" alt="${p.name}" />
      <div class="card-body">
        <p class="card-cat">${p.cat}</p>
        <h3 class="card-name">${p.name}</h3>
        <div class="card-footer">
          <span class="price">₹${p.price}
            ${p.oldPrice ? `<del>₹${p.oldPrice}</del>` : ""}
          </span>
          <button class="add-btn" onclick="addToCart(this)">+ Add</button>
        </div>
      </div>
    </div>
  `).join("");
}

function addToCart(btn) {
  cart++;
  document.getElementById("cartBtn").textContent = `Bag (${cart})`;
  btn.textContent = "Added!";
  setTimeout(() => btn.textContent = "+ Add", 1200);
}

// Category filter
document.querySelectorAll("[data-cat]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-cat]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCat = btn.dataset.cat;
    renderProducts();
  });
});

// Finish filter
document.querySelectorAll("[data-finish]").forEach(btn => {
  btn.addEventListener("click", () => {
    const same = activeFinish === btn.dataset.finish;
    document.querySelectorAll("[data-finish]").forEach(b => b.classList.remove("active"));
    activeFinish = same ? "" : btn.dataset.finish;
    if (!same) btn.classList.add("active");
    renderProducts();
  });
});

// Price slider
document.getElementById("priceRange").addEventListener("input", e => {
  maxPrice = parseInt(e.target.value);
  document.getElementById("priceVal").textContent = `₹${maxPrice}`;
  renderProducts();
});

// Sort
document.getElementById("sortSelect").addEventListener("change", renderProducts);

// Clear
document.getElementById("clearFilters").addEventListener("click", () => {
  activeCat = "all"; activeFinish = ""; maxPrice = 2000;
  document.getElementById("priceRange").value = 2000;
  document.getElementById("priceVal").textContent = "₹2000";
  document.querySelectorAll("[data-cat]").forEach(b => b.classList.remove("active"));
  document.querySelector("[data-cat='all']").classList.add("active");
  document.querySelectorAll("[data-finish]").forEach(b => b.classList.remove("active"));
  renderProducts();
});

renderProducts();