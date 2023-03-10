import recipes from "../recipes.js";
import { searchInput } from "../utils/const.js";
import { displayRecipes } from "./index.js";
let currentRecipes = [...recipes];

const mainSearch = (recipes) => {
  searchInput.addEventListener("keyup", (e) => {
    let keypressed = e.target.value.toLowerCase();
    if (keypressed.length > 2) {
      const filteredRecipes = recipes.filter((recipe) => {
        const nameDescription =
          recipe.name.toLowerCase().includes(keypressed) ||
          recipe.description.toLowerCase().includes(keypressed);
        const ingredient = recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(keypressed)
        );
        return nameDescription || ingredient;
      });
      displayRecipes(filteredRecipes);
    } else {
      displayRecipes(recipes);
    }
  });
};

export { mainSearch, currentRecipes };

// utiliser filter a la place de foreach

// const mainSearch = (recipes) => {
//   searchInput.addEventListener("keyup", (e) => {
//     let keypressed = e.target.value;
//     currentRecipes = [];
//     if (keypressed.length > 2) {
//       for (let i = 0; i < recipes.length; i++) {
//         let nameDescription = false;
//         let ingredient = false;
//         if (
//           recipes[i].name.toLowerCase().includes(keypressed.toLowerCase()) ||
//           recipes[i].description
//             .toLowerCase()
//             .includes(keypressed.toLowerCase())
//         ) {
//           nameDescription = true;
//         }
//         recipes[i].ingredients.forEach((ingredient) => {
//           // console.log(ingredient.ingredient);
//           if (
//             ingredient.ingredient
//               .toLowerCase()
//               .includes(keypressed.toLowerCase())
//           ) {
//             ingredient = true;
//           }
//         });
//         if (nameDescription || ingredient)
//           if (!currentRecipes.includes(recipes[i])) {
//             currentRecipes.push(recipes[i]);
//           }
//       }
//       displayRecipes(currentRecipes);
//     } else {
//       displayRecipes(recipes);
//     }
//   });
// };
