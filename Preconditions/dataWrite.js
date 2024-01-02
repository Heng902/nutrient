
// 用以將 NC.json 寫入數據庫


const NCmodel = require("./model/NCmodel.js");

const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/nutrient");

//success
mongoose.connection.once("open", ()=>{
    console.log("connection: success");

    fs.readFile(path.join(__dirname + "/result/NC.json"), "utf-8", (err, fileDataJSON)=>{
        if(err){
            console.log("readFile : ERROR");
            return
        }
        const fileData = JSON.parse(fileDataJSON);
        const {data} = fileData;
        let tidyData = [];

        data.forEach(item=>{
            if(item.foodName){
                tidyData.push(item);
            }
        });

        NCmodel.create(tidyData)
        .then(data=>{
            console.log("Write SUCCESS");
        })
        .catch(err=>{
            console.log("Write ERROR");
        });
    })

});
//error
mongoose.connection.on("error", ()=>{
    console.log("connection: error");
});
//close
mongoose.connection.on("close", ()=>{
    console.log("connection: close");
});