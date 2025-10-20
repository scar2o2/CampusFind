import React, { useEffect, useState, useRef } from 'react';
import { Users, MessageCircle, MapPin, CheckCircle, Bell } from 'lucide-react';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState([]);
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const hasFetched = useRef(false); // prevent double fetching

  // Fetch notifications once
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchNotifications = async () => {
      try {
        // Call your edge function
        const edgeResp = await fetch(
          "https://khxejpxoiptfcbcdeuvi.supabase.co/functions/v1/super-worker",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + supabaseAnonKey,
            },
            body: JSON.stringify({
              record: {
                id: 101,          // example lostItem ID
                category: "bags",
                lostDate: "2025-09-23",
                userId: 20
              },
            }),
          }
        );
        const edgeData = await edgeResp.json();
        console.log("Edge function result:", edgeData);

        // Fetch notifications from Supabase table
        const res = await fetch(`${supabaseUrl}/rest/v1/notifications2?select=*`, {
          headers: {
            "apikey": supabaseAnonKey,
            "Authorization": "Bearer " + supabaseAnonKey,
          },
        });
        const notifData = await res.json();
        console.log("Fetched notifications:", notifData);

        // Transform notifications for UI
        setNotifications(
          notifData.map((n) => ({
            id: n.id,
            type: "match",
            icon: Users,
            iconColor: "text-green-600",
            iconBg: "bg-green-100",
            title: "Potential Match Found!",
            description: n.message,
            time: new Date(n.created_at).toLocaleString(),
            isNew: !n.isread,
            isUnread: !n.isread,
          }))
        );
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  // Mark single notification as read
  const markAsRead = async (id) => {
    try {
      await fetch(`${supabaseUrl}/rest/v1/notifications2?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseAnonKey,
          "Authorization": "Bearer " + supabaseAnonKey,
          "Prefer": "return=representation"
        },
        body: JSON.stringify({ isread: true }),
      });

      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, isUnread: false, isNew: false } : n)
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await fetch(`${supabaseUrl}/rest/v1/notifications2`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseAnonKey,
          "Authorization": "Bearer " + supabaseAnonKey,
          "Prefer": "return=representation"
        },
        body: JSON.stringify({ isread: true }),
      });

      setNotifications(prev =>
        prev.map(n => ({ ...n, isUnread: false, isNew: false }))
      );
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };

  const unreadCount = notifications.filter(n => n.isUnread).length;
  const totalCount = notifications.length;
  const tabs = [
    { name: 'All', count: totalCount },
    { name: 'Unread', count: unreadCount },
  ];
  const filteredNotifications = notifications.filter(n => activeTab === 'All' || (activeTab === 'Unread' && n.isUnread));

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
        {tabs.map(tab => (
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
        {filteredNotifications.map(n => {
          const IconComponent = n.icon;
          return (
            <div
              key={n.id}
              className={`relative flex items-start space-x-4 p-4 rounded-lg border transition-colors hover:bg-gray-50 ${
                n.isUnread ? 'bg-blue-50 border-l-4 border-l-blue-500 border-gray-200' : 'bg-white border-gray-200'
              }`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${n.iconBg}`}>
                <IconComponent className={`w-5 h-5 ${n.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{n.title}</h3>
                  {n.isNew && <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">New</span>}
                </div>
                <p className="text-gray-600 mb-2">{n.description}</p>
                <p className="text-sm text-gray-500">{n.time}</p>
              </div>
              {n.isUnread && (
                <button
                  onClick={() => markAsRead(n.id)}
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
