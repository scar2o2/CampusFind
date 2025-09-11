import React from "react";

const ItemCard = ({ item, category, status, description, location, time, url }) => {
  return (
    <div className="flex flex-col bg-white shadow-gray-400 shadow-sm rounded-lg w-full h-full flex-1 hover:shadow-md">
      <img className="w-full h-44 object-cover rounded-t-lg" src={url} alt={item} />
      <div className="flex flex-col p-3 gap-2 flex-1">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-gray-800">{item}</div>
            <div className="flex">
              <p className="py-1 px-3 text-xs bg-gray-200 text-gray-600 font-medium rounded-full">
                {category}
              </p>
            </div>
          </div>
          <div>
            <p className="py-1 px-3 text-xs bg-blue-950 text-white rounded-full">
              {status}
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-sm flex-1">{description}</p>
        <div className="flex justify-between items-center text-sm mt-auto">
          <div className="flex gap-2 items-center text-gray-600">
            <img className="h-4" src="/location.svg" alt="Location" />
            <p>{location}</p>
          </div>
          <div className="flex gap-2 items-center text-gray-600">
            <img className="h-4" src="/calendar.svg" alt="Time" />
            <p>{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
