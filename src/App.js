import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import VideoList from "./VideoList";
import Video from "./Video";


function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>} >
        <Route index element={<p>Welcome</p>}  />
        <Route path="list/:catagoryId" element={<VideoList />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

