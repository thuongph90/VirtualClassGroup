//Questions SECTION{Create, EDIT, DELETE}
var mongoose = require('mongoose');
require('../models/models.js');

var Exercise = mongoose.model('Exercise');
var ClassRoom = mongoose.model('ClassRoom');
module.exports = {
    create: function (req, res) {
        console.log('in controller')
        var newExercise = new Exercise({ content: req.body.content })
        newExercise.save(function (err, newExercise) {
            if (err) {
                console.log('something went wrong');
                console.log("This is what went wrong:" + err);
                // res.redirect('/');


            }
            else { // else console.log that we did well and then redirect to the root route
                console.log('successfully added an Exercise!');
                res.json({ message: "Successlly updated", data: newExercise })
                // ClassRoom.findOne({ _id: req.params.id }, { $push: { exercises: newExercise } }, function (err) {
                //     if (err) {
                //         console.log(err)
                //     }
                //     else {
                //         res.json({ message: "Success", data: newExercise })
                //     }
                // })

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
    updateAnswer: function (req, res) {
        console.log("Controllers update Exercise into answer", req.params.id)
        Exercise.findOne({ _id: req.params.id }, function (err, oneExercise) {
            console.log("AAAAAAAAAAAAAAAAA",oneExercise)
            oneExercise.answers.push(req.body);
            oneExercise.save(function (err) {
                // if save was successful awesome!
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('Yay! Added answer to exercise!', oneExercise)
                }
            })
        })
    },
    detail: function (req, res) {
        console.log("AHIHIHIHIHIHIHIHIHIHIHIH, IN CONTROLLER to get exercise detail", req.params._id)
        Exercise.find({ _id: req.params.id}, function (err, exercise) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Get the exercise objects", exercise)
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
    },
}







