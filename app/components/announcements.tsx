"use client";
import React from "react";

const announcements = [
  { text: "Dept of CS & IT presents E-Spark 25", href: "#" },
  { text: "Third Merit List 2025-26", href: "#" },
  { text: "FOR ALL ONLINE ADMISSION FORMS", href: "#" },
  { text: "Dept of CS & IT presents E-Spark 25", href: "#" },
  { text: "Third Merit List 2025-26", href: "#" },
  { text: "FOR ALL ONLINE ADMISSION FORMS", href: "#" },
];

export default function Announcements() {
  return (
    <div className="w-full bg-gray-100 flex items-center justify-between py-2 px-4 border-b-2 border-blue-900 overflow-hidden">
      {/* Left Label */}
      <div className="bg-red-600 text-white font-semibold px-4 py-2 rounded-sm">
        Announcements
      </div>

      {/* Center Marquee */}
      <div className="flex-1 mx-4 overflow-hidden">
        <div
          className="flex gap-8 whitespace-nowrap animate-[scroll_20s_linear_infinite]"
          style={{
            animationName: "scroll",
            animationDuration: "20s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {announcements.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-black font-semibold underline hover:text-blue-700"
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>

      {/* Right Button */}
      <a
        href="#"
        className="bg-red-600 text-white px-4 py-2 rounded-sm font-semibold hover:bg-red-700"
      >
        View All
      </a>

      {/* Custom keyframes injected inline */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
