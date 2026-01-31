/* ---------- RED LINES BACKGROUND ---------- */
const canvas = document.getElementById("redLines");
const ctx = canvas.getContext("2d");
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const lines = Array.from({length:150},()=>({
  x: Math.random()*w,
  y: Math.random()*h,
  speed: .3 + Math.random(),
  len: 80 + Math.random()*200,
  o: .2 + Math.random()*.6
}));

function drawLines() {
  ctx.clearRect(0,0,w,h);
  lines.forEach(l=>{
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255,0,0,${l.o})`;
    ctx.moveTo(l.x,l.y);
    ctx.lineTo(l.x,l.y+l.len);
    ctx.stroke();
    l.y -= l.speed;
    if(l.y + l.len < 0){
      l.y = h + 50;
      l.x = Math.random()*w;
    }
  });
  requestAnimationFrame(drawLines);
}
drawLines();

/* ---------- WELCOME LINE ---------- */
const welcomeText = document.getElementById("welcomeText");
const a = ["Secure","Smart","Premium","Next-Gen","Trusted","Fast"];
const b = ["Platform","Experience","Network","System","Ecosystem"];
welcomeText.innerText =
  `Welcome to Vaishnex ${a[Math.floor(Math.random()*a.length)]} ${b[Math.floor(Math.random()*b.length)]}`;

/* ---------- OTP FLOW ---------- */
const identityInput = document.getElementById("identityInput");
const sendBtn = document.getElementById("sendOtpBtn");
const otpSection = document.getElementById("otpSection");
const timerText = document.getElementById("timerText");
const resendText = document.getElementById("resendText");
const resendBtn = document.getElementById("resendBtn");

let timer, t = 30;

let iti = null;
function enableCountrySelector(){
  if(iti) return;
  iti = intlTelInput(identityInput,{
    initialCountry:"auto",
    geoIpLookup: cb=>{
      fetch("https://ipapi.co/json")
        .then(r=>r.json())
        .then(d=>cb(d.country_code.toLowerCase()))
        .catch(()=>cb("in"));
    },
    utilsScript:"https://cdn.jsdelivr.net/npm/intl-tel-input@18.3.1/build/js/utils.js"
  });
}

identityInput.addEventListener("input",()=>{
  if(/^\d{6,}$/.test(identityInput.value)) enableCountrySelector();
});

sendBtn.onclick=()=>{
  otpSection.classList.remove("hidden");
  startTimer();
  autoReadOTP();
};

function startTimer(){
  clearInterval(timer);
  t=30;
  resendText.classList.add("hidden");
  timerText.innerText=`Resend OTP in ${t}s`;
  timer=setInterval(()=>{
    t--;
    timerText.innerText=`Resend OTP in ${t}s`;
    if(t<=0){
      clearInterval(timer);
      timerText.innerText="";
      resendText.classList.remove("hidden");
    }
  },1000);
}

resendBtn.onclick=()=>startTimer();

/* ---------- AUTO OTP READ (ANDROID CHROME) ---------- */
async function autoReadOTP(){
  if(!("OTPCredential" in window)) return;
  try{
    const cred = await navigator.credentials.get({
      otp:{transport:["sms"]}
    });
    document.getElementById("otpInput").value = cred.code;
  }catch{}
}
