const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  title: { type: String },
  description: { type: String, minlength: 0, maxlength: 250 },
  // la longueur de la description sera de 50 caractères minimum à 250 maximum
  gameId: { type: String },
  score: { type: Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Review;
