const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");
const bodyParser = require('body-parser');
const taskModel = require("./models/Task");
const userModel = require("./models/User");
const cors = require('cors')
const app = express();
const port = 8080;
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");


const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(connectLiveReload());

mongoose.connect(
    `mongodb+srv://nolombardo:%40ndw3simplys%40id@cluster0.kjv7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

app.get('/', (req, res) => {
    res.send({ express: 'React connected to Express back-end' });
});

app.post('/', (req, res) => {
    console.log(req.body);
    console.log(`I received your POST request. This is what you sent me ${req.body}`);

});



// app.get('/getEvents', (req, res) => {
//     console.log("hey")
//     taskModel.find({}, function (err, result) {
//         if (err) return handleError(err);
//         return res.send(result);
//     })

// });






// app.get('/getEvents', (req, res) => {
//     mongoose.connect(
//         `mongodb+srv://nolombardo:%40ndw3simplys%40id@cluster0.kjv7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
//     );
//     const db = mongoose.connection;
//     db.on("error", console.error.bind(console, "connection error: "));
//     db.once("open", function () {
//         console.log("Connected successfully");
//         console.log(`Tasks:`);
//         taskModel.find({}, function (err, result) {
//             if (err) return handleError(err);
//             console.log(result);
    
//             for(var i = 0; i < result.length; i++) {
//                 var obj = result[i];
//                 // myFunction(obj.startTime, obj.endTime);
//             }
//         })
        
//     });
    
// });

app.listen(port, () => console.log(`Listening on port ${port}`));






app.use(Router);



//TEST BRANCH

