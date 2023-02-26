/* eslint-disable indent */
/* eslint-disable no-unused-vars */
'use strict';

// Elementos del Html
const inputSearch = document.querySelector('.js-search');
const btnSubmit = document.querySelector('.js-submit');
const btnReset = document.querySelector('.js-reset');
const listCocktail = document.querySelector('.js-list');
const favList = document.querySelector('.js-favourites');

// Variables creadas en JS
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const emptyImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=No-Image';

let listCocktailsData = [];
let listFavouritesData = [];


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
    listCocktail.innerHTML = '';
    for (const cocktail of listCocktailsData) {
        listCocktail.innerHTML += renderCocktail(cocktail);
    }
    //Llamamos a la función para añadir el evento en el cocktail que queramos, una vez se nos hayan pintado los datos!!
    addEventToCocktail();
}


// Función donde estamos pintado la estructura del html para cada cocktail
function renderCocktail(cocktail) {
    const html = `<li>
    <article class="js-li-cocktail list_item" id=${cocktail.id}>
    <img class="list_item-img" src="${cocktail.image}" alt="${cocktail.name}">
    <h3 class="list_item-name">${cocktail.name}</h3>
    </article>
    </li>`;
    return html;
}

function renderFavouriteList(listFavouritesData) {
    // Vaciamos la ul para que no nos duplique los cockteles cada vez que añadamos uno!
    favList.innerHTML = '';
    // Pinta la lista de los favoritos!!
    for (const cocktail of listFavouritesData) {
        favList.innerHTML += renderCocktail(cocktail);
    }
}

function handleClick(ev) {

    const idSelected = ev.currentTarget.id;
    const selectedCocktail = listCocktailsData.find(cocktail => cocktail.id === idSelected);
    const indexCocktail = listFavouritesData.findIndex(cocktail => cocktail.id === idSelected);

    if (indexCocktail === -1) {
        listFavouritesData.push(selectedCocktail);
    } else {
        listFavouritesData.splice(indexCocktail, 1);
    }
    renderFavouriteList(listFavouritesData);
}

function addEventToCocktail() {
    const liElementList = document.querySelectorAll('.js-li-cocktail');
    for (const li of liElementList) {
        li.addEventListener('click', handleClick);
    }
}


// Evento btn buscar
btnSubmit.addEventListener('click' , handleSubmit);
