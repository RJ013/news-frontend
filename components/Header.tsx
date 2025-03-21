// components/Header.tsx
"use client";

import { useState } from "react";

export default function Header({ setSection }: { setSection: (section: "news" | "blogs") => void }) {
  const [active, setActive] = useState<"news" | "blogs">("news");

  const handleClick = (section: "news" | "blogs") => {
    setActive(section);
    setSection(section); // ✅ Calls the function to update the section
  };

  return (
    <div className="flex items-center justify-between w-full max-w-6xl mx-auto py-4 bg-white shadow-md px-8 rounded-lg">
      {/* Left Side - News Button */}
      <div className="flex-1 flex justify-start">
        <button
          onClick={() => handleClick("news")}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
            active === "news"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          News
        </button>
      </div>

      {/* Center Title */}
      <div className="flex-1 flex justify-center">
        <h2 className="text-2xl font-bold text-gray-800">News & Blogs</h2>
      </div>

      {/* Right Side - Blogs Button */}
      <div className="flex-1 flex justify-end">
        <button
          onClick={() => handleClick("blogs")}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
            active === "blogs"
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Blogs
        </button>
      </div>
    </div>
  );
}
