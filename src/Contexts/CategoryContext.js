import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const apiUrl = "http://localhost:3001/categories/";

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategory() {
      await refreshCategories();
    }
    getCategory();
  }, []);

 
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
    return "N/A"; 
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

  async function deleteCategories(id) {
    try {
      await axios.delete(`http://localhost:3001/categories/${id}`);
      await refreshCategories();
    } catch (error) {
      console.error("Error deleting Category:", error);
      throw error;
    }
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
