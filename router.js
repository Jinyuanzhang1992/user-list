const express = require("express");
const userListRouter = express.Router();

userListRouter
  .route("/")
  .get((req, res) => {
    console.log("Good!");
    res.send("Good!");
  })
  .post((req, res) => {});

module.exports = userListRouter;
