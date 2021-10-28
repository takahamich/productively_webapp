const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    predictedEndDate: {
        type: Date,
        required: true,
    },
    actualEndDate: {
        type: Date,
    },
    priority: {
        type: Number,
        required: true,
    },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
