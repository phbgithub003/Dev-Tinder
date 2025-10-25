const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is not supported`,
      },
      required:true
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({fromUserId:1,toUserId:1});

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("invalid connect request");
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequest;