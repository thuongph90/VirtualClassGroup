// ************CLASSROOM******
var mongoose = require('mongoose');
require('../models/models.js');

var ClassRoom = mongoose.model('ClassRoom');
var User = mongoose.model('User');
var Exercise = mongoose.model('Exercise');
var Answer = mongoose.model('StudentAnswer');
module.exports = {
    // showAll: function(req,res){
    //     ClassRoom.find()
    // },
    create: function (req, res) {
        console.log("----------Controllers with Name of the classroom is:")
        console.log(req.body.classroom_name)
        var newClassroom = new ClassRoom({ classroom_name: req.body.classroom_name, classroom_code: req.body.classroom_code })
        console.log(newClassroom)
        newClassroom.save(function (err) {
            if (err) {
                console.log('Something went wrong');
                res.json({ message: "Error", error: err })

            } else {
                console.log('Successfully added a Classroom!');
                res.json({ message: "Success", data: newClassroom })
            }
        })
    },
    updateUser: function (req, res) {
        console.log("Controllers update user into classroom", req.params.id)
        console.log()
        ClassRoom.findOne({ _id: req.params.id }, function (err, oneclass) {
            console.log("AAAAAAAAAAAAAAAAA",oneclass)
            oneclass.users.push(req.body);
            oneclass.save(function (err) {
                // if save was successful awesome!
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('Yay!')
                }
            })
        })
    },
    updateExercise: function (req, res) {
        console.log("Controllers update Exercise into classroom", req.params.id)
        console.log()
        ClassRoom.findOne({ _id: req.params.id }, function (err, oneclass) {
            console.log("AAAAAAAAAAAAAAAAA",oneclass)
            oneclass.exercises.push(req.body);
            oneclass.save(function (err) {
                // if save was successful awesome!
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('Yay!')
                }
            })
        })
    },
    updateAnswer: function (req, res) {
        console.log("Controllers update Exercise into classroom", req.params.id)
        console.log()
        ClassRoom.findOne({ _id: req.params.id }, function (err, oneclass) {
            console.log("AAAAAAAAAAAAAAAAA",oneclass)
            oneclass.answers.push(req.body);
            oneclass.save(function (err) {
                // if save was successful awesome!
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('Yay!')
                }
            })
        })
    },

    edit: function (req, res) {
        console.log("hittt controller");
        ClassRoom.update({ _id: req.params.id }, { $set: { classroom_name: req.body.classroom_name, classroom_code: req.body.classroom_code } }, function (err, Classroom) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("**************************")
                console.log(Classroom)
                res.json({ message: "Successfully Updated", data: Classroom })
                // res.redirect(`/detail/${id}`);

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
                // res.render('/detail', { Classroom: Classroom })
            }
        })
    },
    delete: function (req, res) {
        console.log("im here in the controllers!!")
        ClassRoom.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
                res.json({ message: "Error", error: err })
            }
            else {
                res.json({ message: "Success delete", })
                // res.redirect('/');

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
    },
    // ShowAllClassesofUser: function(req,res){
    //     console.log("In Controller to get all Classes of the User's ID", req.body)
    //     ClassRoom.find({ "users":{_id:{$in: req.body}}}, function(err, classes){
    //        if(err){
    //            console.log("Damm!!! Can't find classes by userID")
    //        }
    //         else{
    //             res.json({ message: "Yeahhhh!!!! All Classes of the user are found", data: classes })
    //         }
    //     })
    //     // Users.find( { "fb" : { id: { $in : arrayOfIds } } }, callback );
    // }
}