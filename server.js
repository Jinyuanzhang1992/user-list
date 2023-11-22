// require some packages and create a web server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

//register global middleware
app.use(express.static("."));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); //必须当成全局中间件使用

// require router module
const userListRouter = require("./userListRouter");

// use router module
app.use("/api", userListRouter);

// start web server
const PORT = 50006;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
