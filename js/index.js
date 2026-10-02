(() => {
  "use strict";

  const storage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        // The experience still works when storage is blocked.
      }
    },
  };

  const burger = document.getElementById("burger-menu");
  const nav = document.getElementById("nav");

  const closeMenu = () => {
    nav?.classList.remove("active");
    burger?.classList.remove("open");
    burger?.setAttribute("aria-expanded", "false");
    burger?.setAttribute("aria-label", "Ouvrir le menu");
  };

  burger?.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    nav?.classList.toggle("active", !isOpen);
    burger.classList.toggle("open", !isOpen);
    burger.setAttribute("aria-expanded", String(!isOpen));
    burger.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  const ageOverlay = document.getElementById("age-popup");
  const ageDialog = ageOverlay?.querySelector(".age-popup");
  const ageTitle = document.getElementById("age-title");
  const ageDescription = document.getElementById("age-description");
  const ageYes = document.getElementById("age-yes");
  const ageNo = document.getElementById("age-no");
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptCookies = document.getElementById("accept-cookies");
  const page = document.querySelector(".wrapper");

  const showCookieNotice = () => {
    if (!cookieBanner || storage.get("privacyNoticeSeen")) return;
    cookieBanner.hidden = false;
    window.requestAnimationFrame(() => cookieBanner.classList.add("show"));
  };

  const closeAgeGate = () => {
    if (!ageOverlay) return;
    ageOverlay.classList.add("hide");
    document.body.classList.remove("modal-open");
    if (page) page.inert = false;
    window.setTimeout(() => {
      ageOverlay.hidden = true;
      ageOverlay.classList.remove("hide");
      showCookieNotice();
    }, 400);
  };

  if (storage.get("ageAccepted") === "true") {
    if (ageOverlay) ageOverlay.hidden = true;
    showCookieNotice();
  } else {
    document.body.classList.add("modal-open");
    if (page) page.inert = true;
    window.requestAnimationFrame(() => ageDialog?.focus());
  }

  ageYes?.addEventListener("click", () => {
    storage.set("ageAccepted", "true");
    closeAgeGate();
  });

  ageNo?.addEventListener("click", () => {
    if (ageTitle) ageTitle.textContent = "Accès réservé aux adultes";
    if (ageDescription) {
      ageDescription.textContent =
        "Vous devez avoir au moins 18 ans pour consulter MonteRubis. Fermez cette page ou corrigez votre choix si nécessaire.";
    }
    ageNo.hidden = true;
    ageYes?.focus();
  });

  ageOverlay?.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusable = [...ageOverlay.querySelectorAll("button:not([hidden])")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  acceptCookies?.addEventListener("click", () => {
    storage.set("privacyNoticeSeen", "true");
    cookieBanner?.classList.remove("show");
    window.setTimeout(() => {
      if (cookieBanner) cookieBanner.hidden = true;
    }, 500);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && burger?.getAttribute("aria-expanded") === "true") {
      closeMenu();
      burger.focus();
    }
  });

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
