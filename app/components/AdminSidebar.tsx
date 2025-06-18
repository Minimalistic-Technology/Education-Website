"use client";
import { useState, useEffect } from "react";
import { Home, Users, FileText, BarChart3, Settings, LogOut, Menu, X, Monitor, GraduationCap, Calendar, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, href: "/admin" },
    { name: "Exam Control", icon: <Monitor size={20} />, href: "/admin/exams" },
    { name: "Students", icon: <Users size={20} />, href: "/faculty/students" },
    { name: "Grades", icon: <GraduationCap size={20} />, href: "/faculty/grades" },
    { name: "Analytics", icon: <BarChart3 size={20} />, href: "/faculty/analytics" },
    { name: "Schedule", icon: <Calendar size={20} />, href: "/admin/schedule" },
    { name: "Notifications", icon: <Bell size={20} />, href: "/faculty/notifications" },
    { name: "Settings", icon: <Settings size={20} />, href: "/faculty/settings" },
    { name: "Logout", icon: <LogOut size={20} />, href: "/login", isDanger: true },
  ];

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleMobile}
          className="fixed top-4 left-4 z-50 p-2 bg-red-800 text-white rounded-lg shadow-lg md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div className={`
        h-screen bg-gradient-to-b from-red-900 to-red-950 text-white shadow-2xl
        ${isMobile 
          ? `fixed z-50 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} w-64` 
          : 'fixed w-64'
        }
        transition-all duration-300 ease-in-out
      `}>
        <div className="flex items-center justify-between px-4 py-6 border-b border-red-600">
          <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-400 bg-clip-text text-transparent">
            Admin Portal 
          </h1>
        </div>

        <nav className="mt-6 px-2">
          {menuItems.map((item, idx) => (
            <Link href={item.href} key={idx} onClick={isMobile ? toggleMobile : undefined}>
              <div className={`
                flex items-center px-3 py-3 mb-2 rounded-lg cursor-pointer transition-all duration-200
                ${isActive(item.href) && !item.isDanger
                  ? 'bg-red-600 shadow-lg border-l-4 border-red-400 text-white' 
                  : 'hover:bg-red-700 hover:shadow-md hover:translate-x-1'
                }
                ${item.isDanger ? 'hover:bg-red-600' : ''}
                group relative
              `}>
                <div className={`
                  ${item.isDanger 
                    ? 'text-red-400' 
                    : isActive(item.href) 
                      ? 'text-red-300' 
                      : 'text-red-400'
                  } 
                  group-hover:text-white transition-colors
                `}>
                  {item.icon}
                </div>
                
                <span className={`
                  ml-3 font-medium 
                  ${item.isDanger 
                    ? 'text-red-400 group-hover:text-white' 
                    : isActive(item.href) 
                      ? 'text-white font-semibold' 
                      : ''
                  }
                `}>
                  {item.name}
                </span>
                
                {/* Active indicator dot */}
                {isActive(item.href) && !item.isDanger && (
                  <div className="ml-auto w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Bottom decoration */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs text-red-400 text-center border-t border-red-600 pt-4">
            Admin Dashboard v2.0
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;