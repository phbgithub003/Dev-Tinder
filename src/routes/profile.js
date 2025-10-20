const express = require("express")
const userAuth = require("../middleware/auth");
const { validateProfileViewData, validatePassword } = require("../utils/validations")
const User = require("../model/user")
const profileRouter = express.Router();


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        let user = req.user;
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send("Error: " + err)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateProfileViewData(req)) {
            throw new Error("fields are not allowed to edit");
        }
        let user = req.user;
        await User.findOneAndUpdate({ "_id": user._id }, req.body)
        res.status(200).send("user updated sucessfully")
    } catch (err) {
        res.status(400).send("Error: " + err);
    }
})


module.exports = profileRouter;