
var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;
var session = require('express-session');
var admincdb = require('./Createdb');


var server = http.createServer(function(req,res){
    switch(req.url){
        case '/':
            fs.createReadStream(__dirname + '/views/login.html').pipe(res);
            break;
        case '/admincdb':
            fs.createReadStream(__dirname + '/views/admincdb.html').pipe(res);
            break;
        
    }
});

var io = require('socket.io')(server);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit('dbinput',admincdb.hi());
});

server.listen(port,function(){
    console.log("Socket Server is running")
})