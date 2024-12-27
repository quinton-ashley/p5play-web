# 0-0

## Azulejos

Para el Super Mario Bros. original, el desarrollador principal, Shigeru Miyamoto, y el diseñador de niveles, Takashi Tezuka, [utilizaron papel cuadriculado para trazar los niveles](https://www.youtube.com/watch?v=DLoRd6_a1CI) y luego tuvieron a su equipo de programadores escribiendo las coordenadas de cada sprite en el juego. ¡Eso es mucho trabajo!

Afortunadamente para ti, en p5play el constructor `Tiles` puede hacer sprites en una cuadrícula basándose en las posiciones de los caracteres en una cadena de texto!

El primer parámetro de entrada es una cadena de texto o un array de cadenas de texto, cada línea o cadena en el array representa una fila de azulejos.

El segundo y tercer parámetros de entrada son las coordenadas x e y de la parte superior izquierda (primer) azulejo en la cuadrícula de azulejos.

El cuarto y quinto parámetros de entrada son el ancho y alto respectivamente de cada azulejo y cualquier espacio que quieras añadir entre azulejos.

## ¡Pruébalo!

Intenta editar el diseño de los ladrillos "P5".

Nota que los espacios " " o puntos "." se utilizan para indicar que no se deben hacer sprites en esa posición en la cuadrícula de azulejos. En este ejemplo, el carácter "=" se utiliza para `bricks`.
