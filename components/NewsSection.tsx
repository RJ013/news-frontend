"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Create a reversed copy of the news array
  const reversedNews = [...news].reverse();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.getAttribute("data-index");
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Removed setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.5,
        rootMargin: "0px",
      }
    );

    setTimeout(() => {
      const cards = container.querySelectorAll("[data-index]");
      cards.forEach((card) => observer.observe(card));
    }, 0);

    return () => {
      observer.disconnect();
    };
  }, [news]);

  return (
    <motion.div
      ref={containerRef}
      className="h-full overflow-y-scroll snap-y snap-mandatory bg-gray-100 px-4 py-6"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style jsx>{`
        .news-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {reversedNews.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          data-index={index}
          className={`snap-start w-full overflow-hidden bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${
            index === 0 ? 'mb-6' : index === 1 ? 'mb-12' : 'mb-6'
          }`}
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
    </motion.div>
  );
};

export default NewsSection;