const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/database");
const User = require("./model/user");
const {
    validateSignUpData,
    validateLoginData,
} = require("./utils/validations");
const bcrypt = require("bcrypt");
const userAuth = require("./middleware/auth")

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailID, password } = req.body;
        validateSignUpData(req);
        const passHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailID,
            password: passHash,
        });
        await user.save();
        res.send("User signed up successfully");
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        validateLoginData(req);
        const { emailID, password } = req.body;
        const user = await User.findOne({ emailID: emailID });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isValidPassowrd = user.validatePassword(password)
        if (!isValidPassowrd) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        let token = await user.getJWT()
        res.cookie("token", token,{expires:new Date(Date.now() + 7 * 60 * 60 * 1000)});
        return res.status(200).json({ message: "User can login" });
    } catch (error) {
        res.status(500).send("Error:"+ error.message);
    }
});

app.get("/profile",userAuth,async (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (err) {
        res.status(400).send("Error:", err.message);
    }
});

app.post("/sendConnectionRequest",userAuth,(req,res)=>{
    let user = req.user;
    res.status(200).send(user.firstName + " is sending response")
});

connectDB()
    .then(() => {
        console.log("DB connected successfully");
        app.listen(3000, () => {
            console.log("server is running on port 3000");
        });
    })
    .catch((err) => {
        console.log("DB connection failed");
        console.log(err);
    });
