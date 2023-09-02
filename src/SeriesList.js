import { SeriesContext } from "./Contexts/SeriesContext";
import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

export default function SeriesList(props) {
  let params = useParams();
  let { getSeriesByCategory, series, setSeries } = useContext(SeriesContext);
  

  useEffect(() => {
        async function fetch() {
        await getSeriesByCategory(Number(params.seriesId))
        .then((series) => setSeries(series))
    }
    fetch()
  },[params.seriesId]);

 

  function buildSeriesList() {
    if (series === null || series === undefined) return <p>No Series Found</p>;
    else {
      return series.map((series) => {
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
          {() => buildSeriesList(series)}
        </SeriesContext.Consumer>
      </ol>
    </>
  );
}
