import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Store/Header";

function App() {
  return (
    <div className="App flex flex-col h-screen ">
      <Header />
      <div className="overflow-y-scroll w-full">
        <Routes>
          
          <Route path="/auth/*" element={<AuthPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
