const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    selectedItems: [{
        id: Number,
        price: Number,
        quantity: Number,
        flavor: String
    }],
    totalPrice: Number,
    tableNumber: Number,
    customerName: String,
    timestamp: String,
    served: { type: Boolean, default: false }
    
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
