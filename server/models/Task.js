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
    // creator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    __v: {
        type: Number,
        default: 0,
    },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
