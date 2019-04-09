
var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var socket = require('socket.io');
var port = process.env.PORT || 3000;
var session = require('express-session');
var admincdb = require('./Createdb');
var bodyParser = require('body-parser');

server = app.listen(port);

//app.use(express.static('views'));
app.use(bodyParser());
app.use(session({secret: 'thisisarandomstring'}));

app.get('/',function(req,res){
    res.sendfile('views/index.html');
});

app.get('/logged',function(req,res){
    res.write('youre logged in');
});

app.get('/admincdb',function(req,res){
    res.write('grats');
    admincdb.createall();
});

app.post('/test/login',function(req,res){
    var username = req.body.username
    console.log("username = " + username); 
    res.redirect('/logged');
});

var io = socket(server);

io.on('connection', function(socket){
    console.log('a user connected');
});
