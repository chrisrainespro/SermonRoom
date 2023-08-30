import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Introduction from "./Introduction";
import VideoList from "./VideoList";


function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>}>
        <Route index element={<Introduction/>}  />
        <Route path=":videoPath" element={<VideoList />} />

      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

