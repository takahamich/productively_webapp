const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    creator: {
        type: String,
        required: true,
    },
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
    complete: {
        type: Boolean,
        default: false,
    },
    difficulty: {
        type: String,
        default: "",
    },
    predictedTimeHours: {
        type: String,
        required: true,
    },
    predictedTimeMinutes: {
        type: String,
        required: true,
    },
    actualTimeHours: {
        type: String,
        default: "",
    },
    actualTimeMinutes: {
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
