import {
  ingredientList,
  btnIngredient,
  btnAppareil,
  appareilList,
  ustensilesList,
  btnUstensiles,
} from "../utils/const.js";

const filterTags = (recipes) => {
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
              list.innerHTML += `<li class="search-list-ingredients">${item}</li>`;
              addedItems[itemName] = true;
            }
          }
        });
      });
    } else {
      list.style.display = "none";
    }
  };

  btnIngredient.addEventListener("keyup", (e) => {
    filterByInput(ingredientList, e.target, (recipe) => {
      return recipe.ingredients.map((ingredient) => ingredient.ingredient);
    });
  });

  

  btnAppareil.addEventListener("keyup", (e) => {
    filterByInput(appareilList, e.target, (recipe) => {
      return [recipe.appliance];
    });
  });

  btnUstensiles.addEventListener("keyup", (e) => {
    filterByInput(ustensilesList, e.target, (recipe) => {
      return recipe.ustensils;
    });
  });
};

export { filterTags };
