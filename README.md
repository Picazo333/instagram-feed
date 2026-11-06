# Breathe Code Photo Feed

Página estática que reproduce el feed del ejercicio **instagram-feed** de 4Geeks: un encabezado y cuatro publicaciones apiladas, con HTML y CSS.

El texto visible de la página está en inglés porque así aparece en el gif de referencia.

## Cómo verla

Hace falta Python 3. No hace falta instalar nada para abrir el feed.

```bash
python3 server.py
```

Abre http://127.0.0.1:4173 . Una ruta que no existe responde `404` y sirve `404.html`.

También puedes abrir `index.html` en el navegador. En ese caso el servidor no interviene y una ruta desconocida depende del navegador.

## Comprobaciones

```bash
npm install
npm run validate
```

`npm run validate` comprueba el HTML (`html-validate`), el CSS (`stylelint`), el texto obligatorio, el reuso de clases, el contraste de los pares de color usados y los SHA-256 de la procedencia y de los lockups.

## Estructura

- `index.html` — feed.
- `styles.css` — presentación del feed. `index.html` carga antes `assets/signal/tokens.css` y `assets/signal/motion.css`, en ese orden, para que no queden en una cadena de `@import`.
- `script.js` — mejora opcional: estado de carga o error de cada foto, reintento y visor. Sin JavaScript el feed sigue leyéndose.
- `404.html`, `server.py` — respuesta 404.
- `assets/posts/` — fotografías recortadas de las capturas oficiales, guardadas en WebP con el mismo tamaño en píxeles.
- `assets/brand/` — lockups copiados byte a byte.
- `assets/signal/` — `tokens.css` y `motion.css` copiados byte a byte.
- `source/` — enunciado, `learn.json`, `PROVENANCE.json` y `ASSETS.md`.

## Qué cubre el enunciado

- Las cuatro publicaciones comparten las clases `post`, `post-header`, `post-title`, `post-date`, `post-photo` y `post-body`.
- La cabecera de cada publicación usa flex: título a la izquierda y fecha a la derecha.
- La columna del feed está centrada con `margin-inline: auto` y un ancho máximo de `37.25rem` (596 px con la raíz a 16 px). En pantallas estrechas ocupa el ancho disponible.
- Las imágenes viven en `assets/posts/` y se referencian desde el HTML.
- El enlace “Skip to photo feed” usa `position`.

## Decisiones técnicas

La autoridad es el enunciado (gif y `strategy.png` del commit indicado). SIGNAL no cambia el gris `#eaeaea`, las tarjetas blancas ni el tamaño del título. Los tokens sí se usan en el foco, los botones del visor, el texto de error y el pie.

La fecha del gif es un gris claro que no llega a 4.5:1. Aquí usa `--color-muted` (`#505e70`) para cumplir contraste AA y seguir leyéndose como dato secundario.

El título de la página queda alineado al borde izquierdo de la columna, igual que las capturas medidas (el recuadro del `h1` en `strategy.png` tiene el ancho de la columna y la tinta del título empieza en ese borde).

Las fotografías salen de `inst-3.png`, `inst-5.png`, `inst-6.png` y `preview.gif` de ese commit. Se conservan las marcas de agua y el recorte. El archivo servido es WebP para que la primera foto pese menos; el encuadre no cambia. Se quitó el puntero del ratón de la grabación, que no forma parte de la maquetación. No hay año en las fechas visibles; `datetime` usa la forma mes-día (`--12-14`, `--12-17`).

El pie muestra el lockup horizontal a 400 px. Por debajo de 432 px de ancho (cuando 400 px ya no caben con el margen) se muestra el lockup apilado a 280 px. Los SVG no se redibujaron.

No hay dominio de producción confirmado: `noindex` en el HTML y cabecera `X-Robots-Tag` en `server.py`. No hay canonical, Open Graph ni sitemap.

## Procedencia y licencia

Base oficial: [breatheco-de/exercise-instagram-feed](https://github.com/breatheco-de/exercise-instagram-feed) en el commit `d379de5fa5ed23ec0fa04beffb7d17d693fa80b0`.

Ese repositorio no incluye archivo `LICENSE` y la API de GitHub devuelve licencia nula. El template opcional `4GeeksAcademy/html-hello` tampoco publica un archivo `LICENSE` en `main`. Este repo no inventa una licencia ni añade colaboradores. Los enunciados se conservan en `source/` con el mismo SHA-256 registrado en `source/PROVENANCE.json`.

| Archivo en `source/` | SHA-256 |
| --- | --- |
| `OFFICIAL_README.md` | `6d3fe4d289ca827af904bde27b9a69d595d4c563ea45a0e850bf9c2d35658137` |
| `OFFICIAL_README.es.md` | `966bc8c6b3dfbf9f94d06bdbc678d553122693643ef8b8f735b92be4eb04d0d6` |
| `learn.json` | `01c68edf79622ee2f74c8ec49c03235a18b56e3cdff5ab87dc54ee4ceead928a` |

Lockup horizontal usado en el pie: `85459232bf51e7bf7c94225fd4f2cd6b71a681b6d701cb4ffd6d2a142cf57a81`.

El lockup es un crédito visual académico. No afirma una colaboración ni un respaldo oficial.
