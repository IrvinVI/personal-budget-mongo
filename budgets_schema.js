const mongoose = require("mongoose")

const budgetsSchema = new mongoose.Schema({
    budget: {
        type: Number,
        required: true,
    },title: {
        type: String,
        trim: true,
        required: true,
    },color: {
        type: String,
        trim: true,
        minlength: 7,
        required: true,
        uppercase: true
    }
}, { collection: 'budgets'})

module.exports = mongoose.model('budgets', budgetsSchema)