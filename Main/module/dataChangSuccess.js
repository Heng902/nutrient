

module.exports = (res, type, status=200)=>{

    const body = {
        status: "dataChang Success",
        type: type
    };
    res.send(body);

};