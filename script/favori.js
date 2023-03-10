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
      let tagButton = document.createElement("button"); // création du bouton
      tagButton.innerHTML = "x";
      tagButton.addEventListener("click", () => {
        console.log("test");
        removeTag(tag);
      });
      if (!selectedTags.includes(tag)) {
        selectedTags.push(tag);
        tagList.innerHTML += `<div class="tag"><span>${tag}</span><button class="remove-tag">x</button></div>`;
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
    tagList.innerHTML += `<div class="tag"><span>${selectedTag}</span><button class="remove-tag">x</button></div>`;
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
