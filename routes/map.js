const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("auth/map", { message: req.flash("error") });
});

module.exports = router;
