"use strict";

/* ================= ELEMENTS ================= */
const countrySelect = document.getElementById("countrySelect");
const identityInput = document.getElementById("identityInput");
const identityError = document.getElementById("identityError");
const otpInput = document.getElementById("otpInput");
const otpError = document.getElementById("otpError");
const sendBtn = document.getElementById("sendOtpBtn");
const verifyBtn = document.getElementById("verifyOtpBtn");
const resendBtn = document.getElementById("resendOtp");
const timerBox = document.getElementById("otpTimer");
const welcomeLine = document.getElementById("welcomeLine");

/* ================= WELCOME ================= */
const WELCOMES = [
  "Welcome to Vaishnex",
  "Secure access to Vaishnex",
  "Vaishnex Premium Network",
  "Your gateway to Vaishnex",
  "Trusted by Vaishnex users"
];
welcomeLine.textContent =
  WELCOMES[Math.floor(Math.random()*WELCOMES.length)];

/* ================= COUNTRY SELECTOR (SAFE CDN) ================= */

function flagFromISO(iso){
  return iso.toUpperCase().replace(/./g,c =>
    String.fromCodePoint(127397 + c.charCodeAt())
  );
}

const FALLBACK = [
 {name:"India", dial:"+91", iso:"IN", min:10, max:10},
 {name:"United States", dial:"+1", iso:"US", min:10, max:10},
 {name:"United Kingdom", dial:"+44", iso:"GB", min:10, max:10},
 {name:"Australia", dial:"+61", iso:"AU", min:9, max:9},
 {name:"UAE", dial:"+971", iso:"AE", min:8, max:9},
];

let COUNTRY_DATA = [];

function fillCountries(list){
  countrySelect.innerHTML="";
  list.forEach(c=>{
    const opt=document.createElement("option");
    opt.value=c.dial;
    opt.dataset.min=c.min || 6;
    opt.dataset.max=c.max || 15;
    opt.textContent=`${flagFromISO(c.iso)} ${c.name} (${c.dial})`;
    countrySelect.appendChild(opt);
  });
  countrySelect.value="+91";
}

fetch("https://cdn.jsdelivr.net/npm/country-codes-list@1.0.0/dist/country-codes.json")
.then(r=>r.json())
.then(data=>{
  COUNTRY_DATA = Object.values(data)
    .filter(c=>c.dial_code)
    .map(c=>({
      name:c.country_name_en,
      dial:"+"+c.dial_code,
      iso:c.country_code,
      min:6,
      max:15
    }))
    .sort((a,b)=>a.name.localeCompare(b.name));
  fillCountries(COUNTRY_DATA);
})
.catch(()=>{
  fillCountries(FALLBACK);
});

/* ================= HELPERS ================= */
function isEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function repeatedDigits(v){
  return /^(\d)\1+$/.test(v);
}
function sequential(v){
  return "0123456789".includes(v) || "9876543210".includes(v);
}

/* ================= OTP FLOW ================= */
let OTP = "";
let timer = null;

sendBtn.onclick = ()=>{
  identityError.textContent="";
  otpError.textContent="";

  const v = identityInput.value.trim();
  if(!v){
    identityError.textContent="This field is required";
    return;
  }

  if(isEmail(v)){
    // ok
  }else{
    if(!/^\d+$/.test(v)){
      identityError.textContent="Only digits allowed";
      return;
    }
    if(repeatedDigits(v) || sequential(v)){
      identityError.textContent="Invalid mobile number";
      return;
    }
    const opt = countrySelect.selectedOptions[0];
    const min = +opt.dataset.min;
    const max = +opt.dataset.max;
    if(v.length < min || v.length > max){
      identityError.textContent="Invalid length for selected country";
      return;
    }
    if(opt.value==="+91" && !/^[6-9]/.test(v)){
      identityError.textContent="Invalid Indian mobile number";
      return;
    }
  }

  OTP = "1234"; // demo
  otpInput.style.display="block";
  verifyBtn.style.display="block";
  startTimer();
};

verifyBtn.onclick = ()=>{
  otpError.textContent="";
  if(!otpInput.value){
    otpError.textContent="OTP required";
    return;
  }
  if(otpInput.value !== OTP){
    otpError.textContent="Invalid OTP";
    return;
  }
  alert("Login successful (demo)");
};

function startTimer(){
  let t=30;
  resendBtn.style.display="none";
  timerBox.textContent=`Resend OTP in ${t}s`;
  clearInterval(timer);
  timer=setInterval(()=>{
    t--;
    timerBox.textContent=`Resend OTP in ${t}s`;
    if(t<=0){
      clearInterval(timer);
      timerBox.textContent="";
      resendBtn.style.display="block";
    }
  },1000);
}

resendBtn.onclick = startTimer;
