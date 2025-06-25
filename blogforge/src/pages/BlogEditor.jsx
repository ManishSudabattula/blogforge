import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ToolsPanel } from "../components/ToolsPanel";

export default function BlogEditor() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const editorRef = useRef(null);

  // Load saved blogs on mount
  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) {
      try {
        setBlogs(JSON.parse(stored));
      } catch (_) {
        console.error("Failed to parse stored blogs");
      }
    }
  }, []);

  // Persist blogs whenever they change
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  // Update/remove helpers
  const updateTree = (arr, id, cb) =>
    arr.map((item) =>
      item.id === id
        ? cb(item)
        : item.children
        ? {
            ...item,
            children: updateTree(item.children, id, cb),
          }
        : item
    );
  const removeNode = (arr, id) =>
    arr
      .filter((i) => i.id !== id)
      .map((i) => ({
        ...i,
        children: i.children ? removeNode(i.children, id) : [],
      }));

  // Commit inline edit/add
  const commitEdit = () => {
    const v = editValue.trim();
    if (v) {
      setBlogs((b) =>
        updateTree(b, editId, (n) => ({ ...n, title: v }))
      );
      if (selected?.id === editId)
        setSelected((s) => ({ ...s, title: v }));
    } else {
      setBlogs((b) => removeNode(b, editId));
    }
    setEditId(null);
    setEditValue("");
  };

  // Handlers
  const handleAddParent = () => {
    const id = Date.now();
    setBlogs((b) => [...b, { id, title: "", children: [] }]);
    setEditId(id);
    setEditValue("");
  };
  const handleAddChild = (pid) => {
    const id = Date.now();
    setBlogs((b) =>
      updateTree(b, pid, (n) => ({
        ...n,
        children: [...n.children, { id, title: "", children: [] }],
      }))
    );
    setEditId(id);
    setEditValue("");
  };
  const handleRename = (id, cur = "") => {
    setEditId(id);
    setEditValue(cur);
  };
  const handleSelect = (b) => setSelected(b);
  const handleSearch = () => console.log("search blogs");

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar hideDashboard />

      <div className="grid flex-1 overflow-hidden w-full grid-cols-[20%_70%_10%]">
        {/* Left Sidebar */}
        <div className="h-full overflow-hidden">
          <Sidebar
            blogs={blogs}
            selectedId={selected?.id}
            editId={editId}
            editValue={editValue}
            onEditChange={(e) => setEditValue(e.target.value)}
            onEditKeyDown={(e) => e.key === "Enter" && commitEdit()}
            onEditBlur={commitEdit}
            onAddParent={handleAddParent}
            onSearch={handleSearch}
            onAddChild={handleAddChild}
            onStartRename={handleRename}
            onSelectBlog={handleSelect}
          />
        </div>

        {/* Middle Column */}
        <div className="flex flex-col h-full overflow-auto">
          <div className="flex items-start p-6 pb-0">
            <div className="flex space-x-4 p-4">
              <button
                disabled={!selected}
                onClick={() => alert(`Publishing \"${selected?.title}\"`)}
                className="bg-green-500 text-white px-6 py-3 rounded hover:scale-105 transition disabled:opacity-50"
              >
                Publish
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-white text-black px-6 py-3 rounded hover:scale-105 transition"
              >
                Dashboard
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col p-6 pt-4">
            <h2 className="text-center mt-6 mb-4 text-[1.5rem] font-semibold text-white">
              {selected?.title || "Select or create a blog"}
            </h2>
            {/* Rich Text Editor Content Area */}
            <div
              contentEditable
              ref={editorRef}
              suppressContentEditableWarning
              className="w-full flex-1 min-h-0 p-4 bg-gray-800 text-white rounded-b outline-none overflow-auto focus:ring-2 focus:ring-blue-400 text-base"
              style={{ minHeight: '300px' }}
              placeholder="Start writing your blog..."
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="h-full flex flex-col overflow-hidden">
          <div className="h-full overflow-auto">
            <ToolsPanel editorRef={editorRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
