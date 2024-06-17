const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    username: String,
    password: String,
    timestamp: {
        type: String,
        default: () => new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    }
});


const LoginModel = mongoose.model("Login", LoginSchema);
module.exports = LoginModel;