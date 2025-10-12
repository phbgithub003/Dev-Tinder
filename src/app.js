const express = require("express");

const app = express();

app.get("/user/:id/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({name:"harshit",age:20});
})

app.use((req,res)=>{
    res.send("Hello from express");
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});

