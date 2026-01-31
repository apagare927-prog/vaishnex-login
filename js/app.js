const input = document.getElementById("mainInput");
const btn = document.getElementById("actionBtn");
const countrySelect = document.getElementById("countrySelect");
const resendText = document.getElementById("resendText");
const welcomeText = document.getElementById("welcomeText");

let otpSent = false;
let timer = 30;

/* DYNAMIC WELCOME */
const welcomes = [
  "Welcome to Vaishnex",
  "Welcome back to Vaishnex",
  "Secure login with Vaishnex",
  "Vaishnex is happy to see you",
  "Start your journey with Vaishnex"
];
welcomeText.innerText =
  welcomes[Math.floor(Math.random()*welcomes.length)];

/* LOAD COUNTRIES */
countries.forEach(c=>{
  const opt=document.createElement("option");
  opt.value=c.code;
  opt.text=`${c.name} ${c.code}`;
  countrySelect.appendChild(opt);
});

/* BUTTON LOGIC */
btn.onclick = ()=>{
  input.classList.remove("error");

  if(!otpSent){
    if(!input.value){
      input.classList.add("error");
      return;
    }

    // detect mobile
    if(/^\d+$/.test(input.value)){
      countrySelect.classList.remove("hidden");
    }

    otpSent=true;
    input.value="";
    input.placeholder="Enter OTP";
    btn.innerText="Verify OTP";

    startTimer();
  }else{
    if(input.value.length!==6){
      input.classList.add("error");
      return;
    }
    alert("OTP verified → Dashboard");
  }
};

/* RESEND TIMER */
function startTimer(){
  resendText.classList.remove("hidden");
  resendText.innerText=`Resend OTP in ${timer}s`;

  const t=setInterval(()=>{
    timer--;
    resendText.innerText=`Resend OTP in ${timer}s`;
    if(timer===0){
      clearInterval(t);
      resendText.innerText="Resend OTP";
      timer=30;
    }
  },1000);
}
