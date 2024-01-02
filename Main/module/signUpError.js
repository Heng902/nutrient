

module.exports = (res, type, status=500)=>{
    console.log(`ERROR ${type}`);
    res.json({
        ERROR: 'System Error'
    });
    res.status(status);
    res.end();
};