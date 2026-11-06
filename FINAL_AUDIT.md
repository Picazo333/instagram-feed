# Auditoría final

Estado: **PENDIENTE_REVISION_ORQUESTADOR**. No es `READY_TO_SUBMIT`. No hay merge.

## Resultado

26/26 criterios required en PASS (R01–R26). R27 es `HITL_ENVIO_MIGUEL` y no entra en el porcentaje.

Objetivo de laboratorio LCP ≤ 2500 ms: **cumplido**. El elemento es la primera foto. Móvil, mediana **1278,8 ms** (peor 1353,5 ms). Escritorio, mediana **302,7 ms** (peor 302,9 ms). CLS 0 y TBT 0 en las seis corridas. INP no lo emite Lighthouse 13.6 en laboratorio. La medición anterior, 2704,6 ms en móvil, queda sustituida por esta.

## Checklist de entrega para Miguel

- [ ] Revisar el PR (no está mergeado).
- [ ] Decidir el envío al instructor o al LMS. El agente no lo hizo (`R27`, `HITL_ENVIO_MIGUEL`).
- [x] LCP móvil de laboratorio ≤ 2,5 s (mediana 1278,8 ms). CLS y TBT en 0.

## Límites

- Las fotos son recortes de `inst-3.png`, `inst-5.png`, `inst-6.png` y `preview.gif` de `d379de5`. Se conservan las marcas de agua y el tamaño en píxeles. El archivo servido es WebP. Se quitó el puntero de la grabación, que no es parte de la maqueta.
- La fecha usa `--color-muted` para AA. En el gif es un gris más claro que no llega a 4,5:1.
- El título sigue el borde izquierdo de la columna, como la tinta medida en el gif, no el display enorme de SIGNAL.
- No hay licencia en el repo fuente ni en `html-hello`. No se inventó una.
- Firefox y Safari no se ejecutaron.
- La revisión de este ejecutor no es la aprobación visual del dueño del repo.
