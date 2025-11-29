const mongoose = require("mongoose")
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
    await mongoose.connect(mongoUri).then(console.log("Connected to database")).catch(error => console.log("An error occurred while connecting to the database", error));
}

module.exports = {initializeDatabase};