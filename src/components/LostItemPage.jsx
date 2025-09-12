import React, { useState } from 'react'
import LostItemCard from './LostItemCard';
import { useAuth } from '../utils/AuthContext';

const LostItemPage = () => {
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [search, setSearch] = useState("");

  const {user}= useAuth();

  const lostItems = [
    {
      "itemName": "Black Wallet",
      "status": "lost",
      "category": "Accessories",
      "description": "A leather wallet with multiple cards and some cash inside.",
      "location": "Library",
      "time": "10 mins ago"
    },
    {
      "itemName": "iPhone 13",
      "status": "lost",
      "category": "Electronics",
      "description": "Blue iPhone with a transparent case, may have a cracked screen.",
      "location": "Cafeteria",
      "time": "45 mins ago"
    },
    {
      "itemName": "Laptop Bag",
      "status": "lost",
      "category": "Bags",
      "description": "Gray laptop backpack containing a Dell laptop and charger.",
      "location": "Bus Stop near Campus Gate",
      "time": "2 hours ago"
    },
    {
      "itemName": "Water Bottle",
      "status": "lost",
      "category": "Personal Items",
      "description": "Steel water bottle with a sticker of a mountain on it.",
      "location": "Gym Hall",
      "time": "5 hours ago"
    },
    {
      "itemName": "ID Card",
      "status": "lost",
      "category": "Documents",
      "description": "Student ID card with name and photo, attached to a red lanyard.",
      "location": "Main Auditorium",
      "time": "1 day ago"
    },
    {
      "itemName": "Earbuds",
      "status": "lost",
      "category": "Electronics",
      "description": "White wireless earbuds in a small charging case.",
      "location": "Parking Lot B",
      "time": "3 days ago"
    }
  ];

  const uniqueCategories = [...new Set(lostItems.map(item => item.category))];
  const uniqueLocations = [...new Set(lostItems.map(item => item.location))];

  const parseTime = (time) => {
    const [num, unit] = time.split(" ");
    const n = parseInt(num);
    if (unit.startsWith("min")) return n;
    if (unit.startsWith("hour")) return n * 60;
    if (unit.startsWith("day")) return n * 1440;
    if (unit.startsWith("week")) return n * 10080;
    return Infinity;
  };

  const sortedItems = [...lostItems].sort((a, b) => parseTime(a.time) - parseTime(b.time));
  const filteredItems = sortedItems.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesLocation = location === "All" || item.location === location;
    const matchesSearch = item.itemName.toLowerCase().includes(search.toLowerCase());
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
        <h2 className='text-3xl font-bold'>Lost Items</h2>
        <p className='text-gray-500 text-xl'>Browse items that students have reported missing</p>
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
      <div>
        <p className='text-gray-500 font-normal text-lg'>{filteredItems.length} items lost</p>
        <div className='flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-3'>
          {filteredItems.map((item) => (
            <LostItemCard 
              key={item.itemName}
              item={item.itemName} 
              category={item.category} 
              status={"Lost"} 
              description={item.description} 
              location={item.location} 
              time={item.time} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LostItemPage
