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

let listCocktailsData = [];


// Funciones
function handleSubmit(ev) {
    ev.preventDefault();
    const inputValue = inputSearch.value;
    console.log(inputValue);
    fetch(`${url}${inputValue}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.drinks);
      listCocktailsData = data.drinks.map((cocktail) =>({
        id: cocktail.idDrink,
        name: cocktail.strDrink,
        image: cocktail.strDrinkThumb,
      }));
        renderListCocktails(listCocktailsData);
    });
}

function renderListCocktails(listCocktailsData) {
    console.log(listCocktailsData);
        for (const cocktail of listCocktailsData) {
            listElement.innerHTML += renderCocktail(cocktail);
        }
    }
    
    function renderCocktail(cocktail) {
        const html = `<li>
        <img src="${cocktail.image}" alt="${cocktail.name}">
        <h3>${cocktail.name}</h3>
        </li>`;
        return html;
    }


// Eventos
btnSubmit.addEventListener('click' , handleSubmit);
