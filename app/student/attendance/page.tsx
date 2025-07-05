"use client";
import { useState, useEffect } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
import { 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  BookOpen,
  MapPin,
  Timer,
  Award,
  BarChart3,
  Filter,
  Search,
  Download
} from "lucide-react";

export default function StudentAttendance() {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("current");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const attendanceStats = [
    {
      title: "Overall Attendance",
      value: "92%",
      icon: <TrendingUp className="text-green-500" size={24} />,
      change: "+3% from last month",
      trend: "up",
      color: "from-green-500/10 to-green-600/10 border-green-200"
    },
    {
      title: "Classes Attended",
      value: "156",
      icon: <CheckCircle className="text-blue-500" size={24} />,
      change: "Out of 170 total",
      trend: "neutral",
      color: "from-blue-500/10 to-blue-600/10 border-blue-200"
    },
    {
      title: "Perfect Months",
      value: "3",
      icon: <Award className="text-yellow-500" size={24} />,
      change: "100% attendance",
      trend: "neutral",
      color: "from-yellow-500/10 to-yellow-600/10 border-yellow-200"
    },
    {
      title: "Current Streak",
      value: "12",
      icon: <Timer className="text-purple-500" size={24} />,
      change: "Consecutive days",
      trend: "up",
      color: "from-purple-500/10 to-purple-600/10 border-purple-200"
    }
  ];

  const courses = [
    { id: "all", name: "All Courses" },
    { id: "ds", name: "Data Structures" },
    { id: "calc", name: "Calculus II" },
    { id: "web", name: "Web Development" },
    { id: "db", name: "Database Systems" },
    { id: "algo", name: "Algorithm Design" },
    { id: "os", name: "Operating Systems" }
  ];

  const todayClasses = [
    {
      id: 1,
      course: "Data Structures",
      time: "9:00 AM - 10:30 AM",
      room: "Room 301",
      professor: "Dr. Smith",
      status: "present",
      markedAt: "8:55 AM",
      type: "Lecture"
    },
    {
      id: 2,
      course: "Calculus II",
      time: "11:00 AM - 12:30 PM",
      room: "Room 205",
      professor: "Dr. Johnson",
      status: "present",
      markedAt: "10:58 AM",
      type: "Tutorial"
    },
    {
      id: 3,
      course: "Web Development",
      time: "2:00 PM - 4:00 PM",
      room: "Lab 101",
      professor: "Prof. Davis",
      status: "upcoming",
      markedAt: null,
      type: "Lab"
    },
    {
      id: 4,
      course: "Database Systems",
      time: "4:00 PM - 5:30 PM",
      room: "Room 401",
      professor: "Dr. Wilson",
      status: "upcoming",
      markedAt: null,
      type: "Lecture"
    }
  ];

  const attendanceHistory = [
    {
      date: "2024-01-15",
      course: "Data Structures",
      time: "9:00 AM",
      status: "present",
      markedAt: "8:55 AM",
      type: "Lecture"
    },
    {
      date: "2024-01-15",
      course: "Calculus II",
      time: "11:00 AM",
      status: "present",
      markedAt: "10:58 AM",
      type: "Tutorial"
    },
    {
      date: "2024-01-15",
      course: "Web Development",
      time: "2:00 PM",
      status: "absent",
      markedAt: null,
      type: "Lab"
    },
    {
      date: "2024-01-14",
      course: "Database Systems",
      time: "4:00 PM",
      status: "present",
      markedAt: "3:58 PM",
      type: "Lecture"
    },
    {
      date: "2024-01-14",
      course: "Algorithm Design",
      time: "10:00 AM",
      status: "present",
      markedAt: "9:55 AM",
      type: "Lecture"
    },
    {
      date: "2024-01-13",
      course: "Operating Systems",
      time: "1:00 PM",
      status: "late",
      markedAt: "1:15 PM",
      type: "Lecture"
    }
  ];

  const courseAttendance = [
    {
      course: "Data Structures",
      attended: 28,
      total: 30,
      percentage: 93,
      color: "bg-green-500"
    },
    {
      course: "Calculus II",
      attended: 26,
      total: 28,
      percentage: 93,
      color: "bg-green-500"
    },
    {
      course: "Web Development",
      attended: 22,
      total: 25,
      percentage: 88,
      color: "bg-yellow-500"
    },
    {
      course: "Database Systems",
      attended: 25,
      total: 27,
      percentage: 93,
      color: "bg-green-500"
    },
    {
      course: "Algorithm Design",
      attended: 24,
      total: 26,
      percentage: 92,
      color: "bg-green-500"
    },
    {
      course: "Operating Systems",
      attended: 20,
      total: 24,
      percentage: 83,
      color: "bg-orange-500"
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'present': return 'text-green-600 bg-green-50 border-green-200';
      case 'absent': return 'text-red-600 bg-red-50 border-red-200';
      case 'late': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'upcoming': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'present': return <CheckCircle size={14} className="text-green-600" />;
      case 'absent': return <XCircle size={14} className="text-red-600" />;
      case 'late': return <AlertCircle size={14} className="text-yellow-600" />;
      case 'upcoming': return <Clock size={14} className="text-blue-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  const markAttendance = (classId: number) => {
    // This would typically make an API call to mark attendance
    console.log(`Marking attendance for class ${classId}`);
    // Update the class status to 'present'
    // This is just for demo purposes
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <StudentHeader isCollapsed={isCollapsed} />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Attendance Tracker
                </h1>
                <p className="text-gray-600">Monitor your class attendance and maintain your academic record.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  <Download size={16} />
                  Export Report
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {attendanceStats.map((stat, idx) => (
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
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
            {/* Today's Classes & Mark Attendance */}
            <div className="xl:col-span-2 space-y-6">
              {/* Today's Classes */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500 rounded-lg">
                        <Calendar className="text-white" size={20} />
                      </div>
                      <h2 className="text-lg md:text-xl font-semibold text-gray-900">Today's Classes</h2>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="space-y-4">
                    {todayClasses.map((classItem) => (
                      <div
                        key={classItem.id}
                        className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1 mb-3 lg:mb-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{classItem.course}</h3>
                            <span className={`
                              px-2 py-1 text-xs rounded-full
                              ${classItem.type === 'Lab' ? 'bg-purple-100 text-purple-700' : 
                                classItem.type === 'Tutorial' ? 'bg-blue-100 text-blue-700' : 
                                'bg-emerald-100 text-emerald-700'}
                            `}>
                              {classItem.type}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {classItem.time}
                            </span>
                            <span className="hidden sm:block">•</span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {classItem.room}
                            </span>
                            <span className="hidden sm:block">•</span>
                            <span>{classItem.professor}</span>
                          </div>
                          {classItem.markedAt && (
                            <p className="text-xs text-green-600 mt-1">
                              Marked at {classItem.markedAt}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`
                            px-3 py-1 text-xs rounded-full border flex items-center gap-1
                            ${getStatusColor(classItem.status)}
                          `}>
                            {getStatusIcon(classItem.status)}
                            {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                          </span>
                          {classItem.status === 'upcoming' && (
                            <button
                              onClick={() => markAttendance(classItem.id)}
                              className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                              Mark Present
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attendance History */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <BookOpen className="text-white" size={20} />
                      </div>
                      <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Attendance</h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          placeholder="Search classes..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 text-gray-600 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="px-3 py-2 bg-white text-gray-600 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="space-y-3">
                    {attendanceHistory.map((record, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1 mb-2 sm:mb-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{record.course}</h4>
                            <span className={`
                              px-2 py-1 text-xs rounded-full
                              ${record.type === 'Lab' ? 'bg-purple-100 text-purple-700' : 
                                record.type === 'Tutorial' ? 'bg-blue-100 text-blue-700' : 
                                'bg-emerald-100 text-emerald-700'}
                            `}>
                              {record.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{formatDate(record.date)}</span>
                            <span>•</span>
                            <span>{record.time}</span>
                            {record.markedAt && (
                              <>
                                <span>•</span>
                                <span className="text-green-600">Marked at {record.markedAt}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <span className={`
                          px-3 py-1 text-xs rounded-full border flex items-center gap-1 w-fit
                          ${getStatusColor(record.status)}
                        `}>
                          {getStatusIcon(record.status)}
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Course-wise Attendance */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <BarChart3 className="text-white" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Course Attendance</h2>
                </div>
                <div className="space-y-4">
                  {courseAttendance.map((course, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{course.course}</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {course.percentage}% ({course.attended}/{course.total})
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${course.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${course.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendance Tips */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <Award className="text-white" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Attendance Tips</h2>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">💡 Maintain 75% minimum</p>
                    <p className="text-xs text-blue-600 mt-1">Required for exam eligibility</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">🎯 Current streak: 12 days</p>
                    <p className="text-xs text-green-600 mt-1">Keep it up for bonus points!</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800 font-medium">⏰ Mark early</p>
                    <p className="text-xs text-orange-600 mt-1">Attendance closes 15 mins after class starts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}