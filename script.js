// Almacén Nortech — interacciones del panel
(function () {
  "use strict";

  const layout = document.getElementById("layout");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const scrim = document.getElementById("scrim");
  const sidebar = document.getElementById("sidebar");

  // Colapsar / expandir sidebar en escritorio
  sidebarToggle?.addEventListener("click", () => {
    const collapsed = layout.classList.toggle("is-collapsed");
    sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
    sidebarToggle.setAttribute(
      "aria-label",
      collapsed ? "Expandir menú lateral" : "Colapsar menú lateral"
    );
  });

  // Abrir / cerrar menú en móvil (off-canvas)
  function closeMobileMenu() {
    layout.classList.remove("is-mobile-open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    scrim.hidden = true;
  }

  function openMobileMenu() {
    layout.classList.add("is-mobile-open");
    mobileMenuBtn.setAttribute("aria-expanded", "true");
    scrim.hidden = false;
  }

  mobileMenuBtn?.addEventListener("click", () => {
    const isOpen = layout.classList.contains("is-mobile-open");
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  scrim?.addEventListener("click", closeMobileMenu);

  // Cerrar con Escape (accesibilidad de teclado)
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });

  // Cerrar el menú móvil automáticamente si la ventana crece a escritorio
  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) closeMobileMenu();
  });

  // Resaltar el enlace de navegación activo al hacer clic
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      document
        .querySelectorAll(".nav__link--active")
        .forEach((el) => el.classList.remove("nav__link--active"));
      link.classList.add("nav__link--active");
      if (window.innerWidth <= 640) closeMobileMenu();
    });
  });

  // Fecha actual en el encabezado
  const dateEl = document.getElementById("topbarDate");
  if (dateEl) {
    const formatted = new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date());
    dateEl.textContent = formatted;
  }

  // Año dinámico en el footer
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
