

const mongoose = require("mongoose");


module.exports = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    passwordCheck: {
        type: String,
        require: true
    },
    eatData: [
        {
            week: String,
            toBeAddItemId: [String],
            thatDayEatId: [String]            
        },
        {
            week: String,
            toBeAddItemId: [String],
            thatDayEatId: [String]            
        },
        {
            week: String,
            toBeAddItemId: [String],
            thatDayEatId: [String]            
        },
        {
            week: String,
            toBeAddItemId: [String],
            thatDayEatId: [String]            
        },
        {
            week: String,
            toBeAddItemId: [String],
            thatDayEatId: [String]            
        },
        {
            week: String,
            toBeAddItemId: [String],
            thatDayEatId: [String]            
        },
        {
            week: String,
            toBeAddItemId: [String],
            thatDayEatId: [String]            
        }
    ],
    needData: [
        {
            week: String,
            toBeAddItemId: [String],
            thatDayNeedId: [String]
        },
        {
            week: String,
            toBeAddItemId: [String],
            thatDayNeedId: [String]
        },
        {
            week: String,
            toBeAddItemId: [String],
            thatDayNeedId: [String]
        },
        {
            week: String,
            toBeAddItemId: [String],
            thatDayNeedId: [String]
        },
        {
            week: String,
            toBeAddItemId: [String],
            thatDayNeedId: [String]
        },
        {
            week: String,
            toBeAddItemId: [String],
            thatDayNeedId: [String]
        },
        {
            week: String,
            toBeAddItemId: [String],
            thatDayNeedId: [String]
        }
    ]
});