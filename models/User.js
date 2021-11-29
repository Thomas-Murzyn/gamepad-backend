const mongoose = require("mongoose");

const User = mongoose.model("User", {
  mail: { type: String },
  username: { type: String },
  // "name" sera une chaîne de caractères vide par défaut
  description: { type: String, minlength: 0, maxlength: 250 },
  // la longueur de la description sera de 50 caractères minimum à 250 maximum
  age: { type: Number },
  // l'âge ne pourra être inférieur à 18

  picture: Object, // tableau contenant 1 ou plusieurs chaînes de caractères
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
