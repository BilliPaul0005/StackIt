import React from "react";
import { Bell, MessageCircle, ArrowUp, CheckCircle } from "lucide-react";

const NotificationDropdown = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "answer":
        return <MessageCircle size={16} className="text-blue-500" />;
      case "vote":
        return <ArrowUp size={16} className="text-green-500" />;
      case "accepted":
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Bell size={18} />
          Notifications
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </h3>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Bell size={32} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  !notification.read
                    ? "bg-blue-50 border-l-4 border-blue-400"
                    : ""
                }`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        !notification.read
                          ? "font-medium text-gray-900"
                          : "text-gray-800"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-3 border-t bg-gray-50">
          <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
