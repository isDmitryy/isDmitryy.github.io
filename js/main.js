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

// ============================================
// SCROLL TO TOP
// ============================================

const scrollTopBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("is-visible");
  } else {
    scrollTopBtn.classList.remove("is-visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================================
// АКТИВНАЯ НАВИГАЦИЯ
// ============================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".header__link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("is-active"));
        const activeLink = document.querySelector(
          `.header__link[href="#${entry.target.id}"]`,
        );
        if (activeLink) activeLink.classList.add("is-active");
      }
    });
  },
  {
    threshold: 0.4,
  },
);

sections.forEach((section) => observer.observe(section));

// ============================================
// SCROLL ANIMATIONS
// ============================================

const animatedElements = document.querySelectorAll(".fade-up");

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Отключаем наблюдение после срабатывания
        animationObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

animatedElements.forEach((el) => animationObserver.observe(el));

// ============================================
// CONTACT FORM
// ============================================

const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const btn = form.querySelector(".contact-form__btn");
    const success = form.querySelector(".contact-form__success");

    btn.disabled = true;
    btn.textContent = "Отправляю...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        success.textContent = "Сообщение отправлено! Отвечу в течение дня.";
        form.reset();
      } else {
        success.textContent = "Ошибка отправки. Напиши напрямую в Telegram.";
      }
    } catch {
      success.textContent = "Ошибка сети. Напиши напрямую в Telegram.";
    } finally {
      btn.disabled = false;
      btn.textContent = "Отправить";
    }
  });
}

function validateForm() {
  let isValid = true;
  const fields = form.querySelectorAll("[required]");

  fields.forEach((field) => {
    const error = field.parentElement.querySelector(".contact-form__error");
    field.classList.remove("is-error");
    error.textContent = "";

    if (!field.value.trim()) {
      showError(field, error, "Это поле обязательно");
      isValid = false;
    } else if (field.type === "email" && !isValidEmail(field.value)) {
      showError(field, error, "Введи корректный email");
      isValid = false;
    }
  });

  return isValid;
}

function showError(field, errorEl, message) {
  field.classList.add("is-error");
  errorEl.textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
