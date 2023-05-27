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

En los juegos de PC, las teclas WASD se utilizan comúnmente para controlar el movimiento del personaje del jugador. En p5play puedes usar los nombres de las direcciones 'up', 'down', 'left' y 'right' para detectar las presiones de las teclas WASD y las teclas de flecha.

Si quieres usar WASD y las teclas de flecha por separado puedes usar estos nombres de teclas para detectar las presiones de las teclas de flecha: 'ArrowUp', 'ArrowDown', 'ArrowLeft' y 'ArrowRight'.
Usar las teclas IJKL para el movimiento es común para apoyar a los jugadores zurdos o a los segundos jugadores en juegos locales de dos jugadores. Estas teclas pueden ser referenciadas usando: 'up2', 'down2', 'left2', y 'right2'.
Algunos teclados no empiezan con QWERTY en la fila superior. p5play mapea otros layouts de teclado al layout estándar inglés QWERTY. Por ejemplo, las teclas WASD para los usuarios del teclado francés AZERTY son ZQSD. Esto puede ser desactivado estableciendo `p5play.standardizeKeyboard` en falso. [Más info](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

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
