import { Form } from "react-bootstrap";
import React from "react";
import Button from "react-bootstrap/Button";
import { SeriesContext } from "./SeriesContext";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

function AddSeries() {
  let params = useParams();
  let [serie, setSerie] = useState({
    id: params.seriesId,
    title: "",
    categoryId: "",
  });

  let { getSerie, addSerie, updateSerie } = useContext(SeriesContext);
  let navigate = useNavigate();
  let { id, title, categoryId } = serie;

  useEffect(() => {
    if (id === undefined) return;
    async function fetch() {
      await getSerie(id).then((serie) => setSerie(serie));
    }
    fetch();
  }, [id, getSerie]);

  function handleChange(event) {
    setSerie((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value };
    });
  }

  function addOrUpdate() {
    if (id === undefined) {
      return addSerie(serie);
    } else {
      return updateSerie(serie);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    addOrUpdate().then((serie) => navigate(``));
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
          <Form.Label>Contains Id</Form.Label>
          <Form.Control
            type="text"
            name="categoryId"
            value={categoryId}
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

export default AddSeries;
