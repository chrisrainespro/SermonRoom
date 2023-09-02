import React, { createContext, useState } from "react"
import axios from "axios"

export const CategoryContext = createContext()

export const CategoryProvider = (props) => {

const apiUrl = "http://localhost:3001/categories/";

const [categories, setCategories] = useState([])

function getCategories() {
    console.log("get categories has run")
    return axios.get(apiUrl).then(response =>
      new Promise((resolve) => resolve(response.data))  
    )}

function getCategoryById(categoryId) {
    console.log(categoryId)
    return axios.get(apiUrl+categoryId)
}


return (
    <CategoryContext.Provider
        value={{
            getCategories,
            getCategoryById,
            categories,
            setCategories,
            
        }}
        >
        {props.children}    
    </CategoryContext.Provider>
)
}