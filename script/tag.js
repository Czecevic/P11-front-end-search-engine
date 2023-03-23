import { tagList } from "../utils/const.js";
import { currentRecipes } from "./mainSearch.js";
import { displayRecipes } from "./index.js";
let selectedTags = []; // liste pour stocker tous les tags sélectionnés

const printTagItem = () => {
  // je récupère ma liste d'ingrédient, appareil et ustencils
  const itemTag = document.querySelectorAll("ul li a");
  // nous parcourons le tableau récupéré
  itemTag.forEach((item) => {
    // on rajoute un événement à chaque fois que 'on clique sur cet événement
    item.addEventListener("click", (e) => {
      console.log(currentRecipes);
      // on créer le tag avec son type qui nous servira pour la class et un bouton pour pouvoir le supprimer
      let tag = e.currentTarget.innerHTML.toLowerCase();
      let tagType = "";
      let tagButton = document.createElement("button");
      tagButton.innerHTML = "x";
      // l'evenement du bouton pour le supprimer
      tagButton.addEventListener("click", () => {
        removeTag(tag);
      });
      // je verifie si mon tag est un ingredient / appareil / ustencils
      // --------------------------- Ingredient -------------------------------------
      if (
        currentRecipes.some((recipe) =>
          recipe.ingredients
            .map((ingredient) => ingredient.ingredient.toLowerCase())
            .includes(tag)
        )
      ) {
        tagType = "ingredient";
      }
      // --------------------------- Ustensils -------------------------------------
      else if (
        currentRecipes.some(
          (recipe) =>
            recipe.ustensils
              .map((ustensil) => ustensil.toLowerCase())
              .includes(tag) &&
            tag != "Saladier" &&
            tag != "Casserole"
        )
      ) {
        tagType = "ustensils";
      }
      // --------------------------- Appareil -------------------------------------
      else if (
        currentRecipes.some((recipe) => recipe.appliance.toLowerCase() === tag)
      ) {
        tagType = "appliances";
      }
      // creation du tag en question
      // si le tag a déjà été rajouté alors nous ne pouvons pas passer dans cette condition
      if (tagType != "" && !selectedTags.includes(tag)) {
        // stocker la liste des tags via selectedTags
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
      }
      // me permettra de supprimer le tag choisi
      const removeButtons = document.querySelectorAll(`.remove-tag`);
      // nous parcours tous les buttons pour pouvoir mettre en place l'evenement et cliquer sur le tag que nous souhaitons supprimer
      removeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          removeTag(button.previousElementSibling.innerHTML);
        });
      });
      updateRecipes([...currentRecipes], tagType, selectedTags);
      // if (item.classList.contains("ingredient")) {
      //   currentRecipes = recipes.filter((recipe) => {
      //     const ingredient = recipe.ingredients.some((ingredient) =>
      //       ingredient.ingredient.toLowerCase().includes(item)
      //     );
      //     console.log(ingredient);
      //   });
      // }
      console.log(currentRecipes);
    });
  });
};

const updateRecipes = ([...currentRecipes], type, allTag) => {
  currentRecipes.forEach((objCurrentRecipes) => {
    switch (type) {
      case "ingredient":
        console.log(
          objCurrentRecipes.ingredients.forEach((ingredient) => {
            if (!allTag.includes(ingredient.ingredient.toLowerCase())) {
              console.log();
            }
          })
        );
        // currentRecipesforEach((ingredient) => {
        //   console.log(ingredient.ingredient.toLowerCase());
        // });
        break;
      case "appliances":
        console.log("test2");
        break;
      case "ustensils":
        console.log("test3");
        break;
    }
  });
};

// const updateRecipes = () => {
//   itemArray = [];
//   for (let i = 0; i < currentRecipes.length; i++) {
//     let recipeTags = [];
//     currentRecipes[i].ingredients.forEach((ingredient) => {
//       recipeTags.push(ingredient.ingredient.toLowerCase());
//     });
//     currentRecipes[i].ustensils.forEach((ustensil) => {
//       recipeTags.push(ustensil.toLowerCase());
//     });
//     // console.log(currentRecipes[i].appliance);
//     recipeTags.push(currentRecipes[i].appliance.toLowerCase());

//     if (selectedTags.every((tag) => recipeTags.includes(tag))) {
//       itemArray.push(currentRecipes[i]);
//     }
//   }
//   currentRecipes.length = 0;
//   itemArray.forEach((elemItemArray) => {
//     currentRecipes.push(elemItemArray);
//   });
//   displayRecipes(currentRecipes);
// };

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
  // updateRecipes();
};

export { printTagItem };
