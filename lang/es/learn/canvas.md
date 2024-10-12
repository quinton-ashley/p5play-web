# 0-0

## Lienzo

El constructor `Canvas` crea un nuevo elemento `canvas` HTML5 y lo añade a tu página web.

¡Es como la función `createCanvas` de p5.js, pero con algunas características adicionales!

Usa `canvas.w` y `canvas.h` para obtener el ancho y el alto del lienzo.

# 0-1

Si no se pasan parámetros a `new Canvas()`, se creará un lienzo que llena toda la ventana.

También puedes pasar una relación de aspecto al constructor de Canvas. Esto creará el lienzo más grande posible que se ajuste dentro de la ventana, manteniendo la relación de aspecto dada. Por ejemplo, `new Canvas('2:1')` creará un lienzo que es el doble de ancho que de alto.

# 1-0

## Modo de Visualización

La función `displayMode` te permite personalizar cómo se presenta tu lienzo.

- `"normal"` es el valor predeterminado, que no aplica estilo al lienzo ni a su elemento padre.
- `"centered"` hace que el lienzo se centre horizontal y verticalmente en su elemento padre.
- `"maxed"` hace que el lienzo llene el elemento padre con letterboxing si es necesario para preservar su relación de aspecto.

Esta función también acepta un ajuste preestablecido de calidad de renderizado como segundo parámetro de entrada. ¡Usa el ajuste preestablecido `"pixelated"` para hacer juegos retro de estilo 8-bit o 16-bit!

En este ejemplo, se utiliza un tercer parámetro de entrada para mostrar el lienzo a una escala de 8x.

Para mostrar todos los sprites en coordenadas enteras, establece `allSprites.pixelPerfect` en true y usa coordenadas enteras para la posición y el zoom de la cámara.

Ten en cuenta que las fuentes modernas son vectoriales, por lo que no se verán bien a bajas resoluciones. En su lugar, carga una fuente de píxeles con la función [`loadFont`](https://p5js.org/reference/p5/loadFont).

# 2-0

## Cambio de tamaño

Las funciones `resizeCanvas` o `canvas.resize` cambian el tamaño del lienzo a un ancho y alto especificados.

Visualmente, el lienzo se reducirá o ampliará al nuevo tamaño. Los sprites no cambiarán de posición.

Si prefieres mantener la cámara enfocada en la misma área, entonces debes ajustar manualmente la posición de la cámara después de llamar a esta función.
