d

# 0-0

## ¿Qué es un Grupo?

En p5play un Grupo es una colección y un plano para sprites con rasgos y comportamientos similares. ¡Por ejemplo, los puntos en Pac-Man!

La propiedad `group.length` se puede usar para verificar cuántos sprites hay en un grupo. En este ejemplo, la condición del bucle while es verdadera mientras el grupo de puntos tenga menos de 24 sprites.

En el mini ejemplo, `new dots.Sprite` crea un sprite que hereda el color del grupo de puntos, la posición y y el diámetro. A cada punto se le asigna una posición x única.

Yo llamo a esto "herencia suave" porque un grupo actúa como un plano para nuevos sprites del grupo.

# 0-1

Puedes acceder a un sprite en un grupo por índice porque los grupos son arrays. Puedes usar cualquiera de los métodos estándar de array de JavaScript en un grupo.

# 0-2

¡Establecer la propiedad de un grupo a un valor diferente afectará a todos los sprites en el grupo! Yo llamo a esto "herencia dinámica".

# 0-3

Usar funciones de movimiento como `moveTowards` en un grupo, hará que todos los sprites en un grupo se muevan.

# 1-0

## Configuradores de propiedades de función flecha

Si estableces una propiedad del grupo a una función flecha `=>`, cada nuevo sprite creado usando ese grupo usará la función para evaluar la propiedad.

Cuando `group.amount` se ajusta, el grupo automáticamente creará o eliminará sprites para igualar la cantidad establecida.

En este mini ejemplo, a cada sprite de gema se le asigna una posición aleatoria en el lienzo.

# 1-1

## Configuradores de función flecha indexados

¡Los configuradores de flecha pueden usar el índice del sprite en el grupo!

El índice, `i`, se da como un parámetro de entrada a los configuradores de flecha del grupo. Se puede usar para calcular las propiedades del nuevo sprite del grupo.

# 2-0

## Colisiones y Superposiciones

Las funciones de colisión y superposición no son solo para detectar eventos entre dos sprites. También puedes verificar colisiones y superposiciones entre sprites y grupos o entre grupos. Las funciones son:

`collides`, `colliding`, `collided`  
`overlaps`, `overlapping`, `overlapped`

En lugar de usar estas funciones en declaraciones `if`, puedes proporcionarlas con una función de callback como segundo parámetro. La función de callback se ejecutará cuando ocurra el evento de colisión o superposición. La función de callback recibe, como entradas, dos sprites.

En este mini ejemplo la función de callback recibe el sprite del jugador y el sprite de gema en el grupo de gemas con el que el jugador se superpone. Esa gema se recoge (elimina).

# 3-0

## Grupo allSprites

p5play crea un grupo `allSprites` que contiene todos los sprites en un sketch.

# 4-0

## Propiedades Personalizadas

¡Puedes agregar tus propias propiedades a los sprites y grupos, al igual que con cualquier otro objeto de JavaScript!

Además, cuando agregas propiedades personalizadas a un grupo, serán heredadas por los nuevos sprites del grupo. Incluso puedes usar funciones flecha como configuradores de propiedades.

# 5-0

## Subgrupos

En este mini ejemplo hay dos subgrupos del grupo `boxes`: `smallBoxes` y `bigBoxes`.

Los nuevos sprites creados usando el grupo `bigBoxes` heredarán rasgos del grupo `boxes` pero no de los grupos `smallBoxes`.

El grupo `boxes` contiene todos los sprites en los grupos `smallBoxes` y `bigBoxes`.

La función `remove` elimina el grupo en sí, solo úsala si no quieres usar el grupo de nuevo. Si solo quieres eliminar todos los sprites de un grupo, usa la función `removeAll`.

# 6-0

## Culling

Por defecto, los sprites se eliminan cuando se van a 10000 píxeles fuera de pantalla en relación con la posición de la cámara. Esto es para evitar que el mundo se haga demasiado grande, lo que ralentizaría la simulación física.

Para cambiar esto, establece `allSprites.autoCull = false` o usa la función `cull` para establecer un límite de culling diferente. Ten en cuenta que incluso puede eliminar sprites que no tienen un colisionador físico.

Los sprites que cruzan el límite de culling se eliminan por defecto. Como último parámetro de entrada a la función `cull`, puedes insertar una función de callback. Cuando se llama, recibe el sprite que fue eliminado y un conteo total de cuántos sprites fueron eliminados en ese cuadro.

Ten en cuenta que en este ejemplo, la cantidad de bolas disminuye si se eliminan más de una bola en un cuadro.

# 6-1

## vida

Otra manera de limitar cuánto tiempo existe un sprite es establecer su propiedad `life`, que es el número de cuadros que el sprite existe. Cuando la vida del sprite llega a `0`, será eliminado. Esto es útil para crear objetos temporales como proyectiles y campos de fuerza.

¡Prueba este pequeño juego! Haz clic con el ratón para crear una pelota de playa e intenta mantenerla en el aire con el chorro de agua.

# 7-0

## Dibujar

Al igual que con la función `sprite.draw`, puedes usar `group.draw` para controlar manualmente cuándo se dibujan los grupos dentro del bucle de dibujo de p5.js.

Cualquier sprite no dibujado manualmente será dibujado automáticamente al final del bucle de dibujo de p5.js, a menos que su propiedad `autoDraw` esté establecida en falso.

Ten en cuenta que si quieres dibujar manualmente sprites o grupos y usar la cámara, tendrás que activar y desactivar la cámara manualmente.

# 7-1

## Actualizar

La función `group.update` ejecuta la función `sprite.update` de cada sprite en el grupo. Para evitar la actualización automática establece `autoUpdate` en falso.
