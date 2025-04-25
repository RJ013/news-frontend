"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
        const newsResponse = await axios.get("https://news-backend-813n.onrender.com/news");
        setNews(newsResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
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
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <NewsSection news={news} />
      )}
    </div>
  );
}
