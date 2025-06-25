/*
    En este archivo de JS se implementará el algoritmo de recomendación de canciones a través del criterio de la ruleta.

    Aquellas canciones que tengan una mayor cantidad de reproducciones, tendrán mayor probabilidad de ser recomendadas.

    Podemos describir el método de ruleta de la siguiente manera: 
    1.- Sea N el número total de reproducciones de todas las canciones (Por ejemplo, 321).
    2.- Sea n el número de reproducciones de una canción (Por ejemplo, 80) (es una canción popular!!!)
    3.- La probabilidad de que la canción sea recomendada es n/N (en este caso, 80/321 = 0.2492).
Observese que si una canción tuviera N reproducciones, la probabilidad de que sea recomendada sería 1 (100%), porque 321/321 = 1.

    4.- Para cada canción obtendremos la probabilidad de que sea recomendada y generaremos un arreglo guardando 
    las probabilidades de cada canción (por ejemplo, [0.2492, 0.1, 0.05, 0.15, 0.2, ...]).

    5.- Generaremos un número aleatorio entre 0 y 1 (por ejemplo, 0.35).

    6.- Generaremos un arreglo de probabilidades acumuladas, pero cuyo primer elemento sea 0 y el último sea 1.
    Por ejemplo, si las probabilidades son [0.2492, 0.1, 0.05, 0.15, 0.2, 0.2508], el arreglo de probabilidades acumuladas será:
    [0, 0.2492, 0.3492, 0.3992, 0.5492, 0.7492, 1]. Este arreglo tendrá dos elementos más que el arreglo de probabilidades 
    (porque estamos añadiendo 0 al principio y 1 al final). OJOOOOO: ESTE ARREGLO SIEMPRE SUMA 1 (O ALGO MUUUY CERCANO).

    |______|_______|_______|_______|_______|_______|      Dibujo no a escala jajaj
    0     0.2492 0.3492 0.3992  0.5492  0.7492     1

    7.- Debemos ver en qué intervalo cae el número aleatorio generado en el paso 5, y devolver la canción que corresponde a ese intervalo.


    MANOS A LA OBRA!!!


*/