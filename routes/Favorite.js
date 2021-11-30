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
      const newFavorite = await Favorite({
        favorite: req.params.id,
        user: req.user,
      });
      const response = await newFavorite.save();

      res.status(200).json({
        message: "Added to favourite",
        favoriteId: response.favorite,
        user: response.user.mail,
      });
    } else {
      console.log(isInFavorite);
      res.status(400).json({ error: "This favorite already exist." });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
