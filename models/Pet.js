const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pet = new Schema({
  name: String,
  sex: {
    enum: ["male", "female"]
  },
  neutered: {
    enum: ["yes", "no"]
  },
  chipId: Number
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
