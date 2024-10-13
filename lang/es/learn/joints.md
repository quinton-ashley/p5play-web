# 0-0

## Joints (Articulaciones)

Una articulación conecta los colisionadores físicos de dos sprites, limitando su movimiento relativo entre sí.

Los constructores de articulaciones aceptan dos sprites como entrada. Al menos uno de los sprites en una articulación debe tener un colisionador físico dinámico.

Cada sprite tiene un arreglo `sprite.joints`, que contiene todas las articulaciones a las que está conectado actualmente.

# 0-1

## GlueJoint

¿Te gusta el arte en Legend of Zelda: Tears of the Kingdom? ¡Entonces te encantarán las articulaciones de pegamento!

Una `GlueJoint` es el tipo más simple de articulación, simplemente pega dos sprites juntos. Los sprites no tienen que estar tocándose y no se despegarán a menos que se quite la articulación.

Pero espera, ¿por qué usar una articulación de pegamento en lugar de `sprite.addCollider`?

- cada sprite puede tener sus propias propiedades físicas
- cada sprite puede detectar colisiones por separado
- quitar una articulación no elimina los sprites

Las articulaciones pueden ocultarse visualmente estableciendo `joint.visible` en falso o eliminarse por completo ejecutando la función `joint.remove`.

Prueba pegar y despegar el sprite de palo y bola en el mini ejemplo. Si buscas un desafío, ¡lanza la bola directamente hacia arriba y trata de pegarla a la parte superior del palo!

# 1-0

## DistanceJoint

Por defecto, un `DistanceJoint` se adjunta en el centro de cada sprite al que está conectado. Para cambiar los puntos de anclaje de la articulación, edita sus vectores `offsetA` y `offsetB` (la compensación).

Ajustar la proporción de `springiness` (elasticidad) del ensamblaje cambia la cantidad que puede estirarse y comprimirse.

`0.0` = barra de acero (por defecto)  
`0.2` = resorte rígido  
`0.4` = resorte ajustado  
`0.6` = resorte rebotador  
`0.8` = slinky  
`1.0` = cuerda bungee

También puedes ajustar la proporción de `damping` de la articulación para cambiar qué tan rápido pierde energía vibratoria.

Establezca `collideConnected` en true para que los sprites conectados colisionen entre sí.

# 2-0

## WheelJoint

Un `WheelJoint` conecta el cuerpo de un vehículo a una rueda. ¡Usa las articulaciones de rueda para crear vehículos conducibles!

Cada articulación de rueda tiene un motor, que se puede activar configurando la `speed` (velocidad) del ensamblaje a la velocidad del motor deseada, `maxPower` (poder maximo) a un valor positivo, o `motorEnabled` (motor habilitado) a verdadero.

Desactivar el motor de una articulación de rueda es como poner un coche en punto muerto, hace que la rueda ruede libremente. La velocidad de la articulación debe ajustarse a cero para que la rueda frene.

Por defecto, las articulaciones de rueda tienen un `maxPower` de 1000, `springiness` (elasticidad) de 0.1, `damping` (mojadura) de 0.7, y ángulo de sujeción `angle` de 90 grados.

¡Prueba conducir el coche en este ejemplo! ¿Puedes llegar al final del camino? Personaliza el coche cambiando la posición de sus ruedas y el ángulo en el que están sujetas.

# 3-0

## HingeJoint

Una `HingeJoint` permite que uno o dos sprites giren alrededor del mismo punto.

Para cambiar el punto de rotación, edita el vector `offsetA` o `offsetB` de la articulación.

Las articulaciones de bisagra con un `maxPower` (poder maximo) pequeño y una `speed` (velocidad) predeterminada de cero aplican fuerza de frenado para resistir ser movidas.

Prueba hacer clic en este ejemplo para soltar cajas pequeñas en el balancín. ¿Cuántas cajas puedes poner en el balancín antes de que se incline?

# 4-0

## SliderJoint

Un `SliderJoint` restringe el movimiento de dos sprites al deslizarse a lo largo de un eje común, sin rotación.

El `range` (rango) de la articulación determina cuán separados pueden estar los sprites conectados entre sí. Cambiar el `angle` (ángulo) de la articulación cambia la dirección en la que los sprites pueden deslizarse.

Por defecto, el motor de la articulación está activado con una `speed` (velocidad) de 0, por lo que `maxPower` (poder maximo) determina cuánto puede resistir la articulación al deslizamiento.

Prueba soltar cajas en la balanza haciendo clic con el ratón. ¿Cuántas cajas puedes apilar en la balanza antes de que alcance su límite? Intenta cambiar su ángulo también.
