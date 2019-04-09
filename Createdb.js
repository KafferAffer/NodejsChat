var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});



exports.hi = function () {
  return "hi";
};

exports.createall = function () {
    
    //connects to localhost
    con.connect(function(err) {
    if (err) throw err;
        console.log("Database Connected!");
    });
    
    //Creates Chromechat
    var sql = "CREATE DATABASE IF NOT EXISTS ChromeChat";
    
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log("Database created");
    });
    
    //Creates Chromechat
    var sql = "CREATE TABLE IF NOT EXISTS ChromeChat.CHATS (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, navn VARCHAR(300) NOT NULL)";
    
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log("Database created");
    });
    
  return "done";
};