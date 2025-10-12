const adminAuth = (req,res,next)=>{
    let token = "xyz";
    let authorized = token === "xyz"; 

    if (!authorized) {
        res.send("unauthorized user");
    } else {
        next();
    }
};


module.exports = {adminAuth};