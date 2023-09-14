import { Form } from "react-bootstrap";
import React from "react";
import Button from "react-bootstrap/Button";
import { VideoContext } from "./VideoContext";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

function AddVideo() {
  let params = useParams();
  let [video, setVideo] = useState({
    id: params.videoId,
    category: "",
    series: "",
    title: "",
    path:"",
    password:""
  });

  let { getVideo, addVideo, updateVideo } = useContext(VideoContext);
  let navigate = useNavigate();
  let { id, category, series, title, path, password } = video;

  useEffect(() => {
    if (id === undefined) return;
    async function fetch() {
      await getVideo(id).then((video) => setVideo(video));
    }
    fetch();
  }, [id, getVideo]);

  function handleChange(event) {
    setVideo((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value };
    });
  }

  function addOrUpdate() {
    if (id === undefined) {
      return addVideo(video);
    } else {
      return updateVideo(video);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    addOrUpdate().then((video) => navigate(``));
  }
  return (
    <div>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" name="category" value={category} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Series</Form.Label>
        <Form.Control type="text" name="series" value={series} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={title} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Path</Form.Label>
        <Form.Control type="text" name="path" value={path} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" name="password" value={password} onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
    </div>
  );
}

export default AddVideo;
