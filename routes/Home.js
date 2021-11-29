const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("route /");

    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=1&page_size=100`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
