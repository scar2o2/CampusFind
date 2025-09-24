import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import FoundItemCard from './FoundItemCard';
import { getAllFoundItems } from '../../supabaseRoutes/supabaseFoundItems';

const FoundItemPage = () => {
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [search, setSearch] = useState("");
  const {user}= useAuth();
  const [foundItems,setFoundItems]= useState([]);

  useEffect(()=>{
    const fetchAllFoundItems= async ()=>{
      await getAllFoundItems().then((res)=>{
        setFoundItems(res);
      });
    }
    fetchAllFoundItems();
  },[]);


  const uniqueCategories = [...new Set(foundItems.map(item => item.category))];
  const uniqueLocations = [...new Set(foundItems.map(item => item.location))];

  const filteredItems = foundItems.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesLocation = location === "All" || item.location === location;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch;
  });

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
    <div className='flex flex-col p-6 w-full bg-gray-100 gap-12 h-full'>
      <div className='flex flex-col gap-3'>
        <h2 className='text-3xl font-bold'>Found Items</h2>
        <p className='text-gray-500 text-xl'>Items that have been found and are waiting to be claimed</p>
        <div className="relative w-full mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by item name..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img
            src="/search.svg"
            alt="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
          />
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='font-medium'>Category</h2>
          <div className='flex flex-wrap gap-2'>
            <div 
              onClick={() => setCategory('All')} 
              className={category === "All" ? 
                'p-2 bg-blue-900 text-white cursor-pointer rounded-lg' : 
                'p-2 bg-white text-gray-500 hover:bg-blue-600 cursor-pointer hover:text-white rounded-lg'}
            >
              All
            </div>
            {uniqueCategories.map((cat) => (
              <div 
                key={cat}
                onClick={() => setCategory(cat)}
                className={category === cat ? 
                  'p-2 bg-blue-900 text-white cursor-pointer rounded-lg' : 
                  'p-2 bg-white text-gray-500 hover:bg-blue-600 cursor-pointer hover:text-white rounded-lg'}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='font-medium'>Location</h2>
          <div className='flex flex-wrap gap-2'>
            <div 
              onClick={() => setLocation("All")} 
              className={location === "All" ? 
                'p-2 bg-blue-900 text-white cursor-pointer rounded-lg' : 
                'p-2 bg-white text-gray-500 hover:bg-blue-600 cursor-pointer hover:text-white rounded-lg'}
            >
              All
            </div>
            {uniqueLocations.map((loc) => (
              <div 
                key={loc}
                onClick={() => setLocation(loc)}
                className={location === loc ? 
                  'p-2 bg-blue-900 text-white cursor-pointer rounded-lg' : 
                  'p-2 bg-white text-gray-500 hover:bg-blue-600 cursor-pointer hover:text-white rounded-lg'}
              >
                {loc}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=''>
        <p className='text-gray-500 font-normal text-lg'>{filteredItems.length} items found</p>
        <div className='flex flex-col w-full p-4 md:grid md:grid-cols-2 md:gap-3 gap-3'>
          {filteredItems.map((item) => (
            <FoundItemCard 
              key={item.id}
              item={item.name} 
              category={item.category} 
              status={"Found"} 
              description={item.description} 
              location={item.location} 
              time={item.foundDate} 
              url={item.image_url}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FoundItemPage
