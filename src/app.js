const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");

const app = express();

app.post("/signup",async (req,res)=>{
    const user = new User({
    firstName: "Harshit",
    lastName: "Palacehrla",
    emailID: "harshit@flipkart.com",
    password: "Harshit@123",
    age: 24,
    gender: "male",

}); // Creating a new instance of the User model
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
