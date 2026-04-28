const products = [
  { id: 1, name: 'Koszulka', price: 49.99 },
  { id: 2, name: 'Spodnie', price: 89.99 },
  { id: 3, name: 'Buty', price: 199.99 },
  { id: 4, name: 'Czapka', price: 29.99 },
  { id: 5, name: 'Plecak', price: 119.99 },
  { id: 6, name: 'Skarpetki', price: 14.99 },
];

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  alert(`${product.name} dodano do koszyka!`);
}

function renderProducts() {
  const container = document.getElementById('product-list');
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="product-card">
      <h3>${p.name}</h3>
      <p class="price">${p.price.toFixed(2)} zł</p>
      <button class="btn" onclick="addToCart(${p.id})">Dodaj do koszyka</button>
    </div>
  `).join('');
}

renderProducts();