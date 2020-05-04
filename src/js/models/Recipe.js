import axios from 'axios'

export default class Recipe {
    constructor(id) {
        this.id = id
    }

    async getRecipe() {
        try {
            const result = await axios()
        } catch (error){
            console.log(error)
        }
    }

}