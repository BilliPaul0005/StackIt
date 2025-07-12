import { useState, useEffect } from "react";

const initialNotifications = [
  {
    id: 1,
    type: "answer",
    message: 'John Doe answered your question "How to join 2 columns..."',
    read: false,
    createdAt: "2024-01-15T12:00:00Z",
  },
  {
    id: 2,
    type: "vote",
    message: "Someone upvoted your answer",
    read: false,
    createdAt: "2024-01-15T11:30:00Z",
  },
  {
    id: 3,
    type: "accepted",
    message: "Your answer was accepted by Sarah Wilson",
    read: true,
    createdAt: "2024-01-14T16:20:00Z",
  },
  {
    id: 4,
    type: "vote",
    message: "Your question received 5 upvotes",
    read: true,
    createdAt: "2024-01-14T10:15:00Z",
  },
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (type, message) => {
    const newNotification = {
      id: notifications.length + 1,
      type,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  // Simulate receiving new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        // 20% chance every 30 seconds
        const messages = [
          "Someone upvoted your answer",
          "New answer to your question",
          "Your question received a comment",
          "Someone mentioned you in a comment",
        ];
        const types = ["vote", "answer", "vote", "mention"];
        const randomIndex = Math.floor(Math.random() * messages.length);

        addNotification(types[randomIndex], messages[randomIndex]);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [notifications.length]);

  return {
    notifications,
    unreadNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    addNotification,
  };
};
