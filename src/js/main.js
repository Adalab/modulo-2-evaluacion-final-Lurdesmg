/* eslint-disable indent */
/* eslint-disable no-unused-vars */
'use strict';

// Elementos del Html
const inputSearch = document.querySelector('.js-search');
const btnSubmit = document.querySelector('.js-submit');
const btnReset = document.querySelector('.js-reset');
const listCocktail = document.querySelector('.js-list');
const favList = document.querySelector('.js-favourites');
const newbtn = document.querySelector('.js-newbtn');

// Variables creadas en JS
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const emptyImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=No-Image';

let listCocktailsData = [];
let listFavouritesData = [];

//! Llamada del localStorage (con sus datos guardados SI los hay!)
getFavouriteData();

// Función de evento click en el btn buscar, donde nos trae los datos del servidor
function handleSubmit(ev) {
    ev.preventDefault();
    const inputValue = inputSearch.value;
    fetch(`${url}${inputValue}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
      listCocktailsData = data.drinks.map((cocktail) =>({
        id: cocktail.idDrink,
        name: cocktail.strDrink,
        image: checkImage(cocktail.strDrinkThumb),
        ing1: cocktail.strIngredient1,
        ing2: cocktail.strIngredient2,
        ing3: cocktail.strIngredient3,

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
    <p>${cocktail.ing1}</p>
    <p>${cocktail.ing2}</p>
    <p>${cocktail.ing3}</p>
    </article>
    </li>`;
    return html;
}

// funcion para pintar la lista de fav y poder hacerle el ev para X
function renderFavouriteList(listFavouritesData) {
    // Vaciamos la ul para que no nos duplique los cockteles cada vez que añadamos uno!
    favList.innerHTML = '';
    // Pinta la lista de los favoritos!!
    for (const cocktail of listFavouritesData) {
        favList.innerHTML += renderFavouritCocktail(cocktail);
    }
    removeEventCocktail();
}

// funcion para pintar los elementos en favoritos y poder hacer el evento sobre el span, donde le ponemos el id, ya que nos venia null y daba error ya que en esta donde estamos haciendo el evento es sobre la X!!
function renderFavouritCocktail(cocktail) {
    const html = `<li>
    <article class="js-li-cocktail list_itemFav" id=${cocktail.id}>
    <img class="list_itemFav-img" src="${cocktail.image}" alt="${cocktail.name}">
    <h3 class="list_itemFav-name">${cocktail.name}</h3>
    <span class="js-removeCocktel xmark" id=${cocktail.id}><i class="fa-solid fa-circle-xmark"></i></span>
    </article>
    </li>`;
    return html;
}


function handleClick(ev) {
    // Evento para llamar la clase selected (cambia e l color en la lista si este se encuentra en favoritos!!)
    ev.currentTarget.classList.toggle('selected');
    // busca el id del cocktail seleccionado
    const idSelected = ev.currentTarget.id;
    // devuelve el primer elemento que cumpla la condicion
    const selectedCocktail = listCocktailsData.find(cocktail => cocktail.id === idSelected);
    // buscamos con el findIndex la posicion que se encuentra o no (-1)
    const indexCocktail = listFavouritesData.findIndex(cocktail => cocktail.id === idSelected);
    // comprobamos si ya existe en favoritos!!
    if (indexCocktail === -1) {
        listFavouritesData.push(selectedCocktail);
    } else {
        listFavouritesData.splice(indexCocktail, 1);
    }
    //! LLamar a la funcion de guardar en el localStorage y mandar listFavouritesData
    localStorage.setItem('favouriteCocktails', JSON.stringify(listFavouritesData));
    // llamada de la funcion para pintar la lista de favoritos
    renderFavouriteList(listFavouritesData);
}

// Almacenar favoritos en el localStorage!
function getFavouriteData() {
    const cocktailStorage = JSON.parse(localStorage.getItem('favouriteCocktails'));
    if (cocktailStorage) {
        listFavouritesData = cocktailStorage;
        renderFavouriteList(listFavouritesData);
    }
}

function removeEventCocktail() {
    // funcion para poder hacer el evento en la lista que se nos pinta
    const liElementList = document.querySelectorAll('.js-removeCocktel');
    for (const li of liElementList) {
        li.addEventListener('click', handleClick);
    }
}


function addEventToCocktail() {
    // funcion para poder hacer el evento en la lista que se nos pinta
    const liElementList = document.querySelectorAll('.js-li-cocktail');
    for (const li of liElementList) {
        li.addEventListener('click', handleClick);
    }
}

function handleReset(ev) {
    inputSearch.value = '';
    listCocktail.innerHTML = '';
}

function handleLog(ev) {
    ev.preventDefault();
    console.log(`tienes ${listFavouritesData.length} favoritos`);

}

// Evento btn buscar
btnSubmit.addEventListener('click' , handleSubmit);
btnReset.addEventListener('click' , handleReset);
newbtn.addEventListener('click' , handleLog);
