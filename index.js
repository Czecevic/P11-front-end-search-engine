import { recipes } from "./recipes";

// ingredients

const ingredientList = document.querySelector("#ingredientsList");
const ingredientsInput = document.querySelector("#ingredientsInput");
const btnIngredient = document.querySelector("#ingredientsButton");

// appareil
const appareilList = document.querySelector("#AppareilList");
const appareilInput = document.querySelector("#AppareilInput");
const btnAppareil = document.querySelector("#AppareilButton");

// ustensiles
const ustensilesList = document.querySelector("#UstensilesList");
const ustensilesInput = document.querySelector("#UstensilesInput");
const btnUstensiles = document.querySelector("#UstensilesButton");

// plat

recipes.forEach((recipe) => {
  btnIngredient.addEventListener("click", () => {
    recipe.ingredients.forEach((ingredient) => {
      console.log(ingredient.ingredient);
      ingredientList.innerHTML += "<li>" + ingredient.ingredient + "</li>";
    });
  });

  btnAppareil.addEventListener("click", () => {
    // console.log(recipe.appliance);
    let appreilArray = [];
    appareilInput.addEventListener("keypress", () => {
      console.log(appareilInput.value);
    });
    appareilList.innerHTML += "<li>" + recipe.appliance + "</li>";
  });

  btnUstensiles.addEventListener("click", () => {
    recipe.ustensils.forEach((ustensils) => {
      //   console.log(ustensils);
      ustensilesList.innerHTML += "<li>" + ustensils + "</li>";
    });
  });
});
