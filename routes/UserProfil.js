const express = require("express");

const mongoose = require("mongoose");
const User = require("../models/User");
const axios = require("axios");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const cloudinary = require("cloudinary").v2;

router.get("/user_profil", isAuthenticated, async (req, res) => {
  try {
    console.log("route /user_profil");

    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post(`/user_profil/update`, isAuthenticated, async (req, res) => {
  try {
    console.log("route /user_profil_update");

    const result = await cloudinary.uploader.upload(req.files.picture.path, {
      public_id: `Gamepad/user/${req.user._id}`,
    });

    const response = await User.findOne({ _id: req.user.id });

    response.picture = result;

    await response.save();

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
