//Questions SECTION{Create, EDIT, DELETE}
var mongoose = require('mongoose');
require('../models/models.js');

var Exercise = mongoose.model('Exercise');
var ClassRoom = mongoose.model('ClassRoom');
module.exports = {
    create: function (req, res) {
        var newExercise = new Exercise({ content: req.body.content, teacher_id: req.body.teacher_id })
        newExercise.save(function (err, newExercise) {
            if (err) {
                console.log('something went wrong');
                console.log("This is what went wrong:" + err);
                // res.redirect('/');


            }
            else { // else console.log that we did well and then redirect to the root route
                console.log('successfully added an Exercise!');
                ClassRoom.findOne({ _id: req.params.id }, { $push: { exercise: newExercise } }, function (err) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.json({ message: "Success", data: newExercise })
                    }
                })

            }
        })
    },
    edit: function (req, res) {
        Exercise.findOne({ _id: req.params.id }, function (err,newExercise  ) {
            if (err) {
                console.log(err);
                // res.redirect('/edit');
            }
            else {
                console.log("Successfully update")
                res.json({ message: "Successlly updated", data: newExercise })
                // res.redirect('/homepage')
            }
        })
    },
    detail: function (req, res) {
        Exercise.find({ _id: req.params.id}, function (err, exercise) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "Success", data: exercise })
                // res.render('/detail', { user: user })
            }
        })
    },
    delete: function (req, res) {
        Exercise.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
                res.json({message: "Error", error: err})
            }
            else {
                res.json({message: "Success"})

            }
        })
    }
}







