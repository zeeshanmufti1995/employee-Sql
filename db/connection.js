const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      // Your MySQL username,
      user: "root",
      // Your MySQL password
      password: "Ram.2020",
      database: "corporate",
    },
    console.log("Connected to the corporate database.")
  );



  module.exports = db;