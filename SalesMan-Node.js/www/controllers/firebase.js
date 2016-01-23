/**
 * Created by QASEEM WAKEEL on 1/20/2016.
 */

var express = require('express');
var Firebase = require('firebase');
var firebaseRef = new Firebase("https://salesman-app.firebaseio.com");
var UserSchema_1 = require('mongoose');
var router = express.Router();

router.post('/signup', function (req, res) {
    firebaseRef.createUser({
        email: req.body.data.Email,
        password: req.body.data.Password
    }, function (error, data) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
            req.body.data.FirebaseToken = data.uid;
            console.log("Successfully created user account with uid:", data.uid);
            UserSchema_1.saveUser(req.body.data)
                .then(function(userData){
                    res.send({status:true, user:userData});
                },function(err){
                    res.send({status:false, ErrMessage:err});
                })
        }
    });
});

router.get("/salesmen", function (req, res) {
    console.log(req.user);
    var salesmenArr = [{ name: "S 01", id: 1 }, { name: "S 02", id: 2 }, { name: "S 03", id: 3 }];
    res.send({ status: true, data: salesmenArr });
});

module.exports = router;
