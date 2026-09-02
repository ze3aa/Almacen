# Almacén Nortech — Panel de inventario

Dashboard administrativo para la gestión de inventario de un almacén/centro logístico. Permite visualizar de un vistazo el estado del stock, el movimiento semanal de entradas y salidas, las alertas de reabastecimiento y el detalle de los productos más recientes.

> Proyecto de práctica: HTML5 semántico, CSS Grid, Flexbox, variables CSS, responsividad y accesibilidad — sin frameworks ni librerías de UI.

![Vista de escritorio](./evidencias/desktop.png)

## Contenido del repositorio

```
almacen-nortech/
├── index.html        Estructura semántica del dashboard
├── styles.css         Estilos (Grid, Flexbox, variables, media queries)
├── script.js           Interactividad (colapsar sidebar, menú móvil)
├── README.md          Este documento
└── evidencias/         Capturas de escritorio, tablet y móvil
```

## Por qué un dashboard de inventario

Se eligió un caso de uso concreto — un almacén logístico — en vez de un panel genérico, para que las decisiones de diseño (paleta, tipografía, iconografía) respondieran a un contexto real: códigos SKU, niveles mínimos de stock, unidades por producto, alertas de reabastecimiento, etc.

## Componentes principales del dashboard

Tomando como referencia patrones habituales en dashboards modernos (tipo los que se encuentran en Dribbble bajo "admin dashboard" / "inventory dashboard"), se seleccionaron estos componentes:

1. **Barra lateral de navegación** (`<aside class="sidebar">`) — colapsable, con ícono de marca, enlaces con estado activo y una insignia de notificación.
2. **Encabezado superior** (`<header class="topbar">`) — buscador, botón de acción principal, notificaciones y acceso al menú en móvil.
3. **Tarjetas de resumen** (`.stat-card`) — cuatro indicadores clave (KPIs) con tendencia (↑/↓).
4. **Gráfico de barras** (`.chart`) — movimiento de entradas/salidas de los últimos 7 días, construido con Flexbox puro (sin librerías de gráficos).
5. **Lista de alertas** (`.alerts-list`) — productos por debajo del nivel mínimo de stock.
6. **Tabla de datos accesible** (`.data-table`, con roles ARIA `table`/`row`/`cell`) — inventario reciente, que se transforma en tarjetas apiladas en móvil.
7. **Footer informativo** (`<footer>`) — enlaces secundarios y año dinámico.

## Tecnologías usadas

- **HTML5 semántico**: `<aside>`, `<header>`, `<main>`, `<footer>`, `<nav>`, roles ARIA (`navigation`, `main`, `banner`, `contentinfo`, `table`/`row`/`cell`).
- **CSS3**
  - **CSS Grid** para el layout general (`grid-template-areas`: sidebar / topbar / main / footer).
  - **Flexbox** dentro de cada componente: tarjetas, barra de navegación, filas de la tabla, gráfico de barras, footer.
  - **Custom properties** (`:root { --color-*, --font-*, --sidebar-w, ... }`) para theming centralizado.
  - **Media queries** en tres puntos de quiebre (escritorio / tablet ≤1024px / móvil ≤640px).
  - Transiciones y pseudo-clases `:hover`, `:focus-visible`.
- **JavaScript vanilla** (sin dependencias): colapsar/expandir el sidebar, abrir/cerrar el menú en móvil, fecha dinámica, y cierre con tecla `Escape`.
- **Google Fonts**: Space Grotesk (títulos), IBM Plex Sans (texto) e IBM Plex Mono (datos numéricos y SKU).

No se usaron frameworks de CSS/JS ni librerías de componentes: todo el layout, la maquetación y la interactividad están escritos desde cero para practicar Grid, Flexbox y accesibilidad directamente.

## Capturas de pantalla

### Escritorio (1440px)
![Escritorio](./evidencias/desktop.png)

Sidebar colapsado (interacción de colapsar/expandir):
![Escritorio con sidebar colapsado](./evidencias/desktop-collapsed.png)

### Tablet (834px)
En tablet, el sidebar se reduce a solo íconos y las tarjetas de resumen pasan de 4 a 2 columnas.

![Tablet](./evidencias/tablet.png)

### Móvil (390px)
En móvil, el sidebar se convierte en un menú *off-canvas* activado por el botón de hamburguesa en el encabezado, y la tabla de inventario se transforma en una lista de tarjetas apiladas para evitar el scroll horizontal.

![Móvil](./evidencias/mobile.png)
![Móvil con menú abierto](./evidencias/mobile-menu-open.png)

## Decisiones de diseño

- **Paleta "consola de bodega"**: fondo azul-carbón oscuro (`#0F1720`) en vez de blanco o del típico crema/beige de plantilla, evocando un panel de control técnico. Los acentos de color tienen significado funcional, no son solo decorativos:
  - **Verde-agua (teal)** → acciones primarias y datos "saludables".
  - **Ámbar** → advertencias y stock bajo (el color de señalización de precaución en un almacén real).
  - **Rojo** → estados críticos (stock crítico / fuera de nivel mínimo).
  - **Verde** → tendencias positivas y estado "en stock".
