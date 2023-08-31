import React, { createContext } from "react"
import axios from "axios"

export const VideoContext = createContext()

export const VideoProvider = (props) => {

const apiUrl = "http://localhost:3001/";

function getVideoList(path) {
    if (path) {
        return axios.get(apiUrl+path).then(response =>
        new Promise((resolve) => resolve(response.data)))
    }
   else {
    return axios.get(apiUrl+"intro").then(response =>
        new Promise((resolve) => resolve(response.data))
   )}       
}

function getCatagories() {
    console.log("getCatagories has been called");
    return axios.get(apiUrl+"Catagories").then(response =>
      new Promise((resolve) => resolve(response.data))  
    )}


return (
    <VideoContext.Provider
        value={{
            getVideoList,
            getCatagories
        }}
        >
        {props.children}    
    </VideoContext.Provider>
)
}