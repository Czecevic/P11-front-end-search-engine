import Recipe from "../models/recipe.js";
import { searchInput } from "../utils/const.js";
import { displayRecipes } from "./index.js";

const mainSearch = (recipes) => {
  searchInput.addEventListener("keyup", (e) => {
    let keypressed = e.target.value;
    if (keypressed.length > 2) {
      let searchresult = [];
      for (let i = 0; i < recipes.length; i++) {
        let nameDescription = false;
        let ingredient = false;
        if (
          recipes[i].name.toLowerCase().includes(keypressed.toLowerCase()) ||
          recipes[i].description
            .toLowerCase()
            .includes(keypressed.toLowerCase())
        ) {
          nameDescription = true;
        }
        recipes[i].ingredients.forEach((ingredient) => {
          // console.log(ingredient.ingredient);
          if (
            ingredient.ingredient
              .toLowerCase()
              .includes(keypressed.toLowerCase())
          ) {
            ingredient = true;
          }
        });
        if (nameDescription || ingredient)
          if (!searchresult.includes(recipes[i])) {
            searchresult.push(recipes[i]);
          }
      }
      displayRecipes(searchresult);
    } else {
      displayRecipes(recipes);
    }
  });
};

export { mainSearch };

// utiliser filter a la place de foreach
