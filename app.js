//Require Express
const express = require("express");
const app = express();

//Require JSON data
const data = require("data");

//set view engine to pug
app.set("view engine", "pug");

//add static middleware
app.use("/static", express.static("public"));

const projects = data.projects;

//setting up index route
app.get("/", (req, res) => {
  res.render("index", { projects });
});

//setting up the about route
app.get("/about", (req, res) => {
  res.render("about");
});

//dynamic project routes - render a different project template
app.get("/project/:id", function(req, res, next) {
  const project = projects.find(({ id }) => id === +projectId);
  res.render("project", { project });
});

//Add listener for the host
app.listen(3030, () => {
  console.log("The application is running on localhost: 3030!");
});
