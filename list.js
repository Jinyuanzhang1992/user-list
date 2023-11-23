const buttonGetList = document.querySelector(".get-list");
const buttonPostList = document.querySelector(".post-user");
const buttonDeleteList = document.querySelector(".delete-list");
const userListInHTML = document.querySelector("#user-list");
const inputName = document.getElementById("username");
const inputAge = document.getElementById("age");

buttonGetList.addEventListener("click", () => {
  getList();
});

const clearList = () => {
  while (userListInHTML.firstChild) {
    userListInHTML.removeChild(userListInHTML.firstChild);
  }
};

const appendUsers = (users) => {
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = user.name + " " + user.age; //要与后端表格中的属性名一致
    li.setAttribute("data-id", user.id);
    // create button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", () => {
      deleteUserById(user.id, user.name);
    });
    li.appendChild(deleteButton);
    userListInHTML.appendChild(li);
  });
};

const getList = () => {
  const url = "http://localhost:50006/api/users";
  //.get request的方法
  axios
    .get(url)
    //如果成功走.then后面的这个函数，如果失败走catch后面的函数
    .then((res) => {
      const userListFromServer = res.data.data;
      clearList();
      appendUsers(userListFromServer);
    })
    .catch((err) => {
      console.error("Error fetching user list: ", err);
    });
};

const deleteUserById = (userId, userName) => {
  console.log("delete user id: ", userId);
  const url = "http://localhost:50006/api/users/" + userId;
  axios
    .delete(url)
    .then((res) => {
      alert(userName + " " + "has been deleted");
      clearList();
      getList();
    })
    .catch((err) => {
      console.error("Error deleting user: ", err);
    });
};

buttonPostList.addEventListener("click", () => {
  postUser();
});

const postUser = () => {
  const url = "http://localhost:50006/api/users/";
  let nameValue = inputName.value;
  let ageValue = inputAge.value;
  if (!nameValue || !ageValue) {
    alert("username and age are required.");
    return;
  }
  const body = {
    name: nameValue, //要与后端表格中的属性名一致
    age: ageValue,
  };

  axios
    .post(url, body)
    .then((res) => {
      const updatedUserList = res.data.data;
      alert(`user: ${nameValue} has been added successfully.`);
      clearList();
      appendUsers(updatedUserList);
      inputName.value = "";
      inputAge.value = "";
      //清空输入框,nameValue = "" 是不行的，因为nameValue只是一个变量，与DOM没有任何关系，inputName.value才是真正的input的值
    })
    .catch((err) => {
      console.error(
        "Error posting user: ",
        err.response ? err.response.data : err
      );
    });
};
//注意post数据到服务器后，我们有两个选择更新数据：重新get一遍数据，或者直接在前端append新的数据，这里我们选择后者

buttonDeleteList.addEventListener("click", () => {
  DeleteList();
});

const DeleteList = () => {
  const url = "http://localhost:50006/api/users/";
  axios
    .delete(url)
    .then((res) => {
      alert("all users have been deleted");
      clearList();
      getList();
    })
    .catch((err) => {
      console.error("Error deleting user: ", err);
    });
};
