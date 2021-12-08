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
        .json({ error: "You have already posted a review on this game" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});

router.get("/get_review/:id", async (req, res) => {
  try {
    console.log("route /get_review/:id");

    const reviews = await Review.find({ gameId: req.params.id }).populate(
      "user"
    );

    if (reviews) {
      res.status(200).json(reviews);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/add_score_review/:id", async (req, res) => {
  try {
    console.log("route /add_score_review/:id");

    const review = await Review.findOne({
      gameId: req.params.id,
      user: req.fields.user,
    });

    if (review) {
      review.score = review.score + req.fields.score;
      await review.save();
      res.status(200).json({ message: "succes" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/less_score_review/:id", async (req, res) => {
  try {
    console.log("route /less_score_review/:id");

    const review = await Review.findOne({
      gameId: req.params.id,
      user: req.fields.user,
    });

    if (review) {
      review.score = review.score - req.fields.score;
      await review.save();
      res.status(200).json({ message: "succes" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/review/delete/:id", isAuthenticated, async (req, res) => {
  try {
    console.log("route /review/delete/id");

    const isReviewExist = await Review.findOne({
      gameId: req.params.id,
      user: req.user,
    });

    if (isReviewExist) {
      const response = await Review.findOneAndDelete({
        gameId: req.params.id,
        user: req.user,
      });
      res.status(200).json({ message: "Review deleted" });
    } else {
      res.status(400).json({ error: "No such review." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
