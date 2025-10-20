const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignUpData, validateLoginData } = require("../utils/validations")

const authRouter = express.Router();
authRouter.use(express.json())
const User = require("../model/user")

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const { emailID, password, firstName, lastName } = req.body;

        const hashPwd = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailID,
            password: hashPwd,
        });

        await user.save();
        return res.status(200).send("User signed up successfully");
    } catch (err) {
        return res.status(400).send("Error: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
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
        res.cookie("token", token, { expires: new Date(Date.now() + 7 * 60 * 60 * 1000) });
        return res.status(200).json({ message: "User can login" });
    } catch (error) {
        res.status(500).send("Error:" + error.message);
    }
});

authRouter.post("/logout",(req,res)=>{
    res.cookie("token","null",{
        expires: new Date(Date.now()),
    });
    res.status(200).send("User logged out");
})

module.exports = authRouter;