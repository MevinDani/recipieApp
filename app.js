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
    let html = `<div class="wrapper">
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
        </div>
        <div class="recipe-ing">
        <div class="recipe-text">
        <p>${meal.strInstructions}</p>
        </div>
        </div>`
    lightBox.innerHTML = html
    lightBox.classList.add("show")
}

const hideLightBox = () => {
    lightBox.classList.remove("show")
}