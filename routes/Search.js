const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    console.log("search /");

    // let genreBase = `action, adventure, shooter, puzzle, role-playing-games-rpg, indie, Massively Multiplayer, sports, racing, platformer`;

    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${
        process.env.API_KEY
      }&page=1&page_size=100&search=${
        req.query.title ? req.query.title : ""
      }&search_precise=${req.query.title ? true : false}&search_exact=${
        req.query.title ? true : false
      }${req.query.platforms && `&platforms=${req.query.platforms}`}${
        req.query.genres
          ? `&genres=${req.query.genres}`
          : `&genres=${genreBase}`
      }`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
