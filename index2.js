const express = require("express");

const app = express();

app.use(express.json());

const mw1 = (req, res, next) => {
  console.log("This is the first function");
  next();
};

const mw2 = (req, res, next) => {
  console.log("This is the second function");
  req.data = req.body;
  next();
};

app.get("/home", mw1, mw2, (req, res) => {
  console.log("Home Page");
  res.send("Home Page");
});

app.post("/about", [mw1, mw2], (req, res) => {
  console.log("About Page");
  res.send(req.data);
});

app.listen(50008, () => {
  console.log("server is running on http://localhost:50008");
});
