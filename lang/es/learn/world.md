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

La proporción de `world.timeScale` se establece por defecto en 1 para la simulación de física en tiempo real. ¡Establécelo más bajo para cámara lenta. Hazlo 0 para pausar el tiempo!

Ten en cuenta que el solucionador del motor de física Box2D solo es estable hasta una escala de tiempo de 2. Si quieres avanzar la simulación por una cantidad mayor de tiempo, ejecuta la función `world.step` varias veces.

Haz clic en el lienzo en el ejemplo para hacer que la simulación física avance en cámara lenta, 1/4 del tiempo real. El efecto de tiempo bala de Matrix se logra haciendo el fondo de cada cuadro ligeramente transparente.

`world.realTime` almacena cuántos segundos de tiempo real han transcurrido desde el inicio del mundo, incluidas las pausas.

`world.physicsTime` almacena cuántos segundos han transcurrido en la simulación física.

# 2-0

## Pruebas de Rendimiento

Establece `p5play.renderStats` en verdadero para mostrar el número de sprites dibujados, tasa de visualización y cálculos de FPS. Para resultados más completos, usa las herramientas de prueba de rendimiento de tu navegador web.

FPS en este contexto se refiere a cuántos cuadros por segundo puede generar tu computadora, sin incluir el retraso entre cuando los cuadros se muestran realmente en la pantalla. Cuanto más alto sea el FPS, mejor está funcionando tu juego.

Tener menos sprites y usar un lienzo más pequeño hará que tu juego funcione mejor. Para un mejor rendimiento, no uses la función `clear` de p5.js o muestrees los colores de los píxeles en tu lienzo usando `canvas.get`.

Por defecto, el motor de física Box2D realiza 8 iteraciones de velocidad `world.velocityIterations` y 3 iteraciones de posición `world.positionIterations`. Disminuir estos valores hará que la simulación sea más rápida pero también menos precisa.

He probado p5play en todos los navegadores web y encontré que Google Chrome tiene el mejor rendimiento.

# 3-0

## Encontrar Sprites

Puedes obtener un array de sprites encontrados en un punto con la función `world.getSpritesAt`. Ten en cuenta que los sprites deben tener cuerpos físicos para ser encontrados.

`world.getSpriteAt` devuelve el primer sprite encontrado en un punto, el que tiene el valor de capa más alto.

¡Intenta mover el ratón para hacer que los sprites dejen de moverse!
