import React, { useEffect, useContext } from "react";
import { Button, Navbar, Table, Container, Nav } from "react-bootstrap";
import { CategoryContext } from "./Contexts/CategoryContext";
import { SeriesContext } from "./Contexts/SeriesContext";
import { VideoContext } from "./Contexts/VideoContext";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";

export default function Admin(props) {
  const {
    categories,
    refreshCategories,
    getCategoryNameByIndex,
    deleteCategories,
  } = useContext(CategoryContext);
  const { serie, refreshSeries, getSerieNameByIndex, deleteSeries } =
    useContext(SeriesContext);
  const { videos, refreshVideos, deleteVideos } = useContext(VideoContext);
  const navigate = useNavigate();
  // Use useEffect to refresh categories when the component mounts
  useEffect(() => {
    refreshCategories();
    refreshSeries();
    refreshVideos();
  }, []);

  function handleDeleteCategory(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (confirmed) {
      deleteCategories(id);
      navigate("/admin");
    }
  }

  function handleDeleteVideo(id) {
    const approved = window.confirm(
      "Are you sure you want to delete this Video?"
    );
    if (approved) {
      deleteVideos(id);
      navigate("/admin");
    }
  }
  function handleDeleteSerie(id) {
    const aggreed = window.confirm("Are you sure you want to delete this Serie?");
    if (aggreed) {
      deleteSeries(id);
      navigate("/admin");
    }
  }
  function categoryTable() {
    return categories.map((category) => {
      return (
        <tr key={category.id}>
          <td>{category.title}</td>
          <td>{category.containsSeries ? "Yes" : "No"}</td>
          <td>
            <Link
              to={`/admin/editCat/${category.id}`}
              className="btn btn-outline-secondary m-1"
            >
              Edit
            </Link>
          </td>
          <td>
            <Button
              variant="outline-danger"
              onClick={handleDeleteCategory.bind(this, category.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  }

  function seriesTable() {
    return serie.map((series) => {
      return (
        <tr key={series.id}>
          <td>{series.title}</td>
          <td>{getCategoryNameByIndex(series.categoryId)}</td>
          <td>
            <Link
              to={`/admin/editSer/${series.id}`}
              className="btn btn-outline-secondary m-1"
            >
              Edit
            </Link>
          </td>
          <td>
            <Button
              onClick={handleDeleteSerie.bind(this, series.id)}
              variant="outline-danger"
            >
              Delete
            </Button>
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
            <Link
              to={`/admin/editVid/${video.id}`}
              className="btn btn-outline-secondary m-1"
            >
              Edit
            </Link>
          </td>
          <td>
            <Button
              onClick={handleDeleteVideo.bind(this, video.id)}
              variant="outline-danger"
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="logo"
              src="public/bethelLogo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            BCOMSermon Admin
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="tables">
        <h2>Categories</h2>
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
        <Link to={"/admin/addCat"} className="btn btn-primary m-1">
          Add Category
        </Link>
        <h2>Series</h2>
        <Table className="striped bordered hover size">
          <tr>
            <th>Title</th>
            <th>Category Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          <tbody>{seriesTable()}</tbody>
        </Table>
        <Link to={"/admin/addSer"} className="btn btn-primary m-1">
          Add Series
        </Link>
        <h2>Videos</h2>
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
        <Link to={"/admin/addVid"} className="btn btn-primary m-1">
          Add Video
        </Link>
      </div>
    </>
  );
}
