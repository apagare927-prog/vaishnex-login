document.addEventListener("DOMContentLoaded", function() {

const titles = [

"Continue to Vaishnex",
"Welcome to Vaishnex",
"Start your journey",
"Access your world",
"Enter Vaishnex",
"Hello again 👋",
"Let’s get you in",
"Your network awaits",
"Step into Vaishnex",
"Secure login"

];

document.getElementById("title").innerText =
titles[Math.floor(Math.random()*titles.length)];

});
