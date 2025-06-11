"use client";
import React, { useState, useEffect } from "react";
import {Search,ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const StudentHeader = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getPageTitle = () => {
    const pathSegments = pathname.split('/');
    const currentPage = pathSegments[pathSegments.length - 1];
    
    switch(currentPage) {
      case 'dashboard': return 'Dashboard';
      case 'courses': return 'My Courses';
      case 'lectures': return 'Lectures';
      case 'attendance': return 'Attendance';
      case 'documents': return 'Documents';
      case 'progress': return 'Progress Report';
      case 'grades': return 'Grades';
      case 'schedule': return 'Schedule';
      default: return 'Student Portal';
    }
  };

  return (
    <header className={`
      h-16 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200
      flex items-center justify-between px-4 md:px-6 
      fixed top-0 right-0 z-30
      ${isMobile ? 'left-0' : 'left-64'}
      transition-all duration-300
    `}>
      {/* Left Section */}
      <div className={`flex items-center gap-4 ${isMobile ? 'ml-12' : ''}`}>
        <h2 className={`
          font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent
          ${isMobile ? 'text-lg' : 'text-xl'}
        `}>
          {isMobile ? getPageTitle() : `${getPageTitle()}`}
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search (Desktop only) */}
        {!isMobile && (
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            />
          </div>
        )}

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              {!isMobile && (
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                  <p className="text-xs text-gray-500">Computer Science</p>
                </div>
              )}
              <img
                src="/student-avatar.png"
                alt="Student Avatar"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-500/20"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=Alex+Johnson&background=10b981&color=fff&size=32`;
                }}
              />
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Settings
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Help & Support
              </a>
              <hr className="my-2 border-gray-200" />
              <a href="/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                Logout
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
};

export default StudentHeader;