const topbar = document.querySelector(".topbar");
const pill = document.querySelector(".nav-pill");
const menuBtn = document.querySelector(".menu-btn");
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

/* ========================================================================
   VISOR INTERNO DEL PORTAFOLIO
   Cada tarjeta abre únicamente la captura local asignada al proyecto.
   ======================================================================== */
const projectModal = document.getElementById("project-modal");
const projectDialog = projectModal?.querySelector(".project-dialog");
const projectImage = document.getElementById("project-detail-image");
const projectTitle = document.getElementById("project-modal-title");
const projectCanvas = document.getElementById("project-canvas");
const projectViewport = document.getElementById("project-viewport");
const projectZoomLevel = document.getElementById("project-zoom-level");
const projectZoomControls = document.querySelectorAll("[data-zoom]");
const projectCards = document.querySelectorAll(".project-card");

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.15;
let projectZoom = 1;
let lastProjectTrigger = null;

function updateProjectZoom() {
  if (!projectCanvas || !projectZoomLevel) return;
  projectCanvas.style.width = `${Math.round(projectZoom * 100)}%`;
  projectZoomLevel.value = `${Math.round(projectZoom * 100)}%`;
  projectZoomLevel.textContent = `${Math.round(projectZoom * 100)}%`;
  projectZoomControls.forEach((control) => {
    const isZoomIn = control.dataset.zoom === "in";
    control.disabled = isZoomIn ? projectZoom >= MAX_ZOOM : projectZoom <= MIN_ZOOM;
  });
}

function openProject(card) {
  if (!projectModal || !projectImage || !projectTitle || !projectViewport) return;

  lastProjectTrigger = card;
  projectTitle.textContent = card.dataset.projectTitle || "Proyecto";
  projectImage.src = card.dataset.projectImage || "";
  projectImage.alt = card.dataset.projectTitle || "Proyecto";
  projectZoom = 1;
  updateProjectZoom();
  projectViewport.scrollTo({ top: 0, left: 0, behavior: "auto" });
  projectModal.hidden = false;
  document.body.classList.add("project-modal-open");
  window.requestAnimationFrame(() => {
    projectModal.classList.add("open");
    projectDialog?.focus();
  });
}

function closeProject() {
  if (!projectModal || projectModal.hidden) return;
  projectModal.classList.remove("open");
  document.body.classList.remove("project-modal-open");
  window.setTimeout(() => {
    projectModal.hidden = true;
    if (projectImage) projectImage.src = "";
    lastProjectTrigger?.focus();
  }, 180);
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => openProject(card));
});

projectZoomControls.forEach((control) => {
  control.addEventListener("click", () => {
    const direction = control.dataset.zoom === "in" ? 1 : -1;
    projectZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((projectZoom + direction * ZOOM_STEP).toFixed(2))));
    updateProjectZoom();
  });
});

document.querySelectorAll("[data-project-close]").forEach((control) => {
  control.addEventListener("click", closeProject);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProject();
  }
});
