//DOM elements
const addBtn = document.getElementById("add-btn");
const doubleBtn = document.getElementById("double-btn");
const showMillionairesBtn = document.getElementById("million-btn");
const calculateWealthBtn = document.getElementById("wealth-total-btn");
const baseUrl =
  "https://lit-earth-42250.herokuapp.com/https://randomuser.me/api";
var usersArray = [];

init();
function init() {
  fetch(baseUrl + "/?results=3")
    .then((response) => {
      if (response.status !== 200) {
        console.log("there was a problem. Status Code: " + response.status);
        return;
      }
      response.json().then((data) => {
        addData(data.results);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error", err);
    });
}

function displayUsers() {
  let text = "<table>";
  text += "<tr><th>Photo</th><th>Name</th><th>Wealth</th></tr>";
  usersArray.forEach((person) => {
    text += `<tr><td> <img alt="" src=` + person.pic + `></img></td>`;
    text += `<td>` + person.name + ` </td>`;
    text += `<td> $ ` + person.money + ` </td></tr>`;
  });
  text += "</table>";
  document.getElementById("myTable").innerHTML = text;
}

function createUser() {
  fetch(baseUrl + "/?results=1").then((response) => {
    if (response.status !== 200) {
      console.log("there was a problem. Status Code: " + response.status);
      return;
    }
    response
      .json()
      .then((data) => {
        // console.log(data.results[0]);
        addData(data.results);
      })
      .catch(function (err) {
        console.log("Fetch Error", err);
      });
  });
}

//add data in users array
function addData(arr) {
  arr.forEach(value => {
    let user = {
      name: value.name.first + " " + value.name.last,
      money: Math.floor(Math.random() * 1000000),
      pic: value.picture.medium,
    };
    usersArray.push(user);
  });
  displayUsers();
}

// Double money
function doubleMoney() {
  usersArray = usersArray.map((user) => {
      alert(user.money);
    return { ...user, money: user.money * 2 };
  });
  displayUsers();
}

// Filter only millionaires
function showMillionaires() {
  usersArray = usersArray.filter((user) => user.money > 1000000);
  displayUsers();
}

// Calculate the total wealth
function calculateWealth() {
  //
  displayUsers();
}

// event listeners
addBtn.addEventListener("click", createUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
