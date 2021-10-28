const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    tasks: Array,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
