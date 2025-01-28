// Simulated product data and notifications
const users = [
    { email: "test@pharmacy.com", password: "password123", name: "John Doe", orders: [] }
];

let currentUser = null;

// Login function
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        showHomePage();
    } else {
        document.getElementById('error-message').innerText = "Invalid email or password.";
    }
});

// Show home page after login
function showHomePage() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
}

// Product buying logic
function addToCart(productName) {
    if (currentUser) {
        alert(`You bought ${productName}. We'll send a notification when it's shipped.`);
        currentUser.orders.push({ product: productName, status: 'Shipped' });
        sendNotification(productName);
        showAccountPage();
    } else {
        alert("Please login first.");
    }
}

// Notification simulation
function sendNotification(productName) {
    setTimeout(() => {
        alert(`Your order for ${productName} is shipped!`);
    }, 3000);
}

// Show account page with order tracking
function showAccountPage() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('account-page').style.display = 'block';

    let ordersList = '';
    currentUser.orders.forEach(order => {
        ordersList += `<p>${order.product} - Status: ${order.status}</p>`;
    });
    document.getElementById('account-page').innerHTML += ordersList;
}

// Logout
function logout() {
    currentUser = null;
    document.getElementById('account-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
}
