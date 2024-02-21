
// 程式執行失敗後 將狀態回傳

module.exports = (res, type, status)=>{
    console.log(`ERROR ${type}`);
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        ERROR: 'System Error'
    });
    res.status(status);
    res.end();
};