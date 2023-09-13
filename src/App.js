import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import VideoList from "./VideoList";
import Video from "./Video";
import Admin from "./admin";
import SeriesList from "./SeriesList";
import AdminVideoList from "./AdminVideoList";
import AdminSeriesList from "./AdminSeriesList";


function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>} >
        <Route index element={<p>Please Select a Category from the Menu Above</p>}  />
        <Route path="videos/list/:categoryId" element={<VideoList />} />
        <Route path="series/list/:seriesId" element={<SeriesList /> } />
      </Route>
      <Route path='/admin' element={<Home/>}>
      <Route index element={<p>Please Select a Category from the Menu Above</p>}  />
        <Route path="videos/list/:categoryId" element={<AdminVideoList />} />
        <Route path="series/list/:seriesId" element={<AdminSeriesList /> } />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

