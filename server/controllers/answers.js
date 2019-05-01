//ANSWER {CREATE, EDIT, DELETE}

var mongoose = require('mongoose');
require('../models/models.js');
var Answer = mongoose.model('StudentAnswer');

module.exports = {

    create: function (req, res) {
        var newAnswer = new Answer({ content: req.body.content, student_name: req.body.student_name })
        newAnswer.save(function (err, newAnswer) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "Success", data: newAnswer })
            }
        })
    },

    edit: function (req, res) {
        Answer.findOne({ _id: req.params.id }, function (err, newAnswer) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "Successlly updated", data: newAnswer })
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
