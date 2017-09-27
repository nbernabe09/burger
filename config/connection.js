var mysql = require("mysql");
// var keys = require("./keys.js");

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   connection = mysql.createConnection({
//     host: keys.connection.host,
//     port: keys.connection.port,
//     user: keys.connection.user,
//     password: keys.connection.password,
//     database: keys.connection.database
//   });
}

connection.connect(function(err) {
  if (err) {
    return console.error("Error connecting: " + err.stack);
  }
  console.log("Connected as id " + connection.threadId);
});

module.exports = connection;
