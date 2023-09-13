import { VideoContext } from "./Contexts/VideoContext";
import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ListGroup, Stack } from "react-bootstrap";

export default function AdminVideoList(props) {
  let params = useParams();
  let { getVideosByCategory, videos, setVideos } = useContext(VideoContext);

  useEffect(() => {
    async function fetch() {
      await getVideosByCategory(Number(params.categoryId)).then((videos) =>
        setVideos(videos)
      );
    }
    fetch();
  }, [params.categoryId]);

  function buildVideoList() {
    if (videos === null || videos === undefined) return <p>No Videos Found</p>;
    else {
      return videos.map((video) => {
        return (
          <ListGroup.Item key={video.id}>
            <Link to={video.path} className="nav-link">
              <li>{video.title}</li>
            </Link>
          </ListGroup.Item>
        );
      });
    }
  }

  return (
    <>
      <h1>Videos</h1>
      <Stack direction="horizontal" gap={3}>
        <ListGroup className="w-75">
          <ol>
            <VideoContext.Consumer>
              {() => buildVideoList()}
            </VideoContext.Consumer>
          </ol>
        </ListGroup>
      </Stack>
    </>
  );
}
