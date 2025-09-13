import React, { useState } from 'react';
import { Eye, MapPin, Calendar, Edit3, TrendingUp, Target, CheckCircle, Phone } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';

const Profile = () => {
  const {user}= useAuth();
  const [activeTab, setActiveTab] = useState('Lost Items');
  console.log(user);

  const userProfile = {
    name: user?.name || "Guest",
    initials: user?.name ? user.name.slice(0,1) : "?",
    phone: user?.phone || "Not set",
    joinDate: 'September 2024',
    email: user?.email || "Not set"
  };


  const stats = {
    totalPosts: 2,
    itemsFound: 8,
    successfulMatches: 5,
  };

  const lostItems = [
    {
      id: 1,
      title: 'Lost iPhone 15 Pro',
      category: 'Electronics',
      description: 'Space Black iPhone 15 Pro with a clear case. Has a small crack on the bottom...',
      location: 'Student Center',
      date: '2024-01-15',
      status: 'Lost',
      image: null,
      isMatched: false
    }
  ];

  const foundItems = [
    {
      id: 2,
      title: 'Brown Leather Wallet',
      category: 'Personal Items',
      description: 'Brown leather bifold wallet with university ID inside',
      location: 'Library 3rd Floor',
      date: '2024-01-10',
      status: 'Matched',
      image: null,
      isMatched: true
    }
  ];

  const currentItems = activeTab === 'Lost Items' ? lostItems : foundItems;
  const lostCount = lostItems.length;
  const foundCount = foundItems.length;

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen p-6">
      {/* User Profile Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center relative">
            <span className="text-2xl font-bold text-blue-600">{userProfile.initials}</span>
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm">
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
            
            <div className="space-y-1 text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{userProfile.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {userProfile.joinDate}</span>
              </div>
              <div>{userProfile.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='flex justify-center'>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 text-center shadow-sm">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalPosts}</div>
          <div className="text-gray-600">Total Posts</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 text-center shadow-sm">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{stats.itemsFound}</div>
          <div className="text-gray-600">Items Found</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 text-center shadow-sm">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{stats.successfulMatches}</div>
          <div className="text-gray-600">Successful Matches</div>
        </div>
      </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Posts</h1>
          <p className="text-gray-600">Manage your lost and found item posts</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('Lost Items')}
            className={`px-6 py-4 font-medium border-b-2 transition-colors ${
              activeTab === 'Lost Items'
                ? 'border-gray-900 text-gray-900 bg-gray-50'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Lost Items
            <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
              {lostCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('Found Items')}
            className={`px-6 py-4 font-medium border-b-2 transition-colors ${
              activeTab === 'Found Items'
                ? 'border-gray-900 text-gray-900 bg-gray-50'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Found Items
            <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
              {foundCount}
            </span>
          </button>
        </div>

        {/* Items Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Image Placeholder */}
                <div className="h-48 bg-blue-100 flex items-center justify-center relative">
                  <Eye className="w-8 h-8 text-gray-400" />
                  
                  {/* Status Badge */}
                  {item.isMatched && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 text-sm font-medium bg-blue-600 text-white rounded-full">
                        Matched!
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      item.status === 'Lost' 
                        ? 'bg-blue-600 text-white'
                        : item.status === 'Matched'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="text-sm text-blue-600 font-medium mb-3">
                    {item.category}
                  </div>

                  <p className="text-gray-600 mb-4">
                    {item.description}
                  </p>

                  {/* Location and Date */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {item.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {currentItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab.toLowerCase()} yet
              </h3>
              <p className="text-gray-500">
                {activeTab === 'Lost Items' 
                  ? "You haven't reported any lost items yet."
                  : "You haven't reported any found items yet."
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;