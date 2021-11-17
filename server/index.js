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
    //console.log(`Tasks:`);
    /*taskModel.find({}, function (err, result) {
        if (err) return handleError(err);
        // console.log(result);

        for(var i = 0; i < result.length; i++) {
            var obj = result[i];
            myFunction(obj.startTime, obj.endTime);
        }
    })*/
    Schedule();
    
});
/*function myFunction(startTimeValue, endTimeValue) {
    console.log("IN HERE", startTimeValue, endTimeValue);
    return startTimeValue, endTimeValue  // The function returns the product of p1 and p2
  }*/

// Scheduling Algorithm
function Schedule(){
    taskModel.find({}, function (err, result) {
        if (err) return handleError(err);

        let tasks = [];
        for(var i = 0; i < result.length; i++) {
            let obj = result[i];
            //The parameter value is the weight assigned to each task.
            // Time-consuming tasks with high priority have larger weights.
            // We will take difficulty level into consideration in the next iteration.
            tasks.push({id:obj.id,
                taskName: obj.taskName,
                deadline: new Date(obj.predictedEndDate),
                predTime:parseInt(obj.predictedTime),
                value:parseInt(obj.priority) * parseInt(obj.predictedTime)})
        }
        
        tasks.sort(compareDeadline);
        //console.log("Sorted Tasks with Weights")
        //console.log(tasks)

        //Prompt a schedule for the user
        let today = new Date(); // This is based on UTC, will consider change timezone to EST next iteration.
        let tasksDueToday = [];
        let tasksToStart = [];
        for(var i = 0; i < tasks.length; i++) {
            if (tasks[i].deadline.getDate() - today.getDate() == 1) {
                tasksDueToday.push(tasks[i])
            }
            //Giving a task two buffer days before the deadline
            else if (tasks[i].deadline.getDate() - today.getDate() < 2) {
                tasksToStart.push(tasks[i])
            }
        }
        if (tasksDueToday.length == 0) {
            console.log("Yay! You do not have any task due today, but you can start early on other tasks.")
            console.log("Here is a list of tasks to start:")
            createTodaysSchedule(tasksToStart)
        }
        else {
            console.log("There are tasks that are due today! Take a look before it is too late!")
            let i = createTodaysSchedule(tasksDueToday)
            if (i >= 0) {
                console.log("Oh no! It seems that you cannot finish all tasks that are due today.");
                console.log("We suggest you leave out these less important tasks:")
                for(var j = 0; i < tasksDueToday.length; i++) {
                    console.log(tasksDueToday[j]);
                }
            }

        }



    })

}

function compareDeadline( task1, task2 ) {
    //assume the predictedEndTime is in the format of YYYY-MM-DD
    let d1 = task1.deadline;
    let d2 = task2.deadline;
    if ( d1 < d2 ){
        return -1;
    }
    if (d1 > d2){
        return 1;
    }
    return 0;
}

function compareWeight( task1, task2 ) {
    let w1 = task1.value;
    let w2 = task2.value;
    if ( w1 < w2 ){
        return -1;
    }
    if (w1 > w2){
        return 1;
    }
    return 0;
}

function createTodaysSchedule(taskList) {
    let start = new Date();
    //In the next iteration, it may be better to let users to input their free time
    //Currently, assume the user has a whole day to work on the tasks (9 am to 11 pm)
    taskList.sort(compareWeight);
    let currHour = 9;
    console.log("Today's schedule:")
    for(var i = 0; i < taskList.length; i++) {
        if (currHour > 23) {
            return i;
        }
        start.setHours(currHour);
        console.log("Start time: " + start.getHours() + ":00");
        console.log("Task Name: " + taskList[i].taskName);
        currHour =  currHour + taskList[i].predTime + 1;
    }
    return -1;
}

/*function WIS(taskList, p) {
    var M = Array(taskList.length);
    var pred = Array(taskList.length);
    M.fill(0);
    pred.fil(0);
    for (var i = 1; i <= M.length; i++) {
        var leaveWeight = M[i-1]; // total weight if we leave j
        var takeWeight = taskList[j].value + M[p[i]];
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
}*/

app.use(Router);



//TEST BRANCH

