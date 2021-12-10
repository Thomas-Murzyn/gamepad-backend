const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:page", async (req, res) => {
  try {
    console.log("route /");

    const response = await axios.get(
      `https://api.rawg.io/api/games?page=${req.params.page}&page_size=40&key=${process.env.API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
