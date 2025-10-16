const mongoose = require("mongoose");
const validator = require("validator");

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
      default: "this is a default about a user",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL format");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

function validateGender(value) {
  if (!["male", "female", "other"].includes(value.toLowerCase())) {
    throw new Error("Invalid gender value");
  }
}
// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
