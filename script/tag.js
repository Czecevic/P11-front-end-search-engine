import { tagList } from "../utils/const.js";
import { currentRecipes } from "./mainSearch.js";
import { displayRecipes } from "./index.js";
let itemArray = []; // liste persistante pour stocker les recettes correspondant à tous les tags sélectionnés
let selectedTags = []; // liste pour stocker tous les tags sélectionnés

// recuperer les recettes via le mainSearch

const printTagItem = () => {
  const itemTag = document.querySelectorAll("ul li a");
  itemTag.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(currentRecipes);
      let tag = e.target.innerHTML.toLowerCase();
      let tagType = "";
      let tagButton = document.createElement("button");
      tagButton.innerHTML = "x";
      tagButton.addEventListener("click", () => {
        removeTag(tag);
      });

      // Check if the tag is an ingredient, utensils, or appliance
      // mettre une classe dans le html (definir si c'est un ingredient / appliance)
      if (
        currentRecipes.some((recipe) =>
          recipe.ingredients
            .map((ingredient) => ingredient.ingredient.toLowerCase())
            .includes(tag)
        )
      ) {
        tagType = "ingredient";
      } else if (
        currentRecipes.some((recipe) =>
          recipe.ustensils
            .map((ustensil) => ustensil.toLowerCase())
            .includes(tag)
        )
      ) {
        tagType = "ustensils";
      } else if (
        currentRecipes.some((recipe) => recipe.appliance.toLowerCase() === tag)
      ) {
        tagType = "appliances";
      }
      // Add the tag to the selected tags list
      if (tagType !== "" && !selectedTags.includes(tag)) {
        selectedTags.push(tag);
        tagList.innerHTML += `
        <div class="tag-${tagType}">
          <span>${tag}</span>
          <button class="remove-tag">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
          </svg>
          </button>
        </div>`;
        const removeButtons = document.querySelectorAll(".remove-tag");
        removeButtons.forEach((button) => {
          button.addEventListener("click", () => {
            removeTag(button.previousElementSibling.innerHTML);
          });
        });
        updateRecipes();
      }
      console.log(currentRecipes);
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
  currentRecipes.length = 0;
  itemArray.forEach((elemItemArray) => {
    currentRecipes.push(elemItemArray);
  });
  displayRecipes(currentRecipes);
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
    tagList.innerHTML += `
    <div class="tag-${tagType}">
      <span>${selectedTag}</span>
      <button class="remove-tag">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
      </svg>
      </button>
      </div>`;
  });
  const removeButtons = document.querySelectorAll(".remove-tag");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      removeTag(button.previousElementSibling.innerHTML);
    });
  });
  updateRecipes();
};

export { printTagItem };
