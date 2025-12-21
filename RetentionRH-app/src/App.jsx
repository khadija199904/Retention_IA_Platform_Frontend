import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Auth  from "./pages/auth/Auth";
import Predict from "./pages/generate/generate";


import './App.css'
import Generate from "./pages/generate/generate";

function App() {
  

  return (
   <div>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Navigate to = "/auth" replace  />} />
   <Route path="/auth" element={<Auth/>} />
   <Route path="/generate" element={<Generate/>} />
   
   </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App
