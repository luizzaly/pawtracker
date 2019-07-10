// const express = require("express");
// const passport = require("passport");
// const router = express.Router();
// const User = require("../models/User");
// const Pet = require("../models/Pet");

// router.get("/", (req, res, next) => {
//   User.findById(req.user._id)
//     .populate("pets")
//     .then(user => {
//       res.render("./auth/profile", { user });
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// router.post("/:userId", (req, res, next) => {
//   console.log("BODY: ", req.body);
//   // user has an array of pet ids in the pets field
//   // loop over the ids
//   // update the pets with these ids with the new
//   Pets.findByIdAndUpdate();
//   User.findByIdAndUpdate(req.params.userId)
//     .then(user => {
//       user.forEach(pet, i => {
//         pet[i];
//       });
//       res.render("auth/profile", { user: req.user });
//     })
//     .catch(err => {
//       console.log("Error", err);
//     });
// });

// module.exports = router;

const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Pet = require("../models/Pet");
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  //if (!req.isAuthenticated()) return res.redirect("/auth/login");
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
  //if (!req.isAuthenticated()) return res.redirect("/auth/login");
  console.log("BODY: ", req.body);
  const { petname, sex, neutered, chipId, password, email } = req.body;

  const salt = bcrypt.genSaltSync();
  const hashPass = bcrypt.hashSync(password, salt);

  User.findByIdAndUpdate(
    req.params.userId,
    {
      email: email,
      password: hashPass
    },
    { new: true }
  )
    .then(user => {
      user.pets.forEach((pet, index) => {
        //console.log("pet: ", pet, index);
        Pet.findByIdAndUpdate(
          req.params.pet,
          {
            petname: petname[index],
            sex: sex[index],
            neutered: neutered[index],
            chipId: chipId[index]
          },
          { new: true }
        );
      });

      res.render("auth/profile", { user: req.user });
    })
    .catch(err => {
      console.log("Error", err);
    });
});
module.exports = router;