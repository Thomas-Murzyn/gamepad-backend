const mongoose = require("mongoose");

const User = mongoose.model("User", {
  mail: { type: String },
  username: { type: String },
  // "name" sera une chaîne de caractères vide par défaut

  age: { type: String },

  picture: Object, // tableau contenant 1 ou plusieurs chaînes de caractères
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
