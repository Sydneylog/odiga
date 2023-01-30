import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from './components/Nav/navbar'
import Home from "./pages/Home";
import MyPlans from "./pages/Myplans";
import Place from "./pages/Place";
import GlobalStyle from "./globalStyle";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <Nav />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="searchplace" element={<Place />} />
          <Route path="myplans/" element={<MyPlans />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
