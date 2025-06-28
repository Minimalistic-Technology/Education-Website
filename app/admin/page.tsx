"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { 
  Users, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock 
} from "lucide-react";

export default function AdminDashboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const stats = [
    {
      title: "Total Students",
      value: "120",
      icon: <Users className="text-blue-500" size={24} />,
      trend: "neutral",
      color: "from-blue-500/10 to-blue-600/10 border-blue-200"
    },
    {
      title: "Verified Students",
      value: "100",
      icon: <CheckCircle className="text-green-500" size={24} />,
      trend: "up",
      color: "from-green-500/10 to-green-600/10 border-green-200"
    },
    {
      title: "Pending Reviews",
      value: "20",
      icon: <AlertCircle className="text-orange-500" size={24} />,
      trend: "neutral",
      color: "from-orange-500/10 to-orange-600/10 border-orange-200"
    },
    {
      title: "Documents Uploaded",
      value: "50",
      icon: <FileText className="text-purple-500" size={24} />,
      trend: "neutral",
      color: "from-purple-500/10 to-purple-600/10 border-purple-200"
    }
  ];

  const recentDocuments = [
    {
      title: "Student ID Card",
      status: "Verified",
      date: "Jan 15, 2024",
      icon: <CheckCircle className="text-green-600" size={16} />
    },
    {
      title: "Aadhar Card",
      status: "Pending Review",
      date: "Jan 10, 2024",
      icon: <AlertCircle className="text-orange-600" size={16} />
    },
    {
      title: "Passport Photo",
      status: "Verified",
      date: "Jan 12, 2024",
      icon: <CheckCircle className="text-green-600" size={16} />
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className={`flex-1 ${isMobile ? '' : 'ml-64'} transition-all duration-300`}>
        <AdminHeader />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Welcome, Admin! 👋
            </h1>
            <p className="text-gray-600">Here's the overview of your dashboard.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`
                  bg-gradient-to-br ${stat.color} backdrop-blur-sm
                  p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md 
                  transition-all duration-300 hover:scale-105 border
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {stat.icon}
                  </div>
                  {stat.trend === 'up' && (
                    <div className="flex items-center gap-1 text-green-600 text-xs">
                      <CheckCircle size={12} />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-700 mb-1">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Documents</h2>
            </div>
            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {recentDocuments.map((document, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{document.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{document.date}</p>
                    </div>
                    <span className="flex items-center gap-1 text-sm">
                      {document.icon}
                      {document.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
