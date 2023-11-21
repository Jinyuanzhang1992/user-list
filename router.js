const express = require("express");
const userListRouter = express.Router();

userListRouter
  .route("/")
  .get((req, res) => {})
  .post((req, res) => {});

module.exports = userListRouter;
