const express = require("express");
const router = express.Router();
const passport = require("passport");
const Pet = require("../models/Pet");

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
  const { animal, petname, sex, neutered, chipId } = req.body;

  console.log(req.user);

  const newPet = new Pet({
    animal,
    petname,
    sex,
    neutered,
    chipId
  });
  newPet
    .save()
    .then(model => {
      console.log("----model", model);
      res.redirect("/");
    })
    .catch(err => {
      res.render("/", { message: "Something went wrong" });
    });
});

module.exports = router;
