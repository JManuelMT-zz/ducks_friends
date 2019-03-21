const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    ducks_feeding: [{
        date: Date,
        time: String,
        park_name: String,
        food: String,
        food_quantity: Number,
        ducks_number: Number,
    }],
});

// hash user password before saving into database
userSchema.pre('save', async function save(next) {
    try {
        if (!this.isModified('password')) {
            next();
        }
        const saltRounds = 10;
        const hash = await bcrypt.hash(this.password, saltRounds);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);
