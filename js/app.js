// Toggle
const emailBtn = document.getElementById("emailBtn");
const mobileBtn = document.getElementById("mobileBtn");

const email = document.getElementById("email");
const phone = document.getElementById("phone");

emailBtn.onclick=()=>{
email.classList.remove("hidden");
phone.classList.add("hidden");

emailBtn.classList.add("active");
mobileBtn.classList.remove("active");
}

mobileBtn.onclick=()=>{
phone.classList.remove("hidden");
email.classList.add("hidden");

mobileBtn.classList.add("active");
emailBtn.classList.remove("active");
}

// Country selector
window.intlTelInput(phone,{
initialCountry:"auto",

geoIpLookup:(callback)=>{
fetch("https://ipapi.co/json")
.then(res=>res.json())
.then(data=>callback(data.country_code))
.catch(()=>callback("IN"));
}
});

// 🔥 Dynamic Unlimited Vaishnex Lines
const texts=[
"Welcome to Vaishnex",
"Enter Vaishnex",
"Secure Vaishnex Access",
"Vaishnex protects you",
"Login to Vaishnex",
"Your Vaishnex world",
"Future is Vaishnex"
];

setInterval(()=>{
document.getElementById("dynamicText")
innerText=
texts[Math.floor(Math.random()*texts.length)];
},2500);

// 🔥 Error red line
document.querySelector(".login-btn")
.onclick=()=>{

document
.querySelectorAll(".input")
.forEach(i=>{
if(!i.value){
i.classList.add("error");
}else{
i.classList.remove("error");
}
});
};
