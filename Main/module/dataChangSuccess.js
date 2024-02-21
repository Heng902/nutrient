

module.exports = (res, type, status=200)=>{

    res.header("Access-Control-Allow-Origin", "*");
    const body = {
        status: "dataChang Success",
        type: type
    };
    res.send(body);

};