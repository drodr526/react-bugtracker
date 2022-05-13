const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/user");
const Bug = require("./models/bug")
const dotenv = require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/bugtrackerDB');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/client/build/index.html'), function (err) {
        if (err) {
            res.status(500).send("Error: " + err)
        }
    })
})


app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No user exists or password is incorrect.")
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send(req.user);
                console.log(req.user);
            })
        }
    })(req, res, next);
})
app.post("/api/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User already exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);

            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hashedPassword
            })
            await newUser.save();
            res.send("User created");
        }
    })
})
app.get("/api/getuser", (req, res) => {
    res.send(req.user);
})

app.get("/api/ticket/:idToSearch", (req, res) => {
    Bug.findById(req.params.idToSearch, (err, foundBug) => {
        if (foundBug)
            res.send(foundBug)
        else
            res.send("No ticket found.")
    })
})

app.post("/api/comment/:idToSearch", (req, res) => {

    const name = req.user.firstName + " " + req.user.lastName;
    const comment = req.body.comment;

    Bug.findByIdAndUpdate(req.params.idToSearch, { $push: { comments: { name: name, comment: comment } } }, (err, doc) => {
        if (err) {
            res.send("Could not comment")
        } else {
            res.send(doc)
        }
    });
})

app.put("/api/edit/:idToSearch", (req, res) => {

    Bug.findByIdAndUpdate(req.params.idToSearch,
        {
            title: req.body.title,
            description: req.body.description,
            team: req.body.team
        }, (err, doc) => {
            if (err) {
                res.send("Could not edit")
            } else {
                res.send(doc)
            }
        });
})

app.put("/api/get-one-user/:idToSearch", (req, res) => {

    User.findByIdAndUpdate(req.params.idToSearch,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.email,
            admin: req.body.admin
        }, (err, doc) => {
            if (err) {
                res.send("Could not edit")
            } else {
                res.send(doc)
            }
        });
})

app.delete("/api/ticket/:idToSearch", (req, res) => {
    Bug.findByIdAndDelete(req.params.idToSearch, (err, foundBug) => {
        if (foundBug)
            res.send(foundBug)
        else
            res.send("No ticket found.")
    })
})

app.get("/api/get-one-user/:idToSearch", (req, res) => {
    User.findById(req.params.idToSearch, (err, foundUser) => {
        if (foundUser)
            res.send(foundUser)
        else
            res.send("No user found.");
    })
})

app.get("/api/get-all-users", (req, res) => {
    User.find({}, (err, foundUsers) => {
        if (foundUsers.length > 0) {
            res.send(foundUsers)
        } else {
            res.send("No users found");
        }
    });
})

app.get("/api/get-all-bugs", (req, res) => {
    Bug.find({}, (err, foundBugs) => {
        if (foundBugs.length > 0) {
            res.send(foundBugs)
        } else {
            res.send("No bugs found");
        }
    });
})

app.get("/api/logout", (req, res) => {
    req.logout()
    req.session.destroy();
    res.send(req.user)
})

app.post("/api/submit", (req, res) => {

    var today = new Date();
    var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date + ' ' + time;

    const newBug = new Bug({
        title: req.body.title,
        description: req.body.description,
        team: req.body.team,
        submittedBy: req.user.firstName + " " + req.user.lastName,
        timeSubmitted: dateTime
    })
    newBug.save()
        .then(() => {
            res.send("Submitted successfully");
        })
})

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
})

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
}

