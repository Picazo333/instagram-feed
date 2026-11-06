# QA del proyecto ejecutado

Build/commit: ver `EVIDENCE_MANIFEST.yaml` (SHA final en el PR).
Entorno: Chrome 156 headless, Linux, `python3 server.py` en el puerto 4173.
No se certifica WCAG por la ausencia de hallazgos de axe.

| ID | Regla | Ruta/estado/viewport | Resultado | Evidencia | Defecto/corrección |
| --- | --- | --- | --- | --- | --- |
| QA-01 | HTML y CSS válidos | feed y 404 | PASS | `npm run validate` | El `<img>` del diálogo necesitaba `src`. Corregido. |
| QA-02 | Feed como el gif | `/` 1280 | PASS | `feed-1280.png` | La columna no envolvía los posts (ancho 1280). Corregido: 596 px centrados. |
| QA-03 | 390 / 768 / 1280 | `/` | PASS | `feed-390.png`, `feed-768.png`, `feed-1280.png` | Sin overflow. |
| QA-04 | 320 y anchos extra | 320, 1024, 1440, 1920 | PASS | `feed-320.png`, `capture-report.json` | `scrollWidth` igual a `clientWidth`. |
| QA-05 | Lockup | 390 apilado 280; ≥768 horizontal 400 | PASS | capturas y `capture-report.json` | Hashes iguales al manifiesto SIGNAL. |
| QA-06 | Contraste AA | pares del feed | PASS | `scripts/validate.mjs` | La fecha del gif no llegaba a 4,5:1. Se usa `#505e70` (6,61:1). |
| QA-07 | Teclado y foco | skip, diálogo, Escape | PASS | `focus-skip-1280.png`, `capture-report.json` | Foco vuelve a `.post-photo`. |
| QA-08 | reduced-motion | antes y al cambiar | PASS | `reduced-motion-390.png`, `states.reduced` | `data-motion=reduced`, transición `0s`, luego `full`. |
| QA-09 | Carga | imagen retenida | PASS | `loading-state-390.png` | Texto «Loading photo.», sin porcentaje falso. |
| QA-10 | Error y reintento | foto 3 | PASS | `error-state-390.png` | Texto y botón. El botón se desactiva mientras reintenta. |
| QA-11 | Vacío | feed | NO APLICA | enunciado | Las cuatro publicaciones son el contenido exigido. |
| QA-12 | 404 | `/missing-page` | PASS | `not-found-390.png`, HTTP 404 | HEAD también responde 404. |
| QA-13 | axe | feed y diálogo | PASS | `capture-report.json` | 0 violaciones. |
| QA-14 | Lighthouse móvil | 3 corridas, misma config | PASS | `lighthouse-summary.json` | LCP mediana 1278,8 ms (peor 1353,5), objetivo 2500 ms cumplido. CLS 0. TBT 0. Elemento: primera foto. |
| QA-15 | Lighthouse escritorio | 3 corridas, misma config | PASS | `lighthouse-summary.json` | LCP mediana 302,7 ms (peor 302,9). CLS 0. TBT 0. |
| QA-16 | INP de laboratorio | Lighthouse 13 | NO APLICA | resumen | Esa versión no emite INP en laboratorio. Se guarda TBT. |
| QA-17 | Video | interacción 6,72 s | PASS | `feed-tour.mp4` | Muestra scroll, diálogo y cierre. |
| QA-18 | Consola en la carga normal | `/` | PASS | `capture-report.json` | Sin errores. El 404 de la foto ausente y de la ruta inexistente es el fallo que se está probando. |
| QA-19 | Presupuesto de peso | gzip | PASS | CSS de la página < 8 KiB gzip; JS 759 B gzip; LCP WebP 19 372 B | Por debajo de 40 KiB CSS, 170 KiB JS y 220 KiB de imagen LCP. |
| QA-20 | SEO de landing | — | NO APLICA | `README.md` | No hay dominio confirmado. Solo `noindex`. |
| QA-21 | Firefox y Safari | — | NO EJECUTADO | — | En esta máquina solo está Chrome. |
| QA-22 | Anti-genérico | feed | PASS | capturas | No hay hero, métricas ni tres cards decorativas. El layout es el del ejercicio. |
