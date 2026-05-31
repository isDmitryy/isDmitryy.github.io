// ============================================
// THEME TOGGLE
// ============================================

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-toggle__icon");
const html = document.documentElement;

// Читаем сохранённую тему или используем тёмную по умолчанию
const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

function applyTheme(theme) {
  if (theme === "light") {
    html.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀️";
  } else {
    html.removeAttribute("data-theme");
    themeIcon.textContent = "🌙";
  }
}

themeToggle.addEventListener("click", () => {
  const currentTheme =
    html.getAttribute("data-theme") === "light" ? "dark" : "light";

  applyTheme(currentTheme);
  localStorage.setItem("theme", currentTheme);
});

// ============================================
// BURGER MENU
// ============================================

const burger = document.querySelector(".burger");
const nav = document.querySelector(".header__nav");

burger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  burger.classList.toggle("is-active");
  burger.setAttribute("aria-expanded", isOpen);
});

// Закрываем меню при клике на ссылку
document.querySelectorAll(".header__link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger.classList.remove("is-active");
    burger.setAttribute("aria-expanded", "false");
  });
});
