import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Auth  from "./pages/auth/Auth";
import Predict from "./pages/Prediction/predict";
import GenerationResult from "./pages/Result/GenerationResult"
import './App.css'

function App() {
  

  return (
   <div>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Navigate to = "/auth" replace  />} />
   <Route path="/auth" element={<Auth/>} />
   <Route path="/predict" element={<Predict/>} />
   <Route path="/generationResult" element={<GenerationResult/>} />
   </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App
