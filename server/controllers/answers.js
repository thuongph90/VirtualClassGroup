//ANSWER{CREATE, EDIT, DELETE}
var mongoose = require('mongoose');
require('../models/models.js');

var Answer = mongoose.model('StudentAnswer');
var ClassRoom = mongoose.model('ClassRoom');
module.exports = {

    create: function (req, res) {
        console.log('in controller')
        var newAnswer = new Answer({ content: req.body.content, student_name: req.body.student_name, exercise_content: req.body.exercise_content })
        newAnswer.save(function (err, newAnswer) {
            if (err) {
                console.log('something went wrong');
                console.log("This is what went wrong:" + err);
                // res.redirect('/');


            }
            else { // else console.log that we did well and then redirect to the root route
                console.log('successfully added an Answer!');
                // ClassRoom.findOne({ _id: req.params.id }, { $push: { answer: newAnswer } }, function (err) {
                //     if (err) {
                //         console.log(err)
                //     }
                //     else {
                res.json({ message: "Success", data: newAnswer })
                //     }
                // })

            }
        })
    },
    edit: function (req, res) {
        Answer.findOne({ _id: req.params.id }, function (err, newAnswer) {
            if (err) {
                console.log(err);
                // res.redirect('/edit');
            }
            else {
                console.log("Successfully update")
                res.json({ message: "Successlly updated", data: newAnswer })
                // res.redirect('/homepage')
            }
        })
    },
    detail: function (req, res) {
        Answer.find({ _id: req.params.id }, function (err, Answer) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "Success", data: Answer })
                // res.render('/detail', { user: user })
            }
        })
    },
    delete: function (req, res) {
        Answer.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
                res.json({ message: "Error", error: err })
            }
            else {
                res.json({ message: "Success" })

            }
        })
    }
}
