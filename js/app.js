// AUTO COUNTRY

const phoneInput = window.intlTelInput(
document.querySelector("#phone"),
{
initialCountry:"auto",
geoIpLookup:function(callback){
fetch("https://ipapi.co/json")
.then(res=>res.json())
.then(data=>callback(data.country_code))
.catch(()=>callback("in"));
}
}
);

// EMAIL / MOBILE toggle

const emailBtn=document.getElementById("emailBtn");
const mobileBtn=document.getElementById("mobileBtn");
const email=document.getElementById("email");
const phone=document.getElementById("phone");

phone.style.display="none";

emailBtn.onclick=()=>{
email.style.display="block";
phone.style.display="none";

emailBtn.classList.add("active");
mobileBtn.classList.remove("active");
};

mobileBtn.onclick=()=>{
email.style.display="none";
phone.style.display="block";

mobileBtn.classList.add("active");
emailBtn.classList.remove("active");
};

// Unlimited Premium Lines

const lines=[
"Welcome to Vaishnex",
"Secure access to Vaishnex",
"Enter the future with Vaishnex",
"Your network begins at Vaishnex",
"Experience premium security",
"Connect smarter with Vaishnex"
];

document.getElementById("dynamicText")
.innerText=lines[Math.floor(Math.random()*lines.length)];


// RED validation

document.querySelector(".login-btn")
.onclick=()=>{

document.querySelectorAll(".input")
.forEach(input=>{
if(input.offsetParent!==null && !input.value){
input.classList.add("error");
}
else{
input.classList.remove("error");
}
});

};
