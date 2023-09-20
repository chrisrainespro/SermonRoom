import { Form } from "react-bootstrap";
import React from "react";
import Button from "react-bootstrap/Button";
import { SeriesContext } from './Contexts/SeriesContext'
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import styles from './add.module.css'

function AddSeries() {
  let params = useParams();
  let [serie, setSerie] = useState({
    id: params.seriesId,
    title: "",
    categoryId: "",
  });
  


  let { getSeriesByCategory, addSeries, updateSeries } = useContext(SeriesContext);
  let navigate = useNavigate();
  let { id, categoryId, title } = serie;

  useEffect(() => {
    if (id === undefined) return;
    async function fetch() {
      await getSeriesByCategory(categoryId).then((serie) => setSerie(serie));
    }
    fetch();
  }, [id]);

  function handleChange(event) {
    setSerie((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value };
    });
  }

//   function addOrUpdate() {
//     if (id === undefined) {
//       return addSerie(serie);
//     } else {
//       return updateSerie(serie);
//     }
//   }

  function handleSubmit(event) {
    event.preventDefault();
    // addOrUpdate().then((serie) => navigate(``));
    addSeries(serie).then((serie) => navigate(`/admin`));
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
          <Form.Label>Category Id</Form.Label>
          <Form.Control
            type="number"
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
