import axios from 'axios'
import { proxy } from '../config'

export default class Search {
    constructor(query) {
        this.query = query 
    }

    async getResults() {

        try {
            const res = await axios.get(`${proxy}${this.query}`)
            this.results = res.data.recipes
        } 
        catch (error) {
            console.log(error)
        }
    
    }
}




