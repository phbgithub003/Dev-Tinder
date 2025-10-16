const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");

const app = express();

app.use(express.json());

app.post("/signup",async (req,res)=>{
    const user = new User(req.body); 
    console.log(req.body);
    try {
        await user.save();
        res.send("User signed up successfully");
    } catch (error) {
        res.status(500).send("Error signing up user: " + error.message);
    }
})


app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);

    } catch(error){
        res.status(400).send("something went wrong" + error.message);
    }
})

app.get("/user",async (req,res)=>{
    const email = req.body.emailID;
    try {
        const user = await User.find({emailID: email});
        if(user.length === 0){
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch (error) {
        res.status(400).send("something went wrong" + error.message);
    }
})

app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");

    }catch(error){
        res.status(400).send("something went wrong" + error.message);
    }
})

app.put("/user/:id", async (req,res)=>{
    const userId = req.params?.id;
    const allowedUpdates = ["age","skills","gender","userId"];
    const {  age, skills } = req.body;
    const isUpdatesAllowed = Object.keys(req.body).every(k =>
      allowedUpdates.includes(k)
    );
    if(!isUpdatesAllowed){
        res.status(400).send("Update not allowed");
    }
    try{
        await User.findByIdAndUpdate(userId, {age: age,skills:skills},{runValidators: true});
        res.send("User updated successfully");

    } catch(error){
        res.status(400).send("something went wrong" + error.message);
    }
})

connectDB().then(() => {
    console.log("DB connected successfully");
  app.listen(3000, () => {
    console.log("server is running on port 3000");
  });
}).catch((err) => {
    console.log("DB connection failed");
    console.log(err);
});
