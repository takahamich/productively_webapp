const session = require("express-session");
const passport = require("passport");
const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");
const bodyParser = require('body-parser');
const taskModel = require("./models/Task");
const userModel = require("./models/User");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors')
const app = express();
const port = 8080;
const cookieParser = require('cookie-parser');

app.use(cors({credentials: true, origin: 'http://localhost:3000'})); //might not need to be commented out
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

app.use(express.json());
//app.use(cors({ origin: "https://localhost:3000", credentials: true })); //check

app.set("trust proxy", 1);

app.use(cookieParser());
// app.use(express.bodyParser());
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
    //proxy: true,
    // cookie: {
    //     sameSite: "none",
    //     secure: true,
    //     maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    // }
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
    done(null, user.id); //or simply id
});

passport.deserializeUser(function(id, done) {
    userModel.findById(id, function(err, user) {
        done(err, user);
    });
});


passport.use(new GoogleStrategy({
        clientID: `844612426523-iqc51n1du6su4dome75g0n7p35ru5k7j.apps.googleusercontent.com`,
        clientSecret: `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`,
        callbackURL: "/auth/google/callback"
    },
    function (token, tokenSecret, profile, done) {

        userModel.findOne({ googleId: profile.id }, async (err, user) => {
            console.log('trying to find user or create');
            if (err) {
                console.log('error finding user');
                return done(err, null);
            }

            if (!user) {
                console.log('creating user');
                const newUser = new userModel({
                    _id: new mongoose.Types.ObjectId,
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    picture: profile.photos[0].value,
                });
                console.log('name: ' + newUser.name );
                console.log('email: ' + newUser.email);
                console.log('picture url: ' + newUser.picture);
                await newUser.save();
                return done(null, newUser);
            }

            console.log('found user');
            console.log('name: ' + user.name );
            console.log('email: ' + user.email);
            console.log('picture url: ' + user.picture);
            return done(null, user);
        })

    }));

app.get('/auth/google',
    passport.authenticate('google', { scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ] })); //or just 'profile' vs https://www.googleapis.com/auth/plus.login

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureMessage: "Cannot login to Google, please try again later!",
        failureRedirect: 'http://localhost:3000/'
    }),
    function(req, res) {
        console.log('User :' + req.user);
        req.session.save();
        //req.session.user = req.user;
        console.log("session is: " + req.session);
        res.redirect('http://localhost:3000/home');
    });

app.get("/getuser", (req, res) => {
    console.log("tried to get user and found: ");
    console.log(req.user);
    if(req.user) {
        console.log('sending req.user!');
        return res.send(req.user);
    } else {
        console.log("couldn't find user / user undefined");
    }
    return null;
});

app.get("/auth/logout", (req, res) => {
    if (req.user) {
        req.logout();
        console.log("logging out!");
        return res.send("done");
    }
});

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
    // Schedule();

    //Schedule();
    
});
/*function myFunction(startTimeValue, endTimeValue) {
    console.log("IN HERE", startTimeValue, endTimeValue);
    return startTimeValue, endTimeValue  // The function returns the product of p1 and p2
  }*/
let message = [];

app.post('/tasks/schedule', (req, res) => {
    let id = JSON.stringify(req.body);
    console.log("User email:" + id);
    console.log("Handling POST request for schedule...");
    message = Schedule(id);
    console.log(message);
    res.send(message);
})


/*app.get('/tasks/schedule', (req, res) => {
    try {
        console.log("Handling GET request for schedule...");
        console.log(message);
        res.send(message);
    } catch (error) {
        res.status(500).send(error);
    }
});*/



// Scheduling Algorithm
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
    //In the next iteration, it may be better to let users to input their free time
    //Currently, assume the user has a whole day to work on the tasks (9 am to 11 pm)
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
    }}


// });
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
