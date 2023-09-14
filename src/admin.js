import React, { useState, useEffect, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { CategoryContext } from "./Contexts/CategoryContext";
import { SeriesContext } from "./Contexts/SeriesContext";
import { VideoContext } from "./Contexts/VideoContext";

export default function Admin(props) {
  const {
    categories,
    setCategories,
    refreshCategories,
    getCategoryNameByIndex,
  } = useContext(CategoryContext);
  const { series, setSeries, refreshSeries, getSerieNameByIndex } =
    useContext(SeriesContext);
  const { videos, setVideos, refreshVideos } = useContext(VideoContext);
  // Use useEffect to refresh categories when the component mounts
  useEffect(() => {
    refreshCategories();
  }, []);

  //   let { id, title, categoryId } = series;
  function categoryTable() {
    return categories.map((category) => {
      return (
        <tr key={category.id}>
          <td>{category.title}</td>
          <td>{category.containsSeries ? "Yes" : "No"}</td>
          <td>
            <Button variant="outline-secondary">Edit</Button>
          </td>
          <td>
            <Button variant="outline-danger">Delete</Button>
          </td>
        </tr>
      );
    });
  }

  function seriesTable() {
    return series.map((serie) => {
      return (
        <tr key={serie.id}>
          <td>{serie.title}</td>
          <td>{getCategoryNameByIndex(serie.categoryId)}</td>
          <td>
            <Button variant="outline-secondary">Edit</Button>
          </td>
          <td>
            <Button variant="outline-danger">Delete</Button>
          </td>
        </tr>
      );
    });
  }

  function videosTable() {
    return videos.map((video) => {
      return (
        <tr key={video.id}>
          <td>{getCategoryNameByIndex(video.category)}</td>
          <td>{getSerieNameByIndex(video.series)}</td>
          <td>{video.title}</td>
          <td>{video.password}</td>
          <td>
            <Button variant="outline-secondary">Edit</Button>
          </td>
          <td>
            <Button variant="outline-danger">Delete</Button>
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <h1>Categories</h1>
      <Table className="striped bordered hover ">
        <thead>
          <tr>
            <th>Title</th>
            <th>Contains Series</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{categoryTable()}</tbody>
      </Table>
      <Button>Add Category</Button>
      <h1>Series</h1>
      <Table className="striped bordered hover size">
        <tr>
          <th>Title</th>
          <th>Category Name</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tbody>{seriesTable()}</tbody>
      </Table>
      <Button>Add Series</Button>
      <h1>Videos</h1>
      <Table className="striped bordered hover size">
        <tr>
          <th>Category Name</th>
          <th>Series</th>
          <th>Title</th>
          <th>Password</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tbody>{videosTable()}</tbody>
      </Table>
      <Button>Add Video</Button>
    </>
  );
}
