/* Crafted by Big Pickle via OpenCode. */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Typed role line ---------- */
  const typed = document.getElementById("typed-role");
  const roles = [
    "breaking things responsibly",
    "mapping attack paths in K8s",
    "turning findings into fixes",
    "leveraging AI for faster PT"
  ];

  if (typed) {
    if (reduceMotion) {
      typed.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      function tick() {
        const current = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        typed.textContent = current.slice(0, charIndex);

        let delay = deleting ? 45 : 85;
        if (!deleting && charIndex === current.length) {
          deleting = true;
          delay = 1800;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          delay = 350;
        }
        window.setTimeout(tick, delay);
      }
      window.setTimeout(tick, 500);
    }
  }

  /* ---------- Mobile navigation ---------- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  /* ---------- Header state ---------- */
  const header = document.querySelector(".site-header");
  const toTop = document.getElementById("toTop");

  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
    if (toTop) toTop.classList.toggle("visible", window.scrollY > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Active nav link ---------- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ---------- Copy email ---------- */
  const copyButton = document.getElementById("copyEmail");
  const feedback = document.getElementById("copyFeedback");
  const email = "chakrabortyparth23@gmail.com";

  if (copyButton && feedback) {
    copyButton.addEventListener("click", async function () {
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
          copied = true;
        } else {
          const input = document.createElement("textarea");
          input.value = email;
          input.setAttribute("readonly", "");
          input.style.position = "fixed";
          input.style.opacity = "0";
          document.body.appendChild(input);
          input.select();
          copied = document.execCommand("copy");
          document.body.removeChild(input);
        }
      } catch (error) {
        copied = false;
      }
      feedback.textContent = copied ? "Copied!" : "Select & copy";
      window.setTimeout(function () { feedback.textContent = "Copy"; }, 2200);
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
