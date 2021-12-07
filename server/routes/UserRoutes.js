const express = require("express");
const taskModel = require("./models/Task");
const userModel = require("./models/User");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// fetch all users
app.get("/users", async (req, res) => { //gets all users
    const users = await userModel.find({});

    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// add new user
app.post("/users", async (req, res) => {
    const users = new userModel(req.body);

    try {
        await users.save();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/signedin', (req, res) => {
    userModel.findOne({email: req.body.email}, (err,user)=> {
        if (err) {
            throw new Error("Error finding this user");
        }

        if(!user) {
            const newUser = new userModel ({
                _id: new mongoose.Types.ObjectId,
                googleId: req.body.googleId,
                name: req.body.name,
                email: req.body.email,
            });
            userModel.create(newUser, (err, user) => {
                if (err) {
                    res.redirect('/');
                    throw new Error(err);
                }
            });
        } else {
            res.send(user);
        }
    });
});

module.exports = app;
