import { useState } from "react";
import "./App.css";
import Default from "./components/default/Default";
import Charts from "./components/charts/Charts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/visual" element={<Charts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
