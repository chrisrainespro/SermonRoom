import React, { createContext, useState } from "react"
import axios from "axios"

export const VideoContext = createContext()

export const VideoProvider = (props) => {

const apiUrl = "http://localhost:3001/";

let [videos, setVideos] = useState([])

function getVideoList(catagoryId) {
    if (catagoryId) {
        let responseData = axios.get(apiUrl+"/Videos").then(response =>
        new Promise((resolve) => resolve(response.data)))
        setVideos(responseData)
        let filteredVideoList = videos.filter((value) => {
            return value.catagoryId === catagoryId
        })
        console.log(filteredVideoList)
        return filteredVideoList
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