import React, { useEffect, useState } from 'react';
import { Eye, MapPin, Calendar, Edit3, TrendingUp, Target, CheckCircle, Phone, Save, RefreshCw, X, Trash2Icon} from 'lucide-react';
import { useAuth } from '../utils/AuthContext';
import { updateUser,getUser } from '../../supabaseRoutes/supabaseUsers';
import {deleteLostItem, getLostItemByUserId} from '../../supabaseRoutes/supabaseLostItems'
import {deleteFoundItem, getFoundItemsByUser} from '../../supabaseRoutes/supabaseFoundItems'

const Profile = () => {
  const {user,setUser}= useAuth();
  const [activeTab, setActiveTab] = useState('Lost Items');
  const [edit,setEdit]= useState(false);
  const [inputData,setInputData]= useState({name:'',phn_no:''});
  const [lostItems,setLostItems]= useState([]);
  const [foundItems,setFoundItems]= useState([]);
  const [imageErrors, setImageErrors] = useState(new Set());
  const [change,setChange]= useState(false);
  useEffect(()=>{
    const fetchData = async () => {
      const lost = await getLostItemByUserId(user.id);
      const found = await getFoundItemsByUser(user.id);

      const normalizedLost = lost.map(l => ({...l, status: "Lost"}));

      setLostItems(normalizedLost);
      setFoundItems(found);
    };
    if (user?.id) fetchData();
  },[user?.id,change]);

  const resetInput= ()=>{
    setInputData({name:"",phn_no:""});
  }

  const deleteItem= async (item)=>{
    if(item.status==='Lost'){
      await deleteLostItem(item.id); 
    }
    else{
      await deleteFoundItem(item.id);
    }
    setChange(!change);
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

  const handleImageError = (itemId) => {
    setImageErrors(prev => new Set([...prev, itemId]));
  };

  const userProfile = {
    name: user?.name || "Guest",
    initials: user?.name ? user.name.slice(0,1).toUpperCase() : "?",
    phone: user?.phn_no || user.phone,
    joinDate: formatDate(user.date) || '?',
    email: user?.email || "Not set"
  };

  const stats = {
    totalPosts: lostItems.length + foundItems.length,
    itemsFound: foundItems.length,
  };

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
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl justify-center items-center">
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
            {currentItems.map((item) => {
              // Determine if this is a lost or found item based on the active tab
              const isLostItem = activeTab === 'Lost Items';
              
              // Get the appropriate field values based on item type
              const itemTitle = item.name || item.title || 'Untitled Item';
              const itemDate = isLostItem ? item.lostDate : item.foundDate;
              const itemStatus = item.status || (isLostItem ? 'Lost' : 'Found');
              const hasValidImage = !isLostItem && item.image_url && !imageErrors.has(item.id);
              
              return (
                <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
                  {/* Image Section - Only for Found Items */}
                  {!isLostItem && (
                    <div className="h-36 sm:h-52 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative">
                      {hasValidImage ? (
                        <img 
                          src={item.image_url} 
                          alt={itemTitle}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(item.id)}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mb-2" />
                          <span className="text-xs text-gray-500 font-medium">No image available</span>
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      {item.isMatched && (
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1.5 text-xs font-semibold bg-green-600 text-white rounded-full shadow-lg border-2 border-white">
                            ✓ Matched!
                          </span>
                          <button className='text-black ml-2 bg-white px-2 py-1 rounded text-xs' onClick={() => clickImageUrl(item.image_url)}>View</button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex-1 mr-2 leading-tight">
                        {itemTitle}
                      </h3>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-full flex-shrink-0 shadow-sm ${
                          itemStatus === 'Lost' 
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : itemStatus === 'Found'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {itemStatus}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center mb-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {item.category || 'Uncategorized'}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-3">
                        {item.description || 'No description provided'}
                      </p>
                    </div>

                    {/* Additional Details Section */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                          <span className="font-medium mr-1">Location:</span>
                          <span className="truncate">{item.location || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                          <span className="font-medium mr-1">{isLostItem ? 'Lost on:' : 'Found on:'}</span>
                          <span>{itemDate ? formatDate(itemDate) : 'Not specified'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                        <span>Posted {itemDate ? formatDate(itemDate) : 'recently'}</span>
                      </div>
                      <div onClick={()=>{deleteItem(item)}} className='bg-black py-3 px-2  rounded-full cursor-pointer hover:bg-black/80'>
                        <Trash2Icon className='h-4 text-gray-200'/>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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