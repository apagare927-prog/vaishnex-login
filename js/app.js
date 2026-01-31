/* ---------- RED LINES ---------- */
const canvas = document.getElementById("redLines");
const ctx = canvas.getContext("2d");
let w,h;

function resize(){
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}
resize();
addEventListener("resize",resize);

const lines = Array.from({length:160},()=>({
  x:Math.random()*w,
  y:Math.random()*h,
  s:.4+Math.random(),
  l:100+Math.random()*200,
  o:.15+Math.random()*.5
}));

function draw(){
  ctx.clearRect(0,0,w,h);
  lines.forEach(l=>{
    ctx.strokeStyle=`rgba(255,0,0,${l.o})`;
    ctx.beginPath();
    ctx.moveTo(l.x,l.y);
    ctx.lineTo(l.x,l.y+l.l);
    ctx.stroke();
    l.y-=l.s;
    if(l.y+l.l<0){l.y=h;l.x=Math.random()*w;}
  });
  requestAnimationFrame(draw);
}
draw();

/* ---------- WELCOME ---------- */
const welcomeText = document.getElementById("welcomeText");
const w1=["Secure","Smart","Premium","Trusted","Next-Gen"];
const w2=["Platform","Experience","Network","System"];
welcomeText.innerText =
`Welcome to Vaishnex ${w1[Math.floor(Math.random()*w1.length)]} ${w2[Math.floor(Math.random()*w2.length)]}`;

/* ---------- INPUT + COUNTRY ---------- */
const input = document.getElementById("identityInput");

const iti = intlTelInput(input,{
  initialCountry:"auto",
  separateDialCode:true,
  autoPlaceholder:"off",
  geoIpLookup:cb=>{
    fetch("https://ipapi.co/json")
      .then(r=>r.json())
      .then(d=>cb(d.country_code.toLowerCase()))
      .catch(()=>cb("in"));
  },
  utilsScript:"https://cdn.jsdelivr.net/npm/intl-tel-input@18.3.1/build/js/utils.js"
});

/* show / hide selector */
input.addEventListener("input",()=>{
  const isEmail = input.value.includes("@");
  document.querySelector(".iti").style.display = isEmail ? "none" : "block";
});

/* ---------- OTP ---------- */
const sendBtn = document.getElementById("sendOtpBtn");
const otpSection = document.getElementById("otpSection");
const timerText = document.getElementById("timerText");
const resendText = document.getElementById("resendText");
const resendBtn = document.getElementById("resendBtn");

let t=30, timer;

sendBtn.onclick=()=>{
  otpSection.classList.remove("hidden");
  startTimer();
  autoOTP();
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

resendBtn.onclick=startTimer;

/* ---------- AUTO OTP READ ---------- */
async function autoOTP(){
  if(!("OTPCredential" in window)) return;
  try{
    const c = await navigator.credentials.get({otp:{transport:["sms"]}});
    document.getElementById("otpInput").value = c.code;
  }catch{}
}
