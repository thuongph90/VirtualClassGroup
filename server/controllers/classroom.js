// CLASSROOM

var mongoose = require('mongoose');
require('../models/models.js');
var ClassRoom = mongoose.model('ClassRoom');

module.exports = {

    create: function (req, res) {
        var newClassroom = new ClassRoom({ classroom_name: req.body.classroom_name, classroom_code: req.body.classroom_code })
        newClassroom.save(function (err) {
            if (err) {
                console.log(err);
                res.json({ message: "Error", error: err })

            } else {
                res.json({ message: "Success", data: newClassroom })
            }
        })
    },

    updateUser: function (req, res) {
        ClassRoom.findOne({ _id: req.params.id }, function (err, oneclass) {
            oneclass.users.push(req.body);
            oneclass.save(function (err) {
                if (err) {
                    console.log(err)
                }
            })
        })
    },

    updateExercise: function (req, res) {
        ClassRoom.findOne({ _id: req.params.id }, function (err, oneclass) {
            oneclass.exercises.push(req.body);
            oneclass.save(function (err) {
                if (err) {
                    console.log(err)
                }
            })
        })
    },

    updateAnswer: function (req, res) {
        ClassRoom.findOne({ _id: req.params.id }, function (err, oneclass) {
            oneclass.answers.push(req.body);
            oneclass.save(function (err) {
                if (err) {
                    console.log(err)
                }
            })
        })
    },

    edit: function (req, res) {
        ClassRoom.update({ _id: req.params.id }, { $set: { classroom_name: req.body.classroom_name, classroom_code: req.body.classroom_code } }, function (err, Classroom) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "Successfully Updated", data: Classroom })
            }
        })
    },

    detail: function (req, res) {
        ClassRoom.find({ _id: req.params.id }, function (err, Classroom) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "Successfully Updated", data: Classroom })
            }
        })
    },

    delete: function (req, res) {
        ClassRoom.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
                res.json({ message: "Error", error: err })
            }
            else {
                res.json({ message: "Success delete", })
            }
        })
    },

    All: function (req, res) {
        ClassRoom.find({}, function (err, classes) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "All Classes", data: classes })
            }
        })
    }
    
}