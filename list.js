const buttonGetList = document.querySelector(".get-list");
const buttonPostList = document.querySelector(".post-user");
const buttonDeleteList = document.querySelector(".delete-list");

buttonGetList.addEventListener("click", () => {
  getList();
});

const clearList = () => {
  const userList = document.getElementById("user-list");
  while (userList.firstChild) {
    userList.removeChild(userList.firstChild);
  }
};

const getList = () => {
  clearList();
  const url = "http://localhost:50006/api/users";
  //.get request的方法
  axios
    .get(url)
    //如果成功走.then后面的这个函数，如果失败走catch后面的函数
    .then((res) => {
      const users = res.data.data;
      console.log("users: ", users);
      users.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = user.name + " " + user.age;
        li.setAttribute("data-id", user.id);
        // create button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", () => {
          deleteUserById(user.id);
        });
        li.appendChild(deleteButton);
        document.getElementById("user-list").appendChild(li);
      });
    })
    .catch((err) => {
      console.error("Error fetching user list: ", err);
    });
};

const deleteUserById = (userId) => {
  console.log("delete user id: ", userId);
  const url = "http://localhost:50006/api/users/" + userId;
  axios
    .delete(url)
    .then((res) => {
      console.log(userId + "" + "has been deleted");
      clearList();
      getList();
    })
    .catch((err) => {
      console.error("Error deleting user: ", err);
    });
};

buttonPostList.addEventListener("click", () => {});

buttonDeleteList.addEventListener("click", () => {});
