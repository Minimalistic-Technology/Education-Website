// components/facultySidebar.tsx
import { useState, useEffect } from "react";
import { Home, Book, Calendar, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, href: "/faculty/dashboard" },
    { name: "Courses", icon: <Book size={20} />, href: "/faculty/courses" },
    { name: "Schedule", icon: <Calendar size={20} />, href: "/faculty/schedule" },
    { name: "Logout", icon: <LogOut size={20} />, href: "/login", isDanger: true },
  ];

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleMobile}
          className="fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg shadow-lg md:hidden"
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
        h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white shadow-2xl
        ${isMobile 
          ? `fixed z-50 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} w-64` 
          : `fixed ${collapsed ? 'w-16' : 'w-64'}`
        }
        transition-all duration-300 ease-in-out
      `}>
        <div className="flex items-center justify-between px-4 py-6 border-b border-slate-600">
          {(!collapsed || isMobile) && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Faculty Portal
            </h1>
          )}
        </div>

        <nav className="mt-6 px-2">
          {menuItems.map((item, idx) => (
            <Link href={item.href} key={idx} onClick={isMobile ? toggleMobile : undefined}>
              <div className={`
                flex items-center px-3 py-3 mb-2 rounded-lg cursor-pointer transition-all duration-200
                hover:bg-slate-700 hover:shadow-md hover:translate-x-1
                ${item.isDanger ? 'hover:bg-red-600' : ''}
                group relative
              `}>
                <div className={`${item.isDanger ? 'text-red-400' : 'text-orange-400'} group-hover:text-white transition-colors`}>
                  {item.icon}
                </div>
                
                {(!collapsed || isMobile) && (
                  <span className={`ml-3 font-medium ${item.isDanger ? 'text-red-400 group-hover:text-white' : ''}`}>
                    {item.name}
                  </span>
                )}
                
                {/* Tooltip for collapsed state */}
                {collapsed && !isMobile && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Bottom decoration */}
        <div className="absolute bottom-4 left-4 right-4">
          {(!collapsed || isMobile) && (
            <div className="text-xs text-slate-400 text-center border-t border-slate-600 pt-4">
              Faculty Dashboard v2.0
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;