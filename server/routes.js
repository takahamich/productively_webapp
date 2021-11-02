const express = require("express");
const taskModel = require("./models/Task");
const userModel = require("./models/User");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();


//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// TODO: send message if x not found, instead of throwing an error?

app.get("/users", async (req, res) => { //gets all users
    const users = await userModel.find({});

    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/tasks", async (req, res) => { //gets all tasks
    const tasks = await taskModel.find({});

    try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/tasks', (req, res) => {
    console.log(req.body);
    const newTask = new taskModel ({
        _id: new mongoose.Types.ObjectId, //req.params.id,
        taskName: req.body.taskName,
        predictedEndDate: req.body.deadline,
        priority: req.body.priority,
        predictedTime: req.body.PredictedTime,
        actualTime: req.body.ActualTime,
    });

    taskModel.create(newTask, (err, task) => {
        if (err) {
            res.redirect('/');
            throw new Error("error when posting task");
        }
    });

    var prodScore = Number(req.body.ActualTime) / Number(req.body.PredictedTime);
    switch (prodScore) {
        case (val < .75):
            console.log("Wow! You're hyper-productive. " +
                "Feel free to do more things, or just enjoy your day!");
        case (val >= .75 && val <= 1):
            console.log("Yay! You're pretty spot on with your time estimates. " +
                "Keep it up!");
        case (val > 1 && val < 1.5):
            console.log("Hmm, do you want to add some buffer time in your day, " +
                "and plan spend more time on your tasks?");
        case (val > 1.5):
            console.log("Oof. Do you need a day off on [day of the week]s? " +
                "Are you taking a day off at least once a week? " +
                "Also, do you want to add some buffer time in your day, " +
                "and plan spend more time on your tasks?");
    }

    res.send(newTask);
});

// app.get("/tasks/:id", async (req, res) => {
//     const tasks = await taskModel.find({creator: req.params.id});
//     console.log(tasks);//user.tasks undefined
//
//     // find within user?
//     try {
//         res.send(tasks);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });


// app.post("/tasks/:id", async (req, res) => {
//     //console.log(JSON.stringify(req.body));
//     console.log(req.body);
//     userModel.findById(req.params.id, (err,user)=> {
//         if(err) {
//             throw new Error(err);
//         }
//         const newTask = new taskModel ({
//             _id: new mongoose.Types.ObjectId, //req.params.id,
//             taskName: req.body[0].taskName,
//             predictedEndDate: req.body[0].predictedEndDate,
//             priority: req.body[0].priority,
//             creator: req.params.id,
//         });
//
//         console.log(newTask);
//
//         taskModel.create(newTask, (err, task) => {
//             if (err) {
//                 res.redirect('/');
//                 throw new Error(err);
//             }
//
//             user.tasks.push(newTask);
//             console.log(user.tasks);
//             user.save((err)=> {
//                     return res.send(user.tasks);
//             });
//         });
//
//     });
// });

app.post("/users", async (req, res) => {
    const users = new userModel(req.body);

    try {
        await users.save();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

//app post: task score algorithm

module.exports = app;