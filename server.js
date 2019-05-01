const express = require("express");
const app = express();
app.use(express.static(__dirname + '/public/dist/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.set('trust proxy', 1)
require('./server/config/mongoose')
require("./server/config/routes.js")(app)
const path = require("path");
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

const session = require('express-session');
app.use(bodyParser.json())
app.set('trust proxy', 1)
app.use(session({
    secret: 'ninjas',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

const flash = require('express-flash')
app.use(flash());

const http = require('http').Server(app);
const io = require('socket.io')(http);

var mongoose = require('mongoose');
require('./server/models/models.js');
var Exercise = mongoose.model('Exercise');
var ClassRoom = mongoose.model('ClassRoom');
var Answer = mongoose.model('StudentAnswer');

io.on("connection", socket => {

    console.log("Server receives socket connection.")

    socket.on('message', function (data) {
        createWithSockets(data);
        // Fxn
        function createWithSockets(data) {
            var newExercise = new Exercise({ content: data.message.content })
            newExercise.save(function (err, newExercise) {
                if (err) {
                    console.log(err);
                }
                else {
                    updateExercise(newExercise, data.class)
                    io.emit('new message', { message: newExercise, class: data.class });
                }
            })
        }
        // Fxn
        function updateExercise(data, id) {
            ClassRoom.findOne({ _id: id }, function (err, oneclass) {
                oneclass.exercises.push(data);
                oneclass.save(function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            })
        }
    })

    socket.on('answer', function (data) {
        createWithSockets(data);
        // Fxn
        function createWithSockets(data) {
            var newAnswer = new Answer({ content: data.answerObject.content, student_name: data.answerObject.student_name, student_id: data.answerObject.student_id })
            newAnswer.save(function (err, newAnswer) {
                if (err) {
                    console.log(err);
                }           
                else {
                    updateAnswer(newAnswer, data.exID)
                    io.emit('new answer', { answerObject: newAnswer, exID: data.exID });
                }
            })
        }
        // Fxn
        function updateAnswer(data, id) {
            Exercise.findOne({ _id: id }, function (err, one_exercise) {
                one_exercise.answers.push(data);
                one_exercise.save(function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            })
        }
    })

});

http.listen(8000, function () {
    console.log("listening on port 8000");
})