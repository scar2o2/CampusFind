import React, { useEffect, useState } from 'react';
import { Eye, MapPin, Calendar, Edit3, TrendingUp, Target, CheckCircle, Phone, Save, RefreshCw , X} from 'lucide-react';
import { useAuth } from '../utils/AuthContext';
import { updateUser,getUser } from '../../supabaseRoutes/supabaseUsers';

const Profile = () => {
  const {user,setUser}= useAuth();
  const [activeTab, setActiveTab] = useState('Lost Items');
  const [edit,setEdit]= useState(false);
  const [inputData,setInputData]= useState({name:'',phn_no:''});

  // useEffect(()=>{
  //   const xyzfunc= async ()=>{
  //     await updateUser(user.id,{name:'Manoj',phn_no:'9032753439'}).then((res)=>{
  //       console.log(res);
  //     })
  //   }
  //   xyzfunc();
  // })

  const resetInput= ()=>{
    setInputData({name:"",phn_no:""});
  }

  const saveInput= async ()=>{
    await updateUser(user.id,inputData).then(async ()=>{
      await getUser('id',user.id).then((res)=>{
        setUser({...user,name:res[0].name,phn_no:res[0].phn_no});
        setEdit(!edit);
      })
    })
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate); 
    return date.toLocaleDateString("en-US", {
      month: "short", 
      year: "numeric", 
    });
  }


  const userProfile = {
    name: user?.name || "Guest",
    initials: user?.name ? user.name.slice(0,1).toUpperCase() : "?",
    phone: user?.phone || "Not set",
    joinDate: formatDate(user.date) || '?',
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
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen p-4 sm:p-6">
      {/* User Profile Card */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center relative mx-auto sm:mx-0">
            <span className="text-xl sm:text-2xl font-bold text-blue-600">{userProfile.initials}</span>
          </div>
          
          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
              {edit ? (
                <input
                  className="w-45% border border-gray-300 rounded px-2 py-1"
                  placeholder="Enter name"
                  value={inputData.name}
                  onChange={(e)=>{setInputData({...inputData,name:e.target.value})}}
                />
              ) : (
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {userProfile.name}
                </h1>
              )}

              {!edit && <button onClick={()=>{setEdit(!edit)}} className="flex items-center justify-center sm:justify-start space-x-1 text-gray-600 hover:text-gray-800 text-sm cursor-pointer">
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>}
              {edit && <RefreshCw onClick={resetInput} className='hover:text-black/80 text-black cursor-pointer h-4'/>}
              {edit && <Save onClick={saveInput} className='hover:text-green-300 text-green-500 cursor-pointer h-4'/>}
              {edit && <X  onClick={()=>{setEdit(!edit)}} className='hover:text-red-300 text-red-500 cursor-pointer h-4'/>}
            </div>
            <div className="space-y-1 text-gray-600 text-sm sm:text-base">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Phone className="w-4 h-4" />
                {edit?(<input value={inputData.phn_no} onChange={(e)=>{setInputData({...inputData,phn_no:e.target.value})}} className='p-1 outline-1 outline-gray-300 rounded-sm text-black' placeholder='Enter number'/>):(<span>{userProfile.phone}</span>)}
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {userProfile.joinDate}</span>
              </div>
              <div className="break-all sm:break-normal">{userProfile.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='flex justify-center mb-6 sm:mb-8'>
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl">
          <div className="bg-white rounded-lg p-3 sm:p-6 text-center shadow-sm">
            <div className="flex justify-center mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{stats.totalPosts}</div>
            <div className="text-gray-600 text-xs sm:text-base">Total Posts</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 sm:p-6 text-center shadow-sm">
            <div className="flex justify-center mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-600" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{stats.itemsFound}</div>
            <div className="text-gray-600 text-xs sm:text-base">Items Found</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 sm:p-6 text-center shadow-sm">
            <div className="flex justify-center mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{stats.successfulMatches}</div>
            <div className="text-gray-600 text-xs sm:text-base">Successful Matches</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">My Posts</h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage your lost and found item posts</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('Lost Items')}
            className={`px-3 sm:px-6 py-3 sm:py-4 font-medium border-b-2 transition-colors flex-1 sm:flex-none text-sm sm:text-base cursor-pointer ${
              activeTab === 'Lost Items'
                ? 'border-gray-900 text-gray-900 bg-gray-50'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="hidden sm:inline">Lost Items</span>
            <span className="sm:hidden">Lost</span>
            <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs bg-gray-200 text-gray-700 rounded">
              {lostCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('Found Items')}
            className={`px-3 sm:px-6 py-3 sm:py-4 font-medium border-b-2 transition-colors flex-1 sm:flex-none text-sm sm:text-base cursor-pointer ${
              activeTab === 'Found Items'
                ? 'border-gray-900 text-gray-900 bg-gray-50'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="hidden sm:inline">Found Items</span>
            <span className="sm:hidden">Found</span>
            <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs bg-gray-200 text-gray-700 rounded">
              {foundCount}
            </span>
          </button>
        </div>

        {/* Items Grid */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {currentItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Image Placeholder */}
                <div className="h-32 sm:h-48 bg-blue-100 flex items-center justify-center relative">
                  <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  
                  {/* Status Badge */}
                  {item.isMatched && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                      <span className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium bg-blue-600 text-white rounded-full">
                        Matched!
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex-1 mr-2">{item.title}</h3>
                    <span className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium rounded-full flex-shrink-0 ${
                      item.status === 'Lost' 
                        ? 'bg-blue-600 text-white'
                        : item.status === 'Matched'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-blue-600 font-medium mb-2 sm:mb-3">
                    {item.category}
                  </div>

                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    {item.description}
                  </p>

                  {/* Location and Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 space-y-1 sm:space-y-0">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {item.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {currentItems.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                No {activeTab.toLowerCase()} yet
              </h3>
              <p className="text-gray-500 text-sm sm:text-base px-4">
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