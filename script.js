document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     DOM REFERENCES
  ========================== */
  const body = document.body;
  const navbarCollapse = document.getElementById("navMenu");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");


  /* =========================
     SMOOTH SCROLL
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });


  /* =========================
     AUTO CLOSE NAVBAR
  ========================== */
  document.addEventListener("click", function (event) {
    if (!navbarCollapse || !navbarToggler) return;

    const isClickInsideNavbar = navbarCollapse.contains(event.target);
    const isClickOnToggler = navbarToggler.contains(event.target);
    const isClickOnThemeToggle =
      themeToggle && themeToggle.contains(event.target);

    if (!isClickInsideNavbar && !isClickOnToggler && !isClickOnThemeToggle) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  });


  /* =========================
     SYNC BURGER WITH COLLAPSE
  ========================== */
  if (navbarCollapse && navbarToggler) {

    navbarCollapse.addEventListener("show.bs.collapse", function () {
      navbarToggler.classList.add("active");
    });

    navbarCollapse.addEventListener("hide.bs.collapse", function () {
      navbarToggler.classList.remove("active");
    });
  }


  /* =========================
     DARK MODE SYSTEM
  ========================== */

  // Detect system preference
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  // Load saved theme or fallback to system
  let currentTheme = localStorage.getItem("theme");
  if (!currentTheme) {
    currentTheme = systemPrefersDark.matches ? "dark" : "light";
  }

  setTheme(currentTheme);

  // Toggle button click
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const newTheme =
        body.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";

      setTheme(newTheme);
    });
  }

  // Listen to system theme change (if no manual override)
  systemPrefersDark.addEventListener("change", function (e) {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light");
    }
  });

  function setTheme(theme) {
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (themeIcon) {
      themeIcon.className =
        theme === "dark"
          ? "bi bi-sun-fill"
          : "bi bi-moon-fill";
    }
  }

  /* =========================
    SCROLL REVEAL CLEAN VERSION
  ========================== */

  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {

        // small stagger only for elements appearing together
        entry.target.style.transitionDelay = `${i * 80}ms`;

        entry.target.classList.add("reveal-active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach((el) => {
    observer.observe(el);
  });

  /* =========================
    COPYRIGHT YEAR
  ========================== */
  const copyrightYear = document.getElementById("copyrightYear");

  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});