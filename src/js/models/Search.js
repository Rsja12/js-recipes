import axios from 'axios'
import { base_url } from '../config'

export default class Search {
    constructor(query) {
        this.query = query 
    }

    async getResults() {

        try {
            const res = await axios.get(`${base_url}search?q=${this.query}`)
            this.results = res.data.recipes
        } 
        catch (error) {
            console.log(error)
        }
    
    }
}




