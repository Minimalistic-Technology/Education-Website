"use client";
import { useState, useEffect } from "react";
import StudentSidebar from "../components/StudentSidebar";
import StudentHeader from "../components/StudentHeader";
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  GraduationCap, 
  Calendar,
  Award,
  BarChart3,
  Activity,
  CheckCircle,
  AlertCircle,
  Timer,
  Users,
  FileText,
  UserCheck
} from "lucide-react";

export default function StudentDashboard() {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      title: "Enrolled Courses",
      value: "6",
      icon: <BookOpen className="text-emerald-500" size={24} />,
      change: "Current semester",
      trend: "neutral",
      color: "from-emerald-500/10 to-emerald-600/10 border-emerald-200"
    },
    {
      title: "Upcoming Classes",
      value: "4",
      icon: <Clock className="text-blue-500" size={24} />,
      change: "Today",
      trend: "neutral",
      color: "from-blue-500/10 to-blue-600/10 border-blue-200"
    },
    {
      title: "Current GPA",
      value: "3.8",
      icon: <TrendingUp className="text-green-500" size={24} />,
      change: "+0.2 from last semester",
      trend: "up",
      color: "from-green-500/10 to-green-600/10 border-green-200"
    },
    {
      title: "Assignments Due",
      value: "3",
      icon: <GraduationCap className="text-orange-500" size={24} />,
      change: "This week",
      trend: "neutral",
      color: "from-orange-500/10 to-orange-600/10 border-orange-200"
    }
  ];

  const quickActions = [
    {
      title: "View Lectures",
      description: "Access recorded lectures and materials",
      icon: <BookOpen className="text-purple-500" size={20} />,
      href: "/student/lectures",
      color: "from-purple-500/10 to-purple-600/10 border-purple-200"
    },
    {
      title: "Check Attendance",
      description: "View your attendance records",
      icon: <UserCheck className="text-teal-500" size={20} />,
      href: "/student/attendance",
      color: "from-teal-500/10 to-teal-600/10 border-teal-200"
    },
    {
      title: "Documents",
      description: "Access course materials and files",
      icon: <FileText className="text-indigo-500" size={20} />,
      href: "/student/documents",
      color: "from-indigo-500/10 to-indigo-600/10 border-indigo-200"
    },
    {
      title: "Progress Report",
      description: "View detailed academic progress",
      icon: <BarChart3 className="text-rose-500" size={20} />,
      href: "/student/progress",
      color: "from-rose-500/10 to-rose-600/10 border-rose-200"
    }
  ];

  const upcomingClasses = [
    {
      course: "Data Structures",
      time: "9:00 AM",
      room: "Room 301",
      professor: "Dr. Smith",
      type: "Lecture"
    },
    {
      course: "Calculus II",
      time: "11:00 AM", 
      room: "Room 205",
      professor: "Dr. Johnson",
      type: "Tutorial"
    },
    {
      course: "Web Development",
      time: "2:00 PM",
      room: "Lab 101",
      professor: "Prof. Davis",
      type: "Lab"
    },
    {
      course: "Database Systems",
      time: "4:00 PM",
      room: "Room 401",
      professor: "Dr. Wilson",
      type: "Lecture"
    }
  ];

  const assignments = [
    {
      title: "Algorithm Analysis Report",
      course: "Data Structures",
      dueDate: "Tomorrow",
      status: "in-progress",
      priority: "high"
    },
    {
      title: "Calculus Problem Set 5",
      course: "Calculus II",
      dueDate: "Oct 25",
      status: "not-started",
      priority: "medium"
    },
    {
      title: "React Portfolio Project",
      course: "Web Development",
      dueDate: "Oct 28",
      status: "completed",
      priority: "high"
    }
  ];

  const recentActivities = [
    {
      action: "Submitted Assignment",
      course: "Web Development",
      time: "2 hours ago",
      icon: <CheckCircle className="text-green-500" size={16} />
    },
    {
      action: "Received Grade",
      course: "Data Structures", 
      time: "5 hours ago",
      icon: <Award className="text-yellow-500" size={16} />
    },
    {
      action: "New Assignment Posted",
      course: "Database Systems",
      time: "1 day ago",
      icon: <BookOpen className="text-blue-500" size={16} />
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-yellow-600 bg-yellow-50';
      case 'not-started': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle size={14} className="text-green-600" />;
      case 'in-progress': return <Timer size={14} className="text-yellow-600" />;
      case 'not-started': return <AlertCircle size={14} className="text-red-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <StudentHeader isCollapsed={isCollapsed} />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, Alex! 👋
            </h1>
            <p className="text-gray-600">Ready to tackle your studies today? Here's your overview.</p>
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

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, idx) => (
                <a
                  key={idx}
                  href={action.href}
                  className={`
                    bg-gradient-to-br ${action.color} backdrop-blur-sm
                    p-4 rounded-xl shadow-sm hover:shadow-md 
                    transition-all duration-300 hover:scale-105 border
                    block group cursor-pointer
                  `}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
            {/* Today's Schedule */}
            <div className="xl:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500 rounded-lg">
                      <Calendar className="text-white" size={20} />
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">Today's Classes</h2>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="space-y-4">
                    {upcomingClasses.map((classItem, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1 mb-2 sm:mb-0">
                          <div className="flex items-center gap-2 mb-1">
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
                            <span>{classItem.room}</span>
                            <span className="hidden sm:block">•</span>
                            <span>{classItem.professor}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assignments */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <GraduationCap className="text-white" size={20} />
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Assignments</h2>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="space-y-4">
                    {assignments.map((assignment, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                          <p className="text-sm text-gray-600">{assignment.course}</p>
                          <p className="text-xs text-gray-500 mt-1">Due: {assignment.dueDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`
                            px-2 py-1 text-xs rounded-full flex items-center gap-1
                            ${getStatusColor(assignment.status)}
                          `}>
                            {getStatusIcon(assignment.status)}
                            {assignment.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Academic Progress */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <BarChart3 className="text-white" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Academic Progress</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Semester Progress</span>
                    <span className="font-semibold">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-600">Assignments Completed</span>
                    <span className="font-semibold">18/24</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-600">Attendance Rate</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500 rounded-lg">
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

// 'use client';
// import { useState, useEffect } from "react";
// import StudentSidebar from "../components/StudentSidebar";
// import StudentHeader from "../components/StudentHeader";
// import { 
//   BookOpen, 
//   Clock, 
//   TrendingUp, 
//   GraduationCap, 
//   Calendar,
//   Award,
//   BarChart3,
//   Activity,
//   CheckCircle,
//   AlertCircle,
//   Timer,
//   FileText,
//   UserCheck
// } from "lucide-react";

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Auto-close sidebar on window resize if it gets too small
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 1024 && sidebarOpen) {
//         // Keep sidebar behavior consistent - don't auto-close
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [sidebarOpen]);

//   const stats = [
//     {
//       title: "Enrolled Courses",
//       value: "6",
//       icon: <BookOpen className="text-emerald-500" size={24} />,
//       change: "Current semester",
//       trend: "neutral",
//       color: "from-emerald-500/10 to-emerald-600/10 border-emerald-200"
//     },
//     {
//       title: "Upcoming Classes",
//       value: "4",
//       icon: <Clock className="text-blue-500" size={24} />,
//       change: "Today",
//       trend: "neutral",
//       color: "from-blue-500/10 to-blue-600/10 border-blue-200"
//     },
//     {
//       title: "Current GPA",
//       value: "3.8",
//       icon: <TrendingUp className="text-green-500" size={24} />,
//       change: "+0.2 from last semester",
//       trend: "up",
//       color: "from-green-500/10 to-green-600/10 border-green-200"
//     },
//     {
//       title: "Assignments Due",
//       value: "3",
//       icon: <GraduationCap className="text-orange-500" size={24} />,
//       change: "This week",
//       trend: "neutral",
//       color: "from-orange-500/10 to-orange-600/10 border-orange-200"
//     }
//   ];

//   const quickActions = [
//     {
//       title: "View Lectures",
//       description: "Access recorded lectures and materials",
//       icon: <BookOpen className="text-purple-500" size={20} />,
//       href: "/student/lectures",
//       color: "from-purple-500/10 to-purple-600/10 border-purple-200"
//     },
//     {
//       title: "Check Attendance",
//       description: "View your attendance records",
//       icon: <UserCheck className="text-teal-500" size={20} />,
//       href: "/student/attendance",
//       color: "from-teal-500/10 to-teal-600/10 border-teal-200"
//     },
//     {
//       title: "Documents",
//       description: "Access course materials and files",
//       icon: <FileText className="text-indigo-500" size={20} />,
//       href: "/student/documents",
//       color: "from-indigo-500/10 to-indigo-600/10 border-indigo-200"
//     },
//     {
//       title: "Progress Report",
//       description: "View detailed academic progress",
//       icon: <BarChart3 className="text-rose-500" size={20} />,
//       href: "/student/progress",
//       color: "from-rose-500/10 to-rose-600/10 border-rose-200"
//     }
//   ];

//   const upcomingClasses = [
//     {
//       course: "Data Structures",
//       time: "9:00 AM",
//       room: "Room 301",
//       professor: "Dr. Smith",
//       type: "Lecture"
//     },
//     {
//       course: "Calculus II",
//       time: "11:00 AM", 
//       room: "Room 205",
//       professor: "Dr. Johnson",
//       type: "Tutorial"
//     },
//     {
//       course: "Web Development",
//       time: "2:00 PM",
//       room: "Lab 101",
//       professor: "Prof. Davis",
//       type: "Lab"
//     },
//     {
//       course: "Database Systems",
//       time: "4:00 PM",
//       room: "Room 401",
//       professor: "Dr. Wilson",
//       type: "Lecture"
//     }
//   ];

//   const assignments = [
//     {
//       title: "Algorithm Analysis Report",
//       course: "Data Structures",
//       dueDate: "Tomorrow",
//       status: "in-progress",
//       priority: "high"
//     },
//     {
//       title: "Calculus Problem Set 5",
//       course: "Calculus II",
//       dueDate: "Oct 25",
//       status: "not-started",
//       priority: "medium"
//     },
//     {
//       title: "React Portfolio Project",
//       course: "Web Development",
//       dueDate: "Oct 28",
//       status: "completed",
//       priority: "high"
//     }
//   ];

//   const recentActivities = [
//     {
//       action: "Submitted Assignment",
//       course: "Web Development",
//       time: "2 hours ago",
//       icon: <CheckCircle className="text-green-500" size={16} />
//     },
//     {
//       action: "Received Grade",
//       course: "Data Structures", 
//       time: "5 hours ago",
//       icon: <Award className="text-yellow-500" size={16} />
//     },
//     {
//       action: "New Assignment Posted",
//       course: "Database Systems",
//       time: "1 day ago",
//       icon: <BookOpen className="text-blue-500" size={16} />
//     }
//   ];

//   const getStatusColor = (status: string) => {
//     switch(status) {
//       case 'completed': return 'text-green-600 bg-green-50';
//       case 'in-progress': return 'text-yellow-600 bg-yellow-50';
//       case 'not-started': return 'text-red-600 bg-red-50';
//       default: return 'text-gray-600 bg-gray-50';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch(status) {
//       case 'completed': return <CheckCircle size={14} className="text-green-600" />;
//       case 'in-progress': return <Timer size={14} className="text-yellow-600" />;
//       case 'not-started': return <AlertCircle size={14} className="text-red-600" />;
//       default: return <Clock size={14} className="text-gray-600" />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
//       {/* Main Content - No margin adjustments, sidebar slides over */}
//       <div className=" ml-64 flex-1 w-full">
//         <StudentHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
//         <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
//           {/* Welcome Section */}
//           <div className="mb-8">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//               Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, Alex! 👋
//             </h1>
//             <p className="text-gray-600">Ready to tackle your studies today? Here's your overview.</p>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//             {stats.map((stat, idx) => (
//               <div
//                 key={idx}
//                 className={`
//                   bg-gradient-to-br ${stat.color} backdrop-blur-sm
//                   p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md 
//                   transition-all duration-300 hover:scale-105 border
//                 `}
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="p-2 bg-white rounded-lg shadow-sm">
//                     {stat.icon}
//                   </div>
//                   {stat.trend === 'up' && (
//                     <div className="flex items-center gap-1 text-green-600 text-xs">
//                       <TrendingUp size={12} />
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
//                   <p className="text-sm font-medium text-gray-700 mb-1">{stat.title}</p>
//                   <p className="text-xs text-gray-500">{stat.change}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Quick Actions */}
//           <div className="mb-8">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               {quickActions.map((action, idx) => (
//                 <button
//                   key={idx}
//                   className={`
//                     bg-gradient-to-br ${action.color} backdrop-blur-sm
//                     p-4 rounded-xl shadow-sm hover:shadow-md 
//                     transition-all duration-300 hover:scale-105 border
//                     block group cursor-pointer w-full text-left
//                   `}
//                 >
//                   <div className="flex items-center gap-3 mb-2">
//                     <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
//                       {action.icon}
//                     </div>
//                     <h3 className="font-semibold text-gray-900">{action.title}</h3>
//                   </div>
//                   <p className="text-sm text-gray-600">{action.description}</p>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
//             {/* Today's Schedule */}
//             <div className="xl:col-span-2 space-y-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                 <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-emerald-500 rounded-lg">
//                       <Calendar className="text-white" size={20} />
//                     </div>
//                     <h2 className="text-lg md:text-xl font-semibold text-gray-900">Today's Classes</h2>
//                   </div>
//                 </div>
//                 <div className="p-4 md:p-6">
//                   <div className="space-y-4">
//                     {upcomingClasses.map((classItem, idx) => (
//                       <div
//                         key={idx}
//                         className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                       >
//                         <div className="flex-1 mb-2 sm:mb-0">
//                           <div className="flex items-center gap-2 mb-1">
//                             <h3 className="font-semibold text-gray-900">{classItem.course}</h3>
//                             <span className={`
//                               px-2 py-1 text-xs rounded-full
//                               ${classItem.type === 'Lab' ? 'bg-purple-100 text-purple-700' : 
//                                 classItem.type === 'Tutorial' ? 'bg-blue-100 text-blue-700' : 
//                                 'bg-emerald-100 text-emerald-700'}
//                             `}>
//                               {classItem.type}
//                             </span>
//                           </div>
//                           <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
//                             <span className="flex items-center gap-1">
//                               <Clock size={14} />
//                               {classItem.time}
//                             </span>
//                             <span className="hidden sm:block">•</span>
//                             <span>{classItem.room}</span>
//                             <span className="hidden sm:block">•</span>
//                             <span>{classItem.professor}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Assignments */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                 <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-orange-500 rounded-lg">
//                       <GraduationCap className="text-white" size={20} />
//                     </div>
//                     <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Assignments</h2>
//                   </div>
//                 </div>
//                 <div className="p-4 md:p-6">
//                   <div className="space-y-4">
//                     {assignments.map((assignment, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                       >
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-gray-900 mb-1">{assignment.title}</h3>
//                           <p className="text-sm text-gray-600">{assignment.course}</p>
//                           <p className="text-xs text-gray-500 mt-1">Due: {assignment.dueDate}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className={`
//                             px-2 py-1 text-xs rounded-full flex items-center gap-1
//                             ${getStatusColor(assignment.status)}
//                           `}>
//                             {getStatusIcon(assignment.status)}
//                             {assignment.status.replace('-', ' ')}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar Content */}
//             <div className="space-y-6">
//               {/* Academic Progress */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-blue-500 rounded-lg">
//                     <BarChart3 className="text-white" size={20} />
//                   </div>
//                   <h2 className="text-lg font-semibold text-gray-900">Academic Progress</h2>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-600">Semester Progress</span>
//                     <span className="font-semibold">75%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
//                   </div>
//                   <div className="flex justify-between items-center pt-2">
//                     <span className="text-sm text-gray-600">Assignments Completed</span>
//                     <span className="font-semibold">18/24</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div className="bg-emerald-500 h-2 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
//                   </div>
//                   <div className="flex justify-between items-center pt-2">
//                     <span className="text-sm text-gray-600">Attendance Rate</span>
//                     <span className="font-semibold">92%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: '92%' }}></div>
//                   </div>
//                 </div>
//               </div>

//               {/* Recent Activity */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-purple-500 rounded-lg">
//                     <Activity className="text-white" size={20} />
//                   </div>
//                   <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
//                 </div>
//                 <div className="space-y-4">
//                   {recentActivities.map((activity, idx) => (
//                     <div key={idx} className="flex items-start gap-3">
//                       <div className="p-1 bg-gray-100 rounded-full">
//                         {activity.icon}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-900">{activity.action}</p>
//                         <p className="text-xs text-gray-500">{activity.course}</p>
//                         <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;