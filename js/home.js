// Инициализация AOS (без ошибок, даже если CDN не загрузился)
document.addEventListener("DOMContentLoaded", () => {
  try {
    if (window.AOS) {
      window.AOS.init({
        duration: 900,
        once: true,
        offset: 90,
        easing: "ease-out",
      });
    }
  } catch (e) {
    /* no-op */
  }

  // Лёгкий счётчик (анимация цифр)
  const counters = document.querySelectorAll(".stat-number[data-count]");
  const inView = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count || "0", 10);
        let cur = 0;
        const step = Math.max(1, Math.round(target / 40));
        const tick = () => {
          cur += step;
          if (cur >= target) {
            el.textContent = target;
            return;
          }
          el.textContent = cur;
          requestAnimationFrame(tick);
        };
        tick();
        obs.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((c) => inView.observe(c));
});
