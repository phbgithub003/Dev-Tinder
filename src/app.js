const express = require("express");
const {adminAuth} = require("./middleware/auth");  
const {userAuth} = require("./middleware/user"); 

const app = express();



app.use("/admin", adminAuth);

app.get("/admin/getAllUsers",(req,res)=>{
    res.send("all users data");
})

app.post("/user/login",(req,res)=>{
    res.send("user logged in successfully");
})

app.get("/user/getdata",userAuth,(req,res)=>{
    res.send("user data sent");
})

app.delete("/admin/deleteUser/:id",(req,res)=>{
    params = req.params;
    res.send(`user with id ${params.id} deleted`);
})


app.get("/getUserData",(req,res)=>{
    throw new Error("some error occured"); // to test error handling middleware
    res.send("user data");
})

app.use("/",(err,req,res,next)=>{
    if(err) {
        res.status(500).send("some error occured");
    }
})

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
