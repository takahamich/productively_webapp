// external imports
const mongoose = require("mongoose");
//require("dotenv").config()

async function dbConnect() {
    // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
    mongoose.connect('mongodb+srv://nolombardo:%40ndw3simplys%40id@cluster0.kjv7f.mongodb.net/SchedulingApp?retryWrites=true&w=majority').then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
    })
        .catch((error) => {
            console.log("Unable to connect to MongoDB Atlas!");
            console.error(error);
        });
}

module.exports = dbConnect;