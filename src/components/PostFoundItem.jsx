import React, { useState } from 'react';
import { Tag, MapPin, Calendar, Upload } from 'lucide-react';

const PostFoundItem = () => {
  const [item, setItem] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    date: "",
    image: null,
    contact: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', item);
  };

  const reset = () => {
    setItem({
      name: "",
      category: "",
      description: "",
      location: "",
      date: "",
      image: null,
      contact: ""
    });
  };

  return (
    <div className="w-full px-6 py-8 bg-white rounded-lg text-left">
      <div className="space-y-6 w-full">
        {/* Item Name */}
        <div className="flex flex-col gap-2 w-full">
          <label className="flex items-center gap-2 font-medium text-gray-800">
            <Tag size={16} className="text-gray-600" />
            Item Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="What did you find?"
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-3 py-3 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent text-gray-700"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-gray-800">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full">
            <select
              className="w-full border border-gray-300 bg-gray-50 rounded-md px-3 py-3 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent text-gray-700 appearance-none"
              value={item.category}
              onChange={(e) => setItem({ ...item, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
              <option value="documents">Documents</option>
              <option value="keys">Keys</option>
              <option value="bags">Bags</option>
              <option value="other">Other</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-gray-800">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Provide details about the item..."
            rows={4}
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-3 py-3 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent text-gray-700 resize-y"
            value={item.description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            required
          />
        </div>

        {/* Location - changed to text input */}
        <div className="flex flex-col gap-2 w-full">
          <label className="flex items-center gap-2 font-medium text-gray-800">
            <MapPin size={16} className="text-gray-600" />
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Where was it found?"
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-3 py-3 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent text-gray-700"
            value={item.location}
            onChange={(e) => setItem({ ...item, location: e.target.value })}
            required
          />
        </div>

        {/* Date Found */}
        <div className="flex flex-col gap-2 w-full">
          <label className="flex items-center gap-2 font-medium text-gray-800">
            <Calendar size={16} className="text-gray-600" />
            Date Found
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-3 py-3 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent text-gray-700"
            value={item.date}
            onChange={(e) => setItem({ ...item, date: e.target.value })}
          />
        </div>

        {/* Photo Upload */}
        <div className="flex flex-col gap-2 w-full">
          <label className="flex items-center gap-2 font-medium text-gray-800">
            <Upload size={16} className="text-gray-600" />
            Photo (Optional)
          </label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer w-full">
            <Upload size={24} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Click to upload a photo</p>
            <p className="text-gray-500 text-sm mt-1">Helps others identify the item</p>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setItem({ ...item, image: e.target.files[0] })}
            />
          </div>
        </div>

        {/* Submit & Reset Buttons */}
        <div className='w-full flex gap-4'>
          <button
            onClick={() => { console.log(item) }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium py-4 
                      rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 shadow-sm"
          >
            Post Found Item
          </button>
          <button 
            className='flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium py-4 
                      rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 shadow-sm'
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostFoundItem;
