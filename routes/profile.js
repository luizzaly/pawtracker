const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Pet = require("../models/Pet");
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect("/auth/login");
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
  if (!req.isAuthenticated()) return res.redirect("/auth/login");
  console.log("BODY: ", req.body);
  const { petname, sex, neutered, chipId, password, email } = req.body;

  const salt = bcrypt.genSaltSync();
  const hashPass = bcrypt.hashSync(password, salt);

  const query = {
    email: email
  };
  if (req.body.password !== "") {
    query.password = hashPass;
  }

  User.findByIdAndUpdate(req.params.userId, query, { new: true })
    .then(updatedUser => {
      console.log("updated user/////////", updatedUser);
      console.log("pet: ", updatedUser.pets[0]);
      updatedUser.pets.forEach((pet, index) => {
        Pet.findByIdAndUpdate(
          { _id: pet },
          {
            petname: petname,
            sex: sex,
            neutered: neutered,
            chipId: chipId
          },
          { new: true }
        )
          .then(updatedPet => {
            console.log("updated pet aus dem foreach loop", updatedPet);
          })
          .catch(err => console.log("Hier error beim pet updaten", err));
      });
      res.redirect("/profile");
    })
    .catch(err => {
      console.log("Error", err);
    });
});
module.exports = router;
