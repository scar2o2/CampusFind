import React, { useEffect, useRef, useState } from 'react'
import LostItemPage from './LostItemPage';
import FoundItemPage from './FoundItemPage';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import FoundItemCard from './FoundItemCard';
import LostItemCard from './LostItemCard.jsx';
import { useAuth } from '../utils/AuthContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import Notifications from './Notifications.jsx';
import Profile from './Profile.jsx';
import { fetchLostItems } from '../../supabaseRoutes/supabaseLostItems.js';
import { getAllFoundItems } from '../../supabaseRoutes/supabaseFoundItems.js';

const Home = () => {
    const {user,setUser}= useAuth();
    const navigate= useNavigate();
    const location = useLocation();
    const tab= location.state || "";
    const [page, setPage] = useState(tab || 'home');
    const url3= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwx8wC3mM-zjbWlWoHKZRUlZP080-tbIPvkQ&s";
    const url4= "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIREBAQDxAQDw8PDw0PDw0PEA8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4wFx8zODMtNzQtLisBCgoKDg0OFxAQGCsfICUtLy0tKy0tLSstKy0tLS0tLS0tLS0tLS0tLS0tLSsrLS0tKystLS4rKy0rKy0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAIEBQYBBwj/xAA8EAABAwIEAwUHAQcDBQAAAAABAAIDBBEFBhIhMUFREyJhcZEHFDJCUoGhsRUWIzNi0fBywcJDU4KSov/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACIRAQEAAgIDAQEAAwEAAAAAAAABAhEDEgQhMUEiEzJRFP/aAAwDAQACEQMRAD8A9VgClMUeJHajIoKddDuu3RT7rt0y67dA666mrt0Dkk266g6url0roEkkkgSSS6gS5dJcQduldcXEHbrl0lxAkkkkCSKSSBq5ZOSQNsuWTiuIjiaU4ppQDeFEmYppCE9iCodFukpxjSVB4nhHDgvO4M4s+oeqnRZuYfm/Ki6bgFdBWRjzRGfmClR5jjPzD1Q00wXVQMx1h+YeqM3GWfUPVBcgrqqW4q36h6ogxJvUILNdVe2vb1CKKwdUEtdUUVQ6pwqR1QSEkHtwkZwgOldRH1YHNR5MRaOYQWV0rqmOMM+oeqc3FmH5h6oLdJVzcQaeYRm1YPNBLXEJswT9YQdSXLpXQJJK65qQdSXNS5qQdK4ualy6I6Vwrl0kHCmkJy4gEWpIiSD5ga13UorNY4OKO1qIGqbdeoLZpB8xRWVko+cp4YniJTZ1JmJzD5ijNxicfMhCNdMabXqkNx6cfN+UQZknHP8AKg9mkY02aWseapxz/Kkx5zmHG6oCxdipy9wa1pc5xsGjckps00zM8ydCjsz47mCpGEezaaRuqeVsAPBgb2j7eO4AUyX2Wm/dq26b76oje32cmzSEzPx53XX5+PK6uovZlStH8SeZ5/p7OMfoVJZknDmtLTE95N+++V+seViB+Fm5yLMLf5mMqzvI7ht91WyZimfxefIKoxuk7CpmgDtQikLWu5ubxaT42IQac3XSOd9XS5OJv+p3qV1mMPHzu9VDbFsgTQKovYsxSjhIVOgzdM3ib/dYlxIT2TrLT0uizz9eyvKXOEbvmC8RErxwe71TvepfrKbTo9sOPs+oeqMMfj+oeq8RErxwe71RGYrL1Vtp0e2jHWfUERuNMPzBeLjFZeqIzHJRz/Kuzo9wbire6SM6eNnlJWOg0Zz37ouOzsf1D1Xivvsv1FI4lL9SbTq9tGOvsz1QHZgP1D1XiDsyk8T7J4zc7qVU09oGbiOIT/vEv8ATKwuNQ0TXF7bC25FE1nJHX+2/qPqONWJu6hQdOr21mPMH+YEd+YR0K8XGbXj5z7pm89qJIzJUBQVGJA/UUf3/wDmdA1k6PbB7wmGtvstA7MXfCaM6aJaztFXaQ9sGfURy9F87nNPvP3Qjjrz0V2keveQvPxq90+7pZUHH64EGy8EdzZB/apf9S7LrXo8G6Sv2q7qEkPvD+qS4+Lb26u6tq7xRF07DokFKQ1JwTggkRCFEcRiaTzQ31I6pI2o2J4+xrCvKa4tqJzHOL8Qd8NuDR/Ui4gzOm0LGxVfvMUzYqbZ8jLlx6D1XPFJuYybNY4nTt1a+zhcOJtmPqDt+qPBXYZTa/DXL0iqq3hgda3eGgdG9VnZ4CgDqpRa9uolpYRuLc0P9rj6T6oHu57r91BXyAIgko86rkgJRQklEWy3U2wy7ZJJOgBxXFKTTZW4Gnd4+kU7nJc9SsY+xWc9p2vdyMDhfdbFuIgbqqzFA10jg4XBWJ9f4VdryLNMcxHpVV6ZnG5rMhYXZ5BXiXH3F/Q3K9fy+22gLzPKuYHsNmkrtyN3c5dLtk8IvHyHkrJdbzTbdmF3qBaYOoNpNw7d1Bnk2vn4tJKGwuBJJwl1WCMgdvfN5oOsNEtXVmE9pOjYiU0GN/7VJd+2kd+hKJxf5s+Ub3YTz4JnvXXjfbNGx5fGNOd5eKqIjZtPu3tsuHNXmJ12uf3qqLt/wD4xJMFBH07Nrvpot7r1Hb+i68K/L/D7+/+aHT1qBpX0C9YeyWOwZEoWvJyJ3MmdZIEkQpVnEAsSZUXrJT1nCtNq4+nRIh5RJW+z5jG9tHclw5bKJWUmgdVYsrg4WOyNBIIQNVvxsKysKDYY4rBYI7JgCQmIzA59mJXuqqTnhdZkYrpVhU4g24sVkKjFJLrj/rlYfj93fqkWtmr7Wa6HEIvCZuXZbDKDK3EaR7GueRCHBaXs+Yk+HDpFkJxsayZ0lFtsTdS2J4cpXsqK9rha3Rbzrb4Zr7Y9ywk3lOqy5/wC4f3TP/9k=";
    const [menuOpen, setMenuOpen] = useState(false);
    const [status,setStatus]= useState('lost');
    const dropdownRef = useRef(null);
    const [recentLost,setRecentLost]= useState([]);
    const [recentFound,setRecentFound]= useState([]);

    const logOut = async () => {
        await signOut(auth);
        setUser("");
    };

    useEffect(()=>{
        const fetchItems= async ()=>{
            if(status==='lost'){
                await fetchLostItems().then((res)=>{
                    setRecentLost(res.slice(0, 2));

                });
            }
            else{
                await getAllFoundItems().then((res)=>{
                    setRecentFound(res.slice(0, 2));
                });
            }
        }
        fetchItems();
    },[status]);

    useEffect(()=>{
        if(!user) navigate('/auth');
    },[user])

    return (
        <div className="flex flex-col w-full min-h-screen mb-4 overflow-x-hidden">
            <header className="flex justify-between w-full p-3 bg-transparent backdrop-blur-2xl fixed top-0 z-10 gap-2 sm:gap-3 items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 cursor-pointer" onClick={()=>setPage('home')}>CampusFind</h1>
                <div className="gap-4 items-center hidden sm:flex">
                    <h2 onClick={() => setPage('home')} className={page==='home'?("text-blue-500 text-lg font-semibold hover:underline cursor-pointer"):("text-gray-500 text-lg font-semibold hover:underline cursor-pointer")}>Home</h2>
                    <h2 onClick={() => setPage('lostItemPage')} className={page==='lostItemPage'?("text-blue-500 text-lg font-semibold hover:underline cursor-pointer "):("text-gray-500 text-lg font-semibold hover:underline cursor-pointer")}>Lost Items</h2>
                    <h2 onClick={() => setPage('foundItemPage')} className={page==='foundItemPage'?("text-blue-500 text-lg font-semibold hover:underline cursor-pointer "):("text-gray-500 text-lg font-semibold hover:underline cursor-pointer")}>Found Items</h2>
                </div>
                <div className="flex gap-3 items-center">
                    {/* Profile and Post Item buttons - visible only on sm and larger screens */}
                    <div onClick={()=>{setPage('profilePage')}} className='py-3 px-4 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full hidden sm:flex'>
                        {user?.name?.slice(0,1).toUpperCase()}                        
                    </div>
                    <button onClick={()=>{navigate('/postitem')}} className="text-white bg-blue-600 cursor-pointer px-2 py-2 flex gap-2 rounded-lg hover:bg-blue-600/80 hidden sm:flex">
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
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                                {/* Mobile-only menu items */}
                                <div className="sm:hidden">
                                    <div 
                                        className='p-3 cursor-pointer hover:bg-gray-300 flex gap-2 items-center'
                                        onClick={()=>{setPage('profilePage');setMenuOpen(false)}}
                                    >
                                        <div className='py-0.5 px-1.5 bg-gray-200 rounded-full text-sm'>
                                            {user?.name?.slice(0,1).toUpperCase()}                        
                                        </div>
                                        <p className='text-md text-black'>Profile</p>
                                    </div>
                                    <div 
                                        className='p-3 cursor-pointer hover:bg-gray-300 flex gap-2 items-center'
                                        onClick={()=>{navigate('/postitem');setMenuOpen(false)}}
                                    >
                                        <img className="h-5" src="/plus1.svg" />
                                        <p className='text-md text-black'>Post Item</p>
                                    </div>
                                </div>
                                {/* Common menu items for all screen sizes */}
                                <div 
                                    className='p-3 cursor-pointer hover:bg-gray-300 flex gap-2 items-center'
                                    onClick={()=>{setPage('notificationPage');setMenuOpen(false)}}
                                >
                                    <img className="h-5" src="/bell.svg" />
                                    <p className='text-md text-black'>Notifications</p>
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

            <main className="pt-20 flex-1">
                {page === 'home' ? (
                    <div className="flex flex-col gap-16 items-center w-full bg-gray-100">
                        <div className="bg-[url('/college.avif')] bg-blue-400 bg-cover bg-center bg-blend-multiply h-96 w-full flex items-center justify-center flex-col gap-5 p-4 text-center">
                            <div className="flex flex-col gap-3 text-center">
                                <h2 className="text-white text-3xl font-bold">Lost Something?</h2>
                                <h2 className="text-white text-3xl font-bold">We'll Help You Find It</h2>
                            </div>
                            <div className="text-white text-lg font-medium">
                                <p>Connect with your campus community to reunite lost items with their owners</p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex flex-col gap-3 items-center text-center p-4">
                                <h2 className="text-3xl font-bold">How CampusFind Works</h2>
                                <p className="text-gray-500 text-xl">
                                    Our system makes reuniting students with their belongings faster and easier than ever.
                                </p>
                            </div>
                            <div className="flex flex-col gap-5 p-4 text-center md:grid md:grid-cols-3">
                                <div className="flex flex-col p-4 items-center gap-3 shadow-gray-400 shadow-sm rounded-lg hover:shadow-lg bg-white">
                                    <div className="bg-gradient-to-b from-blue-500 to-blue-200 p-4 rounded-full">
                                        <img className="h-8" src="/search1.svg" />
                                    </div>
                                    <p className="text-gray-600 text-lg font-medium">
                                        Quickly post lost or found items with photos, descriptions, and location details.
                                    </p>
                                </div>
                                <div className="flex flex-col p-4 items-center gap-3 shadow-gray-400 shadow-sm rounded-lg hover:shadow-lg bg-white">
                                    <div className="bg-gradient-to-b from-blue-500 to-blue-200 p-4 rounded-full">
                                        <img className="h-8" src="/bot1.svg" />
                                    </div>
                                    <p className="text-gray-600 text-lg font-medium">
                                        Our system automatically matches lost and found items based on category, location, and description.
                                    </p>
                                </div>
                                <div className="flex flex-col p-4 items-center gap-3 shadow-gray-400 shadow-sm rounded-lg hover:shadow-lg bg-white">
                                    <div className="bg-gradient-to-b from-blue-500 to-blue-200 p-4 rounded-full">
                                        <img className="h-8" src="/bell1.svg" />
                                    </div>
                                    <p className="text-gray-600 text-lg font-medium">
                                        Receive instant notifications when potential matches are found for your items.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col items-center gap-2 w-full'>
                            <h2 className='text-2xl font-bold'>Recent Activity</h2>
                            <div className="bg-gray-200 flex flex-row gap-2 rounded-md text-gray-500 text-sm py-1 px-1">
                                {status === "lost" ? (
                                    <>
                                        <div onClick={() => {setStatus("lost");}} className="py-1.5 px-20 font-medium bg-white text-black rounded-md cursor-pointer">
                                            Lost Items
                                        </div>
                                        <div onClick={() => {setStatus("found");}} className="py-1.5 px-20 font-medium cursor-pointer">
                                            Found Items
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div onClick={() => {setStatus("lost");}} className="py-1.5 px-20 font-medium cursor-pointer">
                                            Lost Items
                                        </div>
                                        <div onClick={() => {setStatus("found");}} className="py-1.5 px-20 font-medium bg-white text-black rounded-md cursor-pointer">
                                            Found Items
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='w-full'>
                                {status==='lost'?
                                    (<div className='flex flex-col w-full p-4 md:grid md:grid-cols-2 md:gap-3 gap-3'>
                                        {recentLost.map((item)=>{
                                            return <LostItemCard key={item.id} item={item.name} category={item.category} status={"Lost"} description={item.description} location={item.location} time={item.lostDate} /> 
                                        })}
                                    </div>):
                                    (<div className='flex flex-col w-full p-4 md:grid md:grid-cols-2 md:gap-3 gap-3'>
                                        {recentFound.map((item)=>{
                                            return <FoundItemCard key={item.id} url={item.image_url} item={item.name} category={item.category} status={"Found"} description={item.description} location={item.location} time={item.foundDate} /> 
                                        })}
                                    </div>)
                                }
                            </div>
                            <div className="flex gap-7">
                                <button 
                                    className="text-white bg-blue-900 cursor-pointer px-2 py-2 flex gap-2 rounded-lg hover:bg-blue-700 sm:hidden"
                                    onClick={()=>setPage('lostItemPage')}
                                >
                                    All Lost Items
                                </button>
                                <button 
                                    className="text-white bg-blue-900 cursor-pointer px-2 py-2 flex gap-2 rounded-lg hover:bg-blue-700 sm:hidden"
                                    onClick={()=>setPage('foundItemPage')}
                                >
                                    All Found Items
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}

                {page === 'lostItemPage' ? <LostItemPage /> : null}
                {page === 'foundItemPage' ? <FoundItemPage /> : null}
                {page === 'notificationPage' ? <Notifications/>: null}
                {page === 'profilePage' ? <Profile/>: null}
            </main>
        </div>
    );
};

export default Home;