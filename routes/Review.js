const express = require("express");
const Review = require("../models/Review");
const mongoose = require("mongoose");
const axios = require("axios");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/review/:id", isAuthenticated, async (req, res) => {
  try {
    console.log("route /review/:id");

    const isReviewExist = await Review.findOne({
      gameId: req.params.id,
      user: req.user,
    });

    if (!isReviewExist) {
      const newReview = new Review({
        gameId: req.params.id,
        user: req.user,
        description: req.fields.description,
        title: req.fields.title,
        score: 0,
      });

      const response = await newReview.save();

      res.status(200).json({
        message: "New review created",
        gameId: response.gameId,
        title: response.title,
      });
    } else {
      res
        .status(400)
        .json({ error: "You have already posted a review ont this game" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});

module.exports = router;