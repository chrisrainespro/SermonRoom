import { useParams, useNavigate } from "react-router-dom"
import { VideoContext } from "./VideoContext"
import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"

export default function VideoList(props) {
    let params = useParams()
    let navigate = useNavigate()

    let { getVideoList } = useContext(VideoContext)
    let [ videos, setVideos ] = useState([])

    useEffect(() => {
        console.log("useEffect Called")
        async function fetch() {
            console.log("fetch was called")
            await getVideoList(params.videoPath)
                .then((videos) => setVideos(videos))
        }
        fetch()
    }, [params.videoPath, getVideoList]);

    function buildVideoList(videoList) {
        if (videos === null) return
            return videos.map((video) =>
        <ListGroup.Item key={video.password} >
            <li>{video.title}</li>
        </ListGroup.Item>
        )
    }

    return (
        <>
        <h1>Videos</h1>
        <VideoContext.Consumer>
            {({videos}) => (
                buildVideoList(videos)
            )}
        </VideoContext.Consumer>
        </>
    )
}