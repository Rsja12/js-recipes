import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements } from './views/base'

// Global state of the app
// * - Search object
// * - Current recipe object
// * - Shopping list object
// * - Liked recipes
const state = {}


const controlSearch = async () => {
    // get query from input field
    const query = 'sushi' //TODO
    if ( query ) {
        // new search obj and add to state
        state.search = new Search(query)
        // prepare UI for reults

        // Search for recipes and *await*(pause) the app and get the results before using them
        await state.search.getResults()
        // render results on UI 
        console.log(state.search.results)
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})

