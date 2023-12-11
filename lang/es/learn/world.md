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

## Controlando el Tiempo

Por defecto, después de cada vez que se ejecuta la función draw de p5.js, p5play llama a tres funciones en este orden:

- `allSprites.draw()` : dibuja todos los sprites
- `world.step()` : avanza la simulación de física
- `allSprites.update()` : actualiza animaciones y eventos del ratón

Pero también puedes tomar control manual de estos procesos llamándolos tú mismo.

# 1-1

## world.step

La función `world.step` calcula las posiciones y velocidades de todos los sprites después de avanzar la simulación de física por 1/60 de segundo por defecto.

Establece `world.autoStep = false` para desactivar el avance automático, ¡lo que efectivamente pausa el tiempo! Luego puedes llamar a `world.step` manualmente cuando quieras avanzar la simulación de física. Solo ejecútalo después de que todos los sprites hayan sido dibujados.

Este mini ejemplo muestra cómo un paso de tiempo puede ser proporcionado como un parámetro de entrada, pero ten en cuenta que el solucionador del motor de física Box2D solo es estable hasta un paso de tiempo de 1/30 de segundo. Si quieres avanzar la simulación por una cantidad de tiempo mayor, llama a `world.step` varias veces.

# 2-0

## Pruebas de Rendimiento

La función `renderStats` muestra el número de sprites dibujados, una aproximación de los FPS (fotogramas por segundo) actuales, así como el promedio, mínimo y máximo de FPS alcanzados durante el segundo anterior.

Los FPS en este contexto se refieren a cuántos cuadros por segundo puede generar tu computadora, incluyendo cálculos de física y cualquier otro proceso necesario para generar un cuadro, pero sin incluir la demora entre cuándo se muestran realmente los cuadros en la pantalla. Cuanto más altos sean los FPS, mejor rendimiento tendrá tu juego.

Puedes utilizar esta función para realizar pruebas de rendimiento aproximadas. Para obtener resultados más precisos, utiliza las herramientas de prueba de rendimiento de tu navegador web.

En general, tener menos sprites y usar un lienzo más pequeño hará que tu juego tenga un mejor rendimiento. Para un mejor rendimiento, no utilices la función `clear` de p5.js ni muestrees los colores de los píxeles en tu lienzo utilizando `canvas.get`.
