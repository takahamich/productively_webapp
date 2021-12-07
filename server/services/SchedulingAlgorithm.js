const taskModel = require("./models/Task");

function Schedule(id = ''){
    let result = findTasks(id);
    let message = [];
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

    //Prompt a schedule for the user
    let today = new Date();
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
        message.push("Yay! You do not have any task due today, but you can start early on other tasks.");
        message.push("Here is a list of tasks to start:");
        createTodaysSchedule(tasksToStart, message)
    }
    else {
        message.push("There are tasks that are due today! Take a look before it is too late!")
        let i = createTodaysSchedule(tasksDueToday, message)
        if (i >= 0) {
            message.push("Oh no! It seems that you cannot finish all tasks that are due today.");
            message.push("We suggest you leave out these less important tasks:")
            for(var j = 0; i < tasksDueToday.length; i++) {
                message.push(tasksDueToday[j].taskName);
            }
        }
    }
    return message;
}

const findTasks = async function(id) {
    try {  return await taskModel.find({})
    } catch(err) { console.log(err) }
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
    return 0;
}

function createTodaysSchedule(taskList, message) {
    let start = new Date();
    taskList.sort(compareWeight);
    let currHour = 9;
    message.push("Today's schedule:");
    for(var i = 0; i < taskList.length; i++) {
        if (currHour > 23) {
            return i;
        }
        start.setHours(currHour);
        message.push("Start time: " + start.getHours() + ":00");
        message.push("Task Name: " + taskList[i].taskName) ;
        currHour =  currHour + taskList[i].predTime + 1;
    }
}