- **Tipografía combinada**: Space Grotesk para títulos (carácter técnico/geométrico), IBM Plex Sans para texto general, e IBM Plex Mono para cifras, SKU y cantidades — el monoespaciado ayuda a alinear visualmente los datos tabulares, igual que en un sistema real de inventario.
- **Tarjetas con borde de acento lateral** en vez de sombras genéricas uniformes: cada tarjeta de resumen gana un borde de color al pasar el cursor, reforzando la categoría del dato sin depender de una sombra decorativa repetida.
- **Gráfico sin librerías**: las barras se construyen con `<div>` y Flexbox (`align-items: flex-end`, alturas via variable CSS `--h`), como ejercicio deliberado de maquetación en vez de usar un plugin de gráficos.

## Accesibilidad y buenas prácticas

- **Roles ARIA**: `role="navigation"` en la barra lateral y el pie de página, `role="main"` en el contenido principal, `role="banner"` en el encabezado, `role="contentinfo"` en el footer, y `role="table"/"row"/"columnheader"/"cell"` en la tabla construida con `<div>` + Flexbox (para conservar la semántica de tabla aunque no se use el elemento `<table>`).
- **Enlace "Saltar al contenido principal"** (`skip-link`), visible al recibir foco, para usuarios de teclado.
- **Foco visible**: `:focus-visible` con contorno de color de acento en todos los elementos interactivos (enlaces, botones, campo de búsqueda).
- **Navegación por teclado**: el menú móvil se puede cerrar con `Escape`; todos los botones de ícono (notificaciones, colapsar menú, abrir menú) tienen `aria-label` descriptivo y `aria-expanded` cuando corresponde.
- **Texto alternativo**: el avatar de usuario tiene `alt` descriptivo; los íconos puramente decorativos llevan `aria-hidden="true"` para no generar ruido a lectores de pantalla, ya que siempre van acompañados de una etiqueta de texto visible.
- **Gráfico accesible**: el bloque del gráfico de barras incluye `role="img"` con una descripción textual completa (`aria-label`) del patrón que muestra, para que no dependa únicamente de lo visual.
- **Contraste**: la paleta se verificó para mantener una relación de contraste texto/fondo AA — el texto principal (`#E7EDF2`) sobre el fondo oscuro (`#0F1720`) y los textos secundarios (`#92A3B4`) cumplen el mínimo de legibilidad; las insignias de estado usan fondos translúcidos del propio color de acento con texto en ese mismo tono saturado para mantener contraste suficiente.
- **`prefers-reduced-motion`**: las transiciones se reducen a casi cero si el usuario tiene activada la preferencia de movimiento reducido en su sistema.

## Cómo verlo localmente

No requiere instalación ni build. Basta con clonar el repositorio y abrir `index.html` en el navegador:

```bash
git clone https://github.com/<tu-usuario>/almacen-nortech.git
cd almacen-nortech
# abrir index.html directamente, o servirlo con un servidor simple:
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Checklist de criterios de entrega

| Criterio | Dónde se cumple |
|---|---|
| Layout avanzado (Grid + Flexbox) | `grid-template-areas` en `.layout` (`styles.css`); Flexbox en `.sidebar`, `.topbar`, `.stat-card`, `.chart__bars`, `.data-table__row`, `.footer` |
| Interactividad visual | Sidebar colapsable, menú móvil off-canvas, `:hover`/`:focus-visible`, tarjetas que cambian de color al interactuar (`script.js`, `styles.css`) |
| Responsividad | Media queries en 1024px (tablet) y 640px (móvil): sidebar se reduce a íconos o se oculta, tabla se convierte en tarjetas |
| Accesibilidad | Roles ARIA, `skip-link`, `:focus-visible`, `alt` en imágenes, `aria-label`/`aria-expanded` en botones, gráfico con `role="img"` descriptivo |
| Calidad del código | Variables CSS (`:root`), comentarios por sección, nomenclatura BEM (`bloque__elemento--modificador`) |
| Documentación | Este `README.md` + carpeta `/evidencias` |

## Publicar el proyecto en GitHub

Si aún no tienes el repositorio creado:

1. Entra a [github.com/new](https://github.com/new) y crea un repositorio público, por ejemplo `almacen-nortech` (sin inicializarlo con README, para no generar conflictos).
2. En tu terminal, dentro de la carpeta del proyecto:

```bash
cd almacen-nortech
git init
git add .
git commit -m "Dashboard de inventario: Almacén Nortech"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/almacen-nortech.git
git push -u origin main
```

3. Verifica en GitHub que estén presentes: `index.html`, `styles.css`, `script.js`, `README.md` y la carpeta `/evidencias` con las 5 capturas.
4. (Opcional) Activa **GitHub Pages** en *Settings → Pages → Deploy from branch → main* para tener un enlace en vivo del dashboard funcionando, y agrégalo al inicio de este README como "Ver demo en vivo".
5. Copia el enlace del repositorio (`https://github.com/<tu-usuario>/almacen-nortech`) y entrégalo en la plataforma indicada.
