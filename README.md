# Nimbus — Landing page

Landing page de producto construida con **HTML, CSS y JavaScript puro** (sin dependencias ni paso de build).

## Requisitos

- Un navegador web moderno.
- Opcional: cualquier servidor estático para servir la carpeta (`npx serve .`, `python -m http.server`).

## Estructura

```
mi-pagina-web/
├── index.html      # página completa
├── css/styles.css  # estilos
├── js/main.js      # interacciones
└── README.md
```

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
