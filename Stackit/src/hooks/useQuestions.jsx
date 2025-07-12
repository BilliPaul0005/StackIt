import { useState, useMemo } from "react";

// Mock data - in a real app, this would come from an API
const initialQuestions = [
  {
    id: 1,
    title:
      "How to join 2 columns in a data set to make a separate column in SQL?",
    description:
      "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 and column 2. I need to make a column 3 which is the combination of column 1 and column 2. Can someone help me with the SQL syntax for this?",
    author: { id: 2, name: "John Doe" },
    tags: ["SQL", "Database"],
    upvotes: 4,
    downvotes: 0,
    views: 145,
    answers: [],
    createdAt: "2024-01-15T10:30:00Z",
    accepted: false,
  },
  {
    id: 2,
    title: "React useState not updating immediately",
    description:
      "I'm having trouble with useState not updating the state immediately when I call setState. The component doesn't re-render with the new state value. How can I fix this? Is there a way to force the update?",
    author: { id: 3, name: "Jane Smith" },
    tags: ["React", "JavaScript"],
    upvotes: 12,
    downvotes: 1,
    views: 320,
    answers: [{ id: 1 }, { id: 2 }],
    createdAt: "2024-01-14T15:45:00Z",
    accepted: true,
  },
  {
    id: 3,
    title: "Python list comprehension vs for loop performance",
    description:
      "I want to understand the performance difference between using list comprehensions and traditional for loops in Python. Which one should I use for large datasets?",
    author: { id: 4, name: "Mike Johnson" },
    tags: ["Python", "Performance"],
    upvotes: 8,
    downvotes: 0,
    views: 89,
    answers: [{ id: 3 }],
    createdAt: "2024-01-13T09:20:00Z",
    accepted: false,
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox - when to use which?",
    description:
      "I'm confused about when to use CSS Grid versus Flexbox. Can someone explain the key differences and provide examples of when each is most appropriate?",
    author: { id: 5, name: "Sarah Wilson" },
    tags: ["CSS", "Layout"],
    upvotes: 15,
    downvotes: 2,
    views: 256,
    answers: [],
    createdAt: "2024-01-12T14:10:00Z",
    accepted: false,
  },
];

export const useQuestions = ({ searchQuery, selectedTag, sortBy }) => {
  const [questions, setQuestions] = useState(initialQuestions);

  const handleVote = (questionId, voteType) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              [voteType === "upvote" ? "upvotes" : "downvotes"]:
                q[voteType === "upvote" ? "upvotes" : "downvotes"] + 1,
              views: q.views + (Math.random() > 0.7 ? 1 : 0), // Simulate view increment
            }
          : q
      )
    );
  };

  const handleSubmitQuestion = (questionData) => {
    const newQuestion = {
      id: questions.length + 1,
      title: questionData.title,
      description: questionData.description,
      author: { id: 1, name: "Current User" }, // This would come from auth
      tags: questionData.tags,
      upvotes: 0,
      downvotes: 0,
      views: 0,
      answers: [],
      createdAt: new Date().toISOString(),
      accepted: false,
    };
    setQuestions((prev) => [newQuestion, ...prev]);
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        searchQuery === "" ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === "" || q.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [questions, searchQuery, selectedTag]);

  const sortedQuestions = useMemo(() => {
    return [...filteredQuestions].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "votes":
          return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
        case "unanswered":
          return a.answers.length - b.answers.length;
        default:
          return 0;
      }
    });
  }, [filteredQuestions, sortBy]);

  const allTags = useMemo(() => {
    return [...new Set(questions.flatMap((q) => q.tags))].sort();
  }, [questions]);

  return {
    questions,
    filteredQuestions: sortedQuestions,
    allTags,
    handleVote,
    handleSubmitQuestion,
  };
};
