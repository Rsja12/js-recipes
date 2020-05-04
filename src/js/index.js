import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base'

// Global state of the app
// * - Search object
// * - Current recipe object
// * - Shopping list object
// * - Liked recipes
const state = {}


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
        // Search for recipes and *await*(pause) the app and get the results before using them
        await state.search.getResults()
        // render results on UI 
        clearLoader()
        searchView.renderResults(state.search.results)
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
        // console.log(goToPage)
    }

})

console.log(state)

