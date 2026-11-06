# Justificación de la rúbrica

Commit de contenido: se completa en `EVIDENCE_MANIFEST.yaml` tras el commit. Todas las rutas son del repo `Picazo333/instagram-feed`.

| ID | Estado | Cómo se cumple | Evidencia |
| --- | --- | --- | --- |
| R01 | PASS | Título, cuatro tarjetas blancas y fondo `#eaeaea`, medido en el gif (234,234,234). Columna de 596 px. | `index.html` líneas 31 y 38–116; `styles.css` líneas 8–9 y 19–22; capturas `feed-390.png`, `feed-768.png`, `feed-1280.png`. |
| R02 | PASS | Solo HTML, CSS y un script opcional. No hay Bootstrap ni bundler de la página. | `index.html`, `styles.css`, `package.json` (devDependencies de comprobación). |
| R03 | PASS | `post`, `post-header`, `post-title`, `post-date`, `post-photo` y `post-body` se repiten en las cuatro publicaciones. `npm run validate` cuenta 4 `class="post"`. | `index.html` 38, 59, 79, 99; `scripts/validate.mjs`. |
| R04 | PASS | La cabecera de cada post es flex. | `styles.css` 79–84. |
| R05 | PASS | El skip link usa `position: absolute`. | `styles.css` 25–26. |
| R06 | PASS | `.feed` está centrado con `margin-inline: auto` y ancho máximo `37.25rem`. | `styles.css` 19–22. Medición en runtime: post de 596 px dentro de 1280. |
| R07 | PASS | `justify-content: space-between` coloca el título a la izquierda y la fecha a la derecha. | `styles.css` 79–84. Visible en `feed-1280-top.png`. |
| R08 | PASS | Cada `<img>` apunta a `assets/posts/`. | `index.html` 46, 66, 86, 106. |
| R09 | PASS | Cadenas exigidas, incluido «this is a multi line…» y «dog...#BreatheCode». | `index.html` 55, 75, 95, 115. `scripts/validate.mjs` las busca. |
| R10 | PASS | README en español, neutro: ejecución, estructura, decisiones y procedencia. No hay colaboradores. | `README.md`. |
| R11 | PASS | SHA-256 de los tres archivos oficiales coincide con `source/PROVENANCE.json`. El repo fuente no tiene `LICENSE` (API `license: null`). | `source/OFFICIAL_README.md`, `source/OFFICIAL_README.es.md`, `source/learn.json`; salida de `npm run validate`. |
| R12 | PASS | Horizontal `85459232…7a81`, apilado `11314b30…133a`. A 390 y 320 el apilado mide 280 px; desde 768 el horizontal mide 400 px. | `assets/brand/`; `capture-report.json` (`lockups`); pie en `feed-390.png` y `feed-768.png`. |
| R13 | PASS | `--font-body` y `--font-display` son Arial, Helvetica, sans-serif. No hay `@font-face` ni hojas remotas. | `assets/signal/tokens.css` líneas 47–48. |
| R14 | PASS | Pares calculados: tinta 16,40:1 sobre blanco; fecha `#505e70` 6,61:1; pie 5,50:1 sobre `#eaeaea`; botón 5,86:1; error 6,78:1; foco 7,08:1. El gris del gif (~#adb0b2) no llega a 4,5:1; se sustituyó por el muted del sistema, que sigue siendo secundario. | `scripts/validate.mjs` (función `contrast`). |
| R15 | PASS | `lang="en"`, `main`, skip link, alt en fotos y lockup, diálogo nativo, Escape devuelve el foco. axe: 0 violaciones. | `index.html` 2, 27, 36; `focus-skip-1280.png`; `capture-report.json` (`axe`, `dialog`, `skip`). |
| R16 | PASS | El script del `<head>` pone `data-motion` antes del pintado y al cambiar. Con reduce, `transition-duration` del post es `0s` y el atributo pasa a `full` al quitar la preferencia. `tokens.css` anula animaciones en esa media query. | `index.html` 14–22; `capture-report.json` → `states.reduced`. |
| R17 | PASS | `scrollWidth === clientWidth` en 320, 390, 768, 1024, 1280, 1440 y 1920. | `capture-report.json` → `overflow`. |
| R18 | PASS | Carga: «Loading photo.» mientras la imagen está retenida. Error: «This photo did not load.» y «Retry photo», sin doble envío (`disabled` durante la carga). No hay estado vacío: el enunciado pide las cuatro publicaciones. | `loading-state-390.png`, `error-state-390.png`, `script.js`. |
| R19 | PASS | `GET` y `HEAD` de una ruta inexistente responden 404 con `404.html`. | `server.py` 40–55; `not-found-390.png`; `capture-report.json` → `notFound.status` 404. |
| R20 | PASS | Capturas de página completa y de la primera pantalla. | `/opt/cursor/artifacts/feed-390.png`, `feed-768.png`, `feed-1280.png` y los `*-top.png`. |
| R21 | PASS | Recorrido real: scroll, apertura del visor, cierre y foco devuelto. 168 frames, 6,72 s. | `feed-tour.mp4`. |
| R22 | PASS | Lighthouse 13.6.0, Chrome 156. Tres corridas por superficie, otra vez con la misma config. `config_ok` en las seis. Móvil: 390×844, simulate, RTT 150, 1638,4 kbps, CPU ×4. Escritorio: 1280×800, RTT 40, 10240 kbps, CPU ×1. El elemento LCP sigue siendo `article#post-1 img`. | `lighthouse-summary.json`; JSON completos en `/opt/cursor/artifacts/lighthouse/`. |
| R23 | PASS | El botón de la foto abre un `<dialog>` con título, pie y «Close». En reposo el feed no gana cromo de Instagram. | `dialog-768.png`, `feed-tour.mp4`, `script.js`. |
| R24 | PASS | `npm run validate` ejecuta html-validate, stylelint, texto, flex, contraste y SHA-256. | `scripts/validate.mjs`. Salida final: «All validation checks passed». |
| R25 | PASS | No hay `.env` ni secretos. `meta robots noindex` y cabecera `X-Robots-Tag`. Sin dominio, no hay canonical ni sitemap. | `index.html` 7; `server.py` 25. |
| R26 | PASS | `axe.run` en el feed y con el diálogo abierto: listas vacías. | `capture-report.json` → `axe.feed` y `axe.dialog`. |
| R27 | HITL_ENVIO_MIGUEL | El agente no envía el trabajo al LMS ni al instructor. | Este informe y el PR. Paso de Miguel en `FINAL_AUDIT.md`. |

## Objetivo de laboratorio: cumplido

El elemento LCP es la primera foto (`article#post-1 > div.post-figure > button.post-photo > img`).

Antes del arreglo la mediana móvil era 2704,6 ms. El laboratorio no estaba limitado por la fuente tipográfica (Arial del sistema). La imagen sí entraba en la cadena, junto con el resto de fotos y los dos SVG, y `server.py` respondía HTTP/1.0, así que cada archivo pagaba un saludo TCP nuevo.

Cambios que bajan el número sin mover el encuadre ni el texto:

- La primera foto pasa a WebP, 596×399, 19 372 bytes (antes JPEG de 41 742). Sigue con `preload` y `fetchpriority="high"`, y `decoding="sync"`.
- Las otras fotos y los lockups llevan `loading="lazy"` y `fetchpriority="low"`. El feed en reposo se ve igual; lo que no es la primera pintura no compite con ella.
- `server.py` usa HTTP/1.1 para reutilizar la conexión.

Mediana móvil nueva: **1278,8 ms** (valores 1353,5 / 1277,9 / 1278,8; peor 1353,5). Objetivo ≤ 2500 ms: cumplido. Escritorio: mediana **302,7 ms** (peor 302,9). CLS 0 y TBT 0 en las seis corridas. INP no lo emite Lighthouse 13 en laboratorio.
