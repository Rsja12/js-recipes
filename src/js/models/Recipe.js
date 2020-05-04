import axios from 'axios'
import { base_url } from '../config'

export default class Recipe {
    constructor(id) {
        this.id = id
    }

    async getRecipe() {
        try {
            const result = await axios(`${base_url}get?rId=${this.id}`)
            this.title = result.data.recipe.title
            this.author = result.data.recipe.publisher
            this.img = result.data.recipe.image_url
            this.url = result.data.recipe.source_url
            this.ingredients = result.data.recipe.ingredients
        } catch (error){
            console.log(error)
            alert('something went wrong')
        }
    }

    calcTime() {
        // weird estimate for calculating time
        const numIngredients = this.ingredients.length
        const periods = Math.ceil(numIngredients / 3)
        this.time = periods * 15
    }

    calcServings() {
        this.servings = 4 
    }

    parseIngredients() {
        // array of measurements we want to change
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'cup', 'pounds']
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup(s)', 'cup(s)', 'pound(s)']

        const newIngredients = this.ingredients.map( el => {
            // Uniform units of measurement
            let ingredient = el.toLowerCase()
            // Go through long units arr and if it finds a unit we want to replace, replace it with the element at the same position in unitsShort array.
            unitsLong.forEach( (unit, idx) => {
                ingredient = ingredient.replace( unit, unitsShort[idx] )
            } )
            // Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ')

            // Parse ingredients into count unit and ingredient
            const ingredientArr = ingredient.split(' ')
            const unitIdx = ingredientArr.findIndex( el => unitsShort.includes(el) )

            let ingredientObj
            if ( unitIdx > -1 ) {

                const arrCount = ingredientArr.slice(0, unitIdx)
                let count = 0
                if ( arrCount.length === 1 ) {
                    count = eval( ingredientArr[0].replace( '-', '+' ) )
                } else {
                    count = eval( ingredientArr.slice(0, unitIdx).join('+') )
                }

                ingredientObj = {
                    count,
                    unit: ingredientArr[unitIdx],
                    ingredient: ingredientArr.slice( unitIdx + 1 ).join(' ')
                }

            } else if ( parseInt(ingredientArr[0]) ) {
                // There is no unit but there is a num
                ingredientObj = {
                    count: parseInt(ingredientArr[0]),
                    unit: '',
                    ingredient: ingredientArr.slice(1).join(' ')
                }

            } else if ( unitIdx === -1 ) {
                // There is no unit and no number in first position
                ingredientObj = {
                    ingredient
                }
            }

            return ingredientObj
        } )
        this.ingredients = newIngredients
    }

}