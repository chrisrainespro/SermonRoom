import { Form } from "react-bootstrap";
import React from "react";
import Button from "react-bootstrap/Button";
import { CategoryContext } from "./Contexts/CategoryContext";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import styles from "./add.module.css";

function AddCategory() {
  let params = useParams();
  let [category, setCategory] = useState({
    id: params.categoryId,
    title: "",
    containsSeries: "",
  });

  let { getCategoryById, addCategories } =
    useContext(CategoryContext);
  let navigate = useNavigate();
  let { id, title, containsSeries } = category;

  useEffect(() => {
    if (id === undefined) return;
    async function fetch() {
      await getCategoryById(id).then((category) => setCategory(category));
    }
    fetch();
  }, [id]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setCategory((preValue) => {
      return {
        ...preValue,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    addCategories(category).then(navigate("/admin"));
  }
  return (
    <div className={styles.form}>
    <h2>Add category</h2>
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
          <Form.Label>Contains Series</Form.Label> <br/>
            <Form.Check
            inline
            label="Yes"
            name="containsSeries"
            type="checkbox"
            checked={containsSeries}
            onChange={handleChange}
          />
           <Form.Check
            inline
            label="No"
            name="containsSeries"
            type="checkbox"
            checked={!containsSeries}
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

export default AddCategory;
