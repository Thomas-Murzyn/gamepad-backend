const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    console.log("search /");

    if (req.query.platforms && req.query.genres) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${
          process.env.API_KEY
        }&page=1&page_size=100&search=${
          req.query.title ? req.query.title : ""
        }&search_precise=${req.query.title ? true : false}&search_exact=${
          req.query.title ? true : false
        }&ordering=${req.query.ordering ? req.query.ordering : ""}${
          req.query.platforms && `&platforms=${req.query.platforms}`
        }${req.query.genres && `&genres=${req.query.genres}`}`
      );

      res.status(200).json(response.data);
    } else if (req.query.platforms) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${
          process.env.API_KEY
        }&page=1&page_size=100&search=${
          req.query.title ? req.query.title : ""
        }&search_precise=${req.query.title ? true : false}&search_exact=${
          req.query.title ? true : false
        }&ordering=${req.query.ordering ? req.query.ordering : ""}${
          req.query.platforms && `&platforms=${req.query.platforms}`
        }`
      );

      res.status(200).json(response.data);
    } else if (req.query.genres) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${
          process.env.API_KEY
        }&page=1&page_size=100&search=${
          req.query.title ? req.query.title : ""
        }&search_precise=${req.query.title ? true : false}&search_exact=${
          req.query.title ? true : false
        }&ordering=${req.query.ordering ? req.query.ordering : ""}${
          req.query.genres && `&genres=${req.query.genres}`
        }`
      );

      res.status(200).json(response.data);
    } else {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${
          process.env.API_KEY
        }&page=1&page_size=100&search=${
          req.query.title ? req.query.title : ""
        }&search_precise=${req.query.title ? true : false}&ordering=${
          req.query.ordering ? req.query.ordering : ""
        }`
      );

      res.status(200).json(response.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
