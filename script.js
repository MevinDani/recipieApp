const appId = "261389af"
const appKey = "c2601f64b62ab3d349f26c48ffd273b6"
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`
const recipeContainer = document.querySelector("#recipe-container")
const lightBox = document.querySelector(".lightbox")
const closeBtn = lightBox.querySelector(".fa-xmark")
const textSearch = document.querySelector("#textSearch")
const btnFind = document.querySelector(".btn")
const recText = document.querySelector(".recipe-ing")

btnFind.addEventListener("click", () => loadRecipies(textSearch.value))

textSearch.addEventListener("keyup", (e) => {
    const inputVal = textSearch.value
    if (e.keyCode === 13) {
        loadRecipies(inputVal)
    }
})


function loadRecipies(type = "chicken") {
    const url = baseUrl + `&q=${type}`
    fetch(url)
        .then(res => res.json())
        .then(data => renderRecipies(data.hits))
        .catch(error => console.log(error))
}

// function loadIngrd(type = "chicken") {
//     const url = baseUrl + `&q=${type}`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => renderIngr(data.hits))
//         .catch(error => console.log(error))
// }

// loadIngrd()

// const renderIngr = (recipeList = []) => {
//     recipeList.map(recObj => {
//         const { ingredientLines } = recObj.recipe
//         console.log(ingredientLines, "ingrd");
//         const recStr = getRecipieSteps(ingredientLines)
//         const htmlStr = `<li>${recStr}</li>`
//         recText.insertAdjacentHTML("beforeend", htmlStr)
//     })
// }

loadRecipies()

const renderRecipies = (recipeList = []) => {
    recipeContainer.innerHTML = ""
    recipeList.forEach(recObj => {
        const { ingredientLines, label, image } = recObj.recipe
        const ingStr = getRecipieSteps(ingredientLines)
        // console.log(ingStr);
        // console.log(recStr, "recStr");
        // const recHtml = `<div class="recipe-text">
        // <ul>
        // </ul>
        // </div>`
        const htmlStr = `<div onclick="showLightBox()"><div class="recipe">
        <div class="recipe-title">${label}</div>
        <div class="recipe-img">
            <img src="${image}" alt="Recipe">
        </div>
        </div></div>
        <div class="lightbox">
        <div class="wrapper">
            <header>
                <div class="recipe-name">
                    <span>${label}</span>
                </div>
                <div class="buttons" onclick="hideLightBox()">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </header>
            <div class="preview-img">
                <div class="img">
                    <img src="${image}" alt="preview-img">
                </div>
            </div>
            <div class="recipe-ing">
                <div class="recipe-text">
                    <ul>
                    ${ingStr}
                    </ul>
                </div>
            </div>
        </div>
    </div>`
        recipeContainer.insertAdjacentHTML("beforeend", htmlStr)
        // recText.insertAdjacentHTML("beforeend", recHtml)
    })
    // recipeContainer.innerHTML += recipeList.map(recipeObj => `<div onclick="showLightBox('${recipeObj.recipe.label}','${recipeObj.recipe.image}')"><div class="recipe">
    // <div class="recipe-title">${recipeObj.recipe.label}</div>
    // <div class="recipe-img">
    //     <img src="${recipeObj.recipe.image}" alt="Recipe">
    // </div>
    // </div></div>`).join("")
}

const getRecipieSteps = (recipeList = []) => {
    let str = ""
    for (let step of recipeList) {
        str = str + `<li>${step}</li> `
    }
    return str
}

const showLightBox = () => {
    // const recipeSteps = getRecipieSteps(steps)
    // lightBox.querySelector("img").src = img
    // lightBox.querySelector("span").innerText = name
    // lightBox.querySelector("ul").innerHTML = recipeSteps
    lightBox.classList.add("show")
    document.body.style.overflow = "hidden"
}

const hideLightBox = () => {
    lightBox.classList.remove("show")
    document.body.style.overflow = "auto"
}

// closeBtn.addEventListener("click", hideLightBox)
