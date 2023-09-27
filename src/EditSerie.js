import { Dropdown, Form } from "react-bootstrap";
import React from "react";
import Button from "react-bootstrap/Button";
import { SeriesContext } from "./Contexts/SeriesContext";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import styles from "./add.module.css";
import { CategoryContext } from "./Contexts/CategoryContext";

function EditSeries() {
  let params = useParams();
  let [series, setSerie] = useState({
    id: Number(params.seriesId),
    title: "",
    categoryId: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  let { getSeriesById, updateSeries} =
    useContext(SeriesContext);
  let { getCategoryNameByIndex, categories } =
    useContext(CategoryContext);
  let navigate = useNavigate();
  let { id, categoryId, title } = series;

  useEffect(() => {
    if (id === undefined) return;
    async function fetch() {
      await getSeriesById(id).then((series) => setSerie(series));
    }
    fetch();
  }, [id]);

  function handleChange(event) {
    setSerie((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value };
    });
  }

  function handleCategoryChange(categoryId){
    setSerie((preValue) => {
      return {...preValue, 
    
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateSeries(series)
      .then(() => navigate(`/admin`))
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
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
              {selectedCategory
                ? getCategoryNameByIndex(selectedCategory)
                : "Select Category"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories
                .filter((category) => category.containsSeries)
                .map((category) => (
                  <Dropdown.Item
                    name="categoryId"
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    onChange={handleCategoryChange(category.id)}
                  >
                    {category.title}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default EditSeries;
