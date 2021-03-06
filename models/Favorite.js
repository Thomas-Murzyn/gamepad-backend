const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  favoriteId: String,
  title: String,
  picture: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorite;
