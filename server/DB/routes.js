const express = require("express");
const taskModel = require("./models");
const app = express();

app.post("/add_task", async (request, response) => {
    const task = new taskModel(request.body);

    try {
        await task.save();
        response.send(task);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/tasks", async (request, response) => {
    const tasks = await taskModel.find({});

    try {
        response.send(tasks);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;