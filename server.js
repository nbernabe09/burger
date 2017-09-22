var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");

var app = express();

app.use(methodOverride("X-HTTP-Method-Override"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));