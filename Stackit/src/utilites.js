// Date and time utilities
export const formatTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Text utilities
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const stripHtml = (html) => {
  return html.replace(/<[^>]*>/g, "");
};

export const highlightText = (text, searchQuery) => {
  if (!searchQuery) return text;

  const regex = new RegExp(`(${searchQuery})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};

// Array utilities
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return {
    isValid: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export const validateQuestionTitle = (title) => {
  const errors = [];

  if (!title.trim()) {
    errors.push("Title is required");
  } else if (title.length < 10) {
    errors.push("Title must be at least 10 characters");
  } else if (title.length > 150) {
    errors.push("Title must be less than 150 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateQuestionDescription = (description) => {
  const errors = [];
  const textContent = stripHtml(description);

  if (!textContent.trim()) {
    errors.push("Description is required");
  } else if (textContent.length < 20) {
    errors.push("Description must be at least 20 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Search utilities
export const searchQuestions = (questions, query) => {
  if (!query) return questions;

  const lowerQuery = query.toLowerCase();
  return questions.filter(
    (question) =>
      question.title.toLowerCase().includes(lowerQuery) ||
      question.description.toLowerCase().includes(lowerQuery) ||
      question.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      question.author.name.toLowerCase().includes(lowerQuery)
  );
};

export const sortQuestions = (questions, sortBy) => {
  return [...questions].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date) - new Date(a.date); // Newest first
      case "difficulty":
        // Assuming difficulty is 'easy', 'medium', 'hard'
        const levels = { easy: 1, medium: 2, hard: 3 };
        return levels[a.difficulty] - levels[b.difficulty];
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
};
