import React, { useState } from 'react';
import { Users, MessageCircle, MapPin, CheckCircle, Bell } from 'lucide-react';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'match',
      icon: Users,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      title: 'Potential Match Found!',
      description: 'Your lost iPhone 13 might match a found item posted by John D.',
      time: '2 minutes ago',
      isNew: true,
      isUnread: true
    },
    {
      id: 2,
      type: 'message',
      icon: MessageCircle,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      title: 'New Message',
      description: 'Sarah M. sent you a message about your found wallet',
      time: '1 hour ago',
      isNew: true,
      isUnread: true
    },
    {
      id: 3,
      type: 'location',
      icon: MapPin,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      title: 'Item Found Nearby',
      description: 'Someone found a laptop bag near your location',
      time: '3 hours ago',
      isNew: false,
      isUnread: false
    },
    {
      id: 4,
      type: 'confirmed',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      title: 'Match Confirmed',
      description: 'Great news! Your lost keys have been successfully returned',
      time: '1 day ago',
      isNew: false,
      isUnread: false
    },
    {
      id: 5,
      type: 'summary',
      icon: Bell,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      title: 'Weekly Summary',
      description: 'You helped 3 people find their lost items this week!',
      time: '2 days ago',
      isNew: false,
      isUnread: false
    }
  ]);

  // Calculate dynamic counts
  const unreadCount = notifications.filter(n => n.isUnread).length;
  const totalCount = notifications.length;

  const tabs = [
    { name: 'All', count: totalCount },
    { name: 'Unread', count: unreadCount },
    { name: 'Matches', count: null },
    { name: 'Messages', count: null }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unread') return notification.isUnread;
    if (activeTab === 'Matches') return notification.type === 'match' || notification.type === 'confirmed';
    if (activeTab === 'Messages') return notification.type === 'message';
    return true;
  });

  const markAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, isUnread: false, isNew: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({
        ...notification,
        isUnread: false,
        isNew: false
      }))
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Notifications</h1>
          <p className="text-gray-500">Stay updated with matches, messages, and activity</p>
        </div>
        <button
          onClick={markAllAsRead}
          className={`font-medium transition-colors ${
            unreadCount > 0
              ? 'text-blue-600 hover:text-blue-800 cursor-pointer'
              : 'text-gray-400 cursor-not-allowed'
          }`}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab.name
                ? 'border-blue-600 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.name} {tab.count && `(${tab.count})`}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="p-6 space-y-4">
        {filteredNotifications.map((notification) => {
          const IconComponent = notification.icon;
          
          return (
            <div
              key={notification.id}
              className={`relative flex items-start space-x-4 p-4 rounded-lg border transition-colors hover:bg-gray-50 ${
                notification.isUnread 
                  ? 'bg-blue-50 border-l-4 border-l-blue-500 border-gray-200' 
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notification.iconBg}`}>
                <IconComponent className={`w-5 h-5 ${notification.iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  {notification.isNew && (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      New
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{notification.description}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>

              {/* Mark as read button */}
              {notification.isUnread && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 text-sm font-medium"
                >
                  Mark as read
                </button>
              )}
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;