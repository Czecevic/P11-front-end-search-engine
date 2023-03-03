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

const filterTags = (recipes) => {
  let seeRecipes = false
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
      list.innerHTML = "";
    }
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
            list.innerHTML += `<li class="search-list-ingredients">${item}</li>`;
            addedItems[itemName] = true;
          }
        });
      })
      seeRecipes = true;
    } else {
      list.style.display = "none";
      list.innerHTML = "";
      seeRecipes = false;
    }
  }

  // Ajouter un événement "click" au bouton
  ingredientSpan.addEventListener("click", () => {
    allRecipesBySpan(ingredientList, (recipe) => {
      return recipe.ingredients.map((ingredient) => ingredient.ingredient);
    })
  });

  btnIngredient.addEventListener("keyup", (e) => {
    filterByInput(ingredientList, e.target, (recipe) => {
      return recipe.ingredients.map((ingredient) => ingredient.ingredient);
    });
  });

  appareilSpan.addEventListener("click", () => {
    allRecipesBySpan(appareilList, (recipe) => {
      return [recipe.appliance];
    })
  });

  btnAppareil.addEventListener("keyup", (e) => {
    filterByInput(appareilList, e.target, (recipe) => {
      return [recipe.appliance];
    });
  });

  ustensilesSpan.addEventListener("click", () => {
    allRecipesBySpan(ustensilesList, (recipe) => {
      return recipe.ustensils;
    })
  });

  btnUstensiles.addEventListener("keyup", (e) => {
    filterByInput(ustensilesList, e.target, (recipe) => {
      return recipe.ustensils;
    });
  });
};

export { filterTags };
