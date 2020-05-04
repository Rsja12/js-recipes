import axios from 'axios'
import { base_url } from '../config'

export default class Recipe {
    constructor(id) {
        this.id = id
    }

    async getRecipe() {
        try {
            const result = await axios(`${base_url}get?rId=${this.id}`)
            console.log(result)
        } catch (error){
            console.log(error)
        }
    }

}