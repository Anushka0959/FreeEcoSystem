const mongoose = require('mongoose');
const BaseListing = require('./BaseListing');

const ServiceListing = BaseListing.discriminator('ServiceListing', new mongoose.Schema({
    serviceType: {
        type: String,
        required: [true, 'Service type is required'],
        trim: true
    },
    pricing: {
        type: {
            pricingModel: {
                type: String,
                enum: ['hourly', 'fixed', 'negotiable', 'free'],
                default: 'hourly'
            },
            rate: {
                type: Number,
                min: [0, 'Rate cannot be negative']
            }
        }
    },
    availability: {
        type: [{
            day: {
                type: String,
                enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            },
            startTime: String,
            endTime: String
        }]
    },
    skills: [{
        type: String,
        trim: true
    }],
    experience: {
        years: {
            type: Number,
            min: [0, 'Experience cannot be negative']
        },
        level: {
            type: String,
            enum: ['beginner', 'intermediate', 'expert', 'professional']
        }
    },
    location: {
        type: {
            type: {
                type: String,
                enum: ['online', 'onsite', 'both'],
                default: 'both'
            },
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
    certifications: [{
        name: String,
        issuedBy: String,
        year: Number
    }]
}));

module.exports = ServiceListing;
