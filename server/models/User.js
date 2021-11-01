//const taskModel = require("./Task");
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    taskName: {
        type: String,
        required: true,
    },
    predictedEndDate: {
        type: Date,
        required: true,
    },
    priority: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    __v: {
        type: Number,
        default: 0,
    },
});

const UserSchema = new mongoose.Schema({
    tasks: [TaskSchema], //might not be necessary to have .of(tasModel)
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    age: Number,
    __v: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model("User", UserSchema);
//const Task = mongoose.model("Task", TaskSchema);

module.exports = User;
//module.exports = Task;
