/**
 * Created by QASEEM WAKEEL on 1/8/2016.
 */

var express = require('express');
var app = express();
var path = require('path');
var GeneralRoutes = require('../www/controllers/firebase.js');
var UserSchema = require('../www/controllers/mongoose.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var staticPath = path.resolve(__dirname + '/../www');
app.use(express.static(staticPath));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    if (req.query.token) {
        UserSchema.findUser({FirebaseToken: req.body.token})
            .then(function (databaseUser) {
                if (databaseUser) {
                    req.user = databaseUser;
                    next();
                }
            }, function (err) {
                next(err);
            })
    }
    else {
        next();
    }
});

app.use("/api", GeneralRoutes);
app.get('/', function (req, res) {
    res.sendfile('../www/index.html');

});
app.get('*', function (req, res) {
    var index = (path.resolve(__dirname + '/../www/index.html'));
    res.sendFile(index);
});

app.listen(3000, function () {
    console.log('Start Server at 3000');
});
mongoose.connect('mongodb://@ds039185.mongolab.com:39185/salesman');