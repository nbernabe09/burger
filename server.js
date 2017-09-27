var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var routes = require("./controllers/burgers_controller.js");

var app = express();
var port = process.env.PORT || 3000;

// app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use("/", routes);

app.listen(port, function() {
  console.log("App listening on PORT " + port);
});

// app.get("/", function(req, res) {
//   connection.query(
//     "SELECT * FROM burgers",
//     function(err, data) {
//       if (err) throw err;
//       var made = [];
//       var eaten = [];

//       for (var i = 0; i < data.length; i++) {
//         if (!data[i].devoured) {
//           made.push(data[i]);
//         } else {
//           eaten.push(data[i]);
//         }
//       }
//       res.render("index", {
//         burgers: made,
//         devoured: eaten
//       });
//     }
//   );
// });

// app.post("/", function(req, res) {
//   connection.query(
//     "INSERT INTO burgers (burger_name) VALUES (?)",
//     [req.body.burger_name],
//     function(err, result) {
//       if (err) throw err;
//       res.redirect("/");
//     }
//   );
// });

// app.put("/:id", function(req, res) {
//   connection.query(
//     "UPDATE burgers SET devoured = TRUE WHERE id = ?",
//     [req.params.id],
//     function(err, result) {
//       if (err) throw err;
//       res.redirect("/");
//     }
//   );
// });
