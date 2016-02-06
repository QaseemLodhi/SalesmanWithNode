/**
 * Created by QASEEM WAKEEL on 1/20/2016.
 */

var express = require('express');
var Firebase = require('firebase');
var firebaseRef = new Firebase("https://salesman-app.firebaseio.com");
var UserSchema_1 = require('./mongoose');
var router = express.Router();

router.post('/signup', function (req, res) {
    firebaseRef.createUser({
        email: req.body.Email,
        password: req.body.password
    }, function(error, userData) {
        if (error) {
            switch (error.code) {
                case "EMAIL_TAKEN":
                    console.log("The new user account cannot be created because the email is already in use.");
                    break;
                case "INVALID_EMAIL":
                    console.log("The specified email is not a valid email.");
                    break;
                default:
                    console.log("Error creating user:", error);
            }
        } else {
            req.body.FirebaseToken = userData.uid;
            UserSchema_1.saveUser(req.body)
                .then(function(userData){
                    res.send({status:true, user:userData});
                },function(err){
                    res.send({status:false, ErrMessage:err});
                });
            console.log("Successfully created user account with uid:", userData.uid);
            res.json(userData)
        }
    });

});
router.post('/signin', function(req,res){
    var user = req.body;
    UserSchema_1.findUser({ Email: user.Email })
        .then(function (userInstance) {
            if (!userInstance) {
                res.send("No user found with supplied email");
                return;
            }
            if (userInstance.password == user.password) {
                res.send({ message: "Logged In successfully", token: userInstance.FirebaseToken });
            }
            else {
                res.send("Wrong Password");
            }
        }, function (err) {
            res.send({ status: false, message: err });
        });
});

router.get("/salesmen", function (req, res) {
    console.log(req.user);
    var salesmenArr = [{ name: "S 01", id: 1 }, { name: "S 02", id: 2 }, { name: "S 03", id: 3 }];
    res.send({ status: true, data: salesmenArr });
});

module.exports = router;
