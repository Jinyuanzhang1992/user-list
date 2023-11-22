// require some packages and create a web server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

//define middleware function
// const mw = (req, res, next) => {
//   console.log("This is a mw function");
//   next();
// };

//register global middleware
app.use(express.static("."));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); //必须当成全局中间件使用
// app.use(mw);
// app.use((req, res, next) => {
//   console.log("This is another mw function");
//   next();
// });

// require router module
const userListRouter = require("./router");

// use router module
app.use("/api", userListRouter);
// app.get("/api/home", (req, res) => {
//   res.send("This is home page");
// });

// start web server
const PORT = 50006;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
