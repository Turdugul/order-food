import { useState } from "react"


export const useSortData= (meals)=>{

    const [sortedMeals, setSortedMeals] = useState([])

    const sortMealsHandler = (sortby= "ASC") =>{
        if(sortby === "ASC"){
            return setSortedMeals(meals.sort((a,b) =>a.price - b.price))
        }
        if(sortby === "DESC"){
            return setSortedMeals(meals.sort((a,b) =>b.price - a.price))
        }
        return []

    }

    return [sortedMeals, sortMealsHandler]
}