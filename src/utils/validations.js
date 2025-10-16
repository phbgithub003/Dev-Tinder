const validator = require("validator");

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

module.exports = {validateSignUpData,validateLoginData}