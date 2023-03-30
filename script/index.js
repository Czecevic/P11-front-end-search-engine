import recipes from "../recipes.js";
// import * as consts from "../utils/const.js";
import Recipe from "../models/recipe.js";
import { currentRecipes, mainSearch } from "./mainSearch.js";
import { filterTags } from "./filterTags.js";

const displayRecipes = (recipes) => {
  recette.innerHTML = "";
  if (recipes.length == 0) {
    recette.innerHTML = `<h1>Aucune recette ne correspond à votre critère… vous pouvez chercher coco, etc</h1>`;
  } else {
    recipes.forEach((recipe) => {
      const display = new Recipe(recipe);
      recette.innerHTML += display.render();
    });
  }
};

const init = () => {
  displayRecipes(currentRecipes);
  mainSearch(currentRecipes);
  filterTags(currentRecipes);
};

init();

export { displayRecipes };
