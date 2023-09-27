import { Dropdown, Form } from "react-bootstrap";
import React from "react";
import Button from "react-bootstrap/Button";
import { VideoContext } from "./Contexts/VideoContext";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import styles from "./add.module.css";
import { CategoryContext } from "./Contexts/CategoryContext";
import { SeriesContext } from "./Contexts/SeriesContext";

function EditVideo() {
  let params = useParams();
  let [video, setVideo] = useState({
    id: params.videoId,
    category: "",
    title: "",
    path: "",
    password: "",
  });

  let { getVideosById, updateVideos } = useContext(VideoContext);
  let { categories, getCategoryNameByIndex } = useContext(CategoryContext);
  let { serie, getSerieNameByIndex } = useContext(SeriesContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("");
  let navigate = useNavigate();
  let { id, category, series, title, path, password } = video;

  useEffect(() => {
    if (id === undefined) return;
    async function fetch() {
      await getVideosById(id).then((video) => setVideo(video));
    }
    fetch();
  }, [id]);

  function handleChange(event) {
    setVideo((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value };
    });
  }

  function CategoriesDropdown() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
          {selectedCategory
            ? getCategoryNameByIndex(selectedCategory)
            : "Select Category"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {categories.map((category) => (
            <Dropdown.Item
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  function SeriesDropdown() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
          {selectedSeries 
            ? getSerieNameByIndex(selectedSeries)
            : "Select Series"}
            
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {serie.map((s) => (
            <Dropdown.Item key={s.id} onClick={() => setSelectedSeries(s.id)}>
              {s.title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  const newVideo = {
    category: selectedCategory,
    series: selectedSeries,
    title: video.title,
    path: video.path,
    password: video.password,
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateVideos(newVideo).then(() => navigate("/admin"));
  }
  return (
    <div className={styles.form}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          {CategoriesDropdown()}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          {SeriesDropdown()}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Path</Form.Label>
          <Form.Control
            type="text"
            name="path"
            value={path}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default EditVideo;
