const express = require("express");
const moment = require("moment");

const app = express();

//register middleware function
const mw = (req, res, next) => {
  // gte the arrival time
  const time = moment().format("YYYY-MM-DD HH:mm:ss");
  // customized property 可以自己给req 定义属性
  req.starTime = time;
  next();
};

app.use(mw);

app.get("/", (req, res) => {
  console.log("Start Time:", req.starTime);
  res.send("Home Page: " + req.starTime);
});

app.get("/users", (req, res) => {
  console.log("Start Time:", req.starTime);
  res.send("User List: " + req.starTime);
});

app.listen(50007, () => {
  console.log("server is running on http://localhost:50007");
});

//get the time when request arrives at the server
