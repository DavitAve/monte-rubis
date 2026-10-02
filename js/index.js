document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    once: true,
    offset: 120,
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger-menu");
  const nav = document.getElementById("nav");

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("open");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const agePopup = document.getElementById("age-popup");
  const cookieBanner = document.getElementById("cookie-banner");

  const ageAccepted = localStorage.getItem("ageAccepted");
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  // AGE POPUP
  if (!ageAccepted) {
    agePopup.style.display = "flex";
  }

  document.getElementById("age-yes").addEventListener("click", () => {
    localStorage.setItem("ageAccepted", "true");
    agePopup.classList.add("hide");
    setTimeout(() => (agePopup.style.display = "none"), 400);
  });

  document.getElementById("age-no").addEventListener("click", () => {
    alert("L'accès est réservé aux personnes majeures (18+).");
    window.location.href = "https://www.google.fr";
  });

  // COOKIE BANNER
  if (!cookiesAccepted) {
    cookieBanner.classList.add("show");
  }

  document.getElementById("accept-cookies").addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.classList.remove("show");
  });
});
