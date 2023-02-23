class Recipe {
  constructor(data) {
    Object.assign(this, data);
  }

  getIngredientsList() {
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
        unitString = `${ingredient.unit}`;
      }
      ingredientsList += `<li><strong>${ingredient.ingredient}</strong>: ${quantityString}${unitString}</li>`;
    });
    return ingredientsList;
  }

  render() {
    return `<div class="cardRecipe">
          <h2>${this.name}</h2>
          <p>durée : ${this.time}</p>
          <ul>
            ${this.getIngredientsList()}
          </ul>
          <p>${this.description}</p>
      </div>`
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
