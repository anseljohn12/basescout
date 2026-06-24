"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 text-sm">
      <button
        onClick={() => setTheme("light")}
        className={`px-3 py-1 rounded ${
          theme === "light"
            ? "bg-blue-500 text-white"
            : "bg-gray-800"
        }`}
      >
        ☀
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`px-3 py-1 rounded ${
          theme === "dark"
            ? "bg-blue-500 text-white"
            : "bg-gray-800"
        }`}
      >
        🌙
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`px-3 py-1 rounded ${
          theme === "system"
            ? "bg-blue-500 text-white"
            : "bg-gray-800"
        }`}
      >
        💻
      </button>
    </div>
  );
}