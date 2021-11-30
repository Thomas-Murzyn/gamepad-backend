const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  favorite: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorite;
