import { elements } from './base'

// return value of user input field
export const getInput = () => elements.searchInput.value 

export const clearInput = () => {
    elements.searchInput.value = ''
}

export const clearResults = () => {
    elements.searchResultList.innerHTML = ''
}

const renderRecipe = recipe => {

    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `
    // adds each recipe li element to the html container
    elements.searchResultList.insertAdjacentHTML('beforeend', markup)

}

// call renderRecipe for each element in the array of results that we get when user searches 
export const renderResults = results => {
    results.forEach( el => renderRecipe(el) )
}