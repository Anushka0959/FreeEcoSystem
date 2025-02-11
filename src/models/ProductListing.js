const mongoose = require('mongoose');
const BaseListing = require('./BaseListing');

const ProductListing = BaseListing.discriminator('ProductListing', new mongoose.Schema({
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    condition: {
        type: String,
        enum: ['new', 'used-like-new', 'used-good', 'used-fair'],
        default: 'new'
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },
    specifications: [{
        key: {
            type: String,
            trim: true
        },
        value: {
            type: String,
            trim: true
        }
    }],
    quantity: {
        type: Number,
        default: 1,
        min: [0, 'Quantity cannot be negative']
    },
    location: {
        type: {
            address: String,
            city: String,
            state: String,
            country: String,
            coordinates: {
                latitude: Number,
                longitude: Number
            }
        }
    },
    shipping: {
        available: {
            type: Boolean,
            default: false
        },
        cost: {
            type: Number,
            min: [0, 'Shipping cost cannot be negative']
        }
    },
    warranty: {
        type: String,
        enum: ['no-warranty', '7-days', '30-days', '90-days', '1-year'],
        default: 'no-warranty'
    }
}));

module.exports = ProductListing;
