
// 程式執行成功後 將資料回傳

module.exports = (res, data, dataTotal=data.length, status=200)=>{

    const Json = {
        dataTotal: dataTotal,
        data: data
    };

    res.json(Json);
    res.status(status);
    res.end();
};
