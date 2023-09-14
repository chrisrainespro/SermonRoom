import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const VideoContext = createContext()

export const VideoProvider = (props) => {

const apiUrl = "http://localhost:3001/videos/";

const [videos, setVideos] = useState([])

useEffect(() => {
    async function getVideo(){
        await refreshVideos();
    }
    getVideo();
}, []);

const refreshVideos = () => {
    return axios.get(apiUrl).then(response =>
    setVideos(response.data))
}

function getVideosByCategory(categoryId) {
   return axios.get(apiUrl+`?category=${categoryId}`).then(response =>
    new Promise((resolve) => resolve(response.data))
    )}



return (
    <VideoContext.Provider
        value={{
            getVideosByCategory,
            videos,
            setVideos,
            refreshVideos
        }}
        >
        {props.children}    
    </VideoContext.Provider>
)
}