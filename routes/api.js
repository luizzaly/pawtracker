const express = require("express");
const router = express.Router();
const passport = require("passport");
const Pet = require("../models/Pet");
const User = require("../models/User");

// router.get("/api/coordinates", (req, res, next) => {
//   console.log(req.body);
//   req.body.gpsArray = data;
// });

// window.setInterval(async () => {
//   const result = await fakeApiRequest()
// }, 100)

User.findById(req.user._id).then(user => {
  let petsArray = user.pets.map(objId => {
    Pet.findById(objId)
      .then(pet => {
        console.log(pet);
      })
      .catch(err => console.log(err));
  });
  console.log(petsArray);
});

function fakeApiRequest() {
  const defaultLat = 52.473589;
  const defaultLong = 13.402702;
  const dif1 = Math.random() / 900 - 0.008;
  const dif2 = Math.random() / 900 - 0.008;
  return [defaultLong + dif2, defaultLat + dif1];
}

var i = 0;
var timer = window.setInterval(function() {
  const coord = fakeApiRequest();

  data.features[0].geometry.coordinates.push(coord);
  point.features[0].geometry.coordinates = [coord];
  map.getSource("point").setData(point);
  map.getSource("trace").setData(data);
  map.panTo(coord);
  i++;
  console.log("bla", coord);
}, 4000);
