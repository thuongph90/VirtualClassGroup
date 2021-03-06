//USER {Create, Delete, Edit}

var mongoose = require('mongoose');
require('../models/models.js');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');

module.exports = {

    All: function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "All Users", data: users })
            }
        })
    },

    Register: function (req, res) {
        let hashpw = bcrypt.hashSync(req.body.password, 10);
        var newUser = new User({ name: req.body.name, email: req.body.email, password: hashpw, type: req.body.type })
        newUser.save(function (err, user) {
            if (err) {
                console.log("Failed to sign up",err);
                res.json({ message: "Error", error: err })

            } else {
                console.log("Yeaah, Successful to sign up", user)
                res.json({ message: "Success", data: user })
            }
        })
    },

    Login: function (req, res) {
        console.log("in the controllers", req.body)
        User.countDocuments({ email: req.body.email }, function (err, count) {
            console.log(count)
            if (count == 1) {
                console.log("Bla bla bla")
                User.findOne({ email: req.body.email }, function (err, theUser) {
                    if (bcrypt.compareSync(req.body.password, theUser.password)) {
                        theUser.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.json({ message: "Error", error: err })
                            } else {
                                res.json({ message: "Success", data: theUser })
                            }
                        })
                    }
                    else {
                        res.json({ message: "Invalid Password", error: err })
                    }
                })
            }
            else {
                console.log("Invalid Email")
                res.json({ message: "Invalid Email"})
            }
        })
    },

    Logout: function (req, res) {
        req.session.destroy();
        res.redirect('/')
    },

    EditUser: function (req, res) {
        console.log("In controllers for editing users")
        User.update({ _id: req.params.id }, { $set: { name: req.body.name, email: req.body.email, image: req.body.image } }, function (err, user) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Successfully updated")
                res.json({ message: "Successfully Updated", data: user })
            }
        })
    },

    detailUser: function (req, res) {
        User.find({ _id: req.params.id }, function (err, user) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "Successfully Updated", data: user })
            }
        })
    },

    deleteUser: function (req, res) {
        User.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
                res.json({ message: "Error", error: err })
            }
            else {
                res.json({ message: "Success delete", })
            }
        })
    }

}