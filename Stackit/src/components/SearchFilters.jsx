import React from "react";
import {
  Filter,
  ChevronDown,
  SortAsc,
  SortDesc,
  Clock,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

const SearchFilters = ({
  showFilters,
  setShowFilters,
  sortBy,
  setSortBy,
  selectedTag,
  setSelectedTag,
  allTags,
}) => {
  const sortOptions = [
    { value: "newest", label: "Newest", icon: Clock },
    { value: "oldest", label: "Oldest", icon: Clock },
    { value: "votes", label: "Most Votes", icon: TrendingUp },
    { value: "unanswered", label: "Unanswered", icon: MessageCircle },
  ];

  const getSortIcon = (option) => {
    const IconComponent = option.icon;
    return <IconComponent size={14} />;
  };

  return (
    <div className="relative filters-dropdown">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Filter size={16} />
        Filters
        <ChevronDown
          size={16}
          className={`transform transition-transform ${
            showFilters ? "rotate-180" : ""
          }`}
        />
      </button>

      {showFilters && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-20">
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
              </label>
              <div className="space-y-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg transition-colors ${
                      sortBy === option.value
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {getSortIcon(option)}
                    <span className="text-sm">{option.label}</span>
                    {sortBy === option.value && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Tag
              </label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                <button
                  onClick={() => setSelectedTag("")}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors ${
                    selectedTag === ""
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm">All Tags</span>
                  {selectedTag === "" && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </button>

                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors ${
                      selectedTag === tag
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm">{tag}</span>
                    {selectedTag === tag && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <button
                onClick={() => {
                  setSortBy("newest");
                  setSelectedTag("");
                  setShowFilters(false);
                }}
                className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
