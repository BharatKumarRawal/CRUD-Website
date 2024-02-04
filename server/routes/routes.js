const express = require("express");
const router = express.Router();
const User = require("../models/user");
const multer = require("multer");
const path = require("path");
const user = require("../models/user");

// image upload

var stoarge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: stoarge,
}).single("image");

router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.render("index", { title: "Home page", data });
  } catch (e) {
    console.log(e);
  }
});

//route to add Users page

router.get("/add", (req, res) => {
  res.render("add_users", { title: "Add Users" });
});

//adding users to the db using post method in /add page

router.post("/add", upload, async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });

    const addedUser = await user.save();

    res.redirect("/");
   
  } catch (e) {
    res.json({ message: e.message, type: "danger" });
  }
});

//route to about
router.get("/about", (req, res) => {
  res.render("about", { title: "About Page" });
});

//route to contact

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Page" });
});

router.get("/users", (req, res) => {
  res.send("All users");
});

// rendering edit user page using ID
router.get("/edit_users/:id", upload, async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params.id });
    res.render("edit_users", { title: "Edit Users", data });
  } catch (e) {}
});
//updating the user using id
router.put("/edit_users/:id", upload, async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
      }
    );
    res.redirect(`/edit_users/${req.params.id}`);
  
  } catch (e) {}
});

//deleting user
router.delete("/delete_users/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.redirect(`/`);
  } catch (e) {}
});

module.exports = router;
