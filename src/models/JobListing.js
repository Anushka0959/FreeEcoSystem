const mongoose = require('mongoose');
const BaseListing = require('./BaseListing');

const JobListing = BaseListing.discriminator('JobListing', new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    jobType: {
        type: String,
        required: [true, 'Job type is required'],
        enum: ['full-time', 'part-time', 'contract', 'temporary', 'internship']
    },
    salary: {
        min: {
            type: Number,
            min: [0, 'Minimum salary cannot be negative']
        },
        max: {
            type: Number,
            min: [0, 'Maximum salary cannot be negative']
        },
        currency: {
            type: String,
            default: 'USD'
        },
        type: {
            type: String,
            enum: ['hourly', 'monthly', 'yearly'],
            default: 'yearly'
        }
    },
    requiredSkills: [{
        type: String,
        trim: true
    }],
    experienceLevel: {
        type: String,
        enum: ['entry-level', 'mid-level', 'senior', 'executive']
    },
    education: {
        type: String,
        enum: ['high-school', 'bachelor', 'master', 'doctorate', 'any']
    },
    location: {
        type: {
            type: {
                type: String,
                enum: ['remote', 'onsite', 'hybrid'],
                default: 'onsite'
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
    applicationDeadline: {
        type: Date
    },
    responsibilities: [{
        type: String,
        trim: true
    }],
    benefits: [{
        type: String,
        trim: true
    }],
    companyIndustry: {
        type: String,
        trim: true
    }
}));

module.exports = JobListing;
