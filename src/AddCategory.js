import { Form } from "react-bootstrap";
import React from "react";
import Button from "react-bootstrap/Button";
import { CategoryContext } from "./Contexts/CategoryContext";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import styles from './add.module.css'

function AddCategory() {
  let params = useParams();
  let [category, setCategory] = useState({
    id: params.categoryId,
    title: "",
    containsSeries: "",
  });

  let { getCategoryById, addCategories, updateCategories } =
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
    setCategory((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value };
    });
  }

//   function addOrUpdate() {
//     if (id === undefined) {
//       return addCategories(category);
//     } else {
//       return updateCategories(category);
//     }
//   }

  function handleSubmit(event) {
    event.preventDefault();
    // addOrUpdate().then((category) => navigate('/admin'));
    addCategories(category).then(navigate("/admin"));
  }
  return (
    <div className={styles.form}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Tittle</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Contains Series</Form.Label>
          <Form.Control
            type="text"
            name="containsSeries"
            value={containsSeries}
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

