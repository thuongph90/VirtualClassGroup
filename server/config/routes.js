var users = require('../controllers/users');
var exercises = require('../controllers/exercises');
var answers = require('../controllers/answers');
var classroom = require('../controllers/classroom');
var path = require('path')

module.exports = function (app) {

    app.post('/login', users.Login) //Login succesfully
    app.post('/logout', users.Logout)

    // USER SECTION
    app.get('/the_users', users.All) //
    app.post('/users', users.Register) //Create succesfully
    app.put('/users/:id', users.EditUser) //edit
    app.get('/users/:id', users.detailUser) //detail
    app.delete('/users/:id', users.deleteUser) //delete

    // // exercise SECTION in class with id== ClassRoom_id
    app.post('/exercises/:classroom_id', exercises.create) //  create exercise
    app.put('/exercises/:id', exercises.edit) //  edit exercise
    app.get('/exercises/:id', exercises.detail) //show all the excercise 
    app.delete('/exercises/:id', exercises.delete) //delete 

    //  // answer SECTION in class with id== ClassRoom_id
    app.post('/answers/:classroom_id', answers.create) //  create answer
    app.put('/answers/:id', answers.edit) //  edit answer
    app.get('/answers/:id', answers.detail) //show all the answer 
    app.delete('/answers/:id', answers.delete) //delete 

    //  // classroom SECTION 
    // app.get('/classroom/:student_id', classroom.showAll) 
    app.get('/the_users', users.All) //
    app.post('/classroom', classroom.create)
    app.get('/classroom/:id', classroom.detail)
    app.put('/classroom/:id', classroom.edit) //edit classroom
    
    app.delete('/classroom/:id', classroom.delete)

    app.route('/usertoclassroom/:id')
        .put(function (req, res) {
            console.log("///////////////;;;;;;;;;/")
            classroom.updateUser(req, res);
        })
    app.route('/exercisetoclassroom/:id')
        .put(function (req, res) {
            console.log("///////////////;;;;;;;;;/")
            classroom.updateExercise(req, res);
        })
    app.route('/answertoclassroom/:id')
        .put(function (req, res) {
            console.log("///////////////;;;;;;;;;/")
            classroom.updateAnswer(req, res);
        })
    // app.route('/classroomofuser')
    //     .get(function (req, res) {
    //         console.log("Route to go to get classes of user")
    //         classroom.ShowAllClassesofUser(req, res);
    //     })
    // app.get('/classroomofuser/:id', classroom.ShowAllClassesofUser)
    app.get('/classes', classroom.All)

}