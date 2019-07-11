const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  User.findById(req.user._id)
    .populate("pets")
    .then(user => {
      console.log(user);
      res.render("auth/map", { user: user, message: req.flash("error") });
    });

    
});

module.exports = router;
