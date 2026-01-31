// -------- WELCOME LINES --------
const welcomeLines = [
  "Welcome to Vaishnex",
  "Securely enter Vaishnex",
  "Experience Vaishnex Network",
  "Vaishnex Premium Access",
  "Powering your Vaishnex login"
];

document.getElementById("welcomeLine").innerText =
  welcomeLines[Math.floor(Math.random() * welcomeLines.length)];

// -------- ELEMENTS --------
const countrySelect = document.getElementById("countrySelect");
const userInput = document.getElementById("userInput");
const inputError = document.getElementById("inputError");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const otpInput = document.getElementById("otpInput");
const otpError = document.getElementById("otpError");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const resendBtn = document.getElementById("resendBtn");
const resendTimer = document.getElementById("resendTimer");

// -------- LOAD COUNTRIES (SAFE API) --------
fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => {
    data.sort((a,b)=>a.name.common.localeCompare(b.name.common));
    data.forEach(c => {
      if (!c.idd || !c.idd.root) return;
      const code = c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : "");
      const opt = document.createElement("option");
      opt.value = code;
      opt.text = `${c.flag} ${c.name.common} (${code})`;
      countrySelect.appendChild(opt);
    });
  });

// -------- AUTO COUNTRY DETECT --------
fetch("https://ipapi.co/json/")
  .then(r=>r.json())
  .then(d=>{
    [...countrySelect.options].forEach(o=>{
      if(o.text.includes(d.country_name)) countrySelect.value=o.value;
    });
  });

// -------- SEND OTP --------
sendOtpBtn.onclick = () => {
  inputError.innerText = "";
  const val = userInput.value.trim();

  if (!val) {
    inputError.innerText = "Input required";
    return;
  }

  if (!val.includes("@") && !/^\d+$/.test(val)) {
    inputError.innerText = "Invalid email or mobile";
    return;
  }

  otpInput.style.display = "block";
  verifyOtpBtn.style.display = "block";
  sendOtpBtn.disabled = true;
  startTimer();
};

// -------- VERIFY OTP --------
verifyOtpBtn.onclick = () => {
  otpError.innerText = "";
  if (otpInput.value.length < 4) {
    otpError.innerText = "Invalid OTP";
    return;
  }
  alert("Login success (demo)");
};

// -------- TIMER --------
function startTimer() {
  let t = 30;
  resendBtn.style.display = "none";
  resendTimer.innerText = `Resend OTP in ${t}s`;
  const i = setInterval(()=>{
    t--;
    resendTimer.innerText = `Resend OTP in ${t}s`;
    if(t<=0){
      clearInterval(i);
      resendTimer.innerText="";
      resendBtn.style.display="block";
    }
  },1000);
}

resendBtn.onclick = startTimer;
