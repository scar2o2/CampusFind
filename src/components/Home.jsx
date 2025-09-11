import React, { useState } from 'react'
import LostItemPage from './LostItemPage';
import FoundItemPage from './FoundItemPage';
import ItemCard from './ItemCard';

const Home = () => {
    const [page, setPage] = useState('home');
    const url1= "https://i.guim.co.uk/img/media/7e7b161c1296ff31e1a580de4ae7bc012082a861/157_120_5033_3020/master/5033.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=6ef5b0d69b95a00fc91931ae7b22990a";
    const url2= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4uGoI8gD7GPUoT8QZbl-vBMQS8Lbgt8GvDA&s";
    const url3= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwx8wC3mM-zjbWlWoHKZRUlZP080-tbIPvkQ&s";
    const url4= "data:image/jpeg;base64,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";
    const [status,setStatus]= useState('lost');

    return (
        <div className="flex flex-col w-full overflow-x-hidden mb-4">
        <header className="flex justify-between w-full p-3 bg-transparent backdrop-blur-2xl fixed top-0 ">
            <h1 className="text-3xl font-bold text-blue-600">CampusFind</h1>
            <div className="gap-4 items-center hidden sm:flex">
            <h2 onClick={() => setPage('home')} className="text-gray-500 text-lg font-semibold hover:underline cursor-pointer">Home</h2>
            <h2 onClick={() => setPage('lostItemPage')} className="text-gray-500 text-lg font-semibold hover:underline cursor-pointer">Lost Item</h2>
            <h2 onClick={() => setPage('foundItemPage')} className="text-gray-500 text-lg font-semibold hover:underline cursor-pointer">Found Item</h2>
            </div>
            <div className="flex gap-3 items-center">
            <div className='p-3 cursor-pointer hover:bg-gray-300 rounded-full'>
                <img className="h-6 p-1" src="/bell.svg" />
            </div>
            <button className="text-white bg-blue-600 cursor-pointer px-2 py-2 flex gap-2 rounded-lg hover:bg-blue-600/80">
                <img className="h-7 p-1" src="/plus.svg" />
                Post Item
            </button>
            </div>
        </header>

        {page === 'home' ? (
            <div className="flex flex-col gap-16 items-center w-full mt-17">
                <div className="bg-[url('/college.avif')] bg-blue-400 bg-cover bg-center bg-blend-multiply h-96 w-full flex items-center justify-center flex-col gap-5 p-4 text-center">
                    <div className="flex flex-col gap-3 text-center">
                    <h2 className="text-white text-3xl font-bold">Lost Something?</h2>
                    <h2 className="text-white text-3xl font-bold">We'll Help You Find It</h2>
                    </div>
                    <p className="text-white text-lg font-medium">
                    Connect with your campus community to reunite lost items with their owners
                    </p>
                    <div className="flex gap-7">
                    <button className="text-white bg-blue-600 cursor-pointer px-2 py-2 flex gap-2 rounded-lg hover:bg-blue-700">
                        <img className="h-7 p-1" src="/plus.svg" />
                        Post Lost Item
                    </button>
                    <button className="text-white bg-blue-600 cursor-pointer px-2 py-2 flex gap-2 rounded-lg hover:bg-blue-700">
                        <img className="h-7 p-1" src="/plus.svg" />
                        Post Found Item
                    </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-col gap-3 items-center text-center p-4">
                        <h2 className="text-3xl font-bold">How CampusFind Works</h2>
                        <p className="text-gray-500 text-xl">
                            Our intelligent system makes reuniting students with their belongings faster and easier than ever.
                        </p>
                    </div>
                    <div className="flex flex-col gap-5 p-4 text-center md:grid md:grid-cols-3">
                        <div className="flex flex-col p-4 items-center gap-3 shadow-gray-400 shadow-sm rounded-lg hover:shadow-lg">
                            <div className="bg-gradient-to-b from-blue-500 to-blue-200 p-4 rounded-full">
                            <img className="h-8" src="/search1.svg" />
                            </div>
                            <p className="text-gray-600 text-lg font-medium">
                            Quickly post lost or found items with photos, descriptions, and location details.
                            </p>
                        </div>
                        <div className="flex flex-col p-4 items-center gap-3 shadow-gray-400 shadow-sm rounded-lg hover:shadow-lg">
                            <div className="bg-gradient-to-b from-blue-500 to-blue-200 p-4 rounded-full">
                            <img className="h-8" src="/bot1.svg" />
                            </div>
                            <p className="text-gray-600 text-lg font-medium">
                            Our system automatically matches lost and found items based on category, location, and description.
                            </p>
                        </div>
                        <div className="flex flex-col p-4 items-center gap-3 shadow-gray-400 shadow-sm rounded-lg hover:shadow-lg">
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
                    <div className="bg-slate-100 flex flex-row gap-2 rounded-md text-gray-500 text-sm py-1 px-1">
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
                                <ItemCard url={url1} item={"iPhone 14 Pro"} category={"Phone"} status={"Lost"} description={"Black iPhone with a blue case, lost near the library entrance"} location={"Library"} time={"2 hours ago"} /> 
                                <ItemCard url={url2} item={"Brown Leather Wallet"} category={"Wallet"} status={"Lost"} description={"Lost in parking lot C, contains student ID"} location={"Parking Lot c"} time={"4 hours ago"} /> 
                            </div>):
                            (<div className='flex flex-col w-full p-4 md:grid md:grid-cols-2 md:gap-3 gap-3'>
                                <ItemCard url={url3} item={"Car Keys"} category={"Keys"} status={"found"} description={"Was lying down below the CPU compartment"} location={"FFL Lab"} time={"2 mins ago"} /> 
                                <ItemCard url={url4} item={"Watch"} category={"Accessories"} status={"found"} description={"Found in Library, next to Ethical Hacking section"} location={"Library"} time={"10 hours ago"} /> 
                            </div>)
                        }
                    </div>
                </div>
            </div>
        ) : null}

        {page === 'lostItemPage' ? <LostItemPage /> : null}
        {page === 'foundItemPage' ? <FoundItemPage /> : null}
        </div>
    );
};

export default Home;
