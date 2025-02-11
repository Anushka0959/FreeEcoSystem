const mongoose = require('mongoose');
const BaseListing = require('./BaseListing');

const MatrimonyListing = BaseListing.discriminator('MatrimonyListing', new mongoose.Schema({
    personalDetails: {
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [18, 'Minimum age is 18'],
            max: [80, 'Maximum age is 80']
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: ['male', 'female', 'other']
        },
        maritalStatus: {
            type: String,
            enum: ['never-married', 'divorced', 'widowed', 'separated']
        }
    },
    physicalAttributes: {
        height: {
            type: Number, // in cm
            min: [100, 'Minimum height is 100 cm'],
            max: [250, 'Maximum height is 250 cm']
        },
        weight: {
            type: Number, // in kg
            min: [30, 'Minimum weight is 30 kg'],
            max: [300, 'Maximum weight is 300 kg']
        },
        bodyType: {
            type: String,
            enum: ['slim', 'average', 'athletic', 'heavy']
        }
    },
    professionalDetails: {
        education: {
            degree: String,
            field: String,
            institution: String
        },
        occupation: {
            type: String,
            trim: true
        },
        annualIncome: {
            type: Number,
            min: [0, 'Income cannot be negative']
        }
    },
    religiousBackground: {
        religion: String,
        caste: String,
        motherTongue: String
    },
    preferences: {
        ageRange: {
            min: {
                type: Number,
                min: [18, 'Minimum age is 18']
            },
            max: {
                type: Number,
                max: [80, 'Maximum age is 80']
            }
        },
        height: {
            min: Number,
            max: Number
        },
        maritalStatus: [{
            type: String,
            enum: ['never-married', 'divorced', 'widowed', 'separated']
        }],
        religion: [String],
        occupation: [String]
    },
    location: {
        city: String,
        state: String,
        country: String
    },
    contact: {
        email: {
            type: String,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
        },
        phone: {
            type: String,
            trim: true
        }
    }
}));

module.exports = MatrimonyListing;