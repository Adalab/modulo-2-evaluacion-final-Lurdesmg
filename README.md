# Evaluación - Modulo 2 Lourdes M.G

En este 2º modulo hemos creado una app de cockteles con interacción.

# Como funciona la app:
1. Tenemos un campo donde poner el nombre del cocktail y dos botones (buscar y reset).
2. Si ponemos un cocktail en el buscador y damos a buscar nos aparecerán las opciones que nos hemos traido del servidor (API), pintadas en la lista de la derecha.
3. Si seleccionamos una de estas, esta se añadirá a la lista de favoritos, ademas de que en la lista se nos pintará de forma diferente para que sepamos que la tenemos seleccionada en favoritos.
4. Si volvemos a hacer click en el cocktail marcado en la lista, se quitará de la lista de favoritos y volvera a marcarse como el resto de los cockteles.
5. Desde la lista de favoritos tambien tenemos la opción de borrar la bebida dandole a la X que nos aparece en el lado de esta.
6. Si le damos al boton reset, se nos limpiará el campo de buscar y la lista buscada, pero no la de favoritos.
7. El diseño de la pagina se va adaptando al listado de cockteles que le metamos.


## Como he estructurado el html:
El HTML lo he dividido en tres secciones, como ya conocemos:
1. Head
2. Main
3. Footer

## Lenguajes que he utilizado:
1. Html
2. Css (con scss)
   Dentro del CSS para hacer la maquetación he utilizado:
   * Flexbox
3. JS
   Donde hemos utilizado:
   * Variables (creadas en el mismo JS o traidas del HTML)
   * Fetch para traernos los datos del servidor/API
   * Funciones 
   * Condicionales
   * Eventos

## Que problemas he tenido:
Desde el principio, me costó bastante traerme los datos del servidor, ya que no lo estaba llamando como debería, ademas de que la url ya tenía como busca predefinida la margarita, por lo que tuve que quitar esa parte de la url, y añadirle el inputValue para que me cogiera los valores que yo quería buscar.

Lo que mas me cuesta es saber donde tengo que hacer las llamadas de las funciones, ya que empezamos a crear una para que pinte los datos, la otra para que los traiga o hagan el evento... al final ya no se donde tengo que llamarlas.


## Que mejorar:
No consigo quitar el marcador del cocktail cuando lo hemos puesto en favorito si lo quito con la X.
Las funciones hacerlas mas optimizadas, me siento que tengo muchiiiiisimas lineas y que lo podría hacer mucho mas limpio...además de que tengo comentario por cada función para poder ver que es lo que estoy haciendo en cada una!!

Seguro que vosotros teneis algo más que decirme para mejorar :P


> Espero que disfruteis viendo el trabajo realizado. Muchas Gracias!!!
