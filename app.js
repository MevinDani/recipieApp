const recipeContainer = document.querySelector("#recipe-container")
const lightBox = document.querySelector(".lightbox")
const closeBtn = lightBox.querySelector(".fa-xmark")
const textSearch = document.querySelector("#textSearch")
const btnFind = document.querySelector(".btn")
const recText = document.querySelector(".recipe-ing")

// eventListeners

btnFind.addEventListener('click', getMealList)
recipeContainer.addEventListener('click', getMealRecipe)

function loadDefList() {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=beef`)
        .then(res => res.json())
        .then(data => {
            let html = ""
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `<div data-id="${meal.idMeal}"><div class="recipe">
                    <div class="recipe-title">${meal.strMeal}</div>
                    <div class="recipe-img">
                        <img src="${meal.strMealThumb}" alt="Recipe">
                    </div>
                    </div></div>`
                });
            } else {
                html = "Sorry, we didn't find any Meal!"
            }
            recipeContainer.innerHTML = html
        })
}

loadDefList()

function getMealList() {
    let searchInput = textSearch.value
    recipeContainer.innerHTML = ""
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            let html = ""
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `<div data-id="${meal.idMeal}"><div class="recipe">
                    <div class="recipe-title">${meal.strMeal}</div>
                    <div class="recipe-img">
                        <img src="${meal.strMealThumb}" alt="Recipe">
                    </div>
                    </div></div>`
                });
            } else {
                html = "Sorry, we didn't find any Meal!"
            }
            recipeContainer.innerHTML = html
        })
}

function getMealRecipe(e) {
    e.preventDefault();
    let mealItem = e.target.parentElement.parentElement.parentElement
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(res => res.json())
        .then(data => mealRecipeModal(data.meals))
}

function mealRecipeModal(meal) {
    meal = meal[0]
    ing1 = meal.strIngredient1
    ing2 = meal.strIngredient2
    ing3 = meal.strIngredient3
    ing4 = meal.strIngredient4
    ing5 = meal.strIngredient5
    ing6 = meal.strIngredient6
    ing7 = meal.strIngredient7
    ing8 = meal.strIngredient8
    ing9 = meal.strIngredient9
    ing10 = meal.strIngredient10
    ing11 = meal.strIngredient11
    ing12 = meal.strIngredient12
    ing13 = meal.strIngredient13
    ing14 = meal.strIngredient14
    ing15 = meal.strIngredient15
    ing16 = meal.strIngredient16
    qt1 = meal.strMeasure1
    qt2 = meal.strMeasure2
    qt3 = meal.strMeasure3
    qt4 = meal.strMeasure4
    qt5 = meal.strMeasure5
    qt6 = meal.strMeasure6
    qt7 = meal.strMeasure7
    qt8 = meal.strMeasure8
    qt9 = meal.strMeasure9
    qt10 = meal.strMeasure10
    qt11 = meal.strMeasure11
    qt12 = meal.strMeasure12
    qt13 = meal.strMeasure13
    qt14 = meal.strMeasure14
    qt15 = meal.strMeasure15
    qt16 = meal.strMeasure16
    let html = `
    <div class="wrapper">
        <header>
         <div class="recipe-name">
            <span>${meal.strMeal}</span>
         </div>
         <div class="buttons" onclick="hideLightBox()">
            <i class="fa-solid fa-xmark"></i>
         </div>
        </header>
        <div class="preview-img">
           <div class="img">
             <img src="${meal.strMealThumb}" alt="preview-img">
           </div>
           <div class="ingrd">
               <h2>Ingredients</h2>
               <div>
                  <p> ${qt1} ${ing1}</p>
                  <p> ${qt2} ${ing2}</p>
                  <p> ${qt3} ${ing3}</p>
                  <p> ${qt4} ${ing4}</p>
                  <p> ${qt5} ${ing5}</p>
                  <p> ${qt6} ${ing6}</p>
                  <p> ${qt7} ${ing7}</p>
                  <p> ${qt8} ${ing8}</p>
              </div>
              <div>       
                   <p>${qt9} ${ing9}</p>
                   <p>${qt10} ${ing10}</p>
                   <p>${qt11} ${ing11}</p>
                   <p>${qt12} ${ing12}</p>
                   <p>${qt13} ${ing13}</p>
                   <p>${qt14} ${ing14}</p>
                   <p> ${qt15} ${ing15}</p>
                   <p> ${qt16} ${ing16}</p>
              </div>
           </div>
        </div>
        <div class="recipe-ing">
          <div class="recipe-text">
          <h2>Instructions</h2>
          <p>${meal.strInstructions}</p>
          </div>
        </div>`
    lightBox.innerHTML = html
    lightBox.classList.add("show")
}

const hideLightBox = () => {
    lightBox.classList.remove("show")
}