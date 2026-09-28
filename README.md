# Nimbus — Landing page

Landing page de producto construida con **HTML, CSS y JavaScript puro** (sin dependencias ni paso de build).

## Requisitos

- Un navegador web moderno.
- Opcional: cualquier servidor estático para servir la carpeta (`npx serve .`, `python -m http.server`).

## Estructura

```
mi-pagina-web/
├── index.html      # página completa (HTML semántico)
├── css/styles.css  # tokens, utilidades y estilos por sección
├── js/main.js      # menú móvil, formulario, año, revelado al scroll
└── README.md
```

## Secciones de la página

| Sección | Ancla | Rama que la introdujo |
|---|---|---|
| Cabecera y navegación | `#inicio` | `feature/header` |
| Hero | `#hero` | `feature/hero` |
| Funcionalidades y cómo funciona | `#funcionalidades`, `#como-funciona` | `feature/funcionalidades` |
| Precios | `#precios` | `feature/precios` |
| Testimonios | `#testimonios` | `feature/footer` |
| Llamada a la acción (formulario) | `#cta` | `feature/precios` |
| Pie de página | — | `feature/footer` |
| Revelado, enlace activo, responsive | — | `feature/responsive` |

## Cómo verla

```bash
# opción 1: abrir directamente index.html en el navegador
# opción 2: servidor estático local
python -m http.server 8123   # y visitar http://127.0.0.1:8123
```

### Comprobaciones rápidas

- Redimensionar la ventana: el menú se convierte en hamburguesa por debajo de 860 px.
- Rellenar el formulario con un correo inválido: muestra un mensaje de error en `aria-live`.
- Tabular con el teclado: el enlace de "saltar al contenido" y los focos son visibles.

## Flujo de trabajo del repositorio

Cada feature se desarrolla en su propia rama a partir de `main` y se integra con un merge sin fast-forward, de modo que el historial refleja una sección por rama:

```bash
git checkout -b feature/nombre
# ... cambios ...
git add .
git commit -m "feat(...): descripción"
git checkout main
git merge --no-ff feature/nombre -m "Merge branch 'feature/nombre'"
```

Ver el historial:

```bash
git log --graph --oneline --all
```
