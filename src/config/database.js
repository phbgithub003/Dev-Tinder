const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect("");
}

module.exports = connectDB;