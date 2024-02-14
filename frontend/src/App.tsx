import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <div className="App flex items-center justify-center h-screen">
      <Routes>
        <Route path="/auth/*" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
