import React, { useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Code,
  Quote,
} from "lucide-react";

const RichTextEditor = ({ value, onChange, placeholder, error }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    handleInput();
  };

  const toolbarButtons = [
    { icon: Bold, command: "bold", title: "Bold (Ctrl+B)" },
    { icon: Italic, command: "italic", title: "Italic (Ctrl+I)" },
    { icon: Underline, command: "underline", title: "Underline (Ctrl+U)" },
    { icon: Code, command: "formatBlock", value: "pre", title: "Code Block" },
    {
      icon: Quote,
      command: "formatBlock",
      value: "blockquote",
      title: "Quote",
    },
    { icon: List, command: "insertUnorderedList", title: "Bullet List" },
    { icon: ListOrdered, command: "insertOrderedList", title: "Numbered List" },
    { icon: Link, command: "createLink", title: "Insert Link" },
  ];

  const handleToolbarClick = (button) => {
    if (button.command === "createLink") {
      const url = prompt("Enter URL:");
      if (url) {
        formatText(button.command, url);
      }
    } else {
      formatText(button.command, button.value);
    }
  };

  return (
    <div
      className={`border rounded-lg overflow-hidden ${
        error ? "border-red-300" : "border-gray-300"
      }`}
    >
      <div className="border-b bg-gray-50 p-3">
        <div className="flex flex-wrap gap-1">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleToolbarClick(button)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
              title={button.title}
            >
              <button.icon size={16} />
            </button>
          ))}
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-32 max-h-64 overflow-y-auto outline-none prose prose-sm max-w-none"
        placeholder={placeholder}
        onInput={handleInput}
        onPaste={handlePaste}
        style={{
          minHeight: "8rem",
          maxHeight: "16rem",
        }}
      />
      {!value && (
        <div className="absolute top-14 left-4 text-gray-400 pointer-events-none">
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
