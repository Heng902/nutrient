
// 用以將 NC.json 寫入數據庫

const fs = require("fs");
const mongoose = require("mongoose");

module.exports = (success)=>{
    mongoose.connect("mongodb://127.0.0.1:27017/nutrient");
    //success
    mongoose.connection.once("open", ()=>{
        console.log("Connect SUCCESS");
        success();
    });
    //error
    mongoose.connection.on("error", ()=>{
        console.log("connection: error");
    });
    //close
    mongoose.connection.on("close", ()=>{
        console.log("connection: close");
    });
};