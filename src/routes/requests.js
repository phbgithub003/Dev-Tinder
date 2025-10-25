const express = require("express");
const userAuth = require("../middleware/auth")
const ConnectionRequest = require("../model/connectionRequest")
const User = require("../model/user");
const mongoose = require("mongoose");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try {
      const fromUserId = req.user._id;                  
      const toUserId = req.params.toUserId;
      const status = req.params.status?.toLowerCase();

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status type: " + status });
      }

      const toUser = await User.findById(toUserId);
      if(!toUser) {
        return res.status(400).json({ message: "User not found" });
      }

      const isToUserValid = await User.findById(toUserId).lean();
      if (!isToUserValid) {
        return res.status(404).json({ message: "User does not exist" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).json({ message: "Connection request already exists" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      return res.json({
        message:req.user.firstName + " has " + status +" on "+ toUser.firstName,
        data,
      });
    } catch (err) {
      return res.status(500).send("Error: " + err.message);
    }
  });


  requestRouter.post("/request/review/:status/:requestId",userAuth, async(req,res)=>{
    try{
        const logedInUser = req.user;
        const {status,requestId} = req.params;
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)) {
            return res.status(404).json({message:"Not a valid status"})
        }
        let connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:logedInUser._id,
            status:"interested"
        });
        if(!connectionRequest){
            return res.status(404).json({message:"connection request not found"})
        }
        console.log(connectionRequest);
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        return res.status(200).json({message:"Connection request "+status, data:data})

    }catch(err){
        return res.status(500).send("Error: " + err.message);
    }

  });


module.exports = requestRouter;