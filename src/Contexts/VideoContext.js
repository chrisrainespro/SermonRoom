import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const VideoContext = createContext();

export const VideoProvider = (props) => {
  const apiUrl = "http://localhost:3001/videos/";

  const [videos, setVideos] = useState([]);

  function getVideosByCategory(categoryId) {
    return axios
      .get(apiUrl + `?category=${categoryId}`)
      .then((response) => new Promise((resolve) => resolve(response.data)));
  }

  function addVideos(video) {
    return axios
      .post("http://localhost:3001/videos", video)
      .then((response) => {
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function updateVideos(video) {
    return axios
      .post(`http://localhost:3001/videos/${video.id}`, video)
      .then((response) => {
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deleteVideos(id) {
    axios.delete(`http://localhost:3000/videos/${id}`);
  }

  return (
    <VideoContext.Provider
      value={{
        getVideosByCategory,
        videos,
        setVideos,
        addVideos,
        updateVideos,
        deleteVideos,
      }}
    >
      {props.children}
    </VideoContext.Provider>
  );
};
