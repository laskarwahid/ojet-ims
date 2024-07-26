require('dotenv').config()
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

mongoose.connect(MONGO_URI).then(() => console.log('Server database Connected'))
        .catch('Error')

const vendorSchema = new mongoose.Schema({
    vendor_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
})

const vendor = mongoose.model('vendor', vendorSchema, 'vendors');
module.exports = vendor;

