const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect("mongodb+srv://phb_db_user:@namastenode.fayeufb.mongodb.net/DevTinder");
}

module.exports = connectDB;