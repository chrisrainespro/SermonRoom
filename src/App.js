import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Introduction from "./Introduction";


function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>}>
        <Route index element={<Introduction/>}  />

      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

