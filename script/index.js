import recipes from "../recipes.js";
// import * as consts from "../utils/const.js";
import Recipe from "../models/recipe.js";
import { currentRecipes, mainSearch } from "./mainSearch.js";
import { filterTags } from "./filterTags.js";

const displayRecipes = (recipes) => {
  recette.innerHTML = "";
  recipes.forEach((recipe) => {
    const display = new Recipe(recipe);
    recette.innerHTML += display.render();
  });
};

const init = () => {
  displayRecipes(recipes);
  mainSearch(recipes);
  filterTags(currentRecipes);
};

init();

export { displayRecipes };
