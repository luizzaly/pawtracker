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
  if (!req.isAuthenticated()) return res.redirect("/auth/login");

  res.render("auth/add-pet");
});

router.post("/", (req, res, next) => {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) return res.redirect("/auth/login");

  const { animal, petname, sex, neutered, chipId } = req.body;
  Pet.create({ animal, petname, sex, neutered, chipId }).then(pet => {
    return User.findByIdAndUpdate(req.user._id, {
      $push: { pets: pet._id }
    })
      .then(() => {
        res.redirect("/map");
      })
      .catch(err => {
        res.render("error", { message: "Something went wrong", err });
      });
  });
});

module.exports = router;
