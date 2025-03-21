"use client";


import React from "react";
import Image from "next/image";

type Article = {
  id: number;
  title: string;
  content: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
};

type NewsSectionProps = {
  news: Article[];
};

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  // Create a reversed copy of the news array
  const reversedNews = [...news].reverse();

  return (
    // Added mx-auto to center the container and added specific margins
    <div className="py-12 px-4 sm:px-8 lg:px-16 bg-gray-100 mx-auto max-w-screen-xl lg:max-w-screen-2xl" style={{ margin: "0 auto" }}>
      {/* More responsive header with better font sizing for desktop */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">Latest News</h2>
        <div className="hidden md:flex space-x-2">
          <button className="px-3 py-2 bg-white text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Added mx-auto to center the grid and added specific margins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mx-auto" style={{ maxWidth: "90%", margin: "0 auto" }}>
        {reversedNews.map((item, index) => (
          // Enhanced card with consistent padding on all sides and no text truncation
          <div
            key={`${item.id}-${index}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
          >
            <div className="relative">
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={300}
                className="w-full h-48 md:h-56 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="inline-block px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded">
                  {item.source.name}
                </span>
              </div>
            </div>
            
            {/* Even padding on all sides (6 on mobile, 8 on larger screens) */}
            <div className="p-6 md:p-8 flex-grow flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                {item.title}
              </h3>
              <div className="text-xs text-gray-500 mb-4 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {item.publishedAt}
              </div>
              
              {/* Full description with no truncation or ellipsis */}
              <div className="mb-6 flex-grow">
                <p className="text-sm md:text-base text-gray-600">
                  {item.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center mt-auto">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 md:px-6 md:py-3 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Read more
                </a>
                
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination for desktop with ellipsis removed */}
      <div className="hidden md:flex justify-center mt-12">
        <nav className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">Previous</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">1</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">2</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">3</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">4</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">5</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">8</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">Next</button>
        </nav>
      </div>
    </div>
  );
};

export default NewsSection;