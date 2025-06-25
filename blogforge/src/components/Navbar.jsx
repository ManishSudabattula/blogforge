import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ hideDashboard = false }) {
  const nav = useNavigate();
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <span className="text-[2.5rem] font-bold tracking-wider sm:text-[2.5rem]" style={{ letterSpacing: '0.05em' }}>BlogForge</span>
      {!hideDashboard && (
        <button
          onClick={() => nav("/")}
          className="bg-white text-black px-4 py-2 rounded hover:scale-105 transition"
        >
          Dashboard
        </button>
      )}
    </nav>
  );
}
