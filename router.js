const express = require("express");
const userListRouter = express.Router();

let users = [
  { id: 1, name: "Ben", age: 20 },
  { id: 2, name: "John", age: 30 },
  { id: 3, name: "Chris", age: 40 },
  { id: 4, name: "Jane", age: 60 },
];

function findUserById(users) {
  const userIds = users.map((user) => {
    return user.id;
  });

  return Math.max(...userIds) + 1;
}

// send 可以换成json
userListRouter
  .route("/users")
  // get all users
  .get((req, res) => {
    console.log("success");
    res.send({
      status: 200,
      msg: "success",
      data: users,
    });
  })
  // add a new user
  .post((req, res) => {
    const newUsers = ({ userName, age } = req.body);
    if (!userName || !age) {
      return res.status(400).send({
        status: 400,
        msg: "username and age are required",
      });
    }
    const id = findUserById(users);
    let obj = { id, ...newUsers };
    users.push(obj);
    console.log(users);
    res.status(201).json({
      status: 200,
      msg: "success",
      data: users,
    });
  })
  // delete all users
  .delete((req, res) => {
    users = [];
    res.status(204).send();
  });

// delete a user by id
userListRouter.delete("/users/:id", (req, res) => {
  const userIdToDelete = parseInt(req.params.id);
  const initialUsersCount = users.length;
  users = users.filter((item) => {
    return item.id !== userIdToDelete;
  });
  if (users.length === initialUsersCount) {
    res.send({
      status: 404,
      msg: "user not found",
    });
  }
  res.send({
    status: 200,
    msg: `User whit ID ${userIdToDelete} deleted`,
    data: users,
  });
});

module.exports = userListRouter;
