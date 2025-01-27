let cart = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.getAttribute('data-name');
        const productPrice = parseFloat(e.target.getAttribute('data-price'));
        
        // Add the product to the cart array
        cart.push({ name: productName, price: productPrice });

        // Update cart count
        cartCount.innerText = cart.length;

        // Update cart display
        updateCart();
    });
});

function updateCart() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(itemDiv);
        });

        // Add remove item functionality
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                cartCount.innerText = cart.length;
                updateCart();
            });
        });
    }
}

// Checkout button functionality (for now just alerts)
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        let totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
        alert(`Total amount: $${totalAmount.toFixed(2)}\nProceeding to Checkout...`);
    } else {
        alert("Your cart is empty!");
    }
});
