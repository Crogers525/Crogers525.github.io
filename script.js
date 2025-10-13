// Simple hash router (Home/Resume/Artifacts/Reflections)
(function router() {
  const routes = Array.from(document.querySelectorAll(".route"));
  const menuLinks = Array.from(document.querySelectorAll(".menu a"));
  function showRoute(hash) {
    const target = (hash || "#home").replace("#", "");
    routes.forEach(sec => sec.hidden = sec.id !== target);
    menuLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${target}`));
    const section = document.getElementById(target);
    if (section) section.setAttribute("tabindex", "-1"), section.focus();
  }
  window.addEventListener("hashchange", () => showRoute(location.hash));
  document.addEventListener("DOMContentLoaded", () => showRoute(location.hash || "#home"));
})();

// Lightweight, accessible lightbox for gallery images
(function lightbox() {
  const galleryImgs = Array.from(document.querySelectorAll(".gallery .thumb"));
  if (!galleryImgs.length) return;

  const lb = document.getElementById("lightbox");
  const lbImg = lb.querySelector(".lb-img");
  const lbCap = lb.querySelector(".lb-cap");
  const btnClose = lb.querySelector(".lb-close");
  const btnPrev = lb.querySelector(".lb-prev");
  const btnNext = lb.querySelector(".lb-next");

  let idx = 0;

  function open(i) {
    idx = i;
    const el = galleryImgs[idx];
    const full = el.getAttribute("data-full") || el.src;
    lbImg.src = full;
    lbImg.alt = el.alt || "";
    lbCap.textContent = el.alt || "";
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    btnClose.focus();
  }

  function close() {
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
    galleryImgs[idx].focus();
  }

  function prev() { open((idx - 1 + galleryImgs.length) % galleryImgs.length); }
  function next() { open((idx + 1) % galleryImgs.length); }

  galleryImgs.forEach((img, i) => {
    img.setAttribute("tabindex", "0");
    img.addEventListener("click", () => open(i));
    img.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
    });
  });

  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);

  lb.addEventListener("click", e => {
    // close when clicking dark backdrop (but not the image/buttons)
    if (e.target === lb) close();
  });

  window.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();