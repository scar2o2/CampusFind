import React from "react";

const FoundItemCard = ({ item, category, status, description, location, time, url }) => {
  return (
    <div className="flex flex-col bg-white shadow-gray-400 shadow-sm rounded-lg w-full h-full flex-1 hover:shadow-md overflow-hidden">
      <img className="w-full aspect-square object-contain bg-white" src={url} alt={item} />
      <div className="flex flex-col p-3 gap-2 flex-1">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-gray-800">{item}</div>
            <div className="flex">
              <p className="py-0.5 px-2 text-xs bg-gray-200 text-gray-600 font-medium rounded-full">
                {category}
              </p>
            </div>
          </div>
          <div>
            <p className="py-0.5 px-2 text-xs bg-blue-950 text-white rounded-full">
              {status}
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-sm flex-1 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center text-xs mt-auto gap-2">
          <div className="flex gap-1.5 items-center text-gray-600 min-w-0">
            <img className="h-3.5" src="/location.svg" alt="Location" />
            <p className="truncate">{location}</p>
          </div>
          <div className="flex gap-1.5 items-center text-gray-600 shrink-0">
            <img className="h-3.5" src="/calendar.svg" alt="Time" />
            <p>{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundItemCard;
