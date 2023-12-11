# 0-0

## ¿Qué es un Grupo?

En p5play, un Grupo es una colección y un plano para sprites con características y comportamientos similares. ¡Por ejemplo los puntos en Pac-Man!

La propiedad `group.length` se puede usar para comprobar cuántos sprites hay en un grupo. En este ejemplo, la condición del bucle while es verdadera siempre que el grupo de puntos tenga menos de 24 sprites.

En el mini ejemplo, `new dots.Sprite` crea un sprite que hereda el color del grupo de puntos, la posición y y el diámetro. A cada punto se le asigna una posición x única.

Llamo a esto "herencia suave" porque un grupo actúa como un plano para los nuevos sprites del grupo.

# 0-1

Puedes acceder a un sprite en un grupo por índice porque los grupos son arrays. Puedes usar cualquiera de los métodos estándar de array de JavaScript en un grupo.

# 0-2

¡Establecer una propiedad de un grupo a un valor diferente afectará a todos los sprites en el grupo! Llamo a esto "herencia dinámica".

# 0-3

Usar funciones de movimiento como `group.moveTowards`, hará que todos los sprites en un grupo se muevan.

# 1-0

## Establecedores de propiedades de función de flecha

En p5play, cuando estableces una propiedad de sprite en un grupo a una función de flecha, cada nuevo sprite creado usando ese grupo utilizará la función para evaluar la propiedad.

Cuando `group.amount` se ajusta, el grupo creará o eliminará automáticamente sprites para coincidir con la cantidad establecida.

En este mini ejemplo, a cada sprite de gema se le asigna una posición x e y aleatoria.

# 1-1

## Establecedores de funciones de flecha indexados

¡Incluso puedes usar su índice al evaluar una propiedad de sprite de grupo!

`i` es el índice del sprite en el grupo, que se da como un parámetro de entrada a las funciones de propiedad del grupo cuando se evalúan.

# 2-0

## Colisiones y Superposiciones

Las funciones de colisión y superposición no solo se utilizan para detectar eventos entre dos sprites. También puedes comprobar colisiones y superposiciones entre sprites y grupos o entre grupos. Las funciones son:

`colisiona`, `colisionando`, `colisionado`  
`superpone`, `superponiendo`, `superpuesto`

En lugar de utilizar estas funciones en declaraciones `if`, puedes proporcionarles una función de devolución de llamada como segundo parámetro. La función de devolución de llamada se ejecutará cuando ocurra el evento de colisión o superposición. La función de devolución de llamada recibe, como entradas, dos sprites.

En este mini ejemplo, la función de devolución de llamada recibe el sprite del jugador y el sprite de la gema en el grupo de gemas con el que el jugador se superpone. Esa gema se recoge (se elimina).

# 3-0

## Grupo allSprites

p5play crea un grupo `allSprites` que contiene todos los sprites en un sketch.

# 4-0

## Propiedades Personalizadas

¡Puedes añadir tus propias propiedades a los sprites y grupos, al igual que con cualquier otro objeto de JavaScript!

Además, cuando añades propiedades personalizadas a un grupo, serán heredadas por los nuevos sprites del grupo. Incluso puedes usar funciones de flecha como establecedores de propiedades.

# 5-0

## Sub Grupos

En este mini ejemplo hay dos subgrupos del grupo `boxes`: `smallBoxes` y `bigBoxes`.

Los nuevos sprites creados usando el grupo `bigBoxes` heredarán rasgos del grupo `boxes` pero no del grupo `smallBoxes`.

El grupo `boxes` contiene todos los sprites en los grupos `smallBoxes` y `bigBoxes`.

La función `group.removeAll` se puede usar para eliminar todos los sprites de un grupo.

# 6-0

## Culling

Por defecto, los sprites se eliminan cuando se van 10000 píxeles fuera de la pantalla en relación con la posición de la cámara. Esto es para evitar que el mundo se haga demasiado grande, lo que ralentizaría la simulación física.

Para cambiar esto, establece `allSprites.autoCull = false` y usa la función `group.cull` para establecer un límite de culling diferente. Incluso puede cull sprites que no tienen un collider físico.

Un último parámetro opcional se puede utilizar para especificar una función de callback que se llamará cuando un sprite sea cullado. La respuesta por defecto al culling es eliminar el sprite que salió del límite de culling pero al establecer tu propia función puedes hacer algo más. La función de callback recibe el sprite que fue cullado y un recuento total de cuántos sprites fueron cullados en ese fotograma. En este ejemplo, la cantidad de bolas disminuye si más de una bola es cullada en un fotograma.

# 6-1

## vida

Otra forma de limitar cuánto tiempo existe un sprite es establecer su propiedad `life`, que es el número de fotogramas que el sprite existe. Cuando la vida del sprite se acaba, será eliminado. Esto es útil para crear objetos temporales como proyectiles y campos de fuerza.

¡Prueba este pequeño juego! Haz clic con el ratón para crear una pelota de playa e intenta mantenerla en el aire con el chorro de agua.

# 7-0

## Dibujar

Al igual que con la función `sprite.draw`, puedes usar `group.draw` para controlar manualmente cuándo se dibujan los grupos dentro del bucle draw de p5.js.

Cualquier sprite que no sea dibujado manualmente será dibujado automáticamente al final del bucle draw de p5.js, a menos que su propiedad `autoDraw` esté establecida en falso.

Ten en cuenta que si quieres dibujar manualmente sprites o grupos y usar la cámara, tendrás que activar y desactivar la cámara manualmente.

# 7-1

## Actualizar

La función `group.update` ejecuta la función `sprite.update` de cada sprite en el grupo. Para prevenir la actualización automática, establece `autoUpdate` en falso.
