// COUNTRY AUTO DETECT
const iti = window.intlTelInput(
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

// TOGGLE
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

// DYNAMIC HEADLINES
const titles=[
"Welcome to Vaishnex",
"Secure access to Vaishnex",
"Connect smarter with Vaishnex",
"Your digital gateway",
"Next-gen authentication"
];

document.getElementById("title")
.innerText=titles[Math.floor(Math.random()*titles.length)];


// EMPTY FIELD ERROR
document.getElementById("loginBtn")
.onclick=()=>{

document.querySelectorAll(".input")
.forEach(field=>{

if(field.offsetParent!==null && !field.value){

field.classList.add("error");

setTimeout(()=>{
field.classList.remove("error");
},600);

}

});

};
