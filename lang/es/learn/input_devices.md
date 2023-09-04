# 0-0

## Dispositivos de entrada

Aquí están los dispositivos de entrada disponibles en p5play:

- `kb` o `keyboard` para el teclado
- `mouse` para el ratón
- `contro` o `controllers` para los controladores de juegos

Todos estos dispositivos de entrada utilizan las mismas funciones simples para obtener el estado de una entrada: `presses`, `pressing` y `released`.

También almacenan el estado de todas sus entradas como propiedades. Por ejemplo, `kb.space` almacena cuántos frames ha estado presionando el usuario la tecla espacio. Se reinicia cuando el usuario suelta la entrada.

# 1-0

## Teclado

`kb` rastrea casi todas las teclas del teclado, incluyendo 'enter', 'backspace' y 'control'.

Ten en cuenta que la entrada de letras distingue entre mayúsculas y minúsculas. `kb.presses('q')` devuelve verdadero si el usuario presiona la tecla 'q'. Pero `kb.presses('Q')` solo devuelve verdadero si el usuario presiona la tecla 'q' mientras mantiene presionada la tecla 'shift'.

Dado que las teclas WASD se utilizan comúnmente para controlar el movimiento del personaje del jugador, puedes usar los nombres de dirección 'arriba', 'abajo', 'izquierda' y 'derecha' para detectar las pulsaciones de WASD y las teclas de flecha.

Las teclas de flecha también se pueden detectar por separado utilizando 'arrowUp', 'arrowDown', 'arrowLeft' y 'arrowRight'.

En juegos locales de dos jugadores, es común que el segundo jugador utilice las teclas IJKL para el movimiento. Estas teclas se pueden referenciar utilizando 'up2', 'down2', 'left2' y 'right2'.

[¿Usas un teclado no QWERTY?](https://github.com/quinton-ashley/p5play/wiki/FAQ#is-p5plays-kb-input-system-compatible-with-non-qwerty-keyboards)


# 2-0

## Multi-Entrada

Este mini-sketch muestra cómo una acción puede ser realizada presionando la tecla espacio o haciendo clic con el ratón. La entrada de ratón por defecto es 'left' para el botón izquierdo del ratón o clic normal.

# 3-0

## Ratón Sprite

Los sprites con colisionadores físicos tienen su propio objeto ratón para detectar las entradas del ratón en el sprite.
Los objetos `sprite.mouse` son justo como el objeto de entrada `mouse`, excepto que tienen funciones adicionales.

`hovers` y `hovering` detectan cuando el usuario mueve el ratón sobre un sprite.

`dragging` detecta cuando el usuario hace clic y mantiene un botón del ratón en el sprite mientras mueve el ratón.
Nota que `mouse.x` es la posición x del ratón en el lienzo y `sprite.mouse.x` es la posición x del ratón relativa al sprite.

# 4-0

## Controladores de juegos

El objeto `contro` o `controllers` proporciona el estado de entrada de los botones del controlador de juegos:

"a", "b", "x", "y", "l" (gatillo izquierdo), "r" (gatillo derecho), "lt" (gatillo izquierdo), "rt" (gatillo derecho), "up", "down", "left", "right" (dpad), "start" y "select"

También proporciona las posiciones del eje `x` y `y` de los sticks analógicos: `leftStick` y `rightStick`. Los valores del eje varían entre -1 y 1, donde 0 es el centro.

El objeto `contro` también es un array que contiene todos los controladores de juegos conectados detectados por tu navegador web. Accede a los controladores conectados por índice. Por ejemplo, `contro[0]` y `contro[1]` son los primeros y segundos controladores. Por defecto `contro` hace referencia a `contro[0]`.

¡Pruébalo! Presiona cualquier botón en tu controlador de juegos conectado para que sea detectado por p5play.

# 5-0

## Tocar

Ejemplo próximamente!
