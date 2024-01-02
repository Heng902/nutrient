

const express = require('express');
const router = express.Router();
const loginSuccess = require("../module/loginSuccess");
const loginError = require("../module/loginError");
const USERmodel = require("../database/model/USERmodel");
const loginSession = require("../module/session/loginSession");
const signUpError = require('../module/signUpError');
const signUpSuccess = require('../module/signUpSuccess');
const cookieParser = require("cookie-parser");


//設置session
router.use(loginSession);
//將 cookie 解析為 object
router.use(cookieParser());



//user 依賴session給data
router.get("/", (req, res)=>{
    
    if(req.cookies.sid){
        console.log(req.session.username);
        USERmodel.find({
            username: req.session.username
        })
        .then(data=>{
            loginSuccess(res, data);
        })
        .catch(err=>{
            loginError(res, 'UserDataFind Error')
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
// ***測試用 login get test
router.get("/login", (req, res)=>{
    req.session.username = "userTest";
    req.session.uid = "1234test";
    res.send("login");
});



// login 輸入帳號密碼登入的路由 
// body為 {
//     email,  String
//     password  String
// }
router.post("/login", (req, res)=>{
    
    let body = "";
    req.on("data", (data)=>{
        body += data;
    });
    req.on("end", ()=>{
        const obj = JSON.parse(body);
        USERmodel.find({
            email: obj.email,
            password: obj.password
        })
        .then((data)=>{
            //database沒有對應資料
            if(data == ""){
                loginSuccess(res, data);
            }
            //有找到對應資料
            else{
                req.session.username = data[0].username;
                req.session.uid = data[0].email;
                loginSuccess(res, data);
            }
        })
        .catch((err)=>{
            console.log(err);
            loginError(res, "Login Find Error");
        })
    });
});

// logout 登出路由
// body為 {
//     username  String
// }
router.get("/logout", (req, res)=>{

    res.clearCookie("sid");
    req.session.destroy(()=>{
        const body = {
            status: "LogoutSuccess"
        };
        res.send(body);
    })
})

// signUp 註冊帳號密碼的路由
// body為 {
//     email,  String
//     username,  String
//     password,  String
//     passwordCheck  String
// }
router.post("/signUp", (req, res)=>{
    
    let body = "";
    req.on("data", (chunk)=>{
        body += chunk
    });
    req.on("end", ()=>{
        const bodyOBJ = JSON.parse(body);
        USERmodel.find({
            $or:[
                {email: bodyOBJ.email},
                {username: bodyOBJ.username}
            ]
        })
        .then((data)=>{
            //註冊時有找到 表示已存在
            if(data.length){
                signUpSuccess(res, "email or username already exists");
            }
            //註冊時未找到 表示尚未存在 可註冊
            else
            {
                //建立帳號
                USERmodel.create(bodyOBJ)
                .then((data)=>{
                    signUpSuccess(res, data);
                })
                .catch((err)=>{
                    signUpError(res, "SignUp Create Error");
                });
            }
        })
        .catch((err)=>{
            console.log(err);
            signUpError(res, "SignUp Find Error");
        });

        
    });
})
// **測試用**  刪除user userData
// router.get('/delete', (req, res)=>{
//     let body = "";
//     req.on('data', chunk=>{
//         body += chunk;
//     });
//     req.on('end', ()=>{
//         const bodyOBJ = JSON.parse(body);
//         USERmodel.deleteOne(bodyOBJ)
//         .then(data=>{
//             res.send('delete ' + bodyOBJ.username);
//         })
//         .catch(err=>{
//             console.log(err);
//         });
//     })
// });


module.exports = router;
