const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    otp: {
        code: {
            type: String
        },
        expiresAt: {
            type: Date
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profile: {
        firstName: String,
        lastName: String,
        phoneNumber: String,
        address: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        
        // Hash the password along with the salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check password validity
UserSchema.methods.isValidPassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate OTP
UserSchema.methods.generateOTP = function() {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set OTP and expiration (valid for 10 minutes)
    this.otp = {
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
    };

    return otp;
};

// Method to verify OTP
UserSchema.methods.verifyOTP = function(otpCode) {
    // Check if OTP exists and is not expired
    if (!this.otp || !this.otp.code) return false;

    const isValid = 
        this.otp.code === otpCode && 
        this.otp.expiresAt > new Date();

    // Clear OTP after verification attempt
    if (isValid) {
        this.otp = undefined;
        this.isVerified = true;
    }

    return isValid;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;