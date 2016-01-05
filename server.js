/**
 * Created by QASEEM WAKEEL on 1/5/2016.
 */

var express = require('express');
var app = express();
var path = require('path');

var strictPath = path.resolve(__dirname + '/static');
app.use(express.static(strictPath));

app.get(function (req, res) {
    res.sendfile('static/index.html');
});

app.listen(3000,function(){
   var response = function(){
       console.log('ListenServer');
   }
});

