# 0-0

## Cómo cargar animaciones

Una animación es una serie de imágenes que se muestran una después de la otra a una velocidad suficiente para dar la apariencia de movimiento.

La función `loadAni` tiene tres modos diferentes: secuencia, lista y hoja de sprites.

En este mini ejemplo, la animación de la nube respirando se carga utilizando una secuencia numerada de imágenes dada la ruta a la primera imagen y el índice de la última imagen en la secuencia.

La función `animation` es similar a la función `image` de q5.js. Úsala en la función draw de q5.js para mostrar una animación en una posición.

# 0-1

En este mini ejemplo, la función `loadAnimation` recibe una lista de imágenes.

La propiedad `ani.frameDelay` define cuántos frames se muestra una imagen en la animación antes de que se muestre la siguiente imagen. El valor predeterminado es 4. Los valores más altos hacen que la animación se reproduzca más lentamente. Un retraso de frame de 1 haría que la animación se reproduzca lo más rápido posible.

¡Pruébalo! Intenta cambiar el frameDelay en este mini-ejemplo.

# 0-2

Una hoja de sprites es una sola imagen que contiene todos los fotogramas de una animación. `ani.spriteSheet` se muestra en el boceto para que puedas ver cómo es.

En el modo de hoja de sprites, `loadAni` acepta un "atlas" [objeto JS](https://p5js.org/reference/p5/Object) que especifica el tamaño de cada fotograma y cuántos fotogramas de animación hay.

Esta forma sencilla de cargar animaciones requiere que cada fotograma en tu hoja de sprites sea del mismo tamaño, esté alineado en una cuadrícula y en orden de izquierda a derecha, de arriba a abajo.

# 0-3

Si deseas que una animación solo use fotogramas específicos de la hoja de sprites, establece la propiedad "frames" del objeto atlas a un arreglo de índices de fotogramas.

# 0-4

Otra forma de usar `loadAni` en modo de hoja de sprites es proporcionar un arreglo de localizadores de fotogramas, arreglos que especifican la posición y tamaño de un fotograma.

Al crear hojas de sprites, considera la compensación entre la eficiencia del espacio de imagen obtenida al empaquetar estrechamente fotogramas de tamaños irregulares, versus la facilidad de cargar una hoja de sprites alineada en cuadrícula.

Ten en cuenta que las animaciones en estos ejemplos se están cargando de forma diferida en `setup`. Si realmente necesitas usar una animación cuando tu programa comienza, cárgala en la función `preload` de q5.js en su lugar.

# 1-0

## Animando

p5play te da control total sobre tus animaciones.

¡Intenta usar tu teclado para probar algunas de las diferentes formas de controlar las animaciones!

# 2-0

## Sprites con Animaciones

La función sprite.addAni puede agregar una animación a un sprite. También puede cargar la animación, al igual que loadAni. Como un primer parámetro de entrada opcional, puedes proporcionar un nombre para la animación.

Intenta presionar el botón izquierdo del ratón. Cuando la propiedad `sprite.debug` está configurada como verdadera, puedes ver el colisionador del cuerpo físico del sprite.

# 2-1

## Control de la Animación de un Sprite

Utiliza la función `sprite.changeAni` para cambiar la animación de un sprite. Esta función acepta un objeto de animación o el nombre de una animación cargada previamente.

`sprite.ani` almacena la animación actual del sprite, lo que permite acceder a sus propiedades y funciones como `play` y `stop`.

El vector `sprite.scale` se puede usar para voltear el sprite horizontal o verticalmente.

Prueba presionando izquierda y derecha para hacer que el fantasma se mueva.

Prueba presionando la barra espaciadora para detener la animación.

# 3-0

## Grupos con Animaciones

Si se agrega una animación a un grupo, los nuevos sprites del grupo recibirán una copia de esa animación.

Ten en cuenta que en este mini-ejemplo, si colocas las manchas demasiado cerca, se separarán hasta que sus colisionadores ya no se superpongan. El tamaño del colisionador se toma del tamaño de la animación.

¡Prueba hacer clic con el ratón para agregar nuevas manchas!

# 4-0

## Hojas de Sprites con Múltiples Animaciones

Para cargar múltiples animaciones desde la misma imagen de hoja de sprites, primero establece la propiedad `spriteSheet` del sprite o grupo.

Luego, utiliza la función `addAnimations` / `addAnis`. Aceptan un objeto que utiliza los nombres de las animaciones como claves y los atlas de la hoja de sprites como valores.

Usar un objeto atlas es mucho más fácil que especificar manualmente las coordenadas de cada fotograma.

Los objetos atlas pueden tener las siguientes propiedades:

`x`, `y`, `pos`, `w`/`width`, `h`/`height`, `size`/`frameSize`, `row`, `col`, `frames`/`frameCount`, `delay`/`frameDelay` y `rotation`.

En el ejemplo del "héroe", el tamaño del sprite del héroe se establece en 32x32 píxeles en el constructor `Sprite`. Ese tamaño se utiliza como un multiplicador para el valor de la fila proporcionado.

Haz clic en este enlace para ver la hoja de sprites completa [questKid](/learn/assets/questKid.png) utilizada en el ejemplo.

Si deseas apreciar realmente lo bueno que es p5play, compara el código de mi ejemplo con [esta demostración de Phaser](https://labs.phaser.io/view.html?src=src/animation/create%20animation%20from%20sprite%20sheet.js). ¡Ja!

Recomiendo hacer que cada fotograma de una animación tenga el mismo tamaño y colocarlos en orden de izquierda a derecha. De lo contrario, tendrás que especificar manualmente la posición de cada fotograma, lo que se puede hacer utilizando una matriz de coordenadas en lugar de un objeto atlas.

# 4-1

## anis

Cada sprite y grupo tiene un objeto `animations` / `anis` que almacena sus animaciones. Las claves son nombres de animaciones y los valores son objetos de animación. Funciona como lo hacen los grupos, utilizando una herencia suave y dinámica.

La propiedad `ani.offset` se utiliza para ajustar la posición de una animación en relación con la posición del sprite.

Cuando `sprite.pixelPerfect` está configurado en true, el sprite se dibujará en coordenadas enteras, manteniendo la posición precisa de su colisionador. ¡Esto es útil para juegos de arte pixelado!

# 5-0

## Hoja de Imágenes de Sprite

Algunas hojas de sprite contienen una colección de imágenes (subtexturas) empaquetadas en un solo archivo. Esto permite que se carguen con una sola solicitud de red, reduciendo el tiempo de carga y mejorando el rendimiento.

Echa un vistazo a la [hoja de sprites de tráfico](/learn/assets/traffic.png) del [Paquete de Vehículos Pixelados de Kenny](https://kenney.nl/assets/pixel-vehicle-pack).

En p5play, cada subtextura se puede cargar como una animación de un solo fotograma.

# 5-1

## Atlas de Texturas XML

Un atlas de texturas describe el tamaño y la posición de cada subtextura dentro de una hoja de sprites compacta. Por ejemplo, consulta el [atlas de texturas de tráfico](/learn/assets/traffic_atlas.xml).

Usa `parseTextureAtlas` para analizar un atlas de texturas XML y convertirlo en un objeto que se puede usar con `addAnis`.

# 5-2

## Cortar Fotogramas

Cuando se dibujan secciones de una hoja de sprites de pixel art (baja resolución) en el lienzo, pueden aparecer artefactos en los bordes.

En este ejemplo, observa cómo los bordes contienen partes de otros vehículos.

Configura `anis.cutFrames` en true antes de cargar animaciones para que p5play corte la imagen de la hoja de sprites en imágenes separadas

# 6-0

## Secuenciación de Animaciones

`sprite.changeAni` puede aceptar un objeto de animación, un nombre de animación o una matriz de nombres de animación que se reproducirán en secuencia.

De manera predeterminada, si la repetición está habilitada, la última animación de la secuencia se repetirá. Para repetir toda la secuencia, utiliza `'**'` como el último nombre de animación. Si, en cambio, deseas que la secuencia se detenga al final, utiliza `';;'` como el último nombre de animación.

¡Este ejemplo muestra cómo el personaje héroe puede moverse por la pantalla usando las teclas WASD o las teclas de flecha!

# 7-0

## Secuenciación de Animaciones Avanzada

`sprite.changeAni` es una función asíncrona, puedes usarla para esperar a que las animaciones terminen de reproducirse. Es particularmente útil para secuencias de animación programadas para [NPCs](https://es.wikipedia.org/wiki/Personaje_no_jugador).

En este ejemplo, el personaje héroe está practicando sus habilidades con la espada.
