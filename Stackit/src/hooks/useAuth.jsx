import { useState, useEffect } from "react";

const mockUsers = [
  {
    id: 1,
    name: "Current User",
    email: "user@example.com",
    avatar: null,
    reputation: 156,
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
    reputation: 89,
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: null,
    reputation: 234,
  },
  {
    id: 4,
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: null,
    reputation: 67,
  },
  {
    id: 5,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: null,
    reputation: 198,
  },
];

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(mockUsers[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setLoading(false);
      return { success: true, user };
    }

    setLoading(false);
    return { success: false, error: "Invalid credentials" };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser = {
      id: mockUsers.length + 1,
      name: userData.name,
      email: userData.email,
      avatar: null,
      reputation: 0,
    };

    mockUsers.push(newUser);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setLoading(false);

    return { success: true, user: newUser };
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const updatedUser = { ...currentUser, ...profileData };
    setCurrentUser(updatedUser);
    setLoading(false);

    return { success: true, user: updatedUser };
  };

  const updateReputation = (points) => {
    setCurrentUser((prev) => ({
      ...prev,
      reputation: prev.reputation + points,
    }));
  };

  // Simulate checking authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      // Simulate API call to check if user is authenticated
      await new Promise((resolve) => setTimeout(resolve, 500));

      // For demo purposes, always authenticated
      setIsAuthenticated(true);
      setLoading(false);
    };

    checkAuth();
  }, []);

  return {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    updateProfile,
    updateReputation,
    users: mockUsers,
  };
};
