// EXERCISE {Create, EDIT, DELETE}

var mongoose = require('mongoose');
require('../models/models.js');
var Exercise = mongoose.model('Exercise');

module.exports = {

    create: function (req, res) {
        var newExercise = new Exercise({ content: req.body.content })
        newExercise.save(function (err, newExercise) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "Successlly updated", data: newExercise })
            }
        })
    },

    edit: function (req, res) {
        Exercise.findOne({ _id: req.params.id }, function (err, newExercise) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "Successlly updated", data: newExercise })
            }
        })
    },

    updateAnswer: function (req, res) {
        Exercise.findOne({ _id: req.params.id }, function (err, oneExercise) {
            oneExercise.answers.push(req.body);
            oneExercise.save(function (err) {
                if (err) {
                    console.log(err)
                }
            })
        })
    },

    detail: function (req, res) {
        Exercise.find({ _id: req.params.id }, function (err, exercise) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "Success", data: exercise })
            }
        })
    },

    delete: function (req, res) {
        Exercise.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
                res.json({ message: "Error", error: err })
            }
            else {
                res.json({ message: "Success" })

            }
        })
    },

    All: function (req, res) {
        Exercise.find({}, function (err, exercises) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "All exercises", data: exercises })
            }
        })
    }

}







