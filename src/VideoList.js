import { useParams, useNavigate } from "react-router-dom"
import { VideoContext } from "./VideoContext"
import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"

export default function VideoList(props) {
    let params = useParams()

    let { getVideoList, getCategoryById, videos, setVideos, series } = useContext(VideoContext)

    let defaultCategory = {
        id: 0,
        title: "Intro",
        containsSeries: false
    }
    let [currentCategory, setCurrentCategory] = useState(defaultCategory)

    useEffect(() => {
        async function fetch() {
            await getVideoList(Number(params.catagoryId))
                .then((videos) => setVideos(videos))       
        }
        fetch()
    },[params.catagoryId]);

    useEffect(() => {
        console.log("Second use effect has run")
        async function setCategory() {
            await getCategoryById(Number(params.catagoryId))
            .then((result) => setCurrentCategory(result.data))  
        }
        setCategory()
}, []);

 
    function buildVideoList() {
        
        if (videos === null) return
            return videos.map((video) => {
                if (video === undefined) {
                    return (
                        <p>No Videos Found</p>
                    )
                }

               if (currentCategory.containsSeries) {
                console.log(currentCategory)
                console.log(series)
                return (
                    <ListGroup.Item key={video.id} >
                        <Link to={video.path} className="nav-link"><li>{series[video.series].title}</li></Link> 
                    </ListGroup.Item>
                    )
                }
                return (
                    <ListGroup.Item key={video.id} >
                    
                    <Link to={video.path} className="nav-link"><li>{video.title}</li></Link> 
                    
                </ListGroup.Item>
                )

           
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