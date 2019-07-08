const express = require("express");
const router = express.Router();
const passport = require("passport");
const Pet = require("../models/Pet");
const User = require("../models/User");

/*
router.get("/", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));*/

router.get("/", (req, res, next) => {
  res.render("auth/pet-registration");
});

router.post("/", (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect("/login");

  const { animal, petname, sex, neutered, chipId } = req.body;
  Pet.create({ animal, petname, sex, neutered, chipId }).then(pet => {
    return User.findByIdAndUpdate(req.user._id, {
      $push: { pets: pet._id }
    })
      .then(() => {
        res.redirect("/map");
      })
      .catch(err => {
        res.render("error", { message: "Something went wrong" });
      });
  });
});

module.exports = router;
