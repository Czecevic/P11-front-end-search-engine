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
