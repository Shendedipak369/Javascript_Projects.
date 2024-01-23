const searchBtn = document.querySelector(".searchBtn");
const SearchBox = document.querySelector(".SearchBox");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeContainer = document.querySelector(".recipe-container");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");


const fetchRecipe = async (query) => {
   recipeContainer.innerHTML = "<h2>Fetching Recipes....</h2>";
   try {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const response = await data.json();

      recipeContainer.innerHTML = "";
      response.meals.forEach(meal => {

         const recipeDiv = document.createElement("div");
         recipeDiv.classList.add("recipe");
         recipeDiv.innerHTML = `
       <img src= "${meal.strMealThumb}">
       <h3>${meal.strMeal}</h3>
       <p><span>${meal.strArea}</span> Dish</P>
       <p>Belongs to <span>${meal.strCategory}</span> Category</P>

       
      `
         const button = document.createElement("button")
         button.textContent = "view recipe";
         recipeDiv.appendChild(button);


         button.addEventListener("click", () => {
            openRecipePopup(meal);
         });

         recipeContainer.appendChild(recipeDiv);
      });
   } catch (error) {
      recipeContainer.innerHTML = "<h2> Error in Fetching Recipes...</h2>";
   }
}

const fetchIngredient = (meal) => {
   let ingredientList = "";
   for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient) {
         const measure = meal[`strMeasure${i}`];
         ingredientList += `<li>${measure} ${ingredient}</li>`;
      } else {
         break;
      }
   }
   return ingredientList;
};


const openRecipePopup = (meal) => {
   recipeDetailsContent.innerHTML = `
<h2 class= "recipeName">${meal.strMeal}</h2>
<h2>Ingredients:</h2>
<ul class="ingredientList">${fetchIngredient(meal)}</ul>
<div class="recipeInstructions">
   <h3>Ingredients:</h3>
   <p>${meal.strInstructions}</p>

</div>

`
   recipeDetailsContent.parentElement.style.display = "block";

};

recipeCloseBtn.addEventListener("click", () => {
   recipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener("click", (e) => {
   e.preventDefault();
   const searchInput = SearchBox.value.trim();
   if (!searchInput) {
      recipeContainer.innerHTML = `<h2>Type the meal in the SearchBox.</h2>`
      return;
   }
   fetchRecipe(searchInput);

});