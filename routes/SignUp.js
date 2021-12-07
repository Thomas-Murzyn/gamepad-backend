const User = require("../models/User");
const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const mongoose = require("mongoose");

router.post("/signup", async (req, res) => {
  try {
    console.log("route /signup");

    const isUserExist = await User.findOne({ mail: req.fields.mail });

    if (isUserExist) {
      res.status(400).json({ message: "User already exist" });
    } else {
      if (req.fields.username && req.fields.mail && req.fields.password) {
        const password = req.fields.password;
        const salt = uid2(77);
        const hash = SHA256(password, salt).toString(encBase64);
        const token = uid2(77);

        const newUser = new User({
          mail: req.fields.mail,
          username: req.fields.username,
          age: req.fields.age,
          hash: hash,
          token: token,
          salt: salt,
        });

        const response = await newUser.save();

        res.status(200).json({
          message: "Account created",
          username: response.username,
          mail: response.mail,
          token: token,
        });
      } else {
        res.status(400).json({ message: "Missing fields" });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
