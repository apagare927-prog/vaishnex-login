const countryBtn = document.getElementById("countryBtn");
const countryModal = document.getElementById("countryModal");
const countryList = document.getElementById("countryList");
const searchCountry = document.getElementById("searchCountry");
const countryFlag = document.getElementById("countryFlag");
const countryCode = document.getElementById("countryCode");

const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const resendBtn = document.getElementById("resendBtn");
const otpInput = document.getElementById("otpInput");
const timerText = document.getElementById("timerText");
const error = document.getElementById("error");

let timer;
let seconds = 30;

/* REAL COUNTRY DATA */
const countries = [
  { name:"India", code:"+91", flag:"in" },
  { name:"United States", code:"+1", flag:"us" },
  { name:"United Kingdom", code:"+44", flag:"gb" },
  { name:"Afghanistan", code:"+93", flag:"af" },
  { name:"Albania", code:"+355", flag:"al" },
  { name:"Algeria", code:"+213", flag:"dz" },
  { name:"Australia", code:"+61", flag:"au" },
  { name:"Canada", code:"+1", flag:"ca" },
  { name:"France", code:"+33", flag:"fr" },
  { name:"Germany", code:"+49", flag:"de" },
  { name:"Japan", code:"+81", flag:"jp" },
  { name:"UAE", code:"+971", flag:"ae" }
];

/* LOAD COUNTRIES */
function renderCountries(list) {
  countryList.innerHTML = "";
  list.forEach(c => {
    const div = document.createElement("div");
    div.className = "country-item";
    div.innerHTML = `
      <img src="https://flagcdn.com/w40/${c.flag}.png">
      <span>${c.name} (${c.code})</span>
    `;
    div.onclick = () => {
      countryFlag.src = `https://flagcdn.com/w20/${c.flag}.png`;
      countryCode.textContent = c.code;
      countryModal.classList.add("hidden");
      document.body.style.overflow = "auto";
    };
    countryList.appendChild(div);
  });
}

renderCountries(countries);

/* MODAL OPEN */
countryBtn.onclick = () => {
  countryModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

/* MODAL CLOSE */
countryModal.onclick = e => {
  if (e.target === countryModal) {
    countryModal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
};

/* SEARCH */
searchCountry.oninput = () => {
  const v = searchCountry.value.toLowerCase();
  renderCountries(countries.filter(c =>
    c.name.toLowerCase().includes(v) || c.code.includes(v)
  ));
};

/* OTP LOGIC (DEMO) */
sendOtpBtn.onclick = () => {
  error.textContent = "";
  otpInput.classList.remove("hidden");
  verifyOtpBtn.classList.remove("hidden");
  timerText.classList.remove("hidden");
  resendBtn.classList.add("hidden");

  seconds = 30;
  timerText.textContent = `Resend OTP in ${seconds}s`;

  timer = setInterval(() => {
    seconds--;
    timerText.textContent = `Resend OTP in ${seconds}s`;
    if (seconds <= 0) {
      clearInterval(timer);
      timerText.classList.add("hidden");
      resendBtn.classList.remove("hidden");
    }
  }, 1000);
};

resendBtn.onclick = sendOtpBtn;
