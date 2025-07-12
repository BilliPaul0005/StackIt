import React, { useState } from "react";
import { X, Tag } from "lucide-react";

const TagInput = ({ tags, onChange, error }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "HTML",
    "CSS",
    "SQL",
    "MongoDB",
    "Express",
    "Vue.js",
    "Angular",
    "TypeScript",
    "PHP",
    "Ruby",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "Flutter",
    "Django",
    "Flask",
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(suggestion)
  );

  const addTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      onChange([...tags, trimmedTag]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  return (
    <div className="relative">
      <div
        className={`border rounded-lg p-3 ${
          error ? "border-red-300" : "border-gray-300"
        } focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500`}
      >
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1 animate-fadeIn"
            >
              <Tag size={12} />
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-blue-600 hover:text-blue-800 ml-1 transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(inputValue.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={
              tags.length === 0
                ? "Add tags (press Enter or comma)"
                : "Add another tag..."
            }
            className="flex-1 outline-none text-sm"
            disabled={tags.length >= 5}
          />
          {tags.length >= 5 && (
            <span className="text-xs text-red-500">Maximum 5 tags</span>
          )}
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {filteredSuggestions.slice(0, 10).map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => addTag(suggestion)}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-gray-400" />
                {suggestion}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Popular tags */}
      {tags.length === 0 && !showSuggestions && (
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-2">Popular tags:</p>
          <div className="flex flex-wrap gap-1">
            {suggestions.slice(0, 8).map((tag, index) => (
              <button
                key={index}
                type="button"
                onClick={() => addTag(tag)}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagInput;
