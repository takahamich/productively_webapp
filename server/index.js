const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");
const bodyParser = require('body-parser');
const taskModel = require("./models/Task");
const userModel = require("./models/User");
const cors = require('cors')
const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send({ express: 'React connected to Express back-end' });
});

app.post('/', (req, res) => {
    console.log(req.body);
    console.log(`I received your POST request. This is what you sent me ${req.body}`);

});

app.listen(port, () => console.log(`Listening on port ${port}`));


mongoose.connect(
    `mongodb+srv://nolombardo:%40ndw3simplys%40id@cluster0.kjv7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
    console.log(`Tasks:`);
    taskModel.find({}, function (err, result) {
        if (err) return handleError(err);
        // console.log(result);

        for(var i = 0; i < result.length; i++) {
            var obj = result[i];
            myFunction(obj.startTime, obj.endTime);
        }
    })

    Schedule();
    
});
function myFunction(startTimeValue, endTimeValue) {
    console.log("IN HERE", startTimeValue, endTimeValue);
    return startTimeValue, endTimeValue  // The function returns the product of p1 and p2
  }

// Scheduling Algorithm
function Schedule(){
    taskModel.find({}, function (err, result) {
        if (err) return handleError(err);

        result.sort(compare);
        console.log("Sorted Tasks:")
        console.log(result);
        let values = [];
        for(var i = 0; i < result.length; i++) {
            var obj = result[i];
            values.push({id:obj.id, predTime:obj.predictedTime,
                value:parseInt(obj.priority) * parseInt(obj.predictedTime) * parseInt(obj.difficulty)})
        }
        console.log("Sorted Tasks with Weights")
        console.log(values)

        //TODO: prompt a schedule for the user
        var p = Array(values.length);
        for(var i = 0; i < p.length; i++) {
            if ((i - 2) < 0) {
                p[i] = 0;
            } else {
                p[i] = i - 2
            }
        }
        pred = WIS(values, p)
        console.log(pred)

    })

}

function compare( task1, task2 ) {
    // TODO: change the method from basic string comparison to date comparison
    if ( task1.endTime < task2.endTime ){
        return -1;
    }
    if ( task1.endTime > task2.endTime){
        return 1;
    }
    return 0;
}

function WIS(taskList, p) {
    var M = Array(taskList.length);
    var pred = Array(taskList.length);
    M.fill(0);
    pred.fil(0);
    for (var i = 1; i <= M.length; i++) {
        var leaveWeight = M[i-1]; // total weight if we leave j
        var takeWeight = taskList[j].value + M[p[i]]; // assume no overlapping task for now
        if ( leaveWeight > takeWeight ) {
            M[i] = leaveWeight; // better to leave j
            pred[i] = i-1;
        }
        else {
            M[i] = takeWeight; // better to take j
            pred[i] = p[i]; // previous is p[j]
        }
    }
    return pred;
}

app.use(Router);



//TEST BRANCH



