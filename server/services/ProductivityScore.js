function getTimesForProductivityScore(tasks){
    let finalData = []
    let result = []

    for(var i = 0; i < tasks.length; i++) {
        let obj = tasks[i];
        finalData.push({
            id:obj.id,
            taskName: obj.taskName,
            deadline: new Date(obj.predictedEndDate),
            predTime: parseInt(obj.predictedTimeMinutes)/60 + parseInt(obj.predictedTimeHours),
            actualTime:parseInt(obj.actualTimeMinutes)/60 + parseInt(obj.actualTimeHours)})
    }

    totalPredTime = 0;
    totalActualTime = 0;

    for(var i = 0; i < finalData.length; i++) {
        totalPredTime += finalData[i].predTime;
        totalActualTime += finalData[i].actualTime;
    }

    result.push(totalPredTime, totalActualTime);
    return result;
}

function calculateProductivityScore(predTime, actualTime) {
    var prodScore = (actualTime/predTime).toPrecision(2);
    return productivityScoreBucket(prodScore);
}

function productivityScoreBucket(prodScore) {
    result = [];
    switch (true) {
        case (Number.isNaN(prodScore) === true):
            result.push('_ _');
            result.push("You do not have a productivity score! As you add tasks and complete them, your productivity score will be available to you!")
            break;
        case (prodScore < .75):
            result.push(prodScore);
            result.push("Wow! You're hyper-productive. Feel free to do more things, or just enjoy your day!")
            break;
        case (prodScore <= 1):
            result.push(prodScore);
            result.push("Yay! You're pretty spot on with your time estimates. Keep it up!");
            break;
        case (prodScore < 1.5):
            result.push(prodScore);
            result.push("Hmm, do you want to add some buffer time in your day, and plan spend more time on your tasks?");
            break;
        case (prodScore >= 1.5):
            result.push(prodScore);
            result.push("Oof. You might need a day off! Are you taking a day off at least once a week? Also, do you want to add some buffer time in your day, and plan spend more time on your tasks?");
    }
    return result;
}