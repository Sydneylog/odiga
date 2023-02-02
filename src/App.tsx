import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Nav from './components/Nav/navbar'
import Home from "./pages/Home";
import MyPlans from "./pages/Myplans";
import Place from "./pages/Place";
import GlobalStyle from "./globalStyle";
import { Provider } from "react-redux";
import store from "./store/store";
import Footer from './components/Footer'


export default function App() {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log('>>', position)
  })
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyle />
          <Nav />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="searchplace" element={<Place />} />
            <Route path="myplans/" element={<MyPlans />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </ Provider>

    </div>
  );
}
