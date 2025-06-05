document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("dark-toggle");
  const body = document.body;

  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
  }

  toggle?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const enabled = body.classList.contains("dark-mode");
    localStorage.setItem("dark-mode", enabled ? "enabled" : "disabled");
  });
});
