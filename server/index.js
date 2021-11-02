
   
const express = require("express");
//const mongoose = require("mongoose");
//const Router = require("./routes");
const bodyParser = require('body-parser');

const cors = require('cors')
const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send({ express: 'React connected to Express back-end' });
});

app.post('/tasks', (req, res) => {
    console.log(req.body);
    console.log(`I received your POST request. This is what you sent me: ${req.body}`);
    res.send(req.body.taskName);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
/*
mongoose.connect(
    `mongodb+srv://nolombardo:%40ndw3simplys%40id@cluster0.kjv7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
app.use(Router);
//TEST BRANCH*/