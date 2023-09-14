import { Form } from "react-bootstrap";
import React from "react";
import Button from "react-bootstrap/Button";
import { CategoryContext } from "./CategoryContext";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

function AddCategory() {
  let params = useParams();
  let [category, setCategory] = useState({
    id: params.categoryId,
    title: "",
    containsSeries: "",
  });

  let { getCategory, addCategory, updateCategory } =
    useContext(CategoryContext);
  let navigate = useNavigate();
  let { id, title, containsSeries } = category;

  useEffect(() => {
    if (id === undefined) return;
    async function fetch() {
      await getCategory(id).then((category) => setCategory(category));
    }
    fetch();
  }, [id, getCategory]);

  function handleChange(event) {
    setCategory((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value };
    });
  }

  function addOrUpdate() {
    if (id === undefined) {
      return addCategory(category);
    } else {
      return updateCategory(category);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    addOrUpdate().then((category) => navigate('/admin'));
  }
  return (
    <div>
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
