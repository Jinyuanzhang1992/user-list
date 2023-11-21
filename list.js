const express = require("express");
const cors = require("cors");
const app = express();

//require global middleware
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); //必须当成全局中间件使用

// require router module
const userListRouter = require("./router");

// use router module
app.use(userListRouter);

// start web server
const PORT = 50006;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
