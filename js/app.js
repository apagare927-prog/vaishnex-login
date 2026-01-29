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

});
