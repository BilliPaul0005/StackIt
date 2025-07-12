import React, { useState } from "react";
import { Save, X, Eye, EyeOff } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import TagInput from "./TagInput";

const AskQuestionForm = ({ onSubmit, onCancel }) => {
  const [questionForm, setQuestionForm] = useState({
    title: "",
    description: "",
    tags: [],
  });
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!questionForm.title.trim()) {
      newErrors.title = "Title is required";
    } else if (questionForm.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }

    if (!questionForm.description.trim()) {
      newErrors.description = "Description is required";
    } else if (questionForm.description.replace(/<[^>]*>/g, "").length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (questionForm.tags.length === 0) {
      newErrors.tags = "At least one tag is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(questionForm);
    }
  };

  const handleTitleChange = (e) => {
    setQuestionForm({ ...questionForm, title: e.target.value });
    if (errors.title) {
      setErrors({ ...errors, title: "" });
    }
  };

  const handleDescriptionChange = (value) => {
    setQuestionForm({ ...questionForm, description: value });
    if (errors.description) {
      setErrors({ ...errors, description: "" });
    }
  };

  const handleTagsChange = (tags) => {
    setQuestionForm({ ...questionForm, tags });
    if (errors.tags) {
      setErrors({ ...errors, tags: "" });
    }
  };

  const isFormValid =
    questionForm.title.trim() &&
    questionForm.description.trim() &&
    questionForm.tags.length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">Ask a Question</h2>
          <p className="text-sm text-gray-600 mt-1">
            Get help from the community by asking clear, specific questions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={questionForm.title}
              onChange={handleTitleChange}
              placeholder="What's your programming question? Be specific."
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.title
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                Make it clear and specific
              </p>
              <p
                className={`text-xs ${
                  questionForm.title.length < 10
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {questionForm.title.length}/150
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                {showPreview ? "Edit" : "Preview"}
              </button>
            </div>

            {showPreview ? (
              <div className="border border-gray-300 rounded-lg p-4 min-h-32 bg-gray-50">
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: questionForm.description }}
                />
              </div>
            ) : (
              <RichTextEditor
                value={questionForm.description}
                onChange={handleDescriptionChange}
                placeholder="Include all the information someone would need to answer your question"
                error={errors.description}
              />
            )}

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags <span className="text-red-500">*</span>
            </label>
            <TagInput
              tags={questionForm.tags}
              onChange={handleTagsChange}
              error={errors.tags}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Add up to 5 tags to describe what your question is about
            </p>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                isFormValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Save size={16} />
              Post Question
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestionForm;
