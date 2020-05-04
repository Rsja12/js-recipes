import { elements } from './base'

// return value of user input field
export const getInput = () => elements.searchInput.value 

export const clearInput = () => {
    elements.searchInput.value = ''
}

export const clearResults = () => {
    elements.searchResultList.innerHTML = ''
}

// algo for limiting title length on UI
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []

    if ( title.length > limit ) {

        title.split(' ').reduce( (acc, cur) => {
            if ( acc + cur.length <= limit ) {
                newTitle.push(cur)
            }
            return acc + cur.length 
        }, 0 )

        return `${newTitle.join(' ')} ...`
    }

    return title 
}

const renderRecipe = recipe => {

    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `
    // adds each recipe li element to the html container
    elements.searchResultList.insertAdjacentHTML('beforeend', markup)

}

// call renderRecipe for each element in the array of results that we get when user searches 
export const renderResults = (results, page = 1, resultsPerPage = 10) => {
    // sets the correct start recipe for each page 
    const start = (page - 1) * resultsPerPage
    // sets the correct end recipe for each page 
    const end = page * resultsPerPage

    // makes a copy of array but only grabs the correct 10 results 
    results.slice(start, end).forEach( el => renderRecipe(el) )
}

