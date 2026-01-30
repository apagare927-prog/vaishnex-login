// COUNTRY AUTO DETECT
const phoneInput = window.intlTelInput(
document.querySelector("#phone"),
{
 initialCountry:"auto",

 geoIpLookup: function(callback){
   fetch("https://ipapi.co/json")
   .then(res=>res.json())
   .then(data=>callback(data.country_code))
   .catch(()=>callback("US"));
 },

 separateDialCode:true,
}
);


// EMAIL / MOBILE TOGGLE

const emailBtn = document.getElementById("emailBtn");
const mobileBtn = document.getElementById("mobileBtn");

const emailField = document.getElementById("emailField");
const phoneField = document.getElementById("phone");

emailBtn.onclick = () =>{
 emailField.classList.remove("hidden");
 phoneField.classList.add("hidden");

 emailBtn.classList.add("active");
 mobileBtn.classList.remove("active");
};

mobileBtn.onclick = () =>{
 phoneField.classList.remove("hidden");
 emailField.classList.add("hidden");

 mobileBtn.classList.add("active");
 emailBtn.classList.remove("active");
};



// UNLIMITED DYNAMIC LINES

const titles=[

"Welcome to Vaishnex",
"Secure access to Vaishnex",
"Enter the future with Vaishnex",
"Your network awaits at Vaishnex",
"Vaishnex keeps you connected",
"Smart people choose Vaishnex",
"Power your world with Vaishnex",
"Experience next-gen Vaishnex",
"Trusted login by Vaishnex",
"Vaishnex — fast & secure"

];

document.getElementById("dynamicTitle").innerText =
titles[Math.floor(Math.random()*titles.length)];




// AUTO OTP READ (WEB OTP API)

async function autoReadOTP(){

if("OTPCredential" in window){

try{

const content = await navigator.credentials.get({
 otp:{transport:["sms"]},
 signal:new AbortController().signal
});

console.log("OTP received:",content.code);

}catch(e){
console.log("Auto OTP failed");
}

}
}

autoReadOTP();
