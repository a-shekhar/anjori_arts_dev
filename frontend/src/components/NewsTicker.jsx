import { useState, useEffect } from "react";
import clsx from "clsx";

export default function NewsTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [news, setNews] = useState("✨ Loading latest news…");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/analytics/news/latest");
        const data = await res.json();
        setNews(data.data || "🎨 No news at the moment. Stay creative!");
      } catch (error) {
        setNews("⚠️ Unable to load news. Please check back later.");
      }
    };

    fetchNews();
  }, []);

  return (
    <div
      className={clsx(
        "w-full py-2",
        "bg-pink-200",
        "sm:bg-gradient-to-r sm:from-pink-100 sm:via-yellow-50 sm:to-pink-100"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="overflow-hidden rounded-full bg-white shadow-md">
          <div
            className={clsx(
              "whitespace-nowrap px-4 py-1 text-sm font-medium text-pink-700 inline-block",
              "will-change-transform",
              "animate-marquee",
              isPaused && "pause"
            )}
          >
            {news}
          </div>
        </div>
      </div>
    </div>
  );
}
