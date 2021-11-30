const express = require("express");
const Favorite = require("../models/Favorite");
const mongoose = require("mongoose");
const axios = require("axios");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/favorite/:id", isAuthenticated, async (req, res) => {
  try {
    console.log("route /favorite");

    const isInFavorite = await Favorite.findOne({ favorite: req.params.id });

    if (!isInFavorite) {
      const favoriteGame = await axios.get(
        `https://api.rawg.io/api/games/${req.params.id}?key=${process.env.API_KEY}`
      );

      if (favoriteGame) {
        const newFavorite = new Favorite({
          favoriteId: favoriteGame.data.id,
          title: favoriteGame.data.name_original,
          picture: favoriteGame.data.background_image,
          user: req.user,
        });
        const response = await newFavorite.save();

        res.status(200).json({
          message: "Added to favourite",
          title: response.title,
          user: response.user.mail,
        });
      } else {
        res.status(400).json({ error: "Game not found." });
      }
    } else {
      res.status(400).json({ error: "This favorite already exist." });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
