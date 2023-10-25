import { VideoContext } from "./Contexts/VideoContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Video(props) {
    let params = useParams();
    let { getCurrentVideo } = useContext(VideoContext);
    let [video, setVideo] = useState(
        {
            "id": 0,
            "category": 0,
            "series": null,
            "title": "Test Intro Video Title 1",
            "path": "./public/videos/test.mp4",
            "password": "0000"
        }
    );

    useEffect(() => {
        async function fetchCurrentVideo() {
            await getCurrentVideo().then((vid) => setVideo(vid));
            console.log(video);
            

        }
        fetchCurrentVideo();
    }, []);

  
        return (
            <div className="force-wrap">
                    <video id="videoPlayer" 
                           width="100%" 
                           controls class="force-wrap" 
                           disablePictureInPicture 
                           preload="auto"
                    >
                        <source id='videoSource' src ={video.path} type="video/mp4" />
                    </video>
                    <p class="mb-1">Playback Speed &nbsp; <em id="playbackSpeed">1.0</em></p>
                    <p class="lead">
                        <a class="badge badge-secondary" onclick="changePlaybackSpeed(1)" href="#VideoDiv" role="button">Normal</a>
                        <a class="badge badge-secondary" onclick="changePlaybackSpeed(1.25)" href="#VideoDiv" role="button">Faster</a>
                    </p>
                    
                </div>
        )

    }


