const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  animal: {
    enum: ["cat", "dog", "other"],
    type: String
  },
  petname: String,
  sex: {
    enum: ["male", "female"],
    type: String
  },
  neutered: {
    enum: ["yes", "no"],
    type: String
  },
  chipId: Number,
  gpsArray: {
    type: Array
  }
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
