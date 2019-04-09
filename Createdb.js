var mysql = require('mysql');
var promise = require('promise');
//defines the connection to localhost
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

//just says hi used to test home-made modules
exports.hi = function () {
  return "hi";
};

<<<<<<< HEAD


//creates database and tables if they dont exist
=======
exports.getUserFromId = function (var id) {
    var sql = "SELECT USER.navn FROM ChromeChat.USER WHERE USER.id='".id."' LIMIT 1";
    
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log(result);
        
    return "WOW you got an ID: "+result;
    });
    
};

exports.checkIfUserBe = function (var name, password) {
    var sql = "SELECT USER FROM ChromeChat.USER WHERE USER.navn='".name."' AND USER.password='".password."' LIMIT 1";
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log(result);
    if (results.length < 1){
        
    }else {
        return "WOW you got a user: "+result;
    }
      
        
    });
    
}

>>>>>>> f4afb28fc743ca81deedb43d9a46426951570b30
exports.createall = function () {
    
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
