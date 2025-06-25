// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Edit2,
} from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({
  blogs,
  selectedId,
  editId,
  editValue,
  onEditChange,
  onEditKeyDown,
  onEditBlur,
  onAddParent,
  onSearch,
  onAddChild,
  onStartRename,
  onSelectBlog,
}) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (blogs.length) setOpen(true);
  }, [blogs]);

  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col overflow-y-auto">
      {/* Top Actions */}
      <div className="flex flex-col items-center">
        <button onClick={onAddParent} className="sidebar-btn">
          <PlusCircle size={18} className="svg-icon" />
          <span className="ml-2 text-sm">New blog</span>
        </button>

        <button onClick={onSearch} className="sidebar-btn">
          <Search size={18} className="svg-icon" />
          <span className="ml-2 text-sm">Search blogs</span>
        </button>
      </div>

      {/* Blogs Section */}
      <div className="blog-section px-3">
        <button
          onClick={() => setOpen(o => !o)}
          className="sidebar-section-header w-full flex items-center justify-between px-4 py-2.5"
        >
          <span className="text-sm font-medium">Blogs</span>
          {open ? (
            <ChevronUp size={16} className="svg-icon" />
          ) : (
            <ChevronDown size={16} className="svg-icon" />
          )}
        </button>

        {open && (
          <ul className="mt-2 list-none p-0 space-y-1 text-sm">
            {blogs.map(blog => (
              <li key={blog.id}>
                {/* Parent Row */}
                <div className="sidebar-row flex items-center justify-between px-6 py-2">
                  {editId === blog.id ? (
                    <input
                      autoFocus
                      value={editValue}
                      onChange={onEditChange}
                      onKeyDown={onEditKeyDown}
                      onBlur={onEditBlur}
                      placeholder="Name…"
                      className="sidebar-input"
                    />
                  ) : (
                    <span
                      className={`blog-input flex-1 cursor-pointer hover:underline ${
                        selectedId === blog.id ? "font-semibold" : ""
                      }`}
                      onClick={() => onSelectBlog(blog)}
                    >
                      {blog.title}
                    </span>
                  )}

                  <div className="flex items-center">
                    <button
                      onClick={() => onAddChild(blog.id)}
                      className="sidebar-icon-btn ml-6 text-gray-400"
                      aria-label="Add sub blog"
                    >
                      <PlusCircle size={16} className="svg-icon" />
                    </button>
                    <button
                      onClick={() => onStartRename(blog.id, blog.title)}
                      className="sidebar-icon-btn ml-6 text-gray-400"
                      aria-label="Rename blog"
                    >
                      <Edit2 size={16} className="svg-icon" />
                    </button>
                  </div>
                </div>

                {/* Child Rows */}
                {blog.children?.length > 0 && (
                  <ul className="ml-10 mt-1 list-none p-0 space-y-1 text-gray-300">
                    {blog.children.map(child => (
                      <li key={child.id}>
                        <div className="sidebar-row flex items-center justify-between px-10 py-1.5">
                          {editId === child.id ? (
                            <input
                              autoFocus
                              value={editValue}
                              onChange={onEditChange}
                              onKeyDown={onEditKeyDown}
                              onBlur={onEditBlur}
                              placeholder="Name…"
                              className="sidebar-input"
                            />
                          ) : (
                            <span
                              className="flex-1 cursor-pointer hover:underline"
                              onClick={() => onSelectBlog(child)}
                            >
                              {child.title}
                            </span>
                          )}

                          <button
                            onClick={() => onAddChild(child.id)}
                            className="sidebar-icon-btn ml-6 text-gray-400"
                            aria-label="Add sub blog"
                          >
                            <PlusCircle size={16} className="svg-icon" />
                          </button>
                          <button
                            onClick={() => onStartRename(child.id, child.title)}
                            className="sidebar-icon-btn ml-6 text-gray-400"
                            aria-label="Rename sub blog"
                          >
                            <Edit2 size={16} className="svg-icon" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
