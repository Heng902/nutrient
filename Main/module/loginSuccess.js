

module.exports = (res, data, status=200)=>{

    const resData = data == "" ? {
        status: "Not Found"
    } : {
        status: "LoginSuccess",
        email: data[0].email,
        username: data[0].username,
        eatData: data[0].eatData,
        needData: data[0].needData
    };
    res.status(status);
    res.send(resData);
    res.end();
};
