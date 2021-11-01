const express = require("express");
const taskModel = require("./models/Task");
const userModel = require("./models/User");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());

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

app.get("/tasks/:id", async (req, res) => {
    const user = await userModel.find({_id: req.params.id});
    console.log(user); // works
    //or const tasks = await taskModel.find({creator: req.params.id});
    console.log(user.tasks);//user.tasks undefined
    res.send(user); //taskArray

    // find within user?
    // try {
    //     res.send(tasks);
    // } catch (error) {
    //     res.status(500).send(error);
    // }
});

app.post("/tasks/:id", async (req, res) => {
    console.log(JSON.stringify(req.body));
    const newTask = new taskModel({
        _id: new mongoose.Types.ObjectId, //req.params.id,
        taskName: req.body.taskName,
        predictedEndDate: req.body.deadline,
        priority: req.body.priority,
        creator: req.params.id,
    });

    console.log(newTask);
    console.log(newTask.taskName);

    const user = await userModel.find({_id: req.params.id});
    console.log(user);
    user.tasks.push(newTask);
    //user.tasks = user.tasks.push(newTask);
    // check if req.body is formatted correctly

    try {
        await this.user.save((e,u) => { console.log('New task saved to user!'); });
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/users", async (req, res) => {
    const users = new userModel(req.body);

    try {
        await users.save();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// app post: task score algorithm

module.exports = app;