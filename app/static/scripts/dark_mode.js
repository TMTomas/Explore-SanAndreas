const ID_BTN_DARK_TOGGLE = 'idBtnDarkToggle'
const DARK_MODE_CLASS = 'dark-mode'
window.onload = boot

var body, btnDarkToggle, darkModeClass

function boot() {
  body = document.body
  btnDarkToggle = id(ID_BTN_DARK_TOGGLE)
  checkDarkModeState()
  btnDarkToggle?.addEventListener("click", toggleDarkMode)
  
}

function checkDarkModeState() {
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode")
    btnDarkToggle.innerHTML = '🌑'
  }
}

function toggleDarkMode() {
  body.classList.toggle("dark-mode");
  darkModeClass = body.classList.contains(DARK_MODE_CLASS);
  localStorage.setItem("dark-mode", darkModeClass ? "enabled" : "disabled");
  darkModeClass ? btnDarkToggle.innerHTML = '🌑' : btnDarkToggle.innerHTML = '🌞'
}


