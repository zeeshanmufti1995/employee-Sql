const mysql = require("mysql2");
var password = require('password');

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      // Your MySQL username,
      user: "root",
      // Your MySQL password
      password: "password",
      database: "employedb",
    },
    console.log("Connected to the corporate database.")
  );



  module.exports = db;