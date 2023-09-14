import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const apiUrl = "http://localhost:3001/categories/";

  const [categories, setCategories] = useState([]);

  useEffect(() =>{
    async function getCategory(){
      await refreshCategories()
    }
    getCategory();
  },[])

  function refreshCategories(){
    return axios.get(apiUrl).then((response) => setCategories(response.data))
  }

  function getCategories() {
    console.log("get categories has run");
    return axios
      .get(apiUrl)
      .then((response) => new Promise((resolve) => resolve(response.data)));
  }

  function getCategoryById(categoryId) {
    console.log(categoryId);
    return axios.get(apiUrl + categoryId);
  }

  function addCategories(category) {
    return axios
      .post("http://localhost:3001/categories", category)
      .then((response) => {
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function updateCategories(category) {
    return axios
      .put(`http://localhost:3001/categories/${category.id}`, category)
      .then((response) => {
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deleteCategories(id) {
    axios.delete(`http://localhost:3001/categories/${id}`);
  }

  return (
    <CategoryContext.Provider
      value={{
        getCategories,
        getCategoryById,
        categories,
        setCategories,
        addCategories,
        updateCategories,
        deleteCategories,
        refreshCategories
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
