const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const axios = require("axios");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router.get(`/user_profil`, isAuthenticated, async (req, res) => {
  try {
    console.log("route /user_profil");

    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
