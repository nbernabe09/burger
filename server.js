var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mysql = require("mysql");
var exphbs = require("express-handlebars");
var link = require("./config/connection.js");

var app = express();
var PORT = 8080;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: link.connection.host,
    port: link.connection.port,
    user: link.connection.user,
    password: link.connection.password,
    database: link.connection.database
  });
}

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

connection.connect(function(err) {
  if (err) {
    return console.error("Error connecting: " + err.stack);
  }
  console.log("Connected as id " + connection.threadId);
  runServer();
});

function runServer() {
  app.get("/", function(req, res) {
    connection.query(
      "SELECT * FROM burgers_db.burgers",
      function(err, data) {
        if (err) throw err;
        var made = [];
        var eaten = [];

        for (var i = 0; i < data.length; i++) {
          if (!data[i].devoured) {
            made.push(data[i]);
          } else {
            eaten.push(data[i]);
          }
        }
        res.render("index", {
          burgers: made,
          devoured: eaten
        });
      }
    );
  });

  app.post("/", function(req, res) {
    connection.query(
      "INSERT INTO burgers_db.burgers (burger_name) VALUES (?)",
      [req.body.burger_name],
      function(err, result) {
        if (err) throw err;
        res.redirect("/");
      }
    );
  });

  app.put("/:id", function(req, res) {
    connection.query(
      "UPDATE burgers_db.burgers SET devoured = TRUE WHERE id = ?",
      [req.params.id],
      function(err, result) {
        if (err) throw err;
        res.redirect("/");
      }
    );
  });

  app.listen(PORT);
}