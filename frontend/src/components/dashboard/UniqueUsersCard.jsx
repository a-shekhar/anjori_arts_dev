import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function UniqueUsersCard() {
  const [count, setCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/analytics/unique-visitors", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && typeof data.data === "number") {
          setCount(data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching unique user count:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(count / 20));
    const interval = setInterval(() => {
      current += step;
      if (current >= count) {
        setDisplayCount(count);
        clearInterval(interval);
      } else {
        setDisplayCount(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [count, loading]);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 bg-violet-100 text-violet-700 rounded-full">
        <Users className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">Unique Users</p>
        <p className="text-lg font-semibold text-gray-800">
          {loading ? "…" : displayCount.toLocaleString()}
        </p>
        {/* Optional growth below — real logic can be plugged later */}
{/*
        <p className="text-xs text-green-600 mt-1">+0% from yesterday</p>
 */}
      </div>
    </div>
  );
}
