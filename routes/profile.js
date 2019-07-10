const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Pet = require("../models/Pet");

router.get("/", (req, res, next) => {
  User.findById(req.user._id)
    .populate("pets")
    .then(user => {
      res.render("./auth/profile", { user });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/:userId", (req, res, next) => {
  console.log("BODY: ", req.body);
  // user has an array of pet ids in the pets field
  // loop over the ids
  // update the pets with these ids with the new
  Pets.findByIdAndUpdate();
  User.findByIdAndUpdate(req.params.userId)
    .then(user => {
      user.forEach(pet, i => {
        pet[i];
      });
      res.render("auth/profile", { user: req.user });
    })
    .catch(err => {
      console.log("Error", err);
    });
});

module.exports = router;
