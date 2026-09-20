const topbar = document.querySelector(".topbar");
const pill = document.querySelector(".nav-pill");
const menuBtn = document.querySelector(".menu-btn");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-inner img");
const lightboxCap = document.querySelector(".lightbox-inner p");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  topbar?.classList.toggle("scrolled", window.scrollY > 12);
}, { passive: true });

menuBtn?.addEventListener("click", () => {
  pill.classList.toggle("open");
});

document.querySelectorAll(".links a, .btn-contactar").forEach((a) => {
  a.addEventListener("click", () => pill.classList.remove("open"));
});

function openLightbox(src, title) {
  if (!src) return;
  lightboxImg.src = src;
  lightboxImg.alt = title || "";
  lightboxCap.textContent = title || "";
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".work-lightbox").forEach((el) => {
  el.addEventListener("click", () => openLightbox(el.dataset.full, el.dataset.title));
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(el.dataset.full, el.dataset.title);
    }
  });
});

document.querySelector(".close-x")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
