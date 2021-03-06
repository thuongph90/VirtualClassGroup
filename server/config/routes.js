var users = require('../controllers/users');
var exercises = require('../controllers/exercises');
var answers = require('../controllers/answers');
var classroom = require('../controllers/classroom');
var path = require('path')

module.exports = function (app) {

    app.post('/login', users.Login) //login
    app.post('/logout', users.Logout)

    // USER SECTION
    app.get('/the_users', users.All) //all
    app.post('/users', users.Register) //create 
    app.put('/users/:id', users.EditUser) //edit
    app.get('/users/:id', users.detailUser) //detail
    app.delete('/users/:id', users.deleteUser) //delete

    // EXERCISE SECTION in class with id == ClassRoom_id
    app.post('/exercises', exercises.create) //create exercise
    app.put('/exercises/:id', exercises.edit) //edit exercise
    app.get('/exercises/:id', exercises.detail) //show all the excercise 
    app.delete('/exercises/:id', exercises.delete) //delete 
    app.put('/answertoexercise/:id', exercises.updateAnswer) //add exercise to class

    // ANSWER SECTION in class with id == ClassRoom_id
    app.post('/answers', answers.create) //create answer
    app.put('/answers/:id', answers.edit) //edit answer
    app.get('/answers/:id', answers.detail) //show all the answer 
    app.delete('/answers/:id', answers.delete) //delete 

    // CLASSROOM SECTION 
    app.get('/the_users', users.All)
    app.post('/classroom', classroom.create)
    app.get('/classroom/:id', classroom.detail)
    app.delete('/classroom/:id', classroom.delete)
    app.put('/usertoclassroom/:id', classroom.updateUser)
    app.put('/exercisetoclassroom/:id', classroom.updateExercise)

    // See JSON Data
    app.get('/exercises', exercises.All)
    app.get('/classes', classroom.All)

}