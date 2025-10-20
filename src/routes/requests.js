const express = require("express");
const userAuth = require("../middleware/auth")

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{
    let user = req.user;
    res.status(200).send(user.firstName + " is sending response")
});



module.exports = requestRouter;