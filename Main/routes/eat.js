

const express = require('express');
const router = express.Router();

const USERmodel = require('../database/model/USERmodel');
const loginSession = require("../module/session/loginSession");
const cookieParser = require('cookie-parser');
const dataChangError = require('../module/dataChangError');
const dataChangSuccess = require('../module/dataChangSuccess');

router.use(cookieParser());
router.use(loginSession);


// 變更 eat項目 的路由
// body 為 {
//     week, String
//     toBeAddItemId,  String[]
//     thatDayEatId  String[] 
// }
router.post("/chang-eat", (req, res)=>{

    if(req.cookies.sid){
        let body = "";
        req.on("data", chunk=>{
            body += chunk;
        });
        req.on("end", ()=>{
            const bodyOBJ = JSON.parse(body);
            USERmodel.updateOne({
                username: req.session.username
            }, {
                eatData: [
                    bodyOBJ
                ]
            })
            .then(data=>{
                dataChangSuccess(res, "eat");
            })
            .catch(err=>{
                dataChangError(res, err);
            });
        })
    }
    else{
        const body = {
            status: "No Logging"
        };
        res.status(200);
        res.send(body);
        res.end();
    }
});


module.exports = router;