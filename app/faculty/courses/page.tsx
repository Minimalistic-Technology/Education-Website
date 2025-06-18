"use client";
import React, { useState } from 'react';
import FacultySidebar from "@/app/components/facultySidebar";
import FacultyHeader from "@/app/components/facultyHeader";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Users, 
  TrendingUp, 
  FileText, 
  ChevronRight,
  Play,
  CheckCircle,
  Plus,
  Edit3,
  Eye,
  BarChart3,
  Target,
  Award
} from 'lucide-react';

const Courses = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const courses = [
    {
      id: 1,
      title: 'Advanced Data Structures',
      code: 'CS-401',
      students: 45,
      progress: 68,
      status: 'active',
      nextClass: 'Today 2:00 PM',
      currentTopic: 'Binary Search Trees',
      totalTopics: 24,
      completedTopics: 16,
      semester: 'Fall 2024',
      credits: 3
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      code: 'CS-501',
      students: 38,
      progress: 45,
      status: 'active',
      nextClass: 'Tomorrow 10:00 AM',
      currentTopic: 'Neural Networks',
      totalTopics: 20,
      completedTopics: 9,
      semester: 'Fall 2024',
      credits: 4
    },
    {
      id: 3,
      title: 'Database Systems',
      code: 'CS-301',
      students: 52,
      progress: 82,
      status: 'active',
      nextClass: 'Friday 11:00 AM',
      currentTopic: 'Query Optimization',
      totalTopics: 18,
      completedTopics: 15,
      semester: 'Fall 2024',
      credits: 3
    }
  ];

  const upcomingLessons = [
    {
      id: 1,
      courseCode: 'CS-401',
      title: 'AVL Trees and Rotations',
      date: '2025-01-17',
      time: '2:00 PM',
      duration: '90 min',
      preparationStatus: 'ready',
      room: 'Lab 204'
    },
    {
      id: 2,
      courseCode: 'CS-501',
      title: 'Backpropagation Algorithm',
      date: '2025-01-18',
      time: '10:00 AM',
      duration: '120 min',
      preparationStatus: 'preparing',
      room: 'Room 301'
    },
    {
      id: 3,
      courseCode: 'CS-301',
      title: 'Index Structures',
      date: '2025-01-19',
      time: '11:00 AM',
      duration: '90 min',
      preparationStatus: 'pending',
      room: 'Room 205'
    }
  ];

  const syllabusData = [
    {
      week: 1,
      topics: ['Introduction to Advanced Data Structures', 'Complexity Analysis Review'],
      status: 'completed',
      date: '2024-08-26',
      assignments: ['Assignment 1: Complexity Analysis']
    },
    {
      week: 2,
      topics: ['Trees: Binary Trees, BST Properties', 'Tree Traversals'],
      status: 'completed',
      date: '2024-09-02',
      assignments: ['Lab 1: Tree Implementation']
    },
    {
      week: 3,
      topics: ['Binary Search Trees', 'BST Operations'],
      status: 'current',
      date: '2025-01-15',
      assignments: ['Assignment 2: BST Operations', 'Quiz 1']
    },
    {
      week: 4,
      topics: ['AVL Trees', 'Tree Rotations'],
      status: 'upcoming',
      date: '2025-01-22',
      assignments: ['Lab 2: AVL Implementation']
    },
    {
      week: 5,
      topics: ['Red-Black Trees', 'B-Trees'],
      status: 'upcoming',
      date: '2025-01-29',
      assignments: ['Assignment 3: Tree Comparison']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'current': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'upcoming': return 'bg-slate-50 text-slate-700 border-slate-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getPreparationColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'preparing': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'pending': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const avgProgress = Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20 pl-64">
      <div className="p-8 space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Active Courses</p>
                <p className="text-3xl font-bold text-slate-900">{courses.length}</p>
                <p className="text-xs text-emerald-600 mt-2 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  All running smoothly
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-slate-900">{totalStudents}</p>
                <p className="text-xs text-emerald-600 mt-2 flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Across all courses
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Avg Progress</p>
                <p className="text-3xl font-bold text-slate-900">{avgProgress}%</p>
                <p className="text-xs text-emerald-600 mt-2 flex items-center">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  On track
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Next Class</p>
                <p className="text-lg font-bold text-slate-900">Today</p>
                <p className="text-xs text-blue-600 mt-2 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  CS-401 at 2:00 PM
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-slate-200 bg-slate-50/50">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'overview', label: 'Course Overview', icon: BookOpen },
                { id: 'syllabus', label: 'Syllabus Tracker', icon: FileText },
                { id: 'upcoming', label: 'Upcoming Lessons', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">My Courses</h3>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2 shadow-sm">
                    <Plus className="w-4 h-4" />
                    <span>Add Course</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-slate-50/30">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h4 className="text-xl font-semibold text-slate-900">{course.title}</h4>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                              {course.code}
                            </span>
                            <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-full border border-slate-200">
                              {course.credits} Credits
                            </span>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-slate-600">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>{course.students} students</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>Next: {course.nextClass}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{course.semester}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 font-medium">Course Progress</span>
                            <span className="font-semibold text-slate-900">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-slate-600">Current Topic</p>
                          <p className="font-semibold text-slate-900">{course.currentTopic}</p>
                          <div className="flex items-center space-x-2 text-sm text-slate-500">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span>{course.completedTopics} of {course.totalTopics} topics completed</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-end">
                          <button className="bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 px-6 py-3 rounded-xl hover:from-emerald-100 hover:to-emerald-200 transition-all duration-200 flex items-center space-x-2 border border-emerald-200">
                            <Play className="w-4 h-4" />
                            <span>Start Class</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'syllabus' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">Syllabus Progress</h3>
                  <select className="border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                    <option>Advanced Data Structures</option>
                    <option>Machine Learning Fundamentals</option>
                    <option>Database Systems</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {syllabusData.map((item) => (
                    <div key={item.week} className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-xl text-sm font-semibold border border-blue-200">
                            {item.week}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">Week {item.week}</h4>
                            <p className="text-sm text-slate-500">{item.date}</p>
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="ml-14 space-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-slate-700 mb-2">Topics</h5>
                          <ul className="space-y-2">
                            {item.topics.map((topic, index) => (
                              <li key={index} className="flex items-center space-x-3 text-sm text-slate-600">
                                {item.status === 'completed' ? (
                                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                                ) : item.status === 'current' ? (
                                  <Play className="w-4 h-4 text-blue-500" />
                                ) : (
                                  <Clock className="w-4 h-4 text-slate-400" />
                                )}
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-slate-700 mb-2">Assignments & Assessments</h5>
                          <ul className="space-y-1">
                            {item.assignments.map((assignment, index) => (
                              <li key={index} className="flex items-center space-x-3 text-sm text-slate-600">
                                <Award className="w-4 h-4 text-amber-500" />
                                <span>{assignment}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'upcoming' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">Upcoming Lessons</h3>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2 shadow-sm">
                    <Plus className="w-4 h-4" />
                    <span>Schedule Lesson</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {upcomingLessons.map((lesson) => (
                    <div key={lesson.id} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-slate-50/30">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h4 className="text-lg font-semibold text-slate-900">{lesson.title}</h4>
                            <span className="bg-slate-100 text-slate-800 text-xs font-medium px-3 py-1 rounded-full border border-slate-200">
                              {lesson.courseCode}
                            </span>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-slate-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{lesson.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.time} ({lesson.duration})</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <BookOpen className="w-4 h-4" />
                              <span>{lesson.room}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-4 py-2 rounded-full text-xs font-medium border ${getPreparationColor(lesson.preparationStatus)}`}>
                            {lesson.preparationStatus.charAt(0).toUpperCase() + lesson.preparationStatus.slice(1)}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;