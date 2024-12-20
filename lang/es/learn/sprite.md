# 0-0

## Configuración

El código dentro de la función `setup` de [q5.js](https://q5js.org) (o [p5.js](https://p5js.org)) se ejecuta cuando comienza el programa. La función `update` se ejecuta 60 veces por segundo por defecto.

El constructor `new Canvas()` crea una sección de la pantalla en la que el programa puede dibujar.

¡Intenta cambiar el ancho y la altura del canvas (los números dentro del constructor `Canvas`), luego reinicia el programa de ejemplo!

# 0-1

## ¿Qué es un sprite?

¡Un sprite es un fantasma!

Los desarrolladores de videojuegos usan la palabra "sprite" para referirse a personajes, objetos, o cualquier otra cosa que se mueva sobre un fondo.

El constructor new Sprite() crea un objeto sprite, el cual contiene variables que definen la posición, tamaño y apariencia de un sprite.

¡Intenta editar las propiedades de los sprites de caja y círculo en los mini ejemplos a continuación!

# 0-2

## ¡Pruébalo!

Intenta convertir el sprite llamado `ball` en un círculo azul con un diámetro de 30 y colócalo en la esquina superior derecha del canvas.

# 1-0

## Física de los sprites

El colisionador de un sprite se utiliza para detectar colisiones con otros sprites. Por defecto, los sprites tienen un colisionador de física `'dynamic'` que permite que el sprite se mueva libremente y sea afectado por la gravedad.

Los colisionadores `'static'` no pueden moverse. Los colisionadores `'kinematic'` pueden moverse programáticamente pero no por otros sprites. Además, no colisionarán con otros colisionadores kinemáticos. Establecer el tipo de colisionador de un sprite a `'none'` lo elimina de la simulación física.

El tipo de colisionador también puede establecerse usando la primera letra del nombre del tipo de colisionador: `'d'`, `'s'`, `'k'`, o `'n'`.

¡Haz clic en el icono de recargar en la esquina superior derecha de un mini ejemplo para volver a reproducirlo!

# 1-1

## ¡Pruébalo!

Intenta crear un sprite llamado `peg` con un colisionador estático y forma de círculo. Crea un sprite `block` con un colisionador dinámico y forma de caja. Posiciona el bloque de modo que golpee el clavo y caiga hacia la derecha.

Cada vez que la función `draw` de p5.js termina, los sprites se dibujan y actualizan automáticamente. Nota que `world` se crea cuando se carga p5play pero por defecto no hay gravedad. Intenta establecer `world.gravity.y` en un número positivo.

Para un desafío adicional, intenta restablecer la posición original del bloque después de que caiga.

# 2-0

## Sprites con una Imagen

`sprite.image` (o `sprite.img`) puede establecerse como un p5.Image o una ruta de URL a un archivo de imagen.

Si necesitas que una imagen se cargue antes de que comience tu programa, es mejor usar [`loadImage`](https://q5js.org/learn/#loadImage) dentro de la función `preload` de p5.js.

`sprite.image.offset` se puede usar para desplazar la imagen en relación con el centro del sprite. Esto puede ayudar a alinear mejor la imagen con el colisionador de física del sprite.

Intenta hacer clic en el lienzo de este ejemplo. Cuando la propiedad `sprite.debug` está establecida en true, puedes ver el colisionador del cuerpo físico del sprite.

# 2-0-1

Establece la `opacity` (opacidad) de un sprite para cambiar la transparencia de su apariencia. Usa un valor entre 0 (completamente transparente) y 1 (completamente opaco).

`sprite.image.scale` cambia el tamaño de visualización de la imagen del sprite. El valor predeterminado es 1.0. Si la imagen aparece demasiado grande o pequeña, probablemente debas cambiar el tamaño del archivo de imagen en sí mismo.

# 2-1

## Sprites de Emoji

¿Sin imagen? 🫥 ¡No hay problema! 😄

Puedes usar cualquier emoji como la imagen para tu sprite.

El tamaño de la imagen del emoji se basará en el tamaño del sprite.

# 2-2

## Arte de Píxeles

Puedes utilizar la función `spriteArt` para crear imágenes de arte de píxeles para tus sprites. Recibe una cadena como entrada y devuelve una imagen. Cada carácter en la cadena representa el valor de color de un píxel en la imagen.

El segundo parámetro de entrada de la función `spriteArt` es la escala de la imagen.

# 2-3

## ¡Pruébalo!

¡Intenta crear tu propio arte de píxeles! Echa un vistazo al alfabeto a continuación para ver qué color representa cada letra de forma predeterminada.

# 2-4

## Colores Personalizados

También puedes crear arte de píxeles que utilice colores personalizados creando una paleta de colores y pasándola como tercer parámetro a la función `spriteArt`.

Las paletas de colores en p5play deben proporcionarse en formato [Objeto JavaScript](https://p5js.org/reference/p5/object). Un objeto JS simple es como un diccionario. Puedes definir un color para cada letra que uses en tu arte de píxeles. Para crear un color, utiliza la función [`color`](https://q5js.org/learn/#color) de p5.js, que acepta valores RGB (rojo, verde, azul) o códigos de color HEX.

La forma más sencilla de encontrar colores es utilizar un [selector de colores](https://www.google.com/search?q=selector+de+colores+google).

# 3-0

## Movimiento del Sprite

Mover un sprite editando directamente sus coordenadas (x, y) lo teletransportará a la nueva posición, sin moverlo a través de posiciones intermedias.

Prueba haciendo clic en este mini ejemplo.

# 3-1

Si deseas que un sprite interactúe físicamente con otros sprites mientras se mueve, ¡no lo teletransportes!

Este mal ejemplo muestra lo que sucede si un sprite es teletransportado cada vez que la función de dibujo (draw) de p5.js renderiza un fotograma.

# 3-2

Todos los otros métodos de movimiento en esta página funcionan cambiando las velocidades de los ejes x e y del sprite. `velocity` también conocida como `vel` es un Vector de p5.js, puedes usar cualquier función de Vector en él.

Puede que tengas que reiniciar este ejemplo para ver moverse al sprite.

# 3-3

Mueve el sprite indefinidamente estableciendo su `direction` y `speed`.

También puedes establecer la dirección de un sprite usando un nombre de dirección como: 'up', 'down', 'left', 'right', 'upLeft', 'upRight', 'downLeft', 'downRight'.

Nota que p5play convierte estos nombres de dirección a sus correspondientes valores de ángulo.

# 3-4

La función `move` mueve un sprite a través de una distancia fija. La dirección y la velocidad del movimiento pueden especificarse como parámetros de la función o establecerse por separado.

# 3-5

La función `moveTowards` mueve un sprite hacia una posición, a un porcentaje de la distancia a esa posición.

En este ejemplo, el jugador se mueve el 10% de la distancia al ratón en cada llamada de dibujo de p5.js. Su velocidad, y la fuerza que ejerce sobre el bloque, es proporcional a la distancia que se mueve.

# 3-6

La función `moveTo` genera un impulso que mueve un sprite a una posición a una velocidad constante.

Pero ten en cuenta que si el sprite es actuado por una fuerza como la gravedad o choca con otro sprite, su velocidad y dirección se verán afectadas y puede que no llegue a la posición objetivo.

Cualquier función de movimiento que acepte un objeto con propiedades x e y podría en su lugar ser llamada con números de posición (x, y).

# 3-7

Esperamos que los ejemplos en esta página te ayuden a entender algunas de las opciones de movimiento disponibles en p5play.

Ten en cuenta que las funciones move, moveTo y moveTowards anulan el movimiento actual de un sprite, obligándolo a moverse en una nueva dirección. ¡Eso podría no ser siempre lo que quieres!

Para aprender más sobre el movimiento de sprites, lee las páginas de "Secuenciación de Movimientos" y "Movimiento Avanzado".

# 4-0

## Crea Sprites más rápido

Dentro del constructor de Sprite, `new Sprite()`, puedes especificar la posición, el tamaño y el tipo de colisionador del sprite.

Como viste en las páginas de referencia de Sprite anteriores, no necesitas agregar ninguna entrada al constructor de Sprite para crear un sprite. Pero si quieres establecer el tamaño de un sprite en el constructor, necesitarás especificar su posición primero.

Por defecto, si no se dan entradas al constructor de Sprite, los nuevos sprites se posicionan en el centro del lienzo, con un ancho y altura de 50 píxeles, y un colisionador dinámico.

# 4-1

## ¡Pruébalo!

Intenta crear dos sprites usando el constructor de sprite.

# 5-0

## Colisiones

En el primer fotograma en que un sprite colisiona con otro sprite, la función `collides` devuelve true.

Mientras un sprite está colisionando con otro sprite, la función `colliding` devuelve el número de fotogramas que ha ocurrido la colisión.

En el primer fotograma después de que dos sprites colisionaron, la función `collided` devuelve true.

# 6-0

## Superposiciones

¡Los sprites colisionan por defecto, pero también pueden superponerse!

# 6-1

## Capa

Por defecto, los sprites se dibujan en el orden en que fueron creados. Puedes cambiar el orden de dibujo editando la propiedad `.layer` del sprite. Los sprites con el valor de capa más alto se dibujan primero.

# 6-2

En el primer fotograma en que un sprite se superpone con otro sprite, la función `overlaps` devuelve true.

Mientras un sprite se superpone con otro sprite, la función `overlapping` devuelve el número de fotogramas que ha ocurrido la superposición.

En el primer fotograma después de que dos sprites se superpongan, la función `overlapped` devuelve true.

Ten en cuenta que las interacciones físicas entre sprites, incluyendo colisiones y superposiciones, no pueden detectarse correctamente cuando un sprite es teletransportado, ¡su posición cambia directamente!

# 6-3

## ¡Pruébalo!

Intenta hacer que el sprite azul cambie a rojo solo si se superpone con el sprite rojo.

# 6-4

## Cambiar entre superposiciones y colisiones

Por defecto, si compruebas si hay una superposición entre dos sprites, ya no colisionarán. Puedes anular esto comprobando si hay una colisión entre los sprites.

En este ejemplo, al presionar la tecla de espacio se permite temporalmente al jugador atravesar la pared como un fantasma.

# 7-0

## Rotación de Sprite

Cambiar directamente la propiedad `rotation` de un sprite lo teletransportará al ángulo de rotación especificado.

¡No teletransportes un sprite si quieres que interactúe físicamente con otros sprites mientras está rotando!

# 7-1

Todos los otros métodos de rotación en esta página funcionan cambiando la `rotationSpeed` del sprite.

# 7-2

Usa la función `rotate` para rotar un sprite una cantidad.

El segundo parámetro opcional es la velocidad a la que rota el sprite por fotograma.

# 7-3

Use la función `rotateTo` para rotar un sprite a un ángulo o para enfrentar una posición. La función `rotateMinTo` cambia el signo de la velocidad de rotación del sprite si es necesario para rotar el sprite la distancia angular mínima para enfrentar el ángulo de destino. El ángulo de "facing", un tercer parámetro opcional, es el ángulo al que el sprite debería estar cuando enfrenta la posición objetivo.

Intente cambiar el ángulo de enfrentamiento de 0 a 90 en el ejemplo de código. Luego, cuando haga clic, el lado largo del sprite se rotará para enfrentar el ratón.

# 7-4

Usa la función `rotateTowards` para girar un sprite hacia un ángulo o hacia una posición.

El segundo parámetro opcional es la velocidad de seguimiento, un porcentaje de la distancia que el sprite se mueve en cada fotograma al ángulo de rotación objetivo, 0.1 (10%) por defecto.

# 7-5

Usa la propiedad `offset` para mover el cuerpo físico del sprite en relación con su centro.

Cuando `sprite.debug` es true, el centro del sprite está marcado con una pequeña cruz verde. El punto central es donde se encuentran las coordenadas x e y del sprite. También es el centro de rotación.

# 8-0

## Secuenciación de movimientos

Estos ejemplos utilizan un sprite `Turtle` que es simplemente un sprite regular
que es verde y tiene forma de triángulo para ese aspecto clásico de la
programación de tortugas.

Puedes usar la palabra clave `await` dentro de una función `async` para esperar a que un movimiento termine antes de continuar con el siguiente movimiento. Esto es útil para hacer que un sprite se mueva en secuencia.

# 8-1

Las funciones `move`, `moveTo`, `rotate`, y `rotateTo` todas devuelven una `Promise` que se resuelve a true cuando el movimiento ha terminado.

Pero, si el movimiento del sprite se interrumpe por un nuevo movimiento o una colisión que cambia significativamente la trayectoria del sprite, la promesa se resolverá a false.

# 8-2

Si deseas que un sprite siga a otro sprite, es posible que te sientas tentado a usar `moveTo` repetidamente, sin esperar a que el sprite alcance su destino. Pero para un mejor rendimiento, prueba usar la función `angleTo`, que obtiene el ángulo entre un sprite y una posición. Este ángulo puede utilizarse para cambiar la dirección en la que se mueve el sprite.

En este ejemplo, se utiliza la función `dist` de [p5.js](https://q5js.org/learn/#dist) para calcular la distancia entre el jugador y su aliado.

# 9-0

## Atributos físicos

Los Sprites tienen atributos físicos que afectan cómo interactúan con el mundo. Echa un vistazo a los mini-ejemplos para ver estos atributos en acción.

# 9-1

## Masa

Por defecto, la `mass` se asigna en función del tamaño del sprite. Cuanto mayor sea el sprite, más masa tendrá. La masa también puede ser ajustada manualmente.

# 9-2

## ¡Pruébalo!

Intenta cambiar la masa de uno de los sprites en este mini ejemplo.

# 9-3

## Bugs en planck

p5play usa el motor de física planck, que normalmente ofrece interacciones físicas de apariencia realista, pero no es perfecto.

En este mini-ejemplo, la bola tiene una `bounciness` de 1, así que cada vez que la bola rebota debería volver a su posición inicial. Sin embargo, debido a un bug en planck, la bola rebota cada vez más alto cada vez que golpea el suelo.

# 9-4

Esperemos que el bug se solucione en una futura versión de planck o p5play, pero hasta entonces aquí tienes una solución alternativa.

El bug de `bounciness` es más notorio cuando un colisionador rebota en una superficie plana. Aquí tienes una solución alternativa que sobrescribe la velocidad y de la bola después de que colisiona con el suelo.

# 9-5

En este ejemplo, el color del bloque es rojo cuando está colisionando con la plataforma móvil. Aunque podrías esperar que el bloque se mantenga rojo mientras está siendo levantado por la plataforma, parpadea entre rojo y azul.

En la vida real, cuando una persona sube a un ascensor y este sube, diríamos que esa persona estaría colisionando con el suelo del ascensor durante todo el trayecto.

En planck, sin embargo, cuando los colisionadores son desplazados por otros colisionadores, constantemente colisionan y dejan de colisionar entre sí.

Si estás intentando hacer un juego de plataformas (como Super Mario Bros.), el 'colliding' no es una manera confiable de verificar si un sprite está parado en una plataforma. Echa un vistazo a mi [demostración de plataformas](https://openprocessing.org/sketch/1869796).

# 10-0

## Colisionadores de Cadena

Hay tres modos de cadena diferentes: vértice, distancia y línea.

Para usar el modo vértice, proporciona al constructor Sprite un array de arrays de vértices. Cada array de vértices debe contener coordenadas \[x, y\]. En estos mini-ejemplos, la posición (x, y) del sprite está resaltada por un pequeño cuadrado negro.

¡Intenta cambiar los vértices del sprite de cadena en el mini-ejemplo para que la bola se quede en el suelo!

# 10-1

Para usar el modo distancia, proporciona al constructor Sprite una posición (x, y) y un array de arrays de distancia. Estos arrays deben contener distancias \[x, y\] relativas al vértice anterior. La posición (x, y) será el primer vértice de la cadena.

El modo distancia es el mejor para crear cadenas súper largas.

Intenta añadir 5 distancias para hacer que el suelo suba y baje en una cadena de suelo rocoso.

# 10-2

Para usar el modo línea, proporciona al constructor Sprite una posición (x,y) y una lista de longitudes de línea y ángulos. Cada ángulo es relativo al ángulo de la línea anterior.

Es mejor usar el modo línea para cadenas pequeñas y/o simétricas.

Nota que la posición (x, y) de la cadena del modo línea se ubica en el promedio de todos sus vértices, lo cual puede no ser un punto en la cadena.

¡Intenta cambiar las longitudes de estas líneas y sus ángulos!

# 11-0

## Colisionadores de Polígonos

Los polígonos regulares pueden crearse proporcionando al constructor Sprite una longitud de lado y el nombre del polígono.

Estos son los nombres que puedes usar: triángulo, cuadrado, pentágono, hexágono, septágono, octágono, eneágono, decágono, hendecágono y dodecágono.

# 11-1

Si el inicio y el final de una cadena están en el mismo punto y la forma resultante es convexa, ¡se convierte automáticamente en un polígono!

# 11-2

Independientemente de si un sprite es un polígono o una cadena, todos los cuerpos físicos que comienzan y terminan en el mismo punto tienen su posición (x, y) ubicada en el centro de la forma, no en el primer vértice. Esta posición se calcula promediando todos los vértices de la forma.

# 11-3

Puedes forzar a que un polígono convexo sea una cadena estableciendo `sprite.shape = 'chain'`

Los polígonos regulares pueden crearse a partir de una lista con la longitud de línea, ángulo y repetición.

La fórmula para el ángulo de un polígono regular es 360 / n, donde n es el número de lados. Haz que ese ángulo sea negativo para orientar el polígono con uno de sus bordes en la parte superior.

¡Intenta hacer una cadena en forma de cuadrado!

# 11-4

Aquí está el código para hacer una estrella regular con cinco puntos.

Nota que debido a que la estrella es una forma cóncava, no puede tener un colisionador de polígono.

¡Intenta cambiar el número de puntos!

# 11-5

¡Ahora puedes ver cómo se hizo el logotipo de p5play!

Incluso las cadenas cerradas como esta están hechas de líneas y están vacías por dentro. En el ejemplo de la página principal de p5play, puedes ver cómo los colisionadores de cadena pueden contener muchos otros sprites dentro de ellos!

# 11-6

Nota que los colisionadores de cadena cerrada no son tan buenos para ser colisionadores dinámicos. Esta es una limitación del motor de física Box2D que utiliza p5play.

# 12-0

## Dibujo personalizado

A veces no podrás usar animaciones predibujadas para obtener el tipo de efecto visual que quieres para un sprite en movimiento.

Afortunadamente, puedes personalizar la función `draw` del sprite y hacer que muestre cualquier cosa que quieras!

Ten en cuenta que dentro de la función de dibujo del sprite, el centro del sprite se traduce a la posición (0, 0).

Este mini ejemplo rota la elipse del sprite en la dirección en la que se está moviendo y hace que la elipse se estire en esa dirección proporcionalmente a su velocidad. ¡Un poco complicado!

# 12-1

## Actualización personalizada

También puedes definir una función `update` de actualización personalizada para un sprite que se ejecuta al final del bucle de dibujo o cuando se llama a updateSprites. Puedes poner cualquier comportamiento específico del sprite que quieras allí.

# 13-0

## escala

Cambiar `sprite.scale` escalará el colisionador del sprite y la apariencia visual por la cantidad especificada.

Presiona una tecla numérica para ver el sprite escalar uniformemente por esa cantidad.

Presiona "d" para duplicar la escala del sprite.

Presiona "x" o "y" para escalar el sprite en esa dirección por una cantidad aleatoria. Pero ten en cuenta que si el sprite se escala de manera desigual, la imagen se distorsionará y permanecerá así incluso cuando se escale uniformemente de nuevo.

# 14-0

## Colisionadores Combo

Usando la función `addCollider`, puedes agregar varios colisionadores a un sprite.

¡Pero solo usa esta función cuando realmente sea necesario para el juego! Normalmente, si algo requiere muchos colisionadores, como las paredes de un laberinto, simplemente deberías crear varios sprites, cada uno con su propio colisionador. Además, incluso si la imagen de un sprite es compleja, típicamente una caja o círculo será suficiente para las interacciones físicas, especialmente para sprites pequeños.

Sin embargo, a veces, realmente necesitarás crear un sprite con varios colisionadores. ¡Por ejemplo, si quieres modelar un flipper de pinball!

# 14-1

## Sensores de Combinación

Los sensores de superposición determinan si un sprite se superpone con otro sprite.

Por defecto, cuando se utiliza un método de verificación de superposición y el sprite no tiene sensores, se utiliza la función `addDefaultSensors` en segundo plano para crear sensores para cada uno de los colisionadores del sprite.

Puedes agregar sensores adicionales a un sprite utilizando la función `addSensor`.

# 15-0

## Movimiento Avanzado

Las funciones de `move` son imperativas, sobrescriben las velocidades de un sprite. Pero, ¿qué sucede si deseas que un sprite respete otras fuerzas que actúan sobre él, como la gravedad?

Un rumbo es la dirección que debe seguirse para llegar a un destino. Cambiar el `rumbo` de un sprite no cambiará imperativamente su dirección de movimiento.

Utiliza `applyForce` con un parámetro de entrada, la cantidad de fuerza, para que la fuerza se aplique en el ángulo del `rumbo` del sprite.

En este ejemplo, el dron debe vencer la fuerza de gravedad para volar. ¡Haz que el dron vuele y luego déjalo caer, cuando se aplique una fuerza hacia arriba al dron, dejará gradualmente de caer y comenzará a volar!

# 15-1

La función `applyForceScaled` multiplica la fuerza aplicada al sprite por su masa.

¡Puedes usar esta función para darles a los sprites su propia gravedad!

Ambas funciones de fuerza pueden aceptar la fuerza como componentes x e y separados o como una cantidad, siempre que establezcas el `rumbo` del sprite.

Por defecto, la fuerza se aplica al centro de masa del sprite. Pero las funciones `applyForce` y `applyForceScaled` también pueden aceptar un último parámetro de entrada, un objeto de posición con propiedades x e y que especifica la posición relativa donde se aplicará la fuerza en el sprite.

# 15-2

Utiliza la función `attractTo` para atraer al sprite hacia una posición aplicando fuerza. La posición puede ser proporcionada como un objeto con propiedades x e y, o como parámetros separados x e y.

Este ejemplo simula la órbita de un electrón alrededor del núcleo de un átomo.

Ten en cuenta que las funciones de movimiento avanzado mostradas en esta página no despertarán a los [sprites en reposo](./world.html)!

# 15-3

El torque es la fuerza que provoca la rotación. Utiliza `applyTorque` para afectar el giro del sprite de manera no imperativa.

En este ejemplo, el robot rueda más despacio en lugares donde el suelo es más empinado.
