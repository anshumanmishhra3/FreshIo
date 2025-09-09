document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("tbody");
  const cartTotalSpan = document.getElementById("cart-total");
  const qtyDisplay = document.querySelector('.qty');

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updateCartSummary = () => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalSpan.innerText = `₹${totalPrice.toFixed(2)}`;

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (qtyDisplay) qtyDisplay.innerText = totalQty;
  };
 
  const renderCart = () => {
    tbody.innerHTML = "";

    cart.forEach((item, index) => {
      const row = document.createElement("tr");
      row.className = "border-b";
      row.innerHTML = `
        <td class="p-2 relative">
          <button data-index="${index}" class="remove-item absolute top-1 left-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600">x</button>
          <img src="${item.img}" alt="${item.title}" class="w-16 h-16 object-cover rounded" />
        </td>
        <td class="p-2 align-middle">${item.title}</td>
        <td class="p-2 text-center">
          <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity w-16 border border-gray-300 rounded px-2 py-1 text-center" />
        </td>
        <td class="p-2 text-right">₹${(item.price * item.quantity).toFixed(2)}</td>
      `;
      tbody.appendChild(row);
    });

    attachEvents();
    updateCartSummary();
  };

  const attachEvents = () => {
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll('.quantity').forEach(input => {
      input.addEventListener("change", (e) => {
        const index = parseInt(e.target.dataset.index);
        let newQty = parseInt(e.target.value);
        if (newQty < 1 || isNaN(newQty)) newQty = 1; // enforce minimum quantity 1

        cart[index].quantity = newQty;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  };

  renderCart();
});
