import {
  ingredientList,
  btnIngredient,
  btnAppareil,
  appareilList,
  ustensilesList,
  btnUstensiles,
  ingredientSpan,
  appareilSpan,
  ustensilesSpan,
} from "../utils/const.js";
import { printFavoriItem } from "./favori.js";
import { currentRecipes } from "./mainSearch.js";
import { displayRecipes } from "./index.js";

const filterTags = (recipes) => {
  let seeRecipes = false;
  const filterByInput = (list, input, filterFunction) => {
    const key = input.value.toLowerCase();
    if (key.length > 0) {
      list.style.display = "block";
      list.innerHTML = "";
      const addedItems = {};
      recipes.forEach((recipe) => {
        filterFunction(recipe).forEach((item) => {
          const itemName = item.toLowerCase();
          if (itemName.includes(key)) {
            if (!addedItems[itemName]) {
              list.innerHTML += `<li class="search-list-ingredients">
              <a id="itemFavori">${item}</a>
              </li>`;
              addedItems[itemName] = true;
            }
          }
        });
      });
      seeRecipes = true;

      // Ajouter un gestionnaire d'événements click à chaque élément de la liste
      const itemFavoriList = document.querySelectorAll(
        ".search-list-ingredients a"
      );
      itemFavoriList.forEach((item) => {
        item.addEventListener("click", () => {
          const selectedIngredient = item.innerHTML;
          removeList(list);
          const filteredRecipes = currentRecipes.filter((recipe) => {
            return recipe.ingredients.some(
              (ingredient) => ingredient.ingredient === selectedIngredient
            );
          });
          displayRecipes(filteredRecipes);
        });
      });
    } else {
      removeList(list);
      seeRecipes = false;
    }
    printFavoriItem();
  };

  const allRecipesBySpan = (list, filterFunction) => {
    if (seeRecipes == false) {
      list.style.display = "block";
      list.innerHTML = "";
      const addedItems = {};
      recipes.forEach((recipe) => {
        filterFunction(recipe).forEach((item) => {
          const itemName = item.toLowerCase();
          if (!addedItems[itemName]) {
            addedItems[itemName] = true;
            list.innerHTML += `<li class="search-list-ingredients">
                <a>${item}</a>
              </li>`;
          }
        });
      });

      // tri des éléments de la liste par ordre alphabétique
      const listItems = Array.from(list.querySelectorAll("li"));
      listItems.sort((a, b) => a.innerHTML.localeCompare(b.innerHTML));
      list.innerHTML = "";
      listItems.forEach((li) => list.appendChild(li));

      seeRecipes = true;

      // Ajouter un gestionnaire d'événements click à chaque élément de la liste
      const itemFavoriList = document.querySelectorAll(
        ".search-list-ingredients a"
      );
      itemFavoriList.forEach((item) => {
        item.addEventListener("click", () => {
          const selectedIngredient = item.innerHTML;
          removeList(list);
          const filteredRecipes = currentRecipes.filter((recipe) => {
            return recipe.ingredients.some(
              (ingredient) => ingredient.ingredient === selectedIngredient
            );
          });
          displayRecipes(filteredRecipes);
        });
      });
    } else {
      removeList(list);
      seeRecipes = false;
    }
    printFavoriItem();
  };

  const removeList = (list) => {
    list.innerHTML = "";
  };

  // Ajouter un événement "click" au bouton
  ingredientSpan.addEventListener("click", () => {
    allRecipesBySpan(ingredientList, (recipe) => {
      return recipe.ingredients.map((ingredient) => ingredient.ingredient);
    });
  });

  btnIngredient.addEventListener("keyup", (e) => {
    filterByInput(ingredientList, e.target, (recipe) => {
      return recipe.ingredients.map((ingredient) => ingredient.ingredient);
    });
  });

  appareilSpan.addEventListener("click", () => {
    allRecipesBySpan(appareilList, (recipe) => {
      return [recipe.appliance];
    });
  });

  btnAppareil.addEventListener("keyup", (e) => {
    filterByInput(appareilList, e.target, (recipe) => {
      return [recipe.appliance];
    });
  });

  ustensilesSpan.addEventListener("click", () => {
    allRecipesBySpan(ustensilesList, (recipe) => {
      return recipe.ustensils;
    });
  });

  btnUstensiles.addEventListener("keyup", (e) => {
    filterByInput(ustensilesList, e.target, (recipe) => {
      return recipe.ustensils;
    });
  });
};

export { filterTags };
