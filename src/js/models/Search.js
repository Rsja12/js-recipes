import axios from 'axios'

export default class Search {
    constructor(query) {
        this.query = query 
        this.BASE_URL = 'https://forkify-api.herokuapp.com/api/search?q='
    }

    async getResults() {

        try {
            const res = await axios.get(`${this.BASE_URL}${this.query}`)
            this.results = res.data.recipes
        } 
        catch (error) {
            console.log(error)
        }
    
    }
}




