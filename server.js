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
        console.log("/////////////////////////////////////// IN SOCKET",data)
        io.emit('new message', {class: data.class, message: data.message});
    })

    socket.on('answer', function (data) {
        console.log(data)
        io.emit('new answer', {answerObject: data});
    })

});

http.listen(8000, function () {
    console.log("listening on port 8000");
})