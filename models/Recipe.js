class Recipe {
  constructor(data) {
    Object.assign(this, data);
  }

  getList() {
    let ingredientsList = "";
    this.ingredients.forEach((ingredient) => {
      let quantityString = "";
      let unitString = "";
      if (ingredient.quantity !== undefined) {
        quantityString = `${ingredient.quantity} `;
      } else {
        quantityString = `2`;
      }
      if (ingredient.unit !== undefined) {
        let g = ''
        if (ingredient.unit == "grammes") {
          g = 'g'
        } else {
          g = ingredient.unit
        }
        unitString = `${g}`;
      }
      ingredientsList += `<li><strong>${ingredient.ingredient}</strong>: ${quantityString}${unitString}</li>`;
    });
    return ingredientsList;
  }

  render() {
    return `<div class="cardRecipe">
    <div class="img"></div>
    <div class="AllElmInCardRecipe">
      <div class="cardRecipeTitleTime">
        <h2>${this.name}</h2>
        <p>durée : ${this.time}</p>
      </div>
      <div class="cardRecipeingredientDescription">
        <ul>
          ${this.getList()}
        </ul>
        <p class="recipeDescription">${this.description}</p>
      </div>
    </div>
  </div>`;
  }
}

export default Recipe;

/* 

nom du plat (recipes.name)      |   durée (recipes.time)
les ingredients :               |   recipes.description
(recipes.ingredients.ingredient)|
(recipes.ingredients.quantity)  |
(recipes.ingredients.unit)      |

*/
