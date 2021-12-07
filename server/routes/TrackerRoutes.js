const express = require("express");
const taskModel = require("./models/Task");
const app = express();

app.post('/goalTracker', async (req,res) => {
    id = req.body.credentials
    const today = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000).toISOString().substr(0,10);
    const tasks = await taskModel.find({"creator":id, "predictedEndDate": today});
    console.log("my tasks", tasks)
    let value = getTimesForProductivityScore(tasks)
    if (
        Number.isNaN(value[0]) === true

    ){
        value[0] = 0
    } else if( Number.isNaN(value[1]) === true){
        value[1] = 0
    }
    score = calculateProductivityScore(value[0], value[1])
    try {
        res.send(score);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.post('/goalTrackerWeek', async (req,res) => {
    id = req.body.credentials;
    const checkDates = [];
    const result = [];

    const myCurrentDate = new Date();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var day = days[myCurrentDate.getDay()];

    const date = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000).toISOString().substr(0,10);

    var myPastDate1 = new Date(myCurrentDate);
    myPastDate1.setDate(myPastDate1.getDate() - 6);
    const date1 =  myPastDate1.getFullYear() + '-' +  (myPastDate1.getMonth()+1) + '-' + myPastDate1.getDate();

    var myPastDate2 = new Date(myCurrentDate);
    myPastDate2.setDate(myPastDate2.getDate() - 5);
    const date2 = myPastDate2.getFullYear() + '-' +  (myPastDate2.getMonth()+1) + '-' + myPastDate2.getDate();

    var myPastDate3 = new Date(myCurrentDate);
    myPastDate3.setDate(myPastDate3.getDate() - 4);
    const date3 = myPastDate3.getFullYear() + '-' +  (myPastDate3.getMonth()+1) + '-' + myPastDate3.getDate();

    var myPastDate4 = new Date(myCurrentDate);
    myPastDate4.setDate(myPastDate4.getDate() - 3);
    const date4 = myPastDate4.getFullYear() + '-' +  (myPastDate4.getMonth()+1) + '-' + myPastDate4.getDate();

    var myPastDate5 = new Date(myCurrentDate);
    myPastDate5.setDate(myPastDate5.getDate() - 2);
    const date5 = myPastDate5.getFullYear() + '-' +  (myPastDate5.getMonth()+1) + '-' + myPastDate5.getDate();

    var myPastDate6 = new Date(myCurrentDate);
    myPastDate6.setDate(myPastDate6.getDate() - 1);
    const date6 = myPastDate6.getFullYear() + '-' +  (myPastDate6.getMonth()+1) + '-' + myPastDate6.getDate();

    if (day === "Sunday"){
        checkDates.push(date1, date2, date3, date4, date5, date6, date)
        totalProductivityScore = 0
        var totalPredictedTime = 0
        var totalActualTime = 0

        for (var i = 0; i < checkDates.length; i++){
            const tasks = await taskModel.find({"creator":id, "predictedEndDate": checkDates[i]})
            let value = getTimesForProductivityScore(tasks)
            if (Number.isNaN(value[0]) === true){
                value[0] = 0;
            } else if (Number.isNaN(value[1]) === true) {
                value[1] = 0;
            }
            score = calculateProductivityScore(value[0], value[1]);
            result.push(score[0]);
            totalPredictedTime += value[0];
            totalActualTime += value[1];
        }
        result.push(calculateProductivityScore(totalPredictedTime, totalActualTime));
    }
    else {
        result.push(["You do not have a productivity score yet. Please check back at the end of the week!"]);
    }
    try {
        res.send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = app;