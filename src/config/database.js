const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect("mongodb+srv://phb_db_user:Kl45F5iny6vkrrgH@namastenode.fayeufb.mongodb.net/DevTinder");
}

module.exports = connectDB;