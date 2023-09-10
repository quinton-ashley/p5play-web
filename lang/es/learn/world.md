# 0-0

## Mundo

Cada instancia de p5play tiene su propio objeto `world`, que se puede utilizar para controlar la simulación física.

La propiedad más importante de este objeto es `gravity`, que tiene componentes x e y.

# 0-1

## Dormir

`world.allowSleeping` es verdadero por defecto.

Un sprite comienza a "dormir" cuando deja de moverse y no colisiona con nada nuevo. Los sprites "durmiendo" son ignorados durante la simulación física, lo que generalmente evita que el motor de física Box2D tenga que hacer cálculos innecesarios. Aunque esto es bueno para el rendimiento, a veces puede causar problemas.

Puedes despertar un sprite que duerme estableciendo `sprite.sleeping` en falso. También puedes desactivar el dormir en base a cada sprite estableciendo `sprite.allowSleeping` en falso.

# 1-0

## Manipulación del tiempo

Por defecto, después de cada vez que se ejecuta la función de dibujo de p5.js, p5play llama a tres funciones en este orden:

- `allSprites.draw()`: dibuja todos los sprites
- `world.step()`: avanza la simulación física
- `allSprites.update()`: actualiza sprite.ani y sprite.mouse

Pero también puedes tomar control manual de estos procesos llamándolos tú mismo.

¡En el mini-ejemplo, intenta presionar espacio para activar y desactivar el slow-motion!

## sprite.draw y group.draw

Puedes utilizar las funciones `sprite.draw` y `group.draw` para controlar manualmente cuándo se dibujan los sprites individuales y los grupos dentro del bucle de dibujo de p5.js. Cualquier sprite que no se dibuje manualmente se dibujará automáticamente al final del bucle de dibujo de p5.js a menos que la propiedad autoDraw del sprite esté establecida en falso directamente o por uno de sus grupos padres. Para prevenir el dibujo automático completamente establece `allSprites.autoDraw = false`.

Ten en cuenta que tendrás que activar y desactivar manualmente la cámara si quieres utilizarla con sprites dibujados manualmente.

# 1-1

## world.step

`world.step` comprueba las colisiones y calcula las posiciones y velocidades de todos los sprites después de avanzar la simulación física en 1/60 de segundo por defecto. No se puede avanzar en el tiempo a los sprites individualmente.

Antes de usar `world.step` en tu función de dibujo de p5.js, asegúrate de dibujar todos los sprites. ¡De lo contrario, se dibujarán en la posición incorrecta!

Establece `world.autoStep = false` para desactivar el avance automático. Entonces puedes llamar a `world.step` manualmente cuando quieras avanzar la simulación física.

# 1-2

## sprite.update y group.update

¿Qué hace `sprite.update`? Se encarga de actualizar la animación del sprite y los eventos del ratón. También ejecuta la función de actualización personalizada del usuario si se ha establecido alguna. Para prevenir la actualización automática completamente establece `allSprites.autoUpdate = false`.

¿Por qué esta funcionalidad está separada del paso del mundo? Porque en una pantalla de pausa el mundo físico podría estar pausado, pero las animaciones y eventos de ratón del menú de pausa todavía podrían actualizarse.

# 2-0

## Pruebas de Rendimiento

La función `renderStats` muestra el número de sprites dibujados, una aproximación de los FPS (fotogramas por segundo) actuales, así como el promedio, mínimo y máximo de FPS alcanzados durante el segundo anterior.

Los FPS en este contexto se refieren a cuántos cuadros por segundo puede generar tu computadora, incluyendo cálculos de física y cualquier otro proceso necesario para generar un cuadro, pero sin incluir la demora entre cuándo se muestran realmente los cuadros en la pantalla. Cuanto más altos sean los FPS, mejor rendimiento tendrá tu juego.

Puedes utilizar esta función para realizar pruebas de rendimiento aproximadas. Para obtener resultados más precisos, utiliza las herramientas de prueba de rendimiento de tu navegador web.

En general, tener menos sprites y usar un lienzo más pequeño hará que tu juego tenga un mejor rendimiento. Para un mejor rendimiento, no utilices la función `clear` de p5.js ni muestrees los colores de los píxeles en tu lienzo utilizando `canvas.get`.
