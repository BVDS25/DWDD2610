document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav.primary");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      // Optional: Change icon to X when open
      toggle.textContent = nav.classList.contains("active") ? "✕" : "☰";
    });
  }
});