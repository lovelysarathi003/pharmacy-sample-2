const express = require('express');
const app = express();
const port = 3000;

// Dummy database (replace with an actual database like MongoDB or MySQL)
let users = [{ email: 'test@pharmacy.com', password: 'password123', orders: [] }];

app.use(express.json());

// Simple login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        res.status(200).json({ message: 'Login successful', user });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

// Product purchase and order tracking
app.post('/buy-product', (req, res) => {
    const { email, productName } = req.body;
    const user = users.find(u => u.email === email);
    
    if (user) {
        user.orders.push({ product: productName, status: 'Shipped' });
        res.status(200).json({ message: 'Order placed successfully', order: user.orders });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
