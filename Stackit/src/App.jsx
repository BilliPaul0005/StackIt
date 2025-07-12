import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  User,
  Plus,
  Home,
  Menu,
  Filter,
  ChevronDown,
} from "lucide-react";
import { useQuestions } from "./hooks/useQuestions";
import { useNotifications } from "./hooks/useNotifications";
import { useAuth } from "./hooks/useAuth";
import QuestionCard from "./components/QuestionCard";
import NotificationDropdown from "./components/NotificationDropdown";
import AskQuestionForm from "./components/AskQuestionForm";
import SearchFilters from "./components/SearchFilters";

const StackItApp = () => {
  const [currentView, setCurrentView] = useState("home");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const {
    questions,
    handleVote,
    handleSubmitQuestion,
    filteredQuestions,
    allTags,
  } = useQuestions({
    searchQuery,
    selectedTag,
    sortBy,
  });

  const {
    notifications,
    unreadNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
  } = useNotifications();
  const { currentUser } = useAuth();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".notification-dropdown")) {
        setShowNotifications(false);
      }
      if (!e.target.closest(".filters-dropdown")) {
        setShowFilters(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleQuestionSubmit = (questionData) => {
    handleSubmitQuestion(questionData);
    setCurrentView("home");
  };

  const renderHome = () => (
    <div className="max-w-4xl mx-auto">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <SearchFilters
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              allTags={allTags}
            />
            <button
              onClick={() => setCurrentView("ask")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Ask Question
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto mb-2" />
            </div>
            <p className="text-gray-500 text-lg">No questions found</p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onVote={handleVote}
              currentUser={currentUser}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredQuestions.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              3
            </button>
            <span className="px-3 py-1">...</span>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              7
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Menu size={20} />
              </button>
              <h1
                className="text-2xl font-bold text-gray-900 cursor-pointer"
                onClick={() => setCurrentView("home")}
              >
                StackIt
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView("home")}
                className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentView === "home"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Home size={16} />
                Home
              </button>

              <div className="relative notification-dropdown">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <NotificationDropdown
                    notifications={notifications}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                  />
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="hidden lg:inline text-sm text-gray-700">
                  {currentUser.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white border-b shadow-lg">
          <div className="px-4 py-2 space-y-1">
            <button
              onClick={() => {
                setCurrentView("home");
                setShowMobileMenu(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-left rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Home size={16} />
              Home
            </button>
            <button
              onClick={() => {
                setCurrentView("ask");
                setShowMobileMenu(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-left rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Plus size={16} />
              Ask Question
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "home" && renderHome()}
        {currentView === "ask" && (
          <AskQuestionForm
            onSubmit={handleQuestionSubmit}
            onCancel={() => setCurrentView("home")}
          />
        )}
      </main>
    </div>
  );
};

export default StackItApp;
