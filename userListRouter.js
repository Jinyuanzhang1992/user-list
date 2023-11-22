// require express and create a router
const express = require("express");
const userListRouter = express.Router();

//initial array of users
let users = [
  { id: 1, name: "Ben", age: 20 },
  { id: 2, name: "John", age: 30 },
  { id: 3, name: "Chris", age: 40 },
  { id: 4, name: "Jane", age: 60 },
];

//get new id
function getNewId(users) {
  const userIds = users.map((user) => {
    return user.id;
  });
  return Math.max(...userIds) + 1;
}

userListRouter
  .route("/users")
  // fetch all users
  .get((req, res) => {
    try {
      console.log("success");
      res.send({
        status: 200,
        msg: "success",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  })

  // add a new user
  .post((req, res) => {
    let newUsers = req.body;
    if (!newUsers.username || !newUsers.age) {
      return res.status(400).send({
        status: 400,
        msg: "username and age are required",
      });
    }
    const id = getNewId(users);
    newUsers = { id, ...newUsers };
    users.push(newUsers);
    res.status(201).json({
      status: 200,
      msg: "success",
      data: users,
    });
  })

  // delete all users
  .delete((req, res) => {
    try {
      users = [];
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

// delete a user by id
userListRouter.delete("/users/:id", (req, res) => {
  try {
    const userIdToDelete = parseInt(req.params.id);
    const initialUsersCount = users.length;
    users = users.filter((item) => {
      return item.id !== userIdToDelete;
    });
    if (users.length === initialUsersCount) {
      res.send({
        status: 404,
        msg: `User with id ${userIdToDelete} not found`,
      });
    }

    res.send({
      status: 200,
      msg: `User whit ID ${userIdToDelete} deleted`,
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

// create error middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); //输出错误信息
  res.status(500).json({
    status: "error",
    msg: "Internal Server Error",
  });
};

userListRouter.use(errorHandler);

//export router module
module.exports = userListRouter;
