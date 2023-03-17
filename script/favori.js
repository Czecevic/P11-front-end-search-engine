import { tagList } from "../utils/const.js";
import { currentRecipes } from "./mainSearch.js";
import { displayRecipes } from "./index.js";
import { filterTags } from "./filterTags.js";

let itemArray = []; // liste persistante pour stocker les recettes correspondant à tous les tags sélectionnés
let selectedTags = []; // liste pour stocker tous les tags sélectionnés

// recuperer les recettes via le mainSearch

const printFavoriItem = () => {
  const itemFavori = document.querySelectorAll("ul li a");
  itemFavori.forEach((item) => {
    item.addEventListener("click", (e) => {
      let tag = e.target.innerHTML.toLowerCase();
      let tagType = "";
      let tagButton = document.createElement("button");
      tagButton.innerHTML = "x";
      tagButton.addEventListener("click", () => {
        removeTag(tag);
      });

      // Check if the tag is an ingredient, utensil, or appliance
      if (
        currentRecipes.some((recipe) =>
          recipe.ingredients
            .map((ingredient) => ingredient.ingredient.toLowerCase())
            .includes(tag)
        )
      ) {
        tagType = "ingredient";
        updateRecipes();
      } else if (
        currentRecipes.some((recipe) =>
          recipe.ustensils
            .map((ustensil) => ustensil.toLowerCase())
            .includes(tag)
        )
      ) {
        tagType = "ustensils";
        updateRecipes();
      } else if (
        currentRecipes.some((recipe) => recipe.appliance.toLowerCase() === tag)
      ) {
        tagType = "appliances";
        updateRecipes();
      }
      // Add the tag to the selected tags list
      if (tagType !== "" && !selectedTags.includes(tag)) {
        selectedTags.push(tag);
        tagList.innerHTML += `<div class="tag-${tagType}"><span>${tag}</span><button class="remove-tag">x</button></div>`;
        const removeButtons = document.querySelectorAll(".remove-tag");
        removeButtons.forEach((button) => {
          button.addEventListener("click", () => {
            removeTag(button.previousElementSibling.innerHTML);
          });
        });
        updateRecipes();
      }
    });
  });
};

const updateRecipes = () => {
  itemArray = [];
  for (let i = 0; i < currentRecipes.length; i++) {
    let recipeTags = [];
    currentRecipes[i].ingredients.forEach((ingredient) => {
      recipeTags.push(ingredient.ingredient.toLowerCase());
    });
    currentRecipes[i].ustensils.forEach((ustensil) => {
      recipeTags.push(ustensil.toLowerCase());
    });
    // console.log(currentRecipes[i].appliance);
    recipeTags.push(currentRecipes[i].appliance.toLowerCase());
    if (selectedTags.every((tag) => recipeTags.includes(tag))) {
      itemArray.push(currentRecipes[i]);
    }
  }
  filterTags(itemArray);
  displayRecipes(itemArray);
};

const removeTag = (tag) => {
  selectedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
  tagList.innerHTML = "";
  selectedTags.forEach((selectedTag) => {
    let tagType = "";
    if (
      currentRecipes.some((recipe) =>
        recipe.ingredients
          .map((ingredient) => ingredient.ingredient.toLowerCase())
          .includes(selectedTag)
      )
    ) {
      tagType = "ingredient";
    } else if (
      currentRecipes.some((recipe) =>
        recipe.ustensils
          .map((ustensil) => ustensil.toLowerCase())
          .includes(selectedTag)
      )
    ) {
      tagType = "ustensils";
    } else if (
      currentRecipes.some(
        (recipe) => recipe.appliance.toLowerCase() === selectedTag
      )
    ) {
      tagType = "appliances";
    }
    tagList.innerHTML += `<div class="tag-${tagType}"><span>${selectedTag}</span><button class="remove-tag">x</button></div>`;
  });
  const removeButtons = document.querySelectorAll(".remove-tag");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      removeTag(button.previousElementSibling.innerHTML);
    });
  });
  updateRecipes();
};

export { printFavoriItem };
