/**
 * Created by QASEEM WAKEEL on 1/8/2016.
 */

var express = require('express');
var app = express();
var path = require('path');

var staticPath = path.resolve(__dirname + '/views');
app.use(express.static(staticPath));

app.get(function(req,res){
  res.sendfile('views/index.html');
});

//app.get('*',function(req,res){
//  var index = (path.resolve(__dirname + 'views/index.html'));
//  res.sendfile('index');
//});

app.listen(3000,function(){
  console.log('Start Server at 3000');
});
