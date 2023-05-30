# 0-0

## Temas Avanzados

Estas páginas de referencia destacan algunas de las características más avanzadas de p5play.

¡Probablemente deberías leer las otras páginas de referencia primero!

# 0-1

## Canvas

La clase `Canvas` es un envoltorio alrededor de la versión de p5play de la función `createCanvas` de p5.js, que se utiliza para crear un elemento de canvas HTML5. La versión de p5play también proporciona algunas características adicionales.

Si no se pasan parámetros a `new Canvas()`, se creará un canvas que llenará toda la ventana.

Usa `canvas.w` y `canvas.h` para obtener el ancho y la altura del canvas.

También puedes pasar una proporción de aspecto al constructor de Canvas. Esto creará el canvas más grande posible que se ajuste dentro de la ventana, manteniendo la proporción de aspecto dada. Por ejemplo, `new Canvas('2:1')` creará un canvas que es el doble de ancho que alto.

# 1-0

## modo pixelado

Otra característica añadida es el preset "pixelado". ¡Úsalo para crear juegos retro al estilo de 8-bit o 16-bit!

Por defecto, el preset "pixelado" escala el canvas para que se ajuste a la pantalla mientras mantiene su proporción de aspecto, pero también puedes definir una escala personalizada pasando un número después del nombre del preset.

Por ejemplo, "pixelado x2" creará un canvas que se mostrará al doble del tamaño del ancho y la altura especificados.
