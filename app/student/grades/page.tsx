"use client";
import { useState, useEffect } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
import { 
  Award,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  BookOpen, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  Filter,
  Search,
  BarChart3,
  Target,
  Trophy,
  Star,
  FileText,
  GraduationCap,
  Percent,
  Hash
} from "lucide-react";

interface ExamResult {
  id: string;
  examTitle: string;
  subject: string;
  examDate: string;
  duration: number;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  percentage: number;
  passingMarks: number;
  status: 'pass' | 'fail';
  grade: string;
  rank?: number;
  totalStudents?: number;
  feedback?: string;
  resultsPublished: boolean;
  publishedDate?: string;
}

export default function StudentGrades() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const subjects = [
    { id: "all", name: "All Subjects" },
    { id: "cs", name: "Computer Science" },
    { id: "math", name: "Mathematics" },
    { id: "physics", name: "Physics" },
    { id: "english", name: "English" }
  ];

  const examResults: ExamResult[] = [
    {
      id: "exam-001",
      examTitle: "Data Structures Mid-Term",
      subject: "Computer Science",
      examDate: "2024-01-20",
      duration: 60,
      totalQuestions: 20,
      correctAnswers: 16,
      score: 16,
      percentage: 80,
      passingMarks: 40,
      status: "pass",
      grade: "A",
      rank: 5,
      totalStudents: 45,
      feedback: "Excellent performance! Strong understanding of data structures concepts.",
      resultsPublished: true,
      publishedDate: "2024-01-21"
    },
    {
      id: "exam-002",
      examTitle: "Database Systems Quiz",
      subject: "Computer Science",
      examDate: "2024-01-19",
      duration: 30,
      totalQuestions: 15,
      correctAnswers: 12,
      score: 12,
      percentage: 80,
      passingMarks: 40,
      status: "pass",
      grade: "A",
      rank: 8,
      totalStudents: 38,
      feedback: "Good grasp of database concepts. Focus on normalization techniques.",
      resultsPublished: true,
      publishedDate: "2024-01-19"
    },
    {
      id: "exam-003",
      examTitle: "Web Development Final",
      subject: "Computer Science",
      examDate: "2024-01-18",
      duration: 90,
      totalQuestions: 25,
      correctAnswers: 22,
      score: 22,
      percentage: 88,
      passingMarks: 40,
      status: "pass",
      grade: "A+",
      rank: 2,
      totalStudents: 52,
      feedback: "Outstanding work! Exceptional understanding of web technologies.",
      resultsPublished: true,
      publishedDate: "2024-01-18"
    },
    {
      id: "exam-004",
      examTitle: "Calculus II Test",
      subject: "Mathematics",
      examDate: "2024-01-15",
      duration: 45,
      totalQuestions: 12,
      correctAnswers: 8,
      score: 8,
      percentage: 67,
      passingMarks: 40,
      status: "pass",
      grade: "B+",
      rank: 15,
      totalStudents: 42,
      feedback: "Good performance. Practice more integration techniques.",
      resultsPublished: true,
      publishedDate: "2024-01-16"
    },
    {
      id: "exam-005",
      examTitle: "Physics Mechanics Quiz",
      subject: "Physics",
      examDate: "2024-01-12",
      duration: 40,
      totalQuestions: 18,
      correctAnswers: 6,
      score: 6,
      percentage: 33,
      passingMarks: 40,
      status: "fail",
      grade: "F",
      rank: 35,
      totalStudents: 40,
      feedback: "Need improvement in mechanics concepts. Attend remedial classes.",
      resultsPublished: true,
      publishedDate: "2024-01-13"
    },
    {
      id: "exam-006",
      examTitle: "Algorithm Design Test",
      subject: "Computer Science",
      examDate: "2024-01-10",
      duration: 75,
      totalQuestions: 22,
      correctAnswers: 18,
      score: 18,
      percentage: 82,
      passingMarks: 40,
      status: "pass",
      grade: "A",
      rank: 6,
      totalStudents: 48,
      feedback: "Excellent algorithmic thinking. Keep up the good work!",
      resultsPublished: false
    }
  ];

  const filteredResults = examResults.filter(result => {
    const matchesSubject = selectedSubject === "all" || result.subject.toLowerCase().includes(selectedSubject);
    const matchesStatus = selectedStatus === "all" || result.status === selectedStatus;
    const matchesSearch = result.examTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesStatus && matchesSearch && result.resultsPublished;
  });

  // Calculate statistics
  const totalExams = filteredResults.length;
  const passedExams = filteredResults.filter(r => r.status === 'pass').length;
  const averagePercentage = totalExams > 0 ? 
    filteredResults.reduce((sum, r) => sum + r.percentage, 0) / totalExams : 0;
  const highestScore = totalExams > 0 ? 
    Math.max(...filteredResults.map(r => r.percentage)) : 0;

  const stats = [
    {
      title: "Total Exams",
      value: totalExams.toString(),
      icon: <FileText className="text-blue-500" size={24} />,
      change: "Results published",
      color: "from-blue-500/10 to-blue-600/10 border-blue-200"
    },
    {
      title: "Passed Exams",
      value: passedExams.toString(),
      icon: <CheckCircle className="text-green-500" size={24} />,
      change: `${totalExams > 0 ? Math.round((passedExams/totalExams)*100) : 0}% success rate`,
      color: "from-green-500/10 to-green-600/10 border-green-200"
    },
    {
      title: "Average Score",
      value: `${averagePercentage.toFixed(1)}%`,
      icon: <Target className="text-purple-500" size={24} />,
      change: averagePercentage >= 75 ? "Excellent" : averagePercentage >= 60 ? "Good" : "Needs improvement",
      color: "from-purple-500/10 to-purple-600/10 border-purple-200"
    },
    {
      title: "Highest Score",
      value: `${highestScore}%`,
      icon: <Trophy className="text-yellow-500" size={24} />,
      change: "Personal best",
      color: "from-yellow-500/10 to-yellow-600/10 border-yellow-200"
    }
  ];

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A+': return 'text-green-700 bg-green-100';
      case 'A': return 'text-green-600 bg-green-50';
      case 'B+': return 'text-blue-600 bg-blue-50';
      case 'B': return 'text-blue-500 bg-blue-50';
      case 'C+': return 'text-yellow-600 bg-yellow-50';
      case 'C': return 'text-yellow-500 bg-yellow-50';
      case 'D': return 'text-orange-500 bg-orange-50';
      case 'F': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pass': return 'text-green-600 bg-green-50 border-green-200';
      case 'fail': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pass': return <CheckCircle size={14} className="text-green-600" />;
      case 'fail': return <XCircle size={14} className="text-red-600" />;
      default: return <AlertCircle size={14} className="text-gray-600" />;
    }
  };

  const openDetailModal = (result: ExamResult) => {
    setSelectedResult(result);
    setShowDetailModal(true);
  };

  const downloadResult = (result: ExamResult) => {
    console.log(`Downloading result for: ${result.examTitle}`);
    // Implement download functionality
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />
      
      <div className={`flex-1 ${isMobile ? '' : 'ml-64'} transition-all duration-300`}>
        <StudentHeader />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Exam Grades & Results
                </h1>
                <p className="text-gray-600">Track your academic performance and exam results.</p>
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
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-700 mb-1">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search exams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-gray-700 pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 text-gray-600 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-gray-600 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Results</option>
                <option value="pass">Passed</option>
                <option value="fail">Failed</option>
              </select>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <GraduationCap className="text-white" size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Exam Results ({filteredResults.length})
                </h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              {filteredResults.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Exam Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredResults.map((result) => (
                      <tr key={result.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{result.examTitle}</div>
                            <div className="text-sm text-gray-500">{result.subject}</div>
                            <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                              <Calendar size={12} />
                              {new Date(result.examDate).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">
                              {result.correctAnswers}/{result.totalQuestions}
                            </div>
                            <div className="text-gray-500">{result.percentage}%</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`
                            inline-flex px-2 py-1 text-xs font-semibold rounded-full
                            ${getGradeColor(result.grade)}
                          `}>
                            {result.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`
                            inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border
                            ${getStatusColor(result.status)}
                          `}>
                            {getStatusIcon(result.status)}
                            {result.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">
                              #{result.rank}
                            </div>
                            <div className="text-gray-500 text-xs">
                              of {result.totalStudents}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openDetailModal(result)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => downloadResult(result)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                              title="Download"
                            >
                              <Download size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500">
                    {searchTerm || selectedSubject !== "all" || selectedStatus !== "all" 
                      ? "Try adjusting your search or filter criteria." 
                      : "Your exam results will appear here once published."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Exam Result Details</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Exam Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{selectedResult.examTitle}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Subject:</span>
                      <span className="ml-2 text-gray-600 font-medium">{selectedResult.subject}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <span className="ml-2 text-gray-600 font-medium">{new Date(selectedResult.examDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="ml-2 text-gray-600 font-medium">{selectedResult.duration} minutes</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Questions:</span>
                      <span className="ml-2 text-gray-600 font-medium">{selectedResult.totalQuestions}</span>
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Performance Summary</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {selectedResult.correctAnswers}/{selectedResult.totalQuestions}
                      </div>
                      <div className="text-sm text-gray-600">Correct Answers</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {selectedResult.percentage}%
                      </div>
                      <div className="text-sm text-gray-600">Percentage</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className={`text-2xl font-bold mb-1 ${getGradeColor(selectedResult.grade).split(' ')[0]}`}>
                        {selectedResult.grade}
                      </div>
                      <div className="text-sm text-gray-600">Grade</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        #{selectedResult.rank}
                      </div>
                      <div className="text-sm text-gray-600">Class Rank</div>
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                {selectedResult.feedback && (
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-md font-medium text-gray-900 mb-2">Instructor Feedback</h4>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-blue-800">{selectedResult.feedback}</p>
                    </div>
                  </div>
                )}

                {/* Publication Info */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Results published on:</span>
                    <span className="font-medium">
                      {selectedResult.publishedDate ? new Date(selectedResult.publishedDate).toLocaleDateString() : 'Not published'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => downloadResult(selectedResult)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Download size={16} />
                Download Result
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-red-200 border border-red-800  text-gray-900 hover:text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}