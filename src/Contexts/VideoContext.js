import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const VideoContext = createContext();

export const VideoProvider = (props) => {
  const apiUrl = "http://localhost:3001/videos/";

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getVideo() {
      await refreshVideos();
    }
    getVideo();
  }, []);

  const refreshVideos = () => {
    return axios.get(apiUrl).then((response) => setVideos(response.data));
  };

  function getVideosById(videoId) {
    return axios
    .get(apiUrl + videoId)
    .then((response) => new Promise((resolve) => resolve(response.data)));
  }

  //GetCurrentVideo functionality will be updated when backend is created.  All logic will be handled by the backend
  function getCurrentVideo() {
    return axios
    .get(apiUrl+0)
    .then((response) => new Promise((resolve) => resolve(response.data)));
  }

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
      .put(`http://localhost:3001/videos/${video.id}`, video)
      .then((response) => {
        return new Promise((resolve) => resolve(response.data));
      });
  }

  async function deleteVideos(id) {
    try {
      await axios.delete(`http://localhost:3001/videos/${id}`);
      await refreshVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
      throw error;
    }
  }

  return (
    <VideoContext.Provider
      value={{
        getVideosByCategory,
        getVideosById,
        videos,
        setVideos,
        refreshVideos,
        addVideos,
        updateVideos,
        deleteVideos,
        getCurrentVideo
      }}
    >
      {props.children}
    </VideoContext.Provider>
  );
};
