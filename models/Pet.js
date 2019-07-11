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
  defaultLong: Number,
  defaultLat: Number,
  gpsArray: {
    type: []
  }
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
