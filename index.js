require("dotenv").config();

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(formidable());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect("mongodb://localhost/Gamepad");

// route "/"
const home = require("./routes/Home");
app.use(home);

// "/game/:id"
const game = require("./routes/Game");
app.use(game);

// route "/signup"
const signup = require("./routes/SignUp");
app.use(signup);

// route "/signin"
const signin = require("./routes/SignIn");
app.use(signin);

// route "favorite/:id"
const favorite = require("./routes/Favorite");
app.use(favorite);

// route "/review/:id"
const review = require("./routes/Review");
app.use(review);

app.all("*", () => {
  console.log("All route");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
