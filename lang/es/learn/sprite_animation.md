# 0-0

## Cómo cargar animaciones

Una animación es una serie de imágenes que se muestran una después de la otra a una velocidad suficiente para dar la apariencia de movimiento.

La función `loadAni` tiene tres modos diferentes: secuencia, lista y hoja de sprites.

En este mini ejemplo, la animación de la nube respirando se carga utilizando una secuencia numerada de imágenes dada la ruta a la primera imagen y el índice de la última imagen en la secuencia.

La función `animation` es similar a la función `image` de p5.js. Úsala en la función draw de p5.js para mostrar una animación en una posición.

# 0-1

En este mini ejemplo, la función `loadAnimation` recibe una lista de imágenes.

La propiedad `ani.frameDelay` define cuántos frames se muestra una imagen en la animación antes de que se muestre la siguiente imagen. El valor predeterminado es 4. Los valores más altos hacen que la animación se reproduzca más lentamente. Un retraso de frame de 1 haría que la animación se reproduzca lo más rápido posible.

¡Pruébalo! Intenta cambiar el frameDelay en este mini-ejemplo.

# 0-2

Este mini ejemplo carga una animación desde una hoja de sprites, que es una sola imagen que contiene todos los frames de una animación. Echa un vistazo a la hoja de sprites en este sketch que se muestra sólo para que puedas ver cómo es una.

En el modo de hoja de sprites, se puede utilizar un objeto atlas para especificar el tamaño de cada frame y cuántos frames de animación hay.

Si realmente necesitas usar una animación cuando tu programa comienza, deberías cargarla en la función preload de p5.js en lugar de en setup.

# 1-0

## Animando

p5play te da control total sobre tus animaciones.

¡Intenta usar tu teclado para probar algunas de las diferentes formas de controlar las animaciones!

# 2-0

## Sprites con Animaciones

La función sprite.addAni puede agregar una animación a un sprite. También puede cargar la animación, al igual que loadAni. Como un primer parámetro de entrada opcional, puedes proporcionar un nombre para la animación.

Intenta presionar el botón izquierdo del ratón. Cuando la propiedad `sprite.debug` está configurada como verdadera, puedes ver el colisionador del cuerpo físico del sprite.

# 2-1

## Controlar la Animación de un Sprite

`sprite.ani` almacena la animación actual del sprite, que puede cambiarse al nombre de una animación diferente.

`sprite.mirror` puede ser utilizado para voltear el sprite horizontal o verticalmente.

Intenta presionar izquierda y derecha para hacer mover el fantasma.

Intenta presionar la barra espaciadora para detener la animación.

# 3-0

## Grupos con Animaciones

Si un grupo tiene sólo una animación, los nuevos sprites del grupo utilizarán esa animación. De lo contrario, por defecto el sprite obtiene la última animación cargada.

Observa que en este mini-ejemplo si colocas manchas demasiado cerca, se alejarán hasta que sus colisionadores ya no estén superpuestos. El tamaño del colisionador se toma del tamaño de la animación.

¡Intenta hacer clic con el ratón para añadir nuevas manchas!

# 4-0

## Hojas de Sprites con Múltiples Animaciones

Para cargar múltiples animaciones desde la misma imagen de la hoja de sprites, primero configura la propiedad `spriteSheet` del sprite o grupo.

A continuación, utiliza la función `addAnimations` / `addAnis`. Aceptan un objeto que utiliza los nombres de las animaciones como claves y los atlas de las hojas de sprites como valores.

¡Usar un objeto atlas es mucho más fácil que especificar manualmente las coordenadas de cada frame!

Los objetos atlas pueden tener las siguientes propiedades:

`x`, `y`, `pos`, `w`/`width`, `h`/`height`, `size`/`frameSize`, `row`, `col`, `frames`/`frameCount`, `delay`/`frameDelay`, y `rotation`.

En el ejemplo del "héroe", el tamaño del sprite del héroe se establece en 32x32 píxeles en el constructor `Sprite`. Ese tamaño se utiliza como multiplicador para el valor de la fila dado.

Haz clic en este enlace para ver la [hoja de sprites completa](assets/questKid.png) utilizada en el ejemplo.

Si realmente quieres apreciar lo bueno que es p5play, intenta comparar el código de mi ejemplo con [esta demo de Phaser](https://labs.phaser.io/view.html?src=src/animation/create%20animation%20from%20sprite%20sheet.js). ¡Ja!

Recomiendo hacer que cada frame en una animación tenga el mismo tamaño y ponerlos en orden de izquierda a derecha. Si no, tendrás que especificar manualmente la posición de cada frame, lo cual se puede hacer utilizando una matriz de coordenadas en lugar de un objeto atlas.

# 4-1

## anis

Cada sprite y grupo tiene un objeto `animations` / `anis` que almacena sus animaciones. Las claves son nombres de animación y los valores son objetos de animación. Funciona como lo hacen los grupos, utilizando herencia suave y dinámica.

La propiedad `ani.offset` se utiliza para ajustar la posición de una animación en relación con la posición del sprite.

Cuando `sprite.pixelPerfect` está configurado como verdadero, el sprite se dibuja en coordenadas enteras, mientras que mantiene la posición precisa de su colisionador. ¡Esto es útil para los juegos de arte pixelado!

# 5-0

## Secuenciación de Animaciones

`sprite.ani` puede ser configurado como un objeto de animación, nombre de animación, o matriz de nombres de animación que se reproducirán en secuencia.

Por defecto, si el bucle está habilitado, la última animación de la secuencia será en bucle. Para hacer un bucle de toda la secuencia, utiliza `'**'` como el último nombre de la animación. Si en cambio quieres que la secuencia se detenga al final, utiliza `';;'` como el último nombre de la animación.

Este ejemplo muestra cómo el personaje del héroe puede ser movido alrededor de la pantalla usando WASD o las flechas del teclado!

# 6-0

## Secuenciación de Animaciones Avanzada

Por detrás, configurar `sprite.ani` utiliza la función asincrónica `sprite.changeAni`. Puedes usar esta función directamente para esperar a que las animaciones terminen de reproducirse.

¡Ejemplo próximamente!
