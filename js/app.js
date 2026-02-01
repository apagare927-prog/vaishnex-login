const countryBtn = document.getElementById("countryBtn");
const countryModal = document.getElementById("countryModal");
const countryList = document.getElementById("countryList");
const searchCountry = document.getElementById("searchCountry");

let allCountries = [];
let selectedDial = "+91";

/* 1️⃣ FETCH REAL 250+ COUNTRIES */
fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => {
    allCountries = data
      .filter(c => c.idd?.root)
      .map(c => ({
        name: c.name.common,
        dial: c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : ""),
        flag: c.flags.png
      }))
      .sort((a,b)=>a.name.localeCompare(b.name));

    renderCountries(allCountries);
    autoDetectCountry();
  });

function renderCountries(list) {
  countryList.innerHTML = "";
  list.forEach(c => {
    const div = document.createElement("div");
    div.className = "country-row";
    div.innerHTML = `
      <img src="${c.flag}">
      <span>${c.name}</span>
      <span>${c.dial}</span>
    `;
    div.onclick = () => {
      selectedDial = c.dial;
      countryBtn.innerText = c.flag + " " + c.dial;
      countryModal.classList.add("hidden");
    };
    countryList.appendChild(div);
  });
}

/* 2️⃣ SEARCH */
searchCountry.oninput = e => {
  const q = e.target.value.toLowerCase();
  renderCountries(allCountries.filter(c => c.name.toLowerCase().includes(q)));
};

/* 3️⃣ AUTO DETECT (IP BASED) */
function autoDetectCountry() {
  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(loc => {
      const found = allCountries.find(c => c.name === loc.country_name);
      if (found) {
        selectedDial = found.dial;
        countryBtn.innerText = found.dial;
      }
    });
}

/* Modal */
countryBtn.onclick = () => countryModal.classList.remove("hidden");
countryModal.onclick = e => {
  if (e.target === countryModal) countryModal.classList.add("hidden");
};

/* OTP FLOW (DEMO) */
const sendOtpBtn = document.getElementById("sendOtpBtn");
const otpInput = document.getElementById("otpInput");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const timerText = document.getElementById("timer");
const resendBtn = document.getElementById("resendBtn");
const error = document.getElementById("error");

let timer;

sendOtpBtn.onclick = () => {
  otpInput.classList.remove("hidden");
  verifyOtpBtn.classList.remove("hidden");
  startTimer();
};

function startTimer() {
  let t = 30;
  timerText.classList.remove("hidden");
  resendBtn.classList.add("hidden");
  timerText.innerText = `Resend OTP in ${t}s`;

  timer = setInterval(() => {
    t--;
    timerText.innerText = `Resend OTP in ${t}s`;
    if (t === 0) {
      clearInterval(timer);
      timerText.classList.add("hidden");
      resendBtn.classList.remove("hidden");
    }
  }, 1000);
}

resendBtn.onclick = startTimer;
