
var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;
var session = require('express-session');
var admincdb = require('./Createdb');

app.use(session({secret: 'CCS'}));

var server = http.createServer(function(req,res){
    switch(req.url){
        case '/':
            fs.createReadStream(__dirname + '/views/login.html').pipe(res);
            break;
        case '/admincdb':
            fs.createReadStream(__dirname + '/views/admincdb.html').pipe(res);
            admincdb.createall();
            break;
        
    }
});

var io = require('socket.io')(server);

io.on('connection', function(socket){
    console.log('a user connected');
});

server.listen(port,function(){
    console.log("Socket Server is running")
})