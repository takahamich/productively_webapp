const express = require("express");
const taskModel = require("./models/Task");
const userModel = require("./models/User");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// TODO: send message if x not found, instead of throwing an error?

app.get("/users", async (req, res) => { //this get request gets all users
    const users = await userModel.find({});

    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/tasks", async (req, res) => { //this get request gets all tasks
    const tasks = await taskModel.find({});

    try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/tasks/{id}", async (req, res) => { //this get request shoukd get all tasks from a specific user id
    const user = await userModel.find(req.params.id);
    const tasks = new user.tasks;

    // find within user?
    try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/tasks/{id}", async (req, res) => {
    const user = new userModel(req.params.id);
    user.tasks = user.tasks.append(req.body);
    // check if req.body is formatted correctly

    try {
        await user.save();
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