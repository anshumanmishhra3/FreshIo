document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");

    // Render products
    productGrid.innerHTML = window.cart.map(item => `
        <div class="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center hover:shadow-lg transition">
            <img src="${item.img}" alt="${item.title}" class="w-full h-48 object-contain mb-4">
            <h2 class="text-lg font-semibold text-gray-800 text-center">${item.title}</h2>
            <p class="text-green-600 font-bold mt-2">₹${item.price.toFixed(2)}</p>
            <button 
                class="add-to-cart mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                data-id="${item.id}"
                data-title="${item.title}"
                data-img="${item.img}"
                data-price="${item.price}"
            >
                Add to Cart
            </button>
        </div>
    `).join("");

    const updateCartCount = () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const qtyDisplay = document.querySelector('.qty');
        if (qtyDisplay) qtyDisplay.innerText = totalQty;
    };

    const addButtons = document.querySelectorAll('.add-to-cart');

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.dataset.id);
            const title = button.dataset.title;
            const img = button.dataset.img;
            const price = parseFloat(button.dataset.price);

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, title, img, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });

    updateCartCount();
});
