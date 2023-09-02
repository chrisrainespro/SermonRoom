import React, { createContext, useState } from "react"
import axios from "axios"

export const SeriesContext = createContext()

export const SeriesProvider = (props) => {

const apiUrl = "http://localhost:3001/series/";

const [series, setSeries] = useState([])



function getSeriesByCategory(categoryId) {
    return axios.get(apiUrl+`?categoryId=${categoryId}`).then(response =>
     new Promise((resolve) => resolve(response.data))
     )}


return (
    <SeriesContext.Provider
        value={{
            getSeriesByCategory,
            series,
            setSeries,
            
        }}
        >
        {props.children}    
    </SeriesContext.Provider>
)
}