/**
 * Nimbus — interacciones de la landing page.
 * Módulos:
 *  - navegación móvil (feature/header)
 *  - año dinámico del pie (feature/footer)
 *  - revelado al hacer scroll, enlace activo y sombra de cabecera (feature/responsive)
 */

// Señala que JavaScript está disponible para que el contenido
// solo se oculte si de verdad se va a animar.
document.documentElement.classList.add("js");

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

/** Sombra progresiva en la cabecera al hacer scroll. */
function initSombraCabecera() {
  const cabecera = document.querySelector(".cabecera");
  if (!cabecera) return;

  let enCola = false;
  const actualizar = () => {
    cabecera.dataset.scrolled = String(window.scrollY > 8);
    enCola = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!enCola) {
        enCola = true;
        window.requestAnimationFrame(actualizar);
      }
    },
    { passive: true }
  );

  actualizar();
}

/** Marca como activo el enlace de la sección visible. */
function initEnlaceActivo() {
  const enlaces = [...document.querySelectorAll(".nav__enlace")];
  const secciones = enlaces
    .map((enlace) => document.querySelector(enlace.getAttribute("href")))
    .filter(Boolean);

  if (!secciones.length || !("IntersectionObserver" in window)) return;

  const visibles = new Map();

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => visibles.set(entrada.target, entrada.intersectionRatio));

      const mejor = [...visibles.entries()]
        .filter(([, ratio]) => ratio > 0)
        .sort((a, b) => b[1] - a[1])[0];

      enlaces.forEach((enlace) => enlace.removeAttribute("aria-current"));
      if (mejor) {
        const activo = enlaces.find(
          (enlace) => enlace.getAttribute("href") === `#${mejor[0].id}`
        );
        if (activo) activo.setAttribute("aria-current", "true");
      }
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
  );

  secciones.forEach((seccion) => observador.observe(seccion));
}

/** Revela cada bloque la primera vez que entra en pantalla. */
function initReveladoScroll() {
  const objetivos = [
    ...document.querySelectorAll(
      ".encabezado-seccion, .tarjeta, .paso, .plan, .testimonio, .cta__caja, .hero__visual"
    ),
  ];
  if (!objetivos.length) return;

  const sinAnimacion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (sinAnimacion || !("IntersectionObserver" in window)) return;

  objetivos.forEach((elemento) => {
    elemento.classList.add("revelar");
    const hermanos = [...elemento.parentElement.children].filter((h) =>
      h.classList.contains(elemento.classList[0])
    );
    const posicion = hermanos.indexOf(elemento);
    if (posicion > 0) {
      elemento.style.transitionDelay = `${Math.min(posicion * 80, 320)}ms`;
    }
  });

  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          obs.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  objetivos.forEach((elemento) => observador.observe(elemento));
}

document.addEventListener("DOMContentLoaded", initNavMovil);
document.addEventListener("DOMContentLoaded", initFormularioCta);
document.addEventListener("DOMContentLoaded", initAnioPie);
document.addEventListener("DOMContentLoaded", initSombraCabecera);
document.addEventListener("DOMContentLoaded", initEnlaceActivo);
document.addEventListener("DOMContentLoaded", initReveladoScroll);
