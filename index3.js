const express = require("express");
const router1 = require("./router1");

const app = express();

app.use(router1);

app.listen(50009, () => {
  console.log("server is running on http://localhost:50009");
});
