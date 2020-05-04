import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as searchView from './views/recipeView'
import { elements, renderLoader, clearLoader } from './views/base'

// Global state of the app
// * - Search object
// * - Current recipe object
// * - Shopping list object
// * - Liked recipes
const state = {}

//  SEARCH CONTROLLER
const controlSearch = async () => {
    // get query from input field
    const query = searchView.getInput()
    if ( query ) {
        // new search obj and add to state
        state.search = new Search(query)
        // prepare UI for reults..clear input and clear results for next search
        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.searchResultParent)
        try {
            // Search for recipes and *await*(pause) the app and get the results before using them
            await state.search.getResults()
            // render results on UI 
            clearLoader()
            searchView.renderResults(state.search.results)
        } catch ( error ) {
            console.log('something went wrong with the search')
            clearLoader()
        }
    }
}

// search submit
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})

// search page buttons
elements.pageBtnParent.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    
    if ( btn ) {
        const goToPage = parseInt(btn.dataset.goto)
        searchView.clearResults()
        searchView.renderResults( state.search.results, goToPage )
    }

})


// RECIPE CONTROLLER 

const controlRecipe = async () => {
    // grabs the hash from the url and removes the # from the number
    const id = window.location.hash.replace('#', '')
    
    if ( id ) {
        // Prepare UI for changes

        // Create new recipe obj
        state.recipe = new Recipe(id)
        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe()
            state.recipe.parseIngredients()
            // Calculate servings and time
            state.recipe.calcTime()
            state.recipe.calcServings()
            // Render the recipe
            console.log(state.recipe)
        } catch (error) {
            console.log('something went wrong')
        }
    }

}





// Call the same function on different events
['hashchange', 'load'].forEach( e => window.addEventListener(e, controlRecipe) )











console.log(state)