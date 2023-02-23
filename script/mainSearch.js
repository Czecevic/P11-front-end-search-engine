import Recipe from "../models/recipe.js";

const mainSearch = (searchList, searchInput, recette) => {
  let searchresult = [];
  searchInput.addEventListener("keyup", (e) => {
    let keypressed = e.target.value;
    if (keypressed.length > 2) {
      for (let i = 0; i < searchList.length; i++) {
        // console.log(searchList[i].name.includes(keypressed));
        if (
          searchList[i].name.toLowerCase().includes(keypressed.toLowerCase())
        ) {
          // console.log(searchList[i], searchresult);
          if (!searchresult.includes(searchList[i])) {
            searchresult.push(searchList[i]);
          } else {
            searchresult.remove();
          }
        }
      }
      recette.innerHTML = searchresult
        .map((searchList) => new Recipe(searchList).render())
        .join();
    } else {
      // console.log('tot')
      searchresult = [];
      recette.innerHTML = searchList
      .map((searchL) => new Recipe(searchL).render())
      .join();
    }
  });
};

export { mainSearch };
