"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";
import BlogSection from "@/components/BlogSection";

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
  const [section, setSection] = useState<"news" | "blogs">("news");
  const [news, setNews] = useState<Article[]>([]);
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsResponse = await axios.get("https://news-backend-fmu2.onrender.com/news");
        const blogsResponse = await axios.get("https://news-backend-fmu2.onrender.com/blogs");

        setNews(newsResponse.data || []);
        setBlogs(blogsResponse.data || []);
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
      <Header setSection={setSection} />
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : section === "news" ? (
        <NewsSection news={news} />
      ) : (
        <BlogSection blogs={blogs} />
      )}
    </div>
  );
}
