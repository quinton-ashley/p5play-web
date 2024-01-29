# 0-0

## Dispositivos de Entrada

Aquí están los dispositivos de entrada disponibles en p5play:

- `kb` / `keyboard` para el teclado
- `mouse` para el ratón
- `contro` / `controllers` para los controles de juegos
- `touches` para entradas de pantalla táctil

Todos estos dispositivos de entrada utilizan las mismas funciones simples para obtener el estado de una entrada: `presses`, `pressing` y `released`.

Los dispositivos de entrada también almacenan el estado de todas sus entradas como propiedades. Por ejemplo, `kb.space` almacena cuántos cuadros el usuario ha estado presionando la tecla espaciadora. Se reinicia cuando el usuario suelta la entrada.

# 0-1

p5play facilita la activación de la misma acción a través de diferentes dispositivos de entrada usando [lógica booleana](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR).

En el mini-ejemplo, el sprite se vuelve verde si presionas la tecla espaciadora o haces clic con el ratón.

# 1-0

## Teclado

`kb` rastrea casi todas las teclas del teclado, incluyendo 'enter', 'backspace' y 'control'.

Nota que la entrada de letras no distingue entre mayúsculas y minúsculas. Para verificar si un usuario está presionando shift usa: `kb.pressing('shift')`.

Dado que las teclas WASD se usan comúnmente para controlar el movimiento del personaje del jugador, puedes usar los nombres de dirección 'up', 'down', 'left' y 'right' para detectar las presiones de las teclas WASD y de flechas.

Las teclas de flecha también pueden detectarse por separado usando 'arrowUp', 'arrowDown', 'arrowLeft' y 'arrowRight'.

En juegos locales para dos jugadores es común que el segundo jugador use las teclas IJKL para el movimiento. Estas teclas pueden referenciarse usando 'up2', 'down2', 'left2' y 'right2'.

[¿Usas un teclado no QWERTY?](https://github.com/quinton-ashley/p5play/wiki/FAQ#is-p5plays-kb-input-system-compatible-with-non-qwerty-keyboards)

# 2-0

## Ratón

La entrada por defecto del ratón es el botón 'left', un clic con un dedo en trackpads. También puedes usar 'right' (clic con dos dedos) y 'center'.

`mouse.x` y `mouse.y` almacenan la posición del ratón en el mundo, basada en la posición de la cámara.

`mouse.canvasPos` almacena la posición absoluta del ratón en el lienzo.

`mouse.visible` es un booleano que determina si el ratón es visible o no.

`mouse.cursor` se puede configurar a un [estilo de cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor). El predeterminado es 'default', otras opciones incluyen 'grab', 'move', 'pointer' y 'wait'.

# 3-0

## Ratón de Sprite

Los sprites con colisionadores físicos tienen su propio objeto de ratón para detectar entradas de ratón en el sprite.
Los objetos `sprite.mouse` son como el objeto de entrada `mouse`, excepto que tienen funciones adicionales.

`hovers` y `hovering` detectan cuando el usuario mueve el ratón sobre un sprite.

`dragging` detecta cuando el usuario hace clic y mantiene presionado un botón del ratón en el sprite mientras mueve el ratón.

Nota que `mouse.x` es la posición x del ratón en el lienzo y `sprite.mouse.x` es la posición x del ratón relativa al sprite.

# 4-0

## Controles de Juego

El objeto `contro` proporciona el estado de entrada de los botones de control de juego:

`a`, `b`, `x`, `y`, `l` (botón izquierdo), `r` (botón derecho), `lt` (gatillo izquierdo), `rt` (gatillo derecho), `up`, `down`, `left`, `right` (D-pad), `lsb` (botón del stick izquierdo), `rsb` (botón del stick derecho), `start` y `select`

`contro.leftStick` y `contro.rightStick` representan las posiciones de los sticks análogos como objetos con propiedades x e y. Estos valores van de -1 a 1, siendo 0 la posición central.

Algunos controles tienen gatillos análogos, y sus posiciones se almacenan como números que van de 0 a 1 en `contro.leftTrigger` y `contro.rightTrigger`.

El objeto `contro` (también conocido como `controllers`) es un arreglo que contiene todos los controles de juego conectados detectados por tu navegador web. Accede a los controles conectados por índice. Por ejemplo, `contro[0]` y `contro[1]` son el primer y segundo control. A través de magia JS, `contro` se puede usar para obtener los estados de entrada de `contro[0]`.

# 4-1

¡Pruébalo! Conecta un control de juego y presiona cualquier botón en él para que sea detectado por p5play.

➡️ [demo completa](https://openprocessing.org/sketch/2120550)

# 5-0

## Tacto

Cada interacción con pantalla táctil genera un objeto de toque que se añade al arreglo `touches`.

Cada toque tiene sus propias funciones para detectar estados de entrada de presión y arrastre.

`touch.x` y `touch.y` almacenan la posición del toque en el mundo, basada en la posición de la cámara.

`touch.canvasPos` almacena la posición absoluta del toque en el lienzo.

`touch.id` es un número único que identifica el toque.

`touch.duration` almacena cuántos cuadros el toque ha estado activo.

El cuadro después de que un toque termina, su objeto de toque se elimina del arreglo `touches`. `touches[0]` se mapea al `mouse`.

¡En la demostración de toques, toca la pantalla para crear cajas y arrástralas para lanzarlas!
