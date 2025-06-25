import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BlogEditor from "./pages/BlogEditor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogEditor />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
