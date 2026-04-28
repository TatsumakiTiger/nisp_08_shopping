document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');

  // Pobieranie danych z localStorage
  function getCart() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  // Zapisywanie danych do localStorage
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

// Wyliczanie całkowitej sumy (odporne na braki danych)
  function calculateTotal(cart) {
    return cart.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0; // Wymusza liczbę
      const quantity = item.quantity || 1;       // Domyślnie 1, jeśli brak
      return sum + (price * quantity);
    }, 0);
  }

  // Renderowanie zawartości koszyka
  function renderCart() {
    const cart = getCart();
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p style="text-align: center; margin-top: 1rem;">Twój koszyk jest pusty.</p>';
      cartTotalContainer.textContent = '';
      return;
    }

    cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      
      // Zabezpieczenie danych
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity || 1;
      const itemTotal = (price * quantity).toFixed(2);

      itemElement.innerHTML = `
        <div class="item-details">
          <strong>${item.name || 'Nieznany produkt'}</strong> 
          <span style="color: #7f8c8d; margin-left: 10px;">Ilość: ${quantity}</span>
        </div>
        <div class="item-actions">
          <span style="font-weight: 700; margin-right: 15px;">${itemTotal} zł</span>
          <button class="btn btn-danger remove-btn" data-index="${index}">Usuń</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
    });

    const total = calculateTotal(cart);
    cartTotalContainer.innerHTML = `Suma całkowita: <span style="color: #27ae60;">${total.toFixed(2)} zł</span>`;

    attachRemoveEvents();
  }

  // Obsługa usuwania produktów
  function attachRemoveEvents() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const itemIndex = parseInt(e.target.getAttribute('data-index'), 10);
        removeFromCart(itemIndex);
      });
    });
  }

  function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1); // Usuwa 1 element pod wskazanym indeksem
    saveCart(cart);        // Zapisuje nowy stan w localStorage
    renderCart();          // Odświeża widok
  }

  // Inicjalne uruchomienie renderowania po załadowaniu strony
  renderCart();
});