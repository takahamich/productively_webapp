const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        default: 0,
    },
    priority: {
        type: Number,
        default: 0,
    },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
