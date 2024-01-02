

module.exports = (res, data, status=200)=>{

    let resData = {
        status: "signUp Success",
        email: data.email,
        username: data.username
    };

    if(typeof data == "string"){
        resData = {
            status: data
        }
    }

    res.status(status);
    res.send(resData);
    res.end();
};