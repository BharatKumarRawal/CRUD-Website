//import
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("./server/config/db");
const methodOverride = require("method-override");

const app = express();
app.use(methodOverride("_method"));
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "keyword cat",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.static("public"));
app.use(express.static("uploads"));
//set template engine
app.set("view engine", "ejs");

//router prefix
app.use("/", require("./server/routes/routes"));

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
