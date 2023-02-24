// ingredients
const ingredientList = document.querySelector("#ingredientsList");
const btnIngredient = document.querySelector("#ingredientsSearch");
const ingredientSpan = document.querySelectorAll("i")[0];

// appareil
const appareilList = document.querySelector("#appareilList");
const btnAppareil = document.querySelector("#appareilSearch");
const appareilSpan = document.querySelectorAll("i")[1];

// ustensiles
const ustensilesList = document.querySelector("#UstensilesList");
const btnUstensiles = document.querySelector("#ustensilesSearch");
const ustensilesSpan = document.querySelectorAll("i")[2];

// affichage des recettes
const recette = document.querySelector("#recette");
const searchInput = document.querySelector(".search");

// mettre search à la place de input

export {
  ingredientList,
  btnIngredient,
  btnAppareil,
  appareilList,
  ustensilesList,
  btnUstensiles,
  recette,
  searchInput,
};
