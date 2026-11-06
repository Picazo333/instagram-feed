# Rúbrica — instagram-feed (065)

Enunciado: `breatheco-de/exercise-instagram-feed` @ `d379de5fa5ed23ec0fa04beffb7d17d693fa80b0`.
Autoridad: enunciado 4Geeks > encargo académico > SIGNAL. SIGNAL no cambia el aspecto del feed.

## Escaneo anti-IA (SOURCE, repetido)

El handoff marcaba el escaneo previo como LIMPIO. Se repitió sobre `README.md`, `README.es.md` y `learn.json` de ese commit, buscando: «inteligencia artificial», «AI tool», «ChatGPT», «write each one yourself», «escrito por ti», «sin copiar», «do not use AI», «no utilices», «herramientas de IA» y «yourself». No hay coincidencias. El enunciado no prohíbe herramientas de IA ni exige redacción manual. No corresponde `BLOCKED_INTEGRIDAD_MIGUEL`.

## Criterios

| ID | Required | Criterio |
| --- | --- | --- |
| R01 | sí | La página reproduce el gif: título «Breathe Code Photo Feed», fondo gris, tarjetas blancas y cuatro publicaciones. |
| R02 | sí | HTML y CSS3. Sin framework ni Bootstrap. |
| R03 | sí | Reutilizar clases CSS en las publicaciones. |
| R04 | sí | Usar `display` para el feed. |
| R05 | sí | Usar `position` al menos en un control real. |
| R06 | sí | Centrar la columna del feed. |
| R07 | sí | Flujo izquierda/derecha: título a la izquierda y fecha a la derecha. |
| R08 | sí | Importar las imágenes en el HTML. |
| R09 | sí | Texto visible idéntico al gif, incluida la gramática original. |
| R10 | sí | README técnico: qué es, cómo verlo, estructura, decisiones, procedencia. Sin autores ni colaboradores inventados. |
| R11 | sí | Conservar enunciado y `learn.json` con su SHA-256. Documentar que el repo fuente no trae licencia. |
| R12 | sí | Lockup oficial en el pie, bytes intactos. Horizontal mínimo 400 px; apilado a 280 px cuando el horizontal no cabe. |
| R13 | sí | Tipografía Arial/Helvetica. Sin fuentes remotas. |
| R14 | sí | Contraste AA en el texto de la interfaz (cuerpo, fecha, pie, botones, error, foco). |
| R15 | sí | Teclado, skip link, foco visible, landmarks, `lang`, alt. |
| R16 | sí | `prefers-reduced-motion` desde el primer pintado y al cambiar. |
| R17 | sí | Sin overflow horizontal a 390, 768 y 1280 px (también 320). |
| R18 | sí | Estados de carga y error de cada foto, con reintento. Feed vacío: no aplica (el enunciado exige las cuatro publicaciones). |
| R19 | sí | 404 real con estado HTTP 404. |
| R20 | sí | Capturas reales a 390, 768 y 1280. |
| R21 | sí | Video corto real de la interacción. |
| R22 | sí | Lighthouse móvil y escritorio, 3 corridas, config comprobada. En el repo, el resumen en `lighthouse-summary.json`; los JSON completos quedan fuera. |
| R23 | sí | Extra visible: visor de foto accesible, sin alterar el feed en reposo. |
| R24 | sí | Extra técnico: validación automática de HTML, CSS, contraste y hashes. |
| R25 | sí | Sin secretos. Preview con `noindex`. Sin canonical, OG ni sitemap inventados. |
| R26 | sí | axe sin violaciones serious/critical en el feed y en el diálogo. |
| R27 | no (HITL_ENVIO_MIGUEL) | Entregar el enlace al instructor o al LMS. No cuenta para el 100%. |

Objetivo de laboratorio SIGNAL (LCP ≤ 2,5 s): cumplido tras el arreglo. Móvil, mediana 1278,8 ms (peor 1353,5 ms). Escritorio, mediana 302,7 ms. El elemento es la primera foto. No sustituye a R22; el detalle está en `FINAL_AUDIT.md`.
