//Require Express
const express = require("express");
const app = express();
const path = require("path");

//Require JSON data
const data = require("./data.json").data;

//set view engine to pug
app.set("view engine", "pug");

//add static middleware
app.use("/static", express.static("public"));

const projects = data.projects;

app.get("/error", (req, res, next) => {
  // Log out custom error handler indication
  // console.log("custom error route called");

  const err = new Error();
  err.message = "Custom 500 error thrown";
  err.status = 500;
  next(err);
});

//setting up index route
app.get("/", (req, res) => {
  res.render("index", { projects });
});

//setting up the about route
app.get("/about", (req, res) => {
  res.render("about");
});

//dynamic project routes - render a different project template - catch project/ errors
app.get("/project/:id", function(req, res, next) {
  const project = projects[req.params.id];
  if (project) {
    res.render("project", { project });
  } else {
    console.log("404 has been thrown. That project does not exist.");
    const err = new Error("This page is not found, project does not exist");
    err.status = 404;
    next(err);
  }
});
//ERROR HANDLERS
//404 HANDLER TO CATCH NON EXISTENT ROUTE REQUESTS

app.use((req, res, next) => {
  console.log("404 has been thrown. Page not found");
  const err = new Error("Page Not Found"); //creating error object
  err.status = 404;
  next(err); //error object is passed to next function
});

//GLOBAL HANDLER
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status);
    return res.render("page-not-found", { err });
  } else {
    err.message = "Oops! It looks like something went wrong with the server.";
    return res.status(err.status || 500).render("error", { err });
  }
});

//Add listener for the host
app.listen(3000, () => {
  console.log("The application is running on localhost: 3000!");
});
