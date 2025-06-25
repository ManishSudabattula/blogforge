import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Your Blogs</h2>
        <div className="w-full max-w-2xl border rounded p-4 bg-white">
          {/* Blog list will go here */}
          <p className="text-gray-500">No blogs yet.</p>
        </div>
      </main>
    </div>
  );
} 