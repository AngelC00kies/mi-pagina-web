/**
 * Nimbus — interacciones de la landing page.
 * Módulos:
 *  - navegación móvil (feature/header)
 *  - año dinámico del pie (feature/footer)
 *  - revelado al hacer scroll (feature/responsive)
 */

/** Menú móvil de la cabecera. */
function initNavMovil() {
  const boton = document.querySelector(".nav__alternar");
  const nav = document.getElementById("nav-principal");
  if (!boton || !nav) return;

  const abrir = (abierto) => {
    boton.setAttribute("aria-expanded", String(abierto));
    boton.setAttribute(
      "aria-label",
      abierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"
    );
    nav.dataset.abierto = String(abierto);
  };

  boton.addEventListener("click", () => {
    abrir(boton.getAttribute("aria-expanded") !== "true");
  });

  // Cerrar al pulsar un enlace o al pulsar Escape.
  nav.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) abrir(false);
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") abrir(false);
  });

  // Volver al estado de escritorio si se redimensiona.
  const ancho = window.matchMedia("(min-width: 861px)");
  ancho.addEventListener("change", () => abrir(false));
}

document.addEventListener("DOMContentLoaded", initNavMovil);
