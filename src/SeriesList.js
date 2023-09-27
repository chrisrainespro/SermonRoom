import { SeriesContext } from "./Contexts/SeriesContext";
import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

export default function SeriesList(props) {
  let params = useParams();
  let { getSeriesByCategory, serie, setSerie } = useContext(SeriesContext);
  

  useEffect(() => {
        async function fetch() {
        await getSeriesByCategory(Number(params.seriesId))
        .then((serie) => setSerie(serie))
    }
    fetch()
  },[params.seriesId]);

 

  function buildSeriesList() {
    if (serie === null || serie === undefined) return <p>No Series Found</p>;
    else {
      return serie.map((series) => {
        return (
          <ListGroup.Item key={series.id}>
            <Link to={series.path} className="nav-link">
              <li>{series.title}</li>
            </Link>
          </ListGroup.Item>
        );
      });
    }
  }

  return (
    <>
      <h1>Series</h1>
      <ol type="1">
        <SeriesContext.Consumer>
          {() => buildSeriesList(serie)}
        </SeriesContext.Consumer>
      </ol>
    </>
  );
}
