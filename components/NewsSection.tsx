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
    // Added mx-auto and max-w-screen-xl to center the content and add maximum width
    // Increased left and right padding with px-8 (or px-10 for even more space)
    <div className="p-6 px-10 bg-gray-100 mx-auto max-w-screen-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest News</h2>
      
      {/* Grid layout for the cards with extra side margin */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
        {reversedNews.map((item, index) => (
          // Each news item is a separate card
          <div
            key={`${item.id}-${index}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="relative">
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="inline-block px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded">
                  {item.source.name}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
              <div className="text-xs text-gray-500 mb-3">
                {item.publishedAt}
              </div>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;