import React, { createContext, useState } from "react";
import axios from "axios";

export const SeriesContext = createContext();

export const SeriesProvider = (props) => {
  const apiUrl = "http://localhost:3001/series/";

  const [series, setSeries] = useState([]);

  function getSeriesByCategory(categoryId) {
    return axios
      .get(apiUrl + `?categoryId=${categoryId}`)
      .then((response) => new Promise((resolve) => resolve(response.data)));
  }

  function addSeries(serie) {
    return axios
      .post("http://localhost:3001/series", serie)
      .then((response) => {
        return new Promise((resolve) => resolve(response.data));
      });
  }
  

  function updateSeries(serie) {
    return axios
      .post(`http://localhost:3001/series/${serie.id}`, serie)
      .then((response) => {
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deleteSeries(id) {
    axios.delete(`http://localhost:3001/series/${id}`);
  }

  return (
    <SeriesContext.Provider
      value={{
        getSeriesByCategory,
        series,
        setSeries,
        addSeries,
        updateSeries,
        deleteSeries,
      }}
    >
      {props.children}
    </SeriesContext.Provider>
  );
};
