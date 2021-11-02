const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
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
        type: Date,
        default: Date.now,
    },
    predictedTime: {
        type: String,
        required: true,
    },

    actualTime: {
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
