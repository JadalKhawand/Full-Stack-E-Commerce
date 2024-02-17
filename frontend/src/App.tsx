import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Store/Header";
import FiltersBar from "./Filters/FiltersBar";
import { useCommerceStore } from "./store";

function App() {
  const {
    token,
    showCart,
    setShowCart,
    showConfimModal,
    confirmModalMessage,
    onCancel,
    onConfirm,
    showReviewModal,
  } = useCommerceStore();
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="App flex flex-col h-screen ">
      <div className="flex flex-col w-full bg-white">
        <Header />
        {showFilters && <FiltersBar />}
        <FiltersBar />
      </div>
      <div className="overflow-y-scroll w-full">
        <Routes>
          <Route path="/auth/*" element={<AuthPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
