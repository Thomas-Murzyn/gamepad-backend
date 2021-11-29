const User = require("../models/User");
const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const mongoose = require("mongoose");

router.post("/signin", async (req, res) => {
  try {
    console.log("route /signin");

    const user = await User.findOne({ mail: req.fields.mail });

    if (user && req.fields.password) {
      const hash = SHA256(req.fields.password, user.salt).toString(encBase64);

      if (hash === user.hash) {
        res.status(200).json({
          message: "Successful authentication",
          username: user.username,
          mail: user.mail,
          description: user.description,
          token: user.token,
        });
      } else {
        res.status(401).json({ error: "Wrong mail or password." });
      }
    } else {
      res.status(401).json({ error: "Wrong mail or password." });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
