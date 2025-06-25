import React from "react";
import "./Sidebar.css";
import { Image as ImageIcon, Link as LinkIcon, Youtube as YoutubeIcon, Heading1 as Heading1Icon, Bold as BoldIcon, Italic as ItalicIcon, List as ListIcon, ListOrdered as ListOrderedIcon } from "lucide-react";

export function ToolsPanel({ editorRef }) {
  // Helper to focus editor and run execCommand
  const runCommand = (cmd, value = null) => {
    if (editorRef?.current) {
      editorRef.current.focus();
      document.execCommand(cmd, false, value);
    }
  };

  // Image upload handler
  const handleImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          runCommand("insertImage", ev.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Link handler
  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) runCommand("createLink", url);
  };

  // YouTube embed handler
  const handleYouTube = () => {
    const url = prompt("Enter YouTube video URL:");
    if (!url) return;
    const match = url.match(/(?:youtu.be\/|v=|embed\/)([\w-]{11})/);
    const id = match ? match[1] : null;
    if (id) {
      const iframe = `<iframe width='100%' height='315' src='https://www.youtube.com/embed/${id}' frameborder='0' allowfullscreen></iframe>`;
      if (editorRef?.current) {
        editorRef.current.focus();
        document.execCommand("insertHTML", false, iframe);
      }
    } else {
      alert("Invalid YouTube URL");
    }
  };

  return (
    <div className="flex flex-col items-center p-2 h-full w-full">
      <div className="flex flex-col space-y-4 p-2 overflow-auto h-full items-center">
        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition" title="Normal text" onClick={() => runCommand("formatBlock", "<P>") }>
          <span className="font-semibold text-xs">T</span>
        </button>
        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition" title="Heading 1" onClick={() => runCommand("formatBlock", "<H1>") }>
          <Heading1Icon className="svg-icon" size={14} />
        </button>
        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition" title="Bold" onClick={() => runCommand("bold") }>
          <BoldIcon className="svg-icon" size={14} />
        </button>
        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition" title="Italic" onClick={() => runCommand("italic") }>
          <ItalicIcon className="svg-icon" size={14} />
        </button>
        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition" title="Bulleted List" onClick={() => runCommand("insertUnorderedList") }>
          <ListIcon className="svg-icon" size={14} />
        </button>
        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition" title="Numbered List" onClick={() => runCommand("insertOrderedList") }>
          <ListOrderedIcon className="svg-icon" size={14} />
        </button>
        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition" title="Image Upload" onClick={handleImage}>
          <ImageIcon className="svg-icon" size={14} />
        </button>
        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition" title="Insert Link" onClick={handleLink}>
          <LinkIcon className="svg-icon" size={14} />
        </button>
        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition" title="YouTube Embed" onClick={handleYouTube}>
          <YoutubeIcon className="svg-icon" size={14} />
        </button>
      </div>
    </div>
  );
} 