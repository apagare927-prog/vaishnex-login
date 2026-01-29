const phoneInput=document.querySelector("#phone");

if(phoneInput){

window.intlTelInput(phoneInput,{
initialCountry:"in",
separateDialCode:true,
preferredCountries:["in","us","gb"]
});

const phoneBtn=document.getElementById("phoneBtn");
const emailBtn=document.getElementById("emailBtn");

const phone=document.getElementById("phone");
const email=document.getElementById("email");

phoneBtn.onclick=()=>{
phone.style.display="block";
email.style.display="none";
phoneBtn.classList.add("active");
emailBtn.classList.remove("active");
};

emailBtn.onclick=()=>{
phone.style.display="none";
email.style.display="block";
emailBtn.classList.add("active");
phoneBtn.classList.remove("active");
};

}
