import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const VideoContext = createContext()

export const VideoProvider = (props) => {

const apiUrl = "http://localhost:3001/";

const [videos, setVideos] = useState([])

const [series, setSeries] = useState([])

let [currentCategory, setCurrentCategory] = useState()

useEffect(() => {
    async function updateSeries() {
        await axios.get(apiUrl+"Series").then(response => setSeries(response.data))
    }
    updateSeries()
},[]);

function getVideoList(categoryId) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(apiUrl + "Videos");
            let data = response.data
            const filteredVideos = data.filter((value) => value.category === categoryId);
            setVideos(filteredVideos);
            resolve(filteredVideos);
        } catch (error) {
            console.error("Error fetching videos:", error);
            reject(error);
        }
    });
}
   

function getCategories() {
    return axios.get(apiUrl+"Categories").then(response =>
      new Promise((resolve) => resolve(response.data))  
    )}

function getCategoryById(categoryId) {
    console.log(categoryId)
    return axios.get(apiUrl+"Categories/"+categoryId)
}


return (
    <VideoContext.Provider
        value={{
            getVideoList,
            getCategories,
            getCategoryById,
            videos,
            setVideos,
            series,
            
        }}
        >
        {props.children}    
    </VideoContext.Provider>
)
}