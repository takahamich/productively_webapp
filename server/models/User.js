const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }], //might not be necessary to have .of(tasModel)
    _id: mongoose.Types.ObjectId,
    googleId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    __v: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
