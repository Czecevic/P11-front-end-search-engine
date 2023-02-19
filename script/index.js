import recipes from "../recipes.js";
import {
  ingredientList,
  btnIngredient,
  appareilInput,
  btnAppareil,
  appareilList,
  ustensilesList,
  btnUstensiles,
  recette,
  searchInput,
} from "../utils/const.js";
import Recipe from "../models/recipe.js";
import { mainSearch } from "./mainSearch.js";
// plat

// console.log(recipes);
// let ingredientArray = [];
// recipes.forEach((recipe) => {
//   btnIngredient.addEventListener("click", () => {
//     recipe.ingredients.forEach((ingredient) => {
//       if (ingredientArray.includes(ingredient.ingredient) != true) {
//         ingredientArray.push(ingredient.ingredient);
//       }
//       console.log(ingredientArray);
//       ingredientList.innerHTML += "<li>" + ingredient.ingredient + "</li>";
//     });
//   });

//   btnAppareil.addEventListener("click", () => {
//     // console.log(recipe.appliance);
//     let appareilArray = [];
//     appareilInput.addEventListener("keypress", () => {
//       console.log(appareilInput.value);
//     });
//     appareilList.innerHTML += "<li>" + recipe.appliance + "</li>";
//   });

//   btnUstensiles.addEventListener("click", () => {
//     recipe.ustensils.forEach((ustensils) => {
//       //   console.log(ustensils);
//       ustensilesList.innerHTML += "<li>" + ustensils + "</li>";
//     });
//   });
// });

const displayRecipes = (recipes) => {
  recipes.forEach((recipe) => {
    const display = new Recipe(recipe);
    mainSearch(recipes, searchInput, recette);
    recette.innerHTML += display.render();
  });
};

const init = () => {
  displayRecipes(recipes);
};

init();
