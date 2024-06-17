const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');
const Login = require('./models/Login');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/crud')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

    
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123' || username === 'weighter' && password === 'weighter123') {
        
        try {
            await Login.create({ username });
            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.error('Error saving login information:', error);
            res.status(500).json({ error: 'Failed to save login information' });
        }
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/orders', (req, res) => {
    const newOrder = new Order(req.body);
    console.log('Received new order:', newOrder); 
    newOrder.save()
        .then(order => {
            console.log('Order saved successfully:', order); 
            res.json(order);
        })
        .catch(err => {
            console.error('Error saving order:', err); 
            res.status(500).json({ error: 'Failed to save order' });
        });
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});


app.put('/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const { served } = req.body;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ error: 'Invalid order ID' });
        }
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { served }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
