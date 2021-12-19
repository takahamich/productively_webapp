const session = require("express-session");
const passport = require("passport");
const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("../db/dbConnect");
const Router = require("./routes");
const bodyParser = require('body-parser');
const taskModel = require("./models/Task");
const userModel = require("./models/User");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors')
const app = express();
const port = process.env.PORT || 8080;
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


dbConnect();

app.use(express.json());

app.set("trust proxy", 1);

app.use(cookieParser());

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
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
            if (err) {
                return done(err, null);
            }

            if (!user) {
                const newUser = new userModel({
                    _id: new mongoose.Types.ObjectId,
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    picture: profile.photos[0].value,
                });
                await newUser.save();
                return done(null, newUser);
            }

            return done(null, user);
        })

    }));

app.get('/auth/google',
    passport.authenticate('google', { scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureMessage: "Cannot login to Google, please try again later!",
        failureRedirect: 'http://localhost:3000/'
    }),
    function(req, res) {
        req.session.save();
        res.redirect('http://localhost:3000/home');
    });

app.get("/getuser", (req, res) => {
    if(req.user) {
        return res.send(req.user);
    } else {
        return null;
    }
});

app.get("/auth/logout", (req, res) => {
    if (req.user) {
        req.logout();
        return res.send("done");
    }
});



app.post('/tasks/schedule', (req, res) => {
    let id = req.body.credentials;
    console.log("User email:" + id);
    console.log("Handling POST request for schedule...");
    Schedule(id).then(
        data => res.send(data)
    );
})




// Scheduling Algorithm
async function Schedule(id = ''){
    let message = [];
    const result = await taskModel.find({creator: id, complete: false});

    let tasks = [];
    for(var i = 0; i < result.length; i++) {
        let obj = result[i];
            //The parameter value is the weight assigned to each task.
            // Time-consuming tasks with high priority have larger weights.
            // We will take difficulty level into consideration in the next iteration.
        tasks.push({id:obj.id,
            taskName: obj.taskName,
            deadline: new Date(obj.predictedEndDate),
            predTimeHr:parseInt(obj.predictedTimeHours),
            predTimeMin:parseInt(obj.predictedTimeMinutes),
            value:parseInt(obj.priority) * parseInt(obj.predictedTimeHours)
                * parseInt(obj.predictedTimeMinutes)/60.0 })
    }

    tasks.sort(compareDeadline);

    //Prompt a schedule for the user
    let today = new Date(); // This is based on UTC, will consider change timezone to EST next iteration.
    let tasksDueToday = [];
    let tasksToStart = [];
    for(var i = 0; i < tasks.length; i++) {
        if (tasks[i].deadline.getDate() - today.getDate() == -1) {
            tasksDueToday.push(tasks[i])
        }
        //Giving a task two buffer days before the deadline
        else if (tasks[i].deadline.getDate() - today.getDate() < 2) {
            tasksToStart.push(tasks[i])
        }
    }
    if (tasksDueToday.length == 0) {
        message.push("You do not have any task due today, but you can start early on other tasks.");
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

function createTodaysSchedule(taskList, message) {
    let start = new Date();
    //In the future, it may be better to let users to input their free time
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
    }
    return -1;
}



app.use(Router);



//TEST BRANCH

