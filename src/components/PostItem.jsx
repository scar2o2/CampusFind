import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import PostLostItem from './PostLostItem';
import PostFoundItem from './PostFoundItem';
import { signOut } from 'firebase/auth';
import {auth} from '../config/firebase';

const PostItem = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [status, setStatus] = useState("lostItem");

    const logOut = async () => {
        await signOut(auth);
        setUser("");
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Not Logged In</h2>
                    <p className="text-gray-600">Please log in to access your dashboard.</p>
                    <div className="flex items-center gap-3 mt-2">
                        <button className="px-5 py-2 bg-black text-white rounded-lg hover:bg-black/80 cursor-pointer flex-1" onClick={()=>{navigate('/auth')}}>Login</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full min-h-screen overflow-x-hidden mt-17">
            <header className="flex justify-between w-full p-3 bg-transparent backdrop-blur-2xl fixed top-0 z-10 gap-2 sm:gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-600" onClick={()=>{navigate('/')}}>CampusFind</h1>
                <div className="gap-4 items-center hidden sm:flex">
                    <h2
                        onClick={() => navigate('/', { state: 'home' })}
                        className="text-gray-500 text-lg font-semibold hover:underline cursor-pointer"
                    >
                        Home
                    </h2>
                    <h2
                        onClick={() => navigate('/', { state: 'lostItemPage' })}
                        className="text-gray-500 text-lg font-semibold hover:underline cursor-pointer"
                    >
                        Lost Items
                    </h2>
                    <h2
                        onClick={() => navigate('/', { state: 'foundItemPage' })}
                        className="text-gray-500 text-lg font-semibold hover:underline cursor-pointer"
                    >
                        Found Items
                    </h2>
                </div>
                <div className="flex gap-2 sm:gap-3 items-center">
                    <div onClick={()=>{navigate('/', { state: 'profilePage' });}} className='py-3 px-4 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full hidden sm:flex'>
                        {user?.name?.slice(0,1).toUpperCase()}                        
                    </div>
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="p-3 cursor-pointer hover:bg-gray-200 rounded-full text-xl font-bold select-none"
                            onClick={() => setMenuOpen((prev) => !prev)}
                        >
                            ⋮
                        </div>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                                {/* Mobile-only menu items */}
                                <div className="sm:hidden">
                                    <div 
                                        className='p-3 cursor-pointer hover:bg-gray-300 flex gap-2 items-center'
                                        onClick={() => {navigate('/', { state: 'profilePage' });setMenuOpen(false)}}
                                    >
                                        <div className='py-0.5 px-1.5 bg-gray-200 rounded-full text-sm'>
                                            {user?.name?.slice(0,1).toUpperCase()}                        
                                        </div>
                                        <p className='text-md text-black'>Profile</p>
                                    </div>
                                </div>
                                {/* Common menu items for all screen sizes */}
                                <div className='p-3 cursor-pointer hover:bg-gray-300 flex gap-2 items-center'>
                                    <img className="h-5" src="/bell.svg" />
                                    <p className='text-md text-black' onClick={() => navigate('/', { state: 'notificationPage' })}>Notifications</p>
                                </div>
                                <div onClick={()=>{logOut();setMenuOpen(false)}} className='p-3 cursor-pointer hover:bg-gray-300 flex gap-2 items-center'>
                                    <img className="h-5" src="/logout.svg" />
                                    <p className='text-md text-black'>Log Out</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <div className='flex-1 flex flex-col bg-gray-100 justify-center text-center p-3 sm:p-12 pt-20'>
                <div className="px-3 sm:px-0">
                    {status==='lostItem'?(
                        <>
                            <h1 className='text-2xl sm:text-3xl font-bold'>Post Lost Item</h1>
                            <p className='text-lg sm:text-xl text-gray-500 font-medium'>Find your item through the community</p>
                        </>
                    ):(
                        <>
                            <h1 className='text-2xl sm:text-3xl font-bold'>Post Found Item</h1>
                            <p className='text-lg sm:text-xl text-gray-500 font-medium'>Help return items to their owners</p>
                        </>
                    )}
                </div>
                <div className='bg-white flex flex-col p-3 mt-6 items-center rounded-lg shadow-md shadow-gray-400 mx-3 sm:mx-0'>
                    <div className="bg-gray-200 flex flex-row gap-1 sm:gap-2 rounded-md text-gray-500 text-xs sm:text-sm py-1 px-1">
                        <div
                            onClick={() => { setStatus("lostItem"); }}
                            className={`py-1.5 px-6 sm:px-20 font-medium cursor-pointer ${status === "lostItem" ? "bg-blue-900 text-white rounded-md" : ""}`}
                        >
                            Lost Item
                        </div>
                        <div
                            onClick={() => { setStatus("foundItem"); }}
                            className={`py-1.5 px-6 sm:px-20 font-medium cursor-pointer ${status === "foundItem" ? "bg-blue-900 text-white rounded-md" : ""}`}
                        >
                            Found Item
                        </div>
                    </div>
                    <div className='w-full'>
                        {status==='lostItem'?(<PostLostItem/>):(<PostFoundItem/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem