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
    
    //Creates User tables
    var sql = "CREATE TABLE IF NOT EXISTS ChromeChat.USER (\
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        navn VARCHAR(30) NOT NULL,\
        password VARCHAR(512) NOT NULL\
        )";
    
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log("User table created");
    });
    
    //Creates Chat tables
    var sql = "CREATE TABLE IF NOT EXISTS ChromeChat.CHAT (\
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        navn VARCHAR(30) NOT NULL,\
        user_id INT(6) UNSIGNED\
        )";
    
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log("Chat table created");
    });
    
    //Creates Member tables
    var sql = "CREATE TABLE IF NOT EXISTS ChromeChat.MEMBER (\
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        user_id INT(6) UNSIGNED,\
        chat_id INT(6) UNSIGNED,\
        FOREIGN KEY (user_id) REFERENCES ChromeChat.USER(id),\
        FOREIGN KEY (chat_id) REFERENCES ChromeChat.CHAT(id)\
        )";
    
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log("Member table created");
    });
    
     //Creates Message tables
    var sql = "CREATE TABLE IF NOT EXISTS  ChromeChat.MESSAGE (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id INT(6) UNSIGNED, chat_id INT(6) UNSIGNED, message varchar(255), FOREIGN KEY (user_id) REFERENCES ChromeChat.USER(id), FOREIGN KEY (chat_id) REFERENCES ChromeChat.CHAT(id))";
    
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log("Message table created");
    });
    
  return "done";
};