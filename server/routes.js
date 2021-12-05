// import {myFunction} from './index.js'
const passport = require("passport");
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
    taskModel
        .find({})
        .sort({ predictedEndDate: 'asc', priority: 'desc' })
        .exec(function(err, result) {
        if (err) console.log(err);
        res.send(result);
    });

    /*try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }*/
});

app.get("/myTasks/:id", async (req, res) => { //gets all tasks for Calendar
    console.log("getting my tasks!");
    const tasks = await taskModel.find({creator: req.params.id});//user.tasks undefined

    // find within user?
    try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put("/tasks/:id", async (req, res) => {
    const task = await taskModel.findById(req.params.id)

    if(!task) return res.status(404).send("Task not found")

    const newTask = new taskModel({
        taskName: req.body.taskName,
        startDate: req.body.startDate,
        status: req.body.status,
        difficulty: req.body.difficulty,
        predictedEndDate: req.body.deadline,
        priority: req.body.priority,
        predictedTime: req.body.predictedTime,
        actualTime: req.body.actualTime,
        startTime: req.body.start,
        endTime: req.body.end,
    });

    try{
        const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, newTask, { new: true});
        res.send(updatedTask);
    }catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
});

app.post("/deleteTask", async (req, res) => {
    console.log("deleting task");
    const task_id = req.body.id;
    console.log(task_id);
    taskModel.deleteOne({_id: task_id}, function(err) {
        if (err) console.log(err);
    });
});

app.post("/myTasks/:id", async (req, res) => { //gets all tasks for Calendar
    console.log('Posting a new task to my tasks :p');
    console.log(req.body);

    let taskPriority = 0;
    if (req.body.priority == "Low priority") {
        taskPriority = 1;
    } else if (req.body.priority == "Medium priority") {
        taskPriority = 2;
    } else {
        taskPriority = 3;
    }

    userModel.findOne({email: req.params.id}, async (err, user) => {
        if (err) {
            console.log('error finding user');
            return done(err, null);
        }

        const newTask = new taskModel({
            _id: new mongoose.Types.ObjectId, //req.params.id,
            taskName: req.body.taskName,
            predictedEndDate: req.body.deadline,
            priority: taskPriority,
            predictedTimeHours: req.body.PredictedTimeHours,
            predictedTimeMinutes: req.body.PredictedTimeMinutes,
            actualTime: req.body.ActualTime,
            startTime: req.body.start,
            endTime: req.body.end,
            startDate: req.body.startDate,
            status: req.body.status,
            difficulty: req.body.difficulty,
            creator: req.params.id,
        });

        console.log('new task was created as follows: ');
        console.log(newTask);

        taskModel.create(newTask, (err, task) => {
            if (err) {
                res.redirect('/');
                throw new Error(err);
            }

            user.tasks.push(newTask);
            console.log(user.tasks);
            user.save((err) => {
                return res.send(user.tasks);
            });
        });
    });
});


function getTimesForProductivityScore(tasks){
    let finalData = []
    let result = []

    for(var i = 0; i < tasks.length; i++) {
        let obj = tasks[i];
        finalData.push({
            id:obj.id,
            taskName: obj.taskName,
            deadline: new Date(obj.predictedEndDate),
            predTime:parseInt(obj.predictedTime)})
       
    }
    totalPredTime = 0
    totalActualTime = 10

    for(var i = 0; i < finalData.length; i++) {
        totalPredTime += finalData[i].predTime
    }

    console.log("totalPredTimeis", totalPredTime)

    // Do the same for actual time

    result.push(totalPredTime, totalActualTime)
    return result

}

function calculateProductivityScore(predTime, actualTime) {
//    let getTime = getTimesForProductivityScore(tasks)
//    let predTime = getTime[0]
//    let actTime = getTime[1]
   var prodScore = (actualTime/predTime).toPrecision(2)
   return productivityScoreBucket(prodScore)
        
}

function productivityScoreBucket(prodScore){
    result = []
    switch (true) {
        case (prodScore === "Infinity"):
            result.push('0')
            result.push("You do not have a productivity score for today! As you add tasks and complete them, your daily productivity score will be available to you!")
            break;
        case (prodScore < .75):
            result.push(prodScore)
            result.push("Wow! You're hyper-productive. Feel free to do more things, or just enjoy your day!")
            break;
                
        case (prodScore <= 1):
            result.push(prodScore)
            result.push("Yay! You're pretty spot on with your time estimates. Keep it up!");
            break;
        case (prodScore < 1.5):
            result.push(prodScore)
            result.push("Hmm, do you want to add some buffer time in your day, and plan spend more time on your tasks?");
            break;
        case (prodScore >= 1.5):
            result.push(prodScore)
            result.push("Oof. You might need a day off! Are you taking a day off at least once a week? Also, do you want to add some buffer time in your day, and plan spend more time on your tasks?");
            // let startTimeStr = req.body.start;
            // let startHour = Number(startTimeStr.substring(0, 2));
            // switch (true) {
            //     case (startHour < 12):
            //         console.log("Hmm. Maybe you're not a morning person. " +
            //             "What do you think about not assigning yourself tasks during the morning?");
            //         break;
            //     case (startHour < 17) :
            //         console.log("Hmm. Maybe you're not a afternoon person. " +
            //             "What do you think about not assigning yourself tasks during the afternoon?");
            //         break;
            //     case (startHour < 21):
            //         console.log("Hmm. Maybe you're not a evening person. " +
            //             "What do you think about not assigning yourself tasks during the evening?");
            //         break;
            //     case (startHour >= 21):
            //         console.log("Hmm. Maybe you're not a night person. " +
            //             "What do you think about not assigning yourself tasks during the night?");
            //         break;
            // }
    }
    return result
}


app.post('/goalTracker', async (req,res) => {
    let id = JSON.stringify(req.body);
    // console.log("User email:" + id);

    //change this to look at creator id for that particular date, this will just look at priority for now!
    //check current date and look for tasks due that day for that user.
    const myCurrentDate = new Date();
    const date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate();
    const tasks = await taskModel.find({"predictedEndDate":date});
    let value = getTimesForProductivityScore(tasks)
    score = calculateProductivityScore(value[0], value[1])
 
    try {
        res.send(score);
    } 
    catch (error) {
        res.status(500).send(error);
    }
})

app.post('/goalTrackerWeek', async (req,res) => {
    let id = JSON.stringify(req.body);
    const checkDates = []
    const result = []
  
    const myCurrentDate = new Date();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var day = days[myCurrentDate.getDay()];
    const date = myCurrentDate.getFullYear() + '-' +  (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate();


    var myPastDate1 = new Date(myCurrentDate);
    myPastDate1.setDate(myPastDate1.getDate() - 6)  
    // var day1 = days[myPastDate1.getDay()];
    const date1 =  myPastDate1.getFullYear() + '-' +  (myPastDate1.getMonth()+1) + '-' + myPastDate1.getDate();
  

    var myPastDate2 = new Date(myCurrentDate);
    myPastDate2.setDate(myPastDate2.getDate() - 5)
    // var day2 = days[myPastDate2.getDay()];
    const date2 = myPastDate2.getFullYear() + '-' +  (myPastDate2.getMonth()+1) + '-' + myPastDate2.getDate();
    
    var myPastDate3 = new Date(myCurrentDate);
    myPastDate3.setDate(myPastDate3.getDate() - 4)
    // var day3 = days[myPastDate3.getDay()];
    const date3 = myPastDate3.getFullYear() + '-' +  (myPastDate3.getMonth()+1) + '-' + myPastDate3.getDate();

    var myPastDate4 = new Date(myCurrentDate);
    myPastDate4.setDate(myPastDate4.getDate() - 3)
    // var day4 = days[myPastDate4.getDay()];
    const date4 = myPastDate4.getFullYear() + '-' +  (myPastDate4.getMonth()+1) + '-' + myPastDate4.getDate();

    var myPastDate5 = new Date(myCurrentDate);
    // myPastDate5.setDate(myPastDate5.getDate() - 2)
    // var day5 = days[myPastDate5.getDay()];
    const date5 = myPastDate5.getFullYear() + '-' +  (myPastDate5.getMonth()+1) + '-' + myPastDate5.getDate();

    var myPastDate6 = new Date(myCurrentDate);
    myPastDate6.setDate(myPastDate6.getDate() - 1)
    // var day6 = days[myPastDate6.getDay()];
    const date6 = myPastDate6.getFullYear() + '-' +  (myPastDate6.getMonth()+1) + '-' + myPastDate6.getDate();
    

    if (day === "Sunday"){
        checkDates.push(date1, date2, date3, date4, date5, date6, date)
        // const tasks = await taskModel.find({"predictedEndDate":"2021-11-18"});

        totalProductivityScore = 0
        var totalPredictedTime = 0
        var totalActualTime = 0

        for (var i = 0; i < checkDates.length; i++){
            const tasks = await taskModel.find({"predictedEndDate":checkDates[i]});
            let value = getTimesForProductivityScore(tasks)
            score = calculateProductivityScore(value[0], value[1])
            result.push(score[0])
            totalPredictedTime += value[0]
            totalActualTime += value[1]
        }
        console.log("totalPredictedTime", totalPredictedTime)
        console.log("totalacttime", totalActualTime)
        result.push(calculateProductivityScore(totalPredictedTime, totalActualTime))
        console.log("resulttt", result)
       

    }
    else{
        // result.push("1", "2", "3", "4", "5", "6", ["5", "You do not have a productivity score yet Please check back at the end of the week!"])
        result.push(["You do not have a productivity score yet Please check back at the end of the week!"])
        console.log("result issss", result)
    }
    
    // console.log("RESULTS", result)
    
    try {
        res.send(result);
    } 
    catch (error) {
        res.status(500).send(error);
    }


  
   
})

app.post('/signedin', (req, res) => {
    console.log(req.body);

    userModel.findOne({email: req.body.email}, (err,user)=> {
        if (err) {
            throw new Error("Error finding this user");
        }

        if(!user) {
            console.log('Could not find you in the database, Making a new user!');
            const newUser = new userModel ({
                _id: new mongoose.Types.ObjectId,
                googleId: req.body.googleId,
                name: req.body.name,
                email: req.body.email,
            });
            console.log(newUser);
            userModel.create(newUser, (err, user) => {
                if (err) {
                    res.redirect('/');
                    console.log("Error while creating new user");
                    throw new Error(err);
                }
            });
        } else {
            console.log('User was already in our database!');
            res.send(user);
        }
    });

});




app.post('/tasks', (req, res) => {
    let taskPriority = 0;
    if (req.body.priority == "Low priority") {
        taskPriority = 1;
    } else if (req.body.priority == "Medium priority") {
        taskPriority = 2;
    } else {
        taskPriority = 3;
    }
    const newTask = new taskModel({
        _id: new mongoose.Types.ObjectId, //req.params.id,
        //creator: req.body.creatorId,
        taskName: req.body.taskName,
        startDate: req.body.startDate,
        status: req.body.status,
        difficulty: req.body.difficulty,
        predictedEndDate: req.body.deadline,
        //priority: req.body.priority,
        priority: taskPriority,
        predictedTime: req.body.PredictedTime,
        actualTime: req.body.ActualTime,
        startTime: req.body.start,
        endTime: req.body.end,
    });

    userModel.findOne({email: newTask.creator}, (err,user)=> {
        if (err) {
            throw new Error(err);
        }

        console.log("found user " + user.name + ". We will be adding following task ");
        console.log(newTask);

        //task model.create
        newTask.save((err) => {
            if (err) {
                console.log(err)
                // res.redirect('/');
                alert("error when posting task, please try again");
                throw new Error("error when posting task");
            }

            user.tasks.push(newTask);
            console.log('the user task array has been updated ' + user.tasks);
            user.save((err) => {
                res.send(user.tasks);
            });


        });

   
    });

    console.log("I received your POST request. This is what you sent me");
    console.log(newTask);

    

    //res.send(newTask);
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

//app post: task score algorithm

module.exports = app;