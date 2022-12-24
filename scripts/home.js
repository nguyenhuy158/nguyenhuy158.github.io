const val = localStorage.getItem("user");

console.log(JSON.parse(val));

document.getElementById("username").innerText = JSON.parse(val).username;
