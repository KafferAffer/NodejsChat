
var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var socket = require('socket.io');
var port = process.env.PORT || 3000;
var session = require('express-session');
var admincdb = require('./Createdb');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

//connects to localhost
con.connect(function(err) {
if (err) throw err;
    console.log("Database Connected!");
});

server = app.listen(port);

//app.use(express.static('views'));
app.use(bodyParser());
app.use(session({secret: 'thisisarandomstring'}));


//User site------------------------------------------------------------------------------------------------
app.get('/logged',function(req,res){
    if(req.session.loggedin == true){
        res.sendfile('views/usersite.html');
        console.log(req.session.userid);
        res.send("hi "+req.session.userid+"");
    }else{
        res.redirect('/');
    }
});

app.port('/test/createchat', function(req,res){
    var chatname = req.body.chatname;
    var sql = "INSERT INTO ChromeChat.USER(navn, password) VALUES ('"+username+"','"+password+"')";
});

//creating admincdb ----------------------------------------------------------------------------------------
app.get('/admincdb',function(req,res){
    res.sendfile('views/databasecreated.html');
    admincdb.createall();
});

//login code-----------------------------------------------------------------------------------------------

app.get('/',function(req,res){
    if(req.session.loggedin == true){
        res.redirect('/logged');
    }else{
        res.sendfile('views/index.html');
    }
});

app.post('/test/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var sql = "SELECT * FROM ChromeChat.USER WHERE navn = '"+ username +"' AND password = '"+password+"'";
    con.query(sql, function (err, result) {
        if (err) reject(err);
        if(result.length>0){
            req.session.loggedin = true;
            req.session.userid = result[0].id;
            res.redirect('/logged');
            console.log("welcome " + username);
        }else{
            res.redirect('/');
        }
    });
});

//signup code------------------------------------------------------------------------------
app.post('/test/signup',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var sql = "SELECT * FROM ChromeChat.USER WHERE navn = '"+ username +"'";
    con.query(sql, function (err, result) {
        if (err) reject(err);
        if(result.length>0){
            res.redirect('/');
        }else{
            var sql = "INSERT INTO ChromeChat.USER(navn, password) VALUES ('"+username+"','"+password+"')";
            con.query(sql, function (err, result) {
                if (err) throw err;
            });
            var sql = "SELECT * FROM ChromeChat.USER WHERE navn = '"+ username +"' AND password = '"+password+"'";
            con.query(sql, function (err, result) {
                if (err) reject(err);
                if(result.length>0){
                    req.session.loggedin = true;
                    req.session.userid = result[0].id;
                    res.redirect('/logged');
                    console.log("welcome " + username);
                }else{
                    res.redirect('/');
                }
            });
        }
        console.log(result);
    });
});

var io = socket(server);

io.on('connection', function(socket){
    console.log('a user connected');
});
