import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { VideoContext } from "./VideoContext";

export const SeriesContext = createContext();

export const SeriesProvider = (props) => {
  const apiUrl = "http://localhost:3001/series/";

  const [serie, setSerie] = useState([]);
  useEffect(() => {
    async function getSerie() {
      await refreshSeries();
    }
    getSerie();
  }, []);

  function refreshSeries() {
    return axios.get(apiUrl).then((response) => {
      setSerie(response.data);
    });
  }
  function getSeriesById(id) {
    return axios
    .get(apiUrl + id)
    .then((response) => new Promise((resolve) => resolve(response.data)));
  }

  function getSeriesByCategory(categoryId) {
    return axios
      .get(apiUrl + `?categoryId=${categoryId}`)
      .then((response) => new Promise((resolve) => resolve(response.data)));
  }

  function getSerieNameByIndex(index) {
    if (serie && serie[index]) {
      return serie[index].title;
    }
    return "N/A"; 
  }

  function addSeries(series) {
    return axios
      .post("http://localhost:3001/series", series)
      .then((response) => {
        return new Promise((resolve) => resolve(response.data));
      });
  }
  
  function updateSeries(series) {
    console.log(series);
    return axios
      .put(`http://localhost:3001/series/${series.id}`, series)
      .then((response) => {
        return new Promise((resolve) => resolve(response.data));
      });
  }

  async function deleteSeries(id) {
    try {
      await axios.delete(`http://localhost:3001/series/${id}`);
      await refreshSeries();
    } catch (error) {
      console.error("Error deleting Serie:", error);
      throw error;
    }
  }



  return (
    <SeriesContext.Provider
      value={{
        getSeriesByCategory,
        getSeriesById,
        serie,
        setSerie,
        refreshSeries,
        getSerieNameByIndex,
        addSeries,
        updateSeries,
        deleteSeries,
      }}
    >
      {props.children}
    </SeriesContext.Provider>
  );
};
