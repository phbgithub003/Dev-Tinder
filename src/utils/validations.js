const validator = require("validator");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const validateSignUpData = (req) =>{
    const {firstName,lastName,emailID, password} = req.body;

    if (!firstName || !lastName) {
        throw new Error ("Name is not valid");
    } else if (firstName.length <4 || firstName.length>50) {
        throw new Error ("first name should be between between 4 and 50");
    } else if( !validator.isEmail(emailID)) {
        throw new Error("invalid email address");
    } else if( !validator.isStrongPassword(password)) {
        throw new Error("Weak password");
    }
}

const validateLoginData = (req) =>{
    const {emailID} = req.body;

    if (!validator.isEmail(emailID)) {
        throw new Error("invalid Email ID, please enter corect email id");
    }
}

const validateProfileViewData=(req) =>{
    const allowedEditFields = ["latName","photoUrl","about","skills","age","gender"];
    const isAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));

    return isAllowed
} 

module.exports = {validateSignUpData,validateLoginData,validateProfileViewData}