import React, { createContext } from "react"
import axios from "axios"

export const VideoContext = createContext()

export const VideoProvider = (props) => {

const apiUrl = "http://localhost:3001/";

function getVideoList(path) {
    console.log("Get Video List Function was called")
    return axios.get(apiUrl+path).then(response =>
        new Promise((resolve) => resolve(response.data)))
        
}


return (
    <VideoContext.Provider
        value={{
            getVideoList
        }}
        >
        {props.children}    
    </VideoContext.Provider>
)
}