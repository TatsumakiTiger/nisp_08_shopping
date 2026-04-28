function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function renderOrderSummary() {
  const cart = getCart();
  const container = document.getElementById('order-summary');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p>Koszyk jest pusty. Nie ma czego zamawiać.</p>';
    document.getElementById('order-form').style.display = 'none';
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  container.innerHTML = cart.map(item => `
    <div class="order-item">
      <span>${item.name} x${item.qty}</span>
      <span>${(item.price * item.qty).toFixed(2)} zł</span>
    </div>
  `).join('') + `<div id="order-total">Razem: ${total.toFixed(2)} zł</div>`;
}

document.getElementById('order-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  localStorage.removeItem('cart');

  document.querySelector('main').innerHTML = `
    <h1>Dziękujemy, ${name}!</h1>
    <p>Zamówienie zostało złożone. Potwierdzenie wysłano na ${email}.</p>
    <a href="index.html" class="btn btn-success">Wróć do zakupów</a>
  `;
});

renderOrderSummary();