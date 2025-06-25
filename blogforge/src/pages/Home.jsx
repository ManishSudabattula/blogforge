import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <main className="flex flex-col justify-center items-center h-[80vh] text-center">
        <h1 className="text-white text-5xl font-bold mb-4">Welcome to BlogForge</h1>
        <button
          className="bg-white text-black px-6 py-2 rounded-xl hover:scale-105 transition font-semibold mt-2"
          onClick={() => navigate("/editor")}
        >
          Start Writing
        </button>
      </main>
    </div>
  );
} 