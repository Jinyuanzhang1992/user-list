const express = require("express");
const router1 = express.Router();

//中间件仅针对特定路由生效
router1.post("/api/error", (req, res, next) => {
  const error = new Error("This is a simulated error");
  next(error);
});

//创建错误处理中间件
const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({
    status: "error",
    msg: "Internal Server Error",
  });
};

router1.use(errorHandler);

module.exports = router1;
