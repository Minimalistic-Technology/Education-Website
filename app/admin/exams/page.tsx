"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import { 
  Users,
  BookOpen,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Eye,
  EyeOff,
  Settings,
  FileText,
  BarChart3,
  Timer,
  UserCheck,
  GraduationCap,
  Monitor,
  Bell,
  RefreshCw
} from "lucide-react";

interface ExamControl {
  id: string;
  title: string;
  subject: string;
  duration: number;
  totalQuestions: number;
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'active' | 'completed' | 'paused';
  studentsEnrolled: number;
  studentsCompleted: number;
  resultsVisible: boolean;
  autoShowResults: boolean;
  resultVisibilityTime?: string;
  passingMarks: number;
}

export default function ManageExam() {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamControl | null>(null);
  const [showExamModal, setShowExamModal] = useState(false);

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
      title: "Active Students",
      value: "156",
      icon: <Users className="text-blue-500" size={24} />,
      change: "+12 this week",
      trend: "up",
      color: "from-blue-500/10 to-blue-600/10 border-blue-200"
    },
    {
      title: "Active Exams",
      value: "3",
      icon: <FileText className="text-green-500" size={24} />,
      change: "2 scheduled today",
      trend: "neutral",
      color: "from-green-500/10 to-green-600/10 border-green-200"
    },
    {
      title: "Avg. Performance",
      value: "78%",
      icon: <TrendingUp className="text-purple-500" size={24} />,
      change: "+5% from last month",
      trend: "up",
      color: "from-purple-500/10 to-purple-600/10 border-purple-200"
    },
    {
      title: "Pending Reviews",
      value: "24",
      icon: <Clock className="text-orange-500" size={24} />,
      change: "Results to publish",
      trend: "neutral",
      color: "from-orange-500/10 to-orange-600/10 border-orange-200"
    }
  ];

  const examControls: ExamControl[] = [
    {
      id: "exam-001",
      title: "Data Structures Mid-Term",
      subject: "Computer Science",
      duration: 60,
      totalQuestions: 20,
      scheduledDate: "2024-01-20",
      scheduledTime: "10:00 AM",
      status: "scheduled",
      studentsEnrolled: 45,
      studentsCompleted: 0,
      resultsVisible: false,
      autoShowResults: false,
      passingMarks: 40
    },
    {
      id: "exam-002",
      title: "Database Systems Quiz",
      subject: "Computer Science",
      duration: 30,
      totalQuestions: 15,
      scheduledDate: "2024-01-19",
      scheduledTime: "2:00 PM",
      status: "active",
      studentsEnrolled: 38,
      studentsCompleted: 12,
      resultsVisible: false,
      autoShowResults: true,
      passingMarks: 40
    },
    {
      id: "exam-003",
      title: "Web Development Final",
      subject: "Computer Science",
      duration: 90,
      totalQuestions: 25,
      scheduledDate: "2024-01-18",
      scheduledTime: "9:00 AM",
      status: "completed",
      studentsEnrolled: 52,
      studentsCompleted: 52,
      resultsVisible: true,
      autoShowResults: false,
      resultVisibilityTime: "2024-01-18 12:00 PM",
      passingMarks: 40
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'scheduled': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'completed': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'paused': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'scheduled': return <Clock size={14} className="text-blue-600" />;
      case 'active': return <Play size={14} className="text-green-600" />;
      case 'completed': return <CheckCircle size={14} className="text-gray-600" />;
      case 'paused': return <Pause size={14} className="text-orange-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  const startExam = (examId: string) => {
    console.log(`Starting exam: ${examId}`);
    // Update exam status to active
    // This would typically make an API call
  };

  const pauseExam = (examId: string) => {
    console.log(`Pausing exam: ${examId}`);
    // Update exam status to paused
  };

  const toggleResultsVisibility = (examId: string) => {
    console.log(`Toggling results visibility for exam: ${examId}`);
    // Update results visibility
  };

  const openExamSettings = (exam: ExamControl) => {
    setSelectedExam(exam);
    setShowExamModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <AdminHeader isCollapsed={isCollapsed} />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
               Exam
            </h1>
            <p className="text-gray-600">Manage exams, monitor student progress, and control assessment settings.</p>
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

          {/* Exam Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <Monitor className="text-white" size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Exam Control Center</h2>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {examControls.map((exam) => (
                  <div
                    key={exam.id}
                    className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1 mb-3 lg:mb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                        <span className={`
                          px-3 py-1 text-xs rounded-full border flex items-center gap-1
                          ${getStatusColor(exam.status)}
                        `}>
                          {getStatusIcon(exam.status)}
                          {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exam.scheduledDate} at {exam.scheduledTime}
                        </span>
                        <span className="hidden sm:block">•</span>
                        <span className="flex items-center gap-1">
                          <Timer size={14} />
                          {exam.duration} minutes
                        </span>
                        <span className="hidden sm:block">•</span>
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {exam.studentsCompleted}/{exam.studentsEnrolled} completed
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Results:</span>
                          <span className={`
                            px-2 py-1 text-xs rounded-full flex items-center gap-1
                            ${exam.resultsVisible 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                            }
                          `}>
                            {exam.resultsVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                            {exam.resultsVisible ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Auto-show:</span>
                          <span className={`
                            px-2 py-1 text-xs rounded-full
                            ${exam.autoShowResults 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-gray-100 text-gray-700'
                            }
                          `}>
                            {exam.autoShowResults ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {exam.status === 'scheduled' && (
                        <button
                          onClick={() => startExam(exam.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Play size={16} />
                          Start Exam
                        </button>
                      )}
                      {exam.status === 'active' && (
                        <button
                          onClick={() => pauseExam(exam.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          <Pause size={16} />
                          Pause
                        </button>
                      )}
                      <button
                        onClick={() => toggleResultsVisibility(exam.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          exam.resultsVisible
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {exam.resultsVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                        {exam.resultsVisible ? 'Hide Results' : 'Show Results'}
                      </button>
                      <button
                        onClick={() => openExamSettings(exam)}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Settings size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <BarChart3 className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
              </div>
              <p className="text-gray-600 mb-4">View detailed student performance reports and analytics.</p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Analytics
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <UserCheck className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Student Management</h3>
              </div>
              <p className="text-gray-600 mb-4">Manage student enrollments and track attendance.</p>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Manage Students
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500 rounded-lg">
                  <GraduationCap className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Grade Management</h3>
              </div>
              <p className="text-gray-600 mb-4">Review and publish exam grades and feedback.</p>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Manage Grades
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Exam Settings Modal */}
      {showExamModal && selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Exam Settings</h2>
                <button
                  onClick={() => setShowExamModal(false)}
                  className="p-2 text-gray-600 text-2xl hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{selectedExam.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Subject:</span>
                      <span className="ml-2 text-gray-600 font-medium">{selectedExam.subject}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="ml-2 text-gray-600 font-medium">{selectedExam.duration} minutes</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Questions:</span>
                      <span className="ml-2 text-gray-600 font-medium">{selectedExam.totalQuestions}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Passing Marks:</span>
                      <span className="ml-2 text-gray-600 font-medium">{selectedExam.passingMarks}%</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Result Visibility Settings</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900">Auto-show Results</h5>
                        <p className="text-sm text-gray-600">Show results immediately after submission</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedExam.autoShowResults}
                          className="sr-only peer"
                          onChange={() => {}}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900">Results Currently Visible</h5>
                        <p className="text-sm text-gray-600">Students can see their exam results</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedExam.resultsVisible}
                          className="sr-only peer"
                          onChange={() => {}}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Schedule Result Visibility</h5>
                      <p className="text-sm text-gray-600 mb-3">Set a specific time to show results</p>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="date"
                          className="px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          type="time"
                          className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowExamModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}