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
import { printTagItem } from "./tag.js";
import { currentRecipes } from "./mainSearch.js";
import { displayRecipes } from "./index.js";

const removeList = (list) => {
  list.innerHTML = "";
};

const filterTags = (recipes) => {
  // seeRecipes permet de gérer l'affichage via le boolean
  let seeRecipes = false;
  // filtre les input que nous rentrons via la const key
  const filterByInput = (list, input, filterFunction, special) => {
    const key = input.value.toLowerCase();
    // si key > 0 alors nous affichons la liste
    if (key.length > 0) {
      list.style.display = "grid";
      list.innerHTML = "";
      const addedItems = {};
      // on parcours currentRecipes pour pouvoir filtrer les propriétés et attributs ayant une affinité avec le tag selectionné
      recipes.forEach((recipe) => {
        filterFunction(recipe).forEach((item) => {
          const itemName = item.toLowerCase();
          if (itemName.includes(key)) {
            if (!addedItems[itemName]) {
              list.innerHTML += `<li class="search-list-${special}">
              <a id="itemFavori">${item}</a>
              </li>`;
              addedItems[itemName] = true;
            }
          }
        });
      });
      seeRecipes = true;
      // Ajouter un gestionnaire d'événements click à chaque élément de la liste
      const itemTagList = document.querySelectorAll(`.listOf${special} a`);
      itemTagList.forEach((item) => {
        item.addEventListener("click", () => {
          const selectedFilter = item.innerHTML;
          removeList(list);
          const filteredRecipes = currentRecipes.filter((recipe) => {
            if (special === "ingredients") {
              return recipe.ingredients.some(
                (ingredient) => ingredient.ingredient === selectedFilter
              );
            } else if (special === "appareil") {
              return recipe.appliance === selectedFilter;
            } else if (special === "ustensils") {
              return recipe.ustensils.includes(selectedFilter);
            }
          });
          displayRecipes(filteredRecipes);
          filterTags(filteredRecipes);
        });
      });
    } else {
      removeList(list);
    }
    printTagItem();
  };

  const filterByClick = (list, filterFunction, special) => {
    if (seeRecipes == false) {
      list.style.display = "grid";
      list.innerHTML = "";
      const addedItems = {};
      currentRecipes.forEach((recipe) => {
        filterFunction(recipe).forEach((item) => {
          const itemName = item.toLowerCase();
          if (!addedItems[itemName]) {
            addedItems[itemName] = true;
            list.innerHTML += `<li class="search-list-${special}">
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
      const itemTagList = document.querySelectorAll(`.listOf${special} a`);
      itemTagList.forEach((item) => {
        item.addEventListener("click", () => {
          const selectedFilter = item.innerHTML;
          removeList(list);
          const filteredRecipes = currentRecipes.filter((recipe) => {
            if (special === "Ingredients") {
              return recipe.ingredients.some(
                (ingredient) => ingredient.ingredient === selectedFilter
              );
            } else if (special === "Appareil") {
              return recipe.appliance === selectedFilter;
            } else if (special === "Ustensils") {
              return recipe.ustensils.includes(selectedFilter);
            }
          });
          displayRecipes(filteredRecipes);
          filterTags(filteredRecipes);
        });
      });
    } else {
      removeList(list);
      seeRecipes = false;
    }
    printTagItem();
  };
  // Ajouter un événement "click" au bouton
  console.log("install event");
  ingredientSpan.addEventListener("click", () => {
    console.log("triggered event");
    // appeler cette fonction
    filterByClick(
      ingredientList,
      (currentRecipes) => {
        return currentRecipes.ingredients.map(
          (ingredient) => ingredient.ingredient
        );
      },
      "Ingredients"
    );
  });

  btnIngredient.addEventListener("keyup", (e) => {
    filterByInput(
      ingredientList,
      e.target,
      (currentRecipes) => {
        return currentRecipes.ingredients.map(
          (ingredient) => ingredient.ingredient
        );
      },
      "Ingredients"
    );
  });

  appareilSpan.addEventListener("click", () => {
    filterByClick(
      appareilList,
      (currentRecipes) => {
        return [currentRecipes.appliance];
      },
      "Appareil"
    );
  });

  btnAppareil.addEventListener("keyup", (e) => {
    filterByInput(
      appareilList,
      e.target,
      (currentRecipes) => {
        return [currentRecipes.appliance];
      },
      "Appareil"
    );
  });

  ustensilesSpan.addEventListener("click", () => {
    filterByClick(
      ustensilesList,
      (currentRecipes) => {
        return currentRecipes.ustensils;
      },
      "Ustensils"
    );
  });

  btnUstensiles.addEventListener("keyup", (e) => {
    filterByInput(
      ustensilesList,
      e.target,
      (currentRecipes) => {
        return currentRecipes.ustensils;
      },
      "Ustensils"
    );
  });
};

export { filterTags, removeList };
