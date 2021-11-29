const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/game/:id", async (req, res) => {
  try {
    console.log("route /game");
    const response = await axios.get(
      `https://api.rawg.io/api/games/${req.params.id}?key=${process.env.API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
