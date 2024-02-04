const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/crud_node")
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch((e) => {
    console.log(e);
  });
