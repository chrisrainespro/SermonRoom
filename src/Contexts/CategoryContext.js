import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const apiUrl = "http://localhost:3001/categories/";

  const [categories, setCategories] = useState([]);

  // useEffect to fetch categories initially
  useEffect(() => {
    async function getCategory() {
      await refreshCategories();
    }
    getCategory();
  }, []);

  // Function to refresh categories
  const refreshCategories = () => {
    return axios.get(apiUrl).then((response) => {
      setCategories(response.data);
    });
  };

    function getCategories() {
      console.log("get categories has run");
      return axios
        .get(apiUrl)
        .then((response) => new Promise((resolve) => resolve(response.data)));
    }
  
  function getCategoryNameByIndex(index) {
    if (categories && categories[index]) {
      return categories[index].title;
    }
    return "N/A"; // Handle the case where the category doesn't exist
  }

  function getCategoryById(categoryId) {
    console.log(categoryId);
    return axios
      .get(apiUrl + categoryId)
      .then((response) => new Promise((resolve) => resolve(response.data)));
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
        categories,
        setCategories,
        refreshCategories,
        getCategoryById,
        getCategoryNameByIndex,
        getCategories,
        addCategories,
        updateCategories,
        deleteCategories,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
