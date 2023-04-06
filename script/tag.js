import {
  ingredientList,
  appareilList,
  ustensilesList,
  tagList,
} from "../utils/const.js";
import { currentRecipes } from "./mainSearch.js";
import { displayRecipes } from "./index.js";
import { removeList } from "./filterTags.js";
import recipes from "../recipes.js";
// import { removeList } from "./filterTags.js";
let selectedTags = [];
let itemArray = [];

const printTagItem = () => {
  // je récupère ma liste d'ingrédient, appareil et ustencils
  const itemTag = document.querySelectorAll("ul li a");
  // nous parcourons le tableau récupéré
  itemTag.forEach((item) => {
    // on rajoute un événement à chaque fois que 'on clique sur cet événement
    item.addEventListener("click", (e) => {
      // ----------------------------------------------------------------
      // console.log(currentRecipes);
      // ----------------------------------------------------------------
      // on créer le tag avec son type qui nous servira pour la class et un bouton pour pouvoir le supprimer
      let tag = e.currentTarget.innerHTML;
      let tagType = "";
      let tagButton = document.createElement("button");
      tagButton.innerHTML = "x";
      // l'evenement du bouton pour le supprimer
      console.log(tag);
      tagButton.addEventListener("click", () => {
        removeTag(tag);
      });
      // je verifie si mon tag est un ingredient / appareil / ustencils
      // --------------------------- Ingredient -------------------------------------
      if (
        currentRecipes.some((recipe) =>
          recipe.ingredients
            .map((ingredient) => ingredient.ingredient.toLowerCase())
            .includes(tag.toLowerCase())
        )
      ) {
        tagType = "ingredient";
      }
      // --------------------------- Ustensils -------------------------------------
      else if (
        currentRecipes.some((recipe) =>
          recipe.ustensils.map((ustensil) => ustensil).includes(tag)
        )
      ) {
        tagType = "ustensils";
      }
      // --------------------------- Appareil -------------------------------------
      else if (
        currentRecipes.some((recipe) =>
          recipe.appliance.toLowerCase().includes(tag.toLowerCase())
        )
      ) {
        tagType = "appliances";
      }
      // creation du tag en question
      // si le tag a déjà été rajouté alors nous ne pouvons pas passer dans cette condition
      tag = tag.toLowerCase();
      if (tagType != "" && !selectedTags.includes(tag)) {
        selectedTags.push(tag);
        // stocker la liste des tags via selectedTags
        tagList.innerHTML += `
                <div class="tag-${tagType}">
                <span>${tag}</span>
                <button class="remove-tag">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                </svg>
                </button>
                </div>`;
      }
      // me permettra de supprimer le tag choisi
      let itemArray = [];
      const tagIngredient = document.querySelectorAll(".tag-ingredient");
      const tagAppliance = document.querySelectorAll(".tag-appliances");
      const tagUstensils = document.querySelectorAll(".tag-ustensils");
      const removeButtons = document.querySelectorAll(`.remove-tag`);
      // nous parcours tous les buttons pour pouvoir mettre en place l'evenement et cliquer sur le tag que nous souhaitons supprimer
      removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          console.log();
          if (tagType === "ingredient") {
            removeList(ingredientList);
          } else if (tagType === "appliances") {
            removeList(appareilList);
          } else if (tagType === "ustensils") {
            removeList(ustensilesList);
          }
          removeTag(button.previousElementSibling);
        });
        itemArray = [...currentRecipes];
        console.log(tagIngredient);
        console.log(itemArray);
        tagIngredient.forEach((tag) => {
          itemArray = itemArray.filter((recipe) =>
            recipe.ingredients.some((ingredient) =>
              ingredient.ingredient
                .toLowerCase()
                .includes(tag.firstElementChild.innerHTML)
            )
          );
        });
        tagAppliance.forEach((tag) => {
          itemArray = itemArray.filter((recipe) => {
            return recipe.appliance
              .toLowerCase()
              .includes(tag.firstElementChild.innerHTML);
          });
        });
        tagUstensils.forEach((tag) => {
          itemArray = itemArray.filter((recipe) => {
            return recipe.ustensils.some((ustensil) => {
              return ustensil
                .toLowerCase()
                .includes(tag.firstElementChild.innerHTML);
            });
          });
        });
        console.log(itemArray);
        currentRecipes.length = 0;
        itemArray.forEach((tagRecipes) => {
          currentRecipes.push(tagRecipes);
        });
        displayRecipes(currentRecipes);
      });
    });
  });
};

const removeTag = (tag) => {
  tag.parentElement.remove();
  const tagIngredient = document.querySelectorAll(".tag-ingredient");
  const tagAppliance = document.querySelectorAll(".tag-appliances");
  const tagUstensils = document.querySelectorAll(".tag-ustensils");
  let itemArray = [];
  let keypressed = document.querySelector("input").value.toLowerCase();
  // itemArray = [...currentRecipes];
  if (keypressed.length > 2) {
    itemArray = recipes.filter((recipe) => {
      // console.log(recipe);
      const nameDescription =
        recipe.name.toLowerCase().includes(keypressed) ||
        recipe.description.toLowerCase().includes(keypressed);
      const ingredient = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(keypressed)
      );
      // const tagOfRecipe = recipe;
      // console.log(tagOfRecipe);
      return nameDescription || ingredient;
    });
    currentRecipes.length = 0;
    itemArray.forEach((tagRecipes) => {
      currentRecipes.push(tagRecipes);
    });
  } else {
    // currentRecipes = itemArray;
    currentRecipes.length = 0;
    itemArray = recipes;
    itemArray.forEach((tagRecipes) => {
      currentRecipes.push(tagRecipes);
    });
  }
  itemArray = [...currentRecipes];
  console.log(tagIngredient);
  console.log(itemArray);
  tagIngredient.forEach((tag) => {
    itemArray = itemArray.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient
          .toLowerCase()
          .includes(tag.firstElementChild.innerHTML)
      )
    );
  });
  tagAppliance.forEach((tag) => {
    itemArray = itemArray.filter((recipe) => {
      return recipe.appliance
        .toLowerCase()
        .includes(tag.firstElementChild.innerHTML);
    });
  });
  tagUstensils.forEach((tag) => {
    itemArray = itemArray.filter((recipe) => {
      return recipe.ustensils.some((ustensil) => {
        return ustensil.toLowerCase().includes(tag.firstElementChild.innerHTML);
      });
    });
  });
  console.log(itemArray);
  currentRecipes.length = 0;
  itemArray.forEach((tagRecipes) => {
    currentRecipes.push(tagRecipes);
  });
  // console.log(selectedTags);
  selectedTags.splice(selectedTags.indexOf(tag.innerHTML), 1);
  // console.log(selectedTags);
  console.log(currentRecipes);
  displayRecipes(currentRecipes);
};

export { printTagItem };
