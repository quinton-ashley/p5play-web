# 0-0

## Lienzo

El constructor `Canvas` crea un nuevo elemento `canvas` HTML5 y lo añade a tu página web.

¡Es como la función `createCanvas` de p5.js, pero con algunas características adicionales!

Usa `canvas.w` y `canvas.h` para obtener el ancho y el alto del lienzo.

# 0-1

Si no se pasan parámetros a `new Canvas()`, se creará un lienzo que llena toda la ventana.

También puedes pasar una relación de aspecto al constructor de Canvas. Esto creará el lienzo más grande posible que se ajuste dentro de la ventana, manteniendo la relación de aspecto dada. Por ejemplo, `new Canvas('2:1')` creará un lienzo que es el doble de ancho que de alto.

Otra característica añadida es el preajuste "pantalla completa", `new Canvas(1920, 1080, 'fullscreen')` ajustará el lienzo para que encaje dentro de la ventana, manteniendo una resolución de 1920x1080.

# 1-0

## modo pixelado

Otra característica de `Canvas` es el preajuste "pixelado". ¡Úsalo para hacer juegos retro de estilo 8 bits o 16 bits!

Este preajuste hará que el lienzo se ajuste a la pantalla, a menos que especifiques un multiplicador. Por ejemplo, "pixelado x2" creará un lienzo que se muestra al doble del tamaño del ancho y alto especificados.

Para mostrar todos los sprites en coordenadas enteras, establece `allSprites.pixelPerfect` en verdadero y usa coordenadas enteras para la posición y el zoom de la cámara.

Ten en cuenta que las fuentes modernas están basadas en vectores, por lo que no se verán muy bien en modo pixelado. Carga en su lugar una fuente de mapa de bits con la función [`loadFont`](https://p5js.org/reference/p5/loadFont) de p5.js.

# 2-0

## Cambio de tamaño

Las funciones `resizeCanvas` o `canvas.resize` cambian el tamaño del lienzo a un ancho y alto especificados.

Visualmente, el lienzo se reducirá o ampliará al nuevo tamaño. Los sprites no cambiarán de posición.

Si prefieres mantener la cámara enfocada en la misma área, entonces debes ajustar manualmente la posición de la cámara después de llamar a esta función.
