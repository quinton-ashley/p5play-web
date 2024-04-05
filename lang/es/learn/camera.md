# 0-0

## Cámara

En este ejemplo, la cámara sigue el movimiento del eje x del jugador.

# 1-0

`camera.zoom` se puede utilizar para acercar y alejar la cámara.

`camera.zoomTo(target, speed)` es una función asincrónica que se puede utilizar para acercar y alejar suavemente la cámara. Acepta un segundo parámetro opcional, la cantidad que se acercará o alejará por frame.

# 2-0

## Cámara Encendida/Apagada

Por defecto, `allSprites.draw()` se llama al final del bucle de dibujo de p5.js. Sin embargo, si quieres controlar cuándo se dibujan los sprites y los grupos, puedes dibujarlos por separado.

El jugador y el entorno de tu juego deben ser dibujados con la cámara encendida.

Los sprites de la IU o HUD, representados por cuadrados naranjas en estos ejemplos, deben ser dibujados cuando la cámara está apagada.

`mouse.x` almacena la posición x del ratón en relación con el mundo, que puede ser mayor que el canvas. `mouse.canvasPos.x` almacena la posición x del ratón en relación con el canvas.

# 3-0

## Eventos de Ratón con la Cámara

En este ejemplo, la cámara se mueve hacia la izquierda y hacia la derecha utilizando una onda senoidal.

El sprite grande se dibuja en el espacio del mundo cuando la cámara está encendida. El sprite grande no se mueve, pero parece que lo hace porque la cámara se está moviendo.

El sprite pequeño se dibuja cuando la cámara está apagada en el espacio de la pantalla (UI). Si quisieras hacer un elemento de UI en tu juego, como un sprite de botón de pausa, deberías hacerlo cuando la cámara está apagada.
