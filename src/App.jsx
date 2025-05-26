import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Compare from "./components/DietaryNeeds";
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantDetails from "./components/MenuApi";
import Nutrition from "./components/Nutrition";
import CompareMacros from "./components/CompareMacros";
import { SearchProvider } from "./components/SearchContext";

function App() {
  return (
    <SearchProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/nutrition/:foodId" element={<Nutrition />} />
          <Route path="/CompareMacros" element={<CompareMacros />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
