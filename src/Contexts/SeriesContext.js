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


  return (
    <SeriesContext.Provider
      value={{
        getSeriesByCategory,
        series,
        setSeries,
        refreshSeries,
        getSerieNameByIndex
      }}
    >
      {props.children}
    </SeriesContext.Provider>
  );
};
