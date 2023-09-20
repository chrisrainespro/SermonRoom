import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import VideoList from "./VideoList";
import Admin from "./Admin";
import SeriesList from "./SeriesList";
import AddCategory from "./AddCategory";
import AddVideo from "./AddVideos";
import AddSeries from "./AddSeries";



function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>} >
        <Route index element={<p>Please Select a Category from the Menu Above</p>}  />
        <Route path="videos/list/:categoryId" element={<VideoList />} />
        <Route path="series/list/:seriesId" element={<SeriesList /> } />
      </Route>
      <Route path='/admin' element={<Admin/>} />
      <Route path='/admin/addCat' element={<AddCategory/>} />
      <Route path='/admin/addSer' element={<AddSeries/>} />
      <Route path='/admin/addVid' element={<AddVideo/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

