import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const SeriesContext = createContext();

export const SeriesProvider = (props) => {
  const apiUrl = "http://localhost:3001/series/";

  const [series, setSeries] = useState([]);
  useEffect(() => {
    async function getSerie() {
      await refreshSeries();
    }
    getSerie();
  }, []);

  function refreshSeries() {
    return axios.get(apiUrl).then((response) => {
      setSeries(response.data);
    });
  }
//   function getSeriesById(id) {
//     return axios
//     .get(apiUrl + `${id}`)
//     .then((response) => new Promise((resolve) => resolve(response.data)));
//   }

  function getSeriesByCategory(categoryId) {
    return axios
      .get(apiUrl + `?categoryId=${categoryId}`)
      .then((response) => new Promise((resolve) => resolve(response.data)));
  }

  function getSerieNameByIndex(index) {
    if (series && series[index]) {
      return series[index].title;
    }
    return "N/A"; // Handle the case where the category doesn't exist
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
