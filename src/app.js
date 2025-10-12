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

connectDB().then(() => {
    console.log("DB connected successfully");
  app.listen(3000, () => {
    console.log("server is running on port 3000");
  });
}).catch((err) => {
    console.log("DB connection failed");
    console.log(err);
});
