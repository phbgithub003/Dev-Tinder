const userAuth = (req,res,next)=>{
    console.log("userAuth middleware called");
    let token = "xyz";
    let authorized = token === "xyz"; 

    if (!authorized) {
        res.send("unauthorized user");
    } else {
        next();
    }
};


module.exports = {userAuth};