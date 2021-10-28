const express = require("express");
const taskModel = require("./models/Task");
const UserModel = require("./models/User");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post("/add_task", async (req, res) => {
    const task = new taskModel(req.body);

    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/tasks", async (req, res) => {
    const tasks = await taskModel.find({});

    try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;