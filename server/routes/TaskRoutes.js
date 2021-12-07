const express = require("express");
const taskModel = require("./models/Task");
const userModel = require("./models/User");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// fetch all tasks
app.get("/myTasks/:id", async (req, res) => { //gets all tasks for Calendar
    const tasks = await taskModel
        .find({creator: req.params.id, complete: false})
        .sort({ predictedEndDate: 'asc', priority: 'desc' });

    try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// create new task
app.post("/myTasks/:id", async (req, res) => { //gets all tasks for Calendar
    let taskPriority = 0;
    if (req.body.priority == "Low priority") {
        taskPriority = 1;
    } else if (req.body.priority == "Medium priority") {
        taskPriority = 2;
    } else {
        taskPriority = 3;
    }

    userModel.findOne({email: req.params.id}, async (err, user) => {
        if (err) {
            console.log('error finding user');
            return done(err, null);
        }

        const newTask = new taskModel({
            _id: new mongoose.Types.ObjectId, //req.params.id,
            taskName: req.body.taskName,
            predictedEndDate: req.body.deadline,
            priority: taskPriority,
            predictedTimeHours: req.body.PredictedTimeHours,
            predictedTimeMinutes: req.body.PredictedTimeMinutes,
            actualTimeHours: req.body.actualTimeHours,
            actualTimeMinutes: req.body.actualTimeMinutes,
            startTime: req.body.start,
            endTime: req.body.end,
            startDate: req.body.startDate,
            complete: false,
            difficulty: req.body.difficulty,
            creator: req.params.id,
        });

        taskModel.create(newTask, (err, task) => {
            if (err) {
                res.redirect('/');
                throw new Error(err);
            }
            user.tasks.push(newTask);
            user.save((err) => {
                return res.send(user.tasks);
            });
        });
    });
});

// mark task as completed
app.put("/completed/:id", async (req, res) => {
    const task = await taskModel.findById(req.params.id)

    if(!task) return res.status(404).send("Task not found")

    const newTask = new taskModel({
        taskName: req.body.taskName,
        startDate: req.body.startDate,
        complete: req.body.complete,
        difficulty: req.body.difficulty,
        predictedEndDate: req.body.deadline,
        priority: req.body.priority,
        predictedTimeHours: req.body.PredictedTimeHours,
        predictedTimeMinutes: req.body.PredictedTimeMinutes,
        actualTimeHours: req.body.actualTimeHours,
        actualTimeMinutes: req.body.actualTimeMinutes,
        startTime: req.body.startTime,
    });

    try{
        const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, newTask, { new: true});
        res.send(updatedTask);
    }catch (error) {
        res.status(500).send(error.message);
    }
});

// delete task
app.post("/deleteTask/:id", async (req, res) => {
    const task_id = req.params.id;
    console.log(task_id);
    taskModel.deleteOne({_id: task_id}, function(err) {
        res.status(500).send(err.message)
    });
});

// update task
app.post("/updateTask/:id", async (req, res) => {
    const task_id = req.params.id;
    let taskPriority = 0;
    if (req.body.priority == "Low priority" || req.body.priority == "1") {
        taskPriority = 1;
    } else if (req.body.priority == "Medium priority" || req.body.priority == "2") {
        taskPriority = 2;
    } else {
        taskPriority = 3;
    }
    taskModel.updateOne(
        {_id: task_id},
        {taskName: req.body.taskName, predictedEndDate: req.body.deadline,
            priority: taskPriority, predictedTimeHours: req.body.PredictedTimeHours,
            predictedTimeMinutes: req.body.PredictedTimeMinutes, startDate: req.body.startDate,
            startTime: req.body.startTime, difficulty: req.body.difficulty},
        function(err) {
            res.status(500).send(err.message);
        });
});

module.exports = app;