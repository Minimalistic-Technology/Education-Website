"use client";
import { useState, useEffect } from "react";
import { Home, Users, FileText, BarChart3, Settings, LogOut, Menu, X, Monitor, GraduationCap, ChevronLeft, ChevronRight, Calendar, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const AdminSidebar = ({ isCollapsed, setIsCollapsed }: AdminSidebarProps) => {
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
    { name: "Manage Users", icon: <Users size={20} />, href: "/admin/users" },
    { name: "Study Matterial", icon: <FileText size={20} />, href: "/admin/StudyMatterial" },
    { name: "Grades", icon: <GraduationCap size={20} />, href: "/faculty/grades" },
    { name: "Schedule", icon: <Calendar size={20} />, href: "/admin/schedule" },
    { name: "Logout", icon: <LogOut size={20} />, href: "/login", isDanger: true },
  ];

  const toggleMobile = () => setMobileOpen(!mobileOpen);
   const toggleSidebar = () => setIsCollapsed(!isCollapsed);

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
          : `fixed ${isCollapsed ? 'w-16' : 'w-64'}`
        }
        transition-all duration-300 ease-in-out
      `}>
        <div className="flex items-center justify-between px-4 py-6 border-b border-red-600">
          {(!isCollapsed || isMobile) && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-400 bg-clip-text text-transparent">
            Admin Portal 
          </h1>
        )}

          {/* Desktop Toggle Button */}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 hover:bg-red-700 rounded-lg transition-colors"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}
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
                ${isCollapsed && !isMobile ? 'justify-center' : ''}
              `}>
                <div className={`
                  ${item.isDanger 
                    ? 'text-red-400' 
                    : isActive(item.href) 
                      ? 'text-red-300' 
                      : 'text-red-400'
                  } 
                  group-hover:text-white transition-colors
                  ${isCollapsed && !isMobile ? 'mx-auto' : ''}
                `}>
                  {item.icon}
                </div>
                
                {(!isCollapsed || isMobile) && (
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
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && !isMobile && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
                
                {/* Active indicator dot */}
                {isActive(item.href) && !item.isDanger && (
                  <div className="ml-auto w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Bottom decoration */}
        {(!isCollapsed || isMobile) && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs text-red-400 text-center border-t border-red-600 pt-4">
            Admin Dashboard v2.0
          </div>
        </div>
        )}
      </div>
    </>
  );
};

export default AdminSidebar;