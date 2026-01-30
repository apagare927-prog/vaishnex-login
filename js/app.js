const phoneInput = window.intlTelInput(
document.querySelector("#phone"),
{
initialCountry:"auto",

geoIpLookup: function(callback) {
fetch('https://ipwho.is/')
.then(res => res.json())
.then(data => callback(data.country_code))
.catch(() => callback("US"));
},

separateDialCode:true,
preferredCountries:["in","us","gb"],
utilsScript:
"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"

});/* DYNAMIC TITLES */

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
