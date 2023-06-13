import React from 'react'
import {BrowserRouter,Routes,Route}  from "react-router-dom";
import HomePage from '../pages/HomePage';
import Contatti from '../pages/Contatti';
import GetSimilarTracks from '../pages/GetSimilarTracks';
import NavBar from './NavBar';

function Router() {
  return (
    <BrowserRouter>
    <NavBar/>
        <Routes>
            <Route path="" element={<HomePage/>}></Route>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/contatti" element={<Contatti/>}></Route>
            <Route path="/similarTracks/:idTrack" element={<GetSimilarTracks />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Router