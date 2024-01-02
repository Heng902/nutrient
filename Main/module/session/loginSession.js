const session = require("express-session");
const MongoStore = require('connect-mongo');

module.exports = session({
    name: "sid",
    secret: "3.141592653589793238462",
    saveUninitialized: false,
    resave: true,   // database裡的session會刷新保存時間
    rolling: true,  // 網頁cookie裡的session會刷新保存時間
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/nutrient"
    }),
    cookie: {
        httpOnly: true,
        maxAge: 60*1000 *2
    }
})