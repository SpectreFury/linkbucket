import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Buckets from "./pages/Buckets";

function App() {
  return (
    <main style={{ width: "400px", height: "600px", background: "#352F44" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buckets" element={<Buckets/>}/>
      </Routes>
    </main>
  );
}

export default App;
