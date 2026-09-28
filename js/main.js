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

/** Validación y confirmación del formulario de la llamada final. */
function initFormularioCta() {
  const formulario = document.getElementById("formulario-cta");
  if (!formulario) return;

  const entrada = document.getElementById("correo-cta");
  const mensaje = document.getElementById("mensaje-cta");
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const mostrar = (texto, estado) => {
    mensaje.textContent = texto;
    mensaje.dataset.estado = estado;
    entrada.setAttribute("aria-invalid", String(estado === "error"));
  };

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const correo = entrada.value.trim();

    if (!patron.test(correo)) {
      mostrar("Introduce un correo válido, por ejemplo nombre@empresa.com.", "error");
      entrada.focus();
      return;
    }

    mostrar(`¡Listo! Hemos enviado el acceso a ${correo}.`, "ok");
    formulario.reset();
  });

  entrada.addEventListener("input", () => {
    if (mensaje.dataset.estado === "error") mostrar("", "");
  });
}

/** Año dinámico en la línea de copyright del pie. */
function initAnioPie() {
  const destino = document.getElementById("anio-actual");
  if (destino) destino.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", initNavMovil);
document.addEventListener("DOMContentLoaded", initFormularioCta);
document.addEventListener("DOMContentLoaded", initAnioPie);
