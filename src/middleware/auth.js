const User = require("../model/user")
const jwt = require("jsonwebtoken");

async function userAuth(req, res, next) {
    try {
        const { token } = req.cookies;
        if(!token) {
            throw new Error("token is not valid");
        }
        const { _id } = await jwt.verify(token, "Dev@tinder$007");
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();

    } catch (err) {
        res.status(400).send("Error: "+ err.message);
    }
}

module.exports = userAuth;