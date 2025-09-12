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
        <div className="flex flex-col w-full min-h-screen">
            <header className="flex justify-between w-full p-3 bg-transparent backdrop-blur-2xl fixed top-0 z-10 h-16">
                <h1 className="text-3xl font-bold text-blue-600">CampusFind</h1>
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
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => { navigate('/postitem') }}
                        className="text-white bg-blue-600 cursor-pointer px-2 py-2 flex gap-2 rounded-lg hover:bg-blue-600/80"
                    >
                        <img className="h-7 p-1" src="/plus.svg" />
                        Post Item
                    </button>
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="p-3 cursor-pointer hover:bg-gray-200 rounded-full text-xl font-bold select-none"
                            onClick={() => setMenuOpen((prev) => !prev)}
                        >
                            ⋮
                        </div>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50">
                                <div className='p-2 cursor-pointer hover:bg-gray-300 flex gap-2'>
                                    <img className="h-6 p-1" src="/bell.svg" />
                                    <p className='text-md black'>Notifications</p>
                                </div>
                                <div onClick={logOut} className='p-2 cursor-pointer hover:bg-gray-300 flex gap-2'>
                                    <img className="h-6 " src="/logout.svg" />
                                    <p className='text-md black'>Log Out</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <div className='flex-1 flex flex-col bg-gray-100 justify-center text-center p-12 pt-20'>
                <div>
                    {status==='lostItem'?(
                        <>
                            <h1 className='text-3xl font-bold'>Post Lost Item</h1>
                            <p className='text-xl text-gray-500 font-medium'>Find your item through the community</p>
                        </>
                    ):(
                        <>
                            <h1 className='text-3xl font-bold'>Post Found Item</h1>
                            <p className='text-xl text-gray-500 font-medium'>Help return items to their owners</p>
                        </>
                    )}
                </div>
                <div className='bg-white flex flex-col p-3 mt-6 items-center rounded-lg shadow-md shadow-gray-400'>
                    <div className="bg-gray-200 flex flex-row gap-2 rounded-md text-gray-500 text-sm py-1 px-1">
                        <div
                            onClick={() => { setStatus("lostItem"); }}
                            className={`py-1.5 px-20 font-medium cursor-pointer ${status === "lostItem" ? "bg-blue-900 text-white rounded-md" : ""}`}
                        >
                            Lost Item
                        </div>
                        <div
                            onClick={() => { setStatus("foundItem"); }}
                            className={`py-1.5 px-20 font-medium cursor-pointer ${status === "foundItem" ? "bg-blue-900 text-white rounded-md" : ""}`}
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
