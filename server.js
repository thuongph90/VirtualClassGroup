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

io.on("connection", socket => {

    console.log("Server receives socket connection.")

    socket.on('message', function (data) {
        console.log(data)
        io.emit('new message', {user: data.user, message: data.message});
    })

    socket.on('answer', function (data) {
        console.log(data)
        io.emit('new answer', {student: data.student, ans: data.ans, ques: data.ques});
    })

});

http.listen(8000, '18.223.134.15', function () {
    console.log("listening on port 8000");
})