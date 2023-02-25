/* eslint-disable indent */
/* eslint-disable no-unused-vars */
'use strict';

// Elementos del Html
const inputSearch = document.querySelector('.js-search');
const btnSubmit = document.querySelector('.js-submit');
const btnReset = document.querySelector('.js-reset');
const listElement = document.querySelector('.js-list');
const favElement = document.querySelector('.js-favourites');

// Variables creadas en JS
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const emptyImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=No-Image';

let listCocktailsData = [];

// Función de evento click en el btn buscar, donde nos trae los datos del servidor
function handleSubmit(ev) {
    ev.preventDefault();
    const inputValue = inputSearch.value;
    fetch(`${url}${inputValue}`)
    .then(response => response.json())
    .then(data => {
      listCocktailsData = data.drinks.map((cocktail) =>({
        id: cocktail.idDrink,
        name: cocktail.strDrink,
        image: checkImage(cocktail.strDrinkThumb),
      }));
      // Llamada de la funcion para que pinte los datos al html
        renderListCocktails(listCocktailsData);
    });
}

// Funcion para que cunmpla la condición de la imagen si viene undefined/null/vacia
function checkImage(strDrinkThumb) {
    if (strDrinkThumb) {
        return strDrinkThumb;
    } else {
        return emptyImage;
    }
}

// Función que pinta la lista de los cockteles
function renderListCocktails(listCocktailsData) {
    for (const cocktail of listCocktailsData) {
        listElement.innerHTML += renderCocktail(cocktail);
    }
}


// Función donde estamos pintado la estructura del html para cada cocktail
function renderCocktail(cocktail) {
    const html = `<li>
    <img src="${cocktail.image}" alt="${cocktail.name}">
    <h3>${cocktail.name}</h3>
    </li>`;
    return html;
}


// Evento btn buscar
btnSubmit.addEventListener('click' , handleSubmit);
