"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";

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

export default function Home() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gnews.io/api/v4/top-headlines?category=general&apikey=a8079f81525d25fb4487b07f63f46631&country=in"
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Map GNews API response to our Article type
        const formattedNews = data.articles.map((article: any, index: number) => ({
          id: index, // Using index as id since GNews might not provide unique ids
          title: article.title,
          content: article.content,
          description: article.description,
          url: article.url,
          image: article.image,
          publishedAt: article.publishedAt,
          source: {
            name: article.source?.name || "Unknown",
            url: article.source?.url || "#"
          }
        }));
        
        setNews(formattedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div>
      <Header />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading news...</p>
          </div>
        </div>
      ) : (
        <NewsSection news={news} />
      )}
    </div>
  );
}