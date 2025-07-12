import React from "react";
import { ArrowUp, ArrowDown, Check, MessageCircle, Eye } from "lucide-react";

const QuestionCard = ({ question, onVote, currentUser }) => {
  const timeAgo = (date) => {
    const now = new Date();
    const questionDate = new Date(date);
    const diffInHours = Math.floor((now - questionDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const isUserQuestion = question.author.id === currentUser.id;
  const voteScore = question.upvotes - question.downvotes;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => onVote(question.id, "upvote")}
              className="p-2 rounded-full hover:bg-blue-50 transition-colors group"
              title="Upvote"
            >
              <ArrowUp
                size={18}
                className="text-gray-600 group-hover:text-blue-600"
              />
            </button>
            <span
              className={`text-sm font-semibold ${
                voteScore > 0
                  ? "text-green-600"
                  : voteScore < 0
                  ? "text-red-600"
                  : "text-gray-700"
              }`}
            >
              {voteScore}
            </span>
            <button
              onClick={() => onVote(question.id, "downvote")}
              className="p-2 rounded-full hover:bg-red-50 transition-colors group"
              title="Downvote"
            >
              <ArrowDown
                size={18}
                className="text-gray-600 group-hover:text-red-600"
              />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-start gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors line-clamp-2">
                {question.title}
              </h3>
              {question.accepted && (
                <div className="flex-shrink-0">
                  <Check
                    className="text-green-600 bg-green-100 p-1 rounded-full"
                    size={20}
                  />
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {question.description.replace(/<[^>]*>/g, "")}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium hover:bg-blue-200 cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 hover:text-gray-700 transition-colors">
            <Eye size={14} />
            {question.views} views
          </span>
          <span className="flex items-center gap-1 hover:text-gray-700 transition-colors">
            <MessageCircle size={14} />
            {question.answers.length} answers
          </span>
          {question.answers.length === 0 && (
            <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded-full text-xs font-medium">
              No answers yet
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`${isUserQuestion ? "text-blue-600 font-medium" : ""}`}
          >
            by {question.author.name}
          </span>
          <span>•</span>
          <span>{timeAgo(question.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
