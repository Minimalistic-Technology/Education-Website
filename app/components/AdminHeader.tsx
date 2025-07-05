"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

interface AdminHeaderProps {
  isCollapsed: boolean;
}

const AdminHeader = ({ isCollapsed }: AdminHeaderProps) => {
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
      case 'schedule': return 'Schedule';
      case 'attendance': return 'Attendance';
      case 'documents': return 'Documents';
      case 'progress': return 'Progress Report';
      case 'grades': return 'Grades';

      default: return 'Admin Portal';
    }
  };

  return (
    <header className={`
      h-16 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200
      flex items-center justify-between px-4 md:px-6 
      fixed top-0 right-0 z-30
      ${isMobile ? 'left-0' : isCollapsed ? 'left-16' : 'left-64'}
      transition-all duration-300
    `}>
      {/* Left Section */}
      <div className={`flex items-center gap-4 ${isMobile ? 'ml-12' : ''}`}>
        <h2 className={`
          font-bold bg-gradient-to-r from-red-700 to-red-700 bg-clip-text text-transparent
          ${isMobile ? 'text-lg' : 'text-xl'}
        `}>
          {isMobile ? getPageTitle() : `${getPageTitle()}`}
        </h2>
      </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              {!isMobile && (
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">Head</p>
                </div>
              )}
              <Image
                src="/images/prof.png"
                alt="Profile Logo"
                width={40}
                height={40}
                className="rounded-full shadow-md border-2 border-red-300"
                priority
                />
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <a href="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </a>
              <a href="/admin/Help&Support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Help & Support
              </a>
              <hr className="my-2 border-gray-200" />
              <a href="/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                Logout
              </a>
            </div>
          )}
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

export default AdminHeader;