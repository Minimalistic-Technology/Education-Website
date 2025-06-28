// app/faculty/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import Sidebar from "../components/facultySidebar";
import Header from "../components/facultyHeader";
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Users, 
  Calendar,
  Award,
  BarChart3,
  Activity
} from "lucide-react";

export default function FacultyDashboard() {
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
      title: "Total Courses",
      value: "8",
      icon: <BookOpen className="text-blue-500" size={24} />,
      change: "+2 from last semester",
      trend: "up",
      color: "from-blue-500/10 to-blue-600/10 border-blue-200"
    },
    {
      title: "Upcoming Lectures",
      value: "3",
      icon: <Clock className="text-orange-500" size={24} />,
      change: "Today",
      trend: "neutral",
      color: "from-orange-500/10 to-orange-600/10 border-orange-200"
    },
    {
      title: "Attendance Rate",
      value: "95%",
      icon: <TrendingUp className="text-green-500" size={24} />,
      change: "+5% this month",
      trend: "up",
      color: "from-green-500/10 to-green-600/10 border-green-200"
    },
    {
      title: "Total Students",
      value: "142",
      icon: <Users className="text-purple-500" size={24} />,
      change: "Across all courses",
      trend: "neutral",
      color: "from-purple-500/10 to-purple-600/10 border-purple-200"
    }
  ];

  const upcomingLectures = [
    {
      course: "Data Structures",
      time: "10:00 AM",
      room: "Room 301",
      students: 45
    },
    {
      course: "Algorithm Design",
      time: "2:00 PM", 
      room: "Room 205",
      students: 38
    },
    {
      course: "Database Systems",
      time: "4:00 PM",
      room: "Room 401",
      students: 42
    }
  ];

  const recentActivities = [
    {
      action: "Graded Assignment 3",
      course: "Data Structures",
      time: "2 hours ago",
      icon: <Award className="text-yellow-500" size={16} />
    },
    {
      action: "Posted new lecture notes",
      course: "Algorithm Design", 
      time: "5 hours ago",
      icon: <BookOpen className="text-blue-500" size={16} />
    },
    {
      action: "Updated course schedule",
      course: "Database Systems",
      time: "1 day ago",
      icon: <Calendar className="text-green-500" size={16} />
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className={`flex-1 ${isMobile ? '' : 'ml-16 md:ml-64'} transition-all duration-300`}>
        <Header />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, Dr. Smith 👋
            </h1>
            <p className="text-gray-600">Here's what's happening with your courses today.</p>
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
                      <TrendingUp size={12} />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-700 mb-1">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Today's Schedule */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Calendar className="text-white" size={20} />
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">Today's Schedule</h2>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="space-y-4">
                    {upcomingLectures.map((lecture, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1 mb-2 sm:mb-0">
                          <h3 className="font-semibold text-gray-900">{lecture.course}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {lecture.time}
                            </span>
                            <span className="hidden sm:block">•</span>
                            <span>{lecture.room}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users size={14} />
                          <span>{lecture.students} students</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <BarChart3 className="text-white" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Assignments Graded</span>
                    <span className="font-semibold">24/30</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-600">Course Completion</span>
                    <span className="font-semibold">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Activity className="text-white" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="p-1 bg-gray-100 rounded-full">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.course}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}