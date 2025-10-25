const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    emailID: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please set a strong password");
        }
      },
    },
    age: { type: Number, min: 18 },
    gender: { type: String, validate: validateGender },
    skills: { type: [String] },
    photoUrl: {
      type: String,
      validate(value) {
        if ((value.length != 0) &&  !validator.isURL(value)) {
          throw new Error("Invalid URL format");
        }
      },
    },
    about:{type:String,length:200}
  },
  {
    timestamps: true,
  }
);

userSchema.index({firstName:1,lastName:1});

userSchema.methods.getJWT = async function () {
  let user = this
  let token = await jwt.sign({ _id: user._id }, "Dev@tinder$007",{expiresIn: "7d"});
  return token;
}

userSchema.methods.validatePassword = async function (password){
  let user = this;
  const isValidPassowrd = await bcrypt.compare(password, user.password);
  return isValidPassowrd;
}

function validateGender(value) {
  if (!["male", "female", "other"].includes(value.toLowerCase())) {
    throw new Error("Invalid gender value");
  }
}
// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
