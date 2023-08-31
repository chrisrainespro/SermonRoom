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
        async function fetch() {
            await getVideoList(params.catagoryId)
                .then((videos) => setVideos(videos))
        }
        fetch()
    },[videos]);

    function buildVideoList() {
        if (videos === null) return
            return videos.map((video) => {
            if (video.series === null) {
                return (
                    <ListGroup.Item key={video.id} >
                    
                    <Link to={video.path} className="nav-link"><li>{video.title}</li></Link> 
                    
                </ListGroup.Item>
                )
           
            }
            else {
                return (
                <ListGroup.Item key={video.id} >
                <Link to={video.path} className="nav-link"><li>{video.series}</li></Link> 
                </ListGroup.Item>
                )
        }
        
    })
    }

    return (
        <>
        <h1>Videos</h1>
        <ol type="1">
        <VideoContext.Consumer>
            
            {({videos}) => (
                buildVideoList(videos)
            )}
        </VideoContext.Consumer>
        </ol>
        </>
    )
}