const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    /*creator: {
        type: String,
        required: true,
    },*/
    taskName: {
        type: String,
        required: true,
    },
    predictedEndDate: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "",
    },
    difficulty: {
        type: String,
        default: "",
    },
    predictedTime: {
        type: String,
        required: true,
    },
    actualTime: {
        type: String,
        default: "",
    },
    startTime: {
        type: String,
        default: "",
    },
    endTime: {
        type: String,
        default: "",
    },
    __v: {
        type: Number,
        default: 0,
    },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
