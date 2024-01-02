
const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    id: String,
    foodName: String,
    commonName: String,
    calorie: Number,
    protein: Number,
    fat: Number,
    carbohydrate: Number
});

