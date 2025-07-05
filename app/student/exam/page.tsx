"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
import { 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Shield,
  BookOpen,
  Calendar,
  User,
  Timer,
  FileText,
  Award,
  Lock,
  Unlock,
  Monitor,
  AlertCircle,
  Play,
  Square,
  RotateCcw,
  PartyPopper,
  Trophy,
  Star,
  Flag,
  FlagOff,
  Hourglass
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer?: number;
  type: 'multiple-choice' | 'true-false';
}

interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  totalQuestions: number;
  passingMarks: number;
  instructions: string[];
  questions: Question[];
  startTime?: Date;
  endTime?: Date;
  status: 'upcoming' | 'active' | 'completed' | 'missed' | 'waiting';
  scheduledDate: string;
  scheduledTime: string;
  adminControlled: boolean;
  resultsVisible: boolean;
  autoShowResults: boolean;
}

export default function StudentExam() {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [reviewMarked, setReviewMarked] = useState<{[key: number]: boolean}>({});
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [examResults, setExamResults] = useState<{score: number, percentage: number, passed: boolean} | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [examTerminated, setExamTerminated] = useState(false);
  const [terminationReason, setTerminationReason] = useState<'tab_violations' | 'time_up' | 'manual' | null>(null);
  const [showResultsWaiting, setShowResultsWaiting] = useState(false);
  
  const examContainerRef = useRef<HTMLDivElement>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Dummy exam data
  const dummyExam: Exam = {
    id: "exam-001",
    title: "Data Structures Mid-Term Examination",
    subject: "Computer Science",
    duration: 30, // 30 minutes
    totalQuestions: 10,
    passingMarks: 40, // 40% passing marks
    scheduledDate: "2024-01-20",
    scheduledTime: "10:00 AM",
    status: "waiting", // Changed to waiting for admin control
    adminControlled: true,
    resultsVisible: false,
    autoShowResults: false,
    instructions: [
      "Read all questions carefully before answering",
      "Each question carries equal marks",
      "There is no negative marking",
      "You can mark questions for review using the flag button",
      "You cannot switch tabs or minimize the browser during the exam",
      "After 3 tab switches, the exam will be automatically submitted",
      "The exam will auto-submit when time expires",
      "Ensure stable internet connection throughout the exam",
      "Click 'Start Exam' to begin the timer",
      "You can review and change answers before final submission"
    ],
    questions: [
      {
        id: 1,
        question: "What is the time complexity of inserting an element at the beginning of an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: 1,
        type: "multiple-choice"
      },
      {
        id: 2,
        question: "Which data structure follows the Last In First Out (LIFO) principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswer: 1,
        type: "multiple-choice"
      },
      {
        id: 3,
        question: "In a binary search tree, the left child is always smaller than the parent node.",
        options: ["True", "False"],
        correctAnswer: 0,
        type: "true-false"
      },
      {
        id: 4,
        question: "What is the space complexity of merge sort algorithm?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 2,
        type: "multiple-choice"
      },
      {
        id: 5,
        question: "Which of the following is NOT a linear data structure?",
        options: ["Array", "Stack", "Queue", "Tree"],
        correctAnswer: 3,
        type: "multiple-choice"
      },
      {
        id: 6,
        question: "Hash tables provide O(1) average case time complexity for search operations.",
        options: ["True", "False"],
        correctAnswer: 0,
        type: "true-false"
      },
      {
        id: 7,
        question: "What is the maximum number of children a binary tree node can have?",
        options: ["1", "2", "3", "Unlimited"],
        correctAnswer: 1,
        type: "multiple-choice"
      },
      {
        id: 8,
        question: "Breadth-First Search (BFS) uses which data structure for implementation?",
        options: ["Stack", "Queue", "Array", "Linked List"],
        correctAnswer: 1,
        type: "multiple-choice"
      },
      {
        id: 9,
        question: "The worst-case time complexity of quicksort is O(n²).",
        options: ["True", "False"],
        correctAnswer: 0,
        type: "true-false"
      },
      {
        id: 10,
        question: "Which traversal method visits the root node first in a binary tree?",
        options: ["Inorder", "Preorder", "Postorder", "Level order"],
        correctAnswer: 1,
        type: "multiple-choice"
      }
    ]
  };

  // Available exams (you can modify this to show different states)
  const availableExams = [dummyExam];

  // Tab switching detection with auto-submit after 3 violations
  const handleVisibilityChange = useCallback(() => {
    if (examStarted && !examCompleted && document.hidden) {
      const newCount = tabSwitchCount + 1;
      setTabSwitchCount(newCount);
      setShowWarning(true);
      
      // Clear existing timeout
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      
      // Check if this is the 3rd violation
      if (newCount >= 3) {
        // Auto-submit exam after 3 violations
        setTerminationReason('tab_violations');
        setExamTerminated(true);
        setTimeout(() => {
          handleSubmitExam();
        }, 2000); // Give 2 seconds to show the termination message
      } else {
        // Auto-hide warning after 5 seconds for violations 1 and 2
        warningTimeoutRef.current = setTimeout(() => {
          setShowWarning(false);
        }, 5000);
      }
    }
  }, [examStarted, examCompleted, tabSwitchCount]);

  // Prevent right-click and keyboard shortcuts during exam
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (examStarted && !examCompleted) {
      // Prevent F12, Ctrl+Shift+I, Ctrl+U, etc.
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 'r') ||
        e.key === 'F5'
      ) {
        e.preventDefault();
        setShowWarning(true);
        if (warningTimeoutRef.current) {
          clearTimeout(warningTimeoutRef.current);
        }
        warningTimeoutRef.current = setTimeout(() => {
          setShowWarning(false);
        }, 3000);
      }
    }
  }, [examStarted, examCompleted]);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    if (examStarted && !examCompleted) {
      e.preventDefault();
    }
  }, [examStarted, examCompleted]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
    };
  }, [handleVisibilityChange, handleKeyDown, handleContextMenu]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (examStarted && !examCompleted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setTerminationReason('time_up');
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examStarted, examCompleted, timeRemaining]);

  // Fullscreen management
  const enterFullscreen = async () => {
    try {
      if (examContainerRef.current) {
        await examContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (error) {
      console.log('Fullscreen not supported');
    }
  };

  const exitFullscreen = async () => {
    try {
      await document.exitFullscreen();
      setIsFullscreen(false);
    } catch (error) {
      console.log('Exit fullscreen failed');
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const startExam = async () => {
    if (currentExam) {
      setShowInstructions(false);
      setExamStarted(true);
      setTimeRemaining(currentExam.duration * 60); // Convert minutes to seconds
      setCurrentExam({
        ...currentExam,
        startTime: new Date()
      });
      
      // Enter fullscreen
      await enterFullscreen();
    }
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const toggleReviewMark = (questionId: number) => {
    setReviewMarked(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubmitExam = async () => {
    if (!currentExam) return;

    // Calculate results - FIXED SCORING LOGIC
    let correctAnswers = 0;
    currentExam.questions.forEach(question => {
      const selectedAnswer = answers[question.id];
      if (selectedAnswer !== undefined && selectedAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = correctAnswers;
    const percentage = (correctAnswers / currentExam.questions.length) * 100;
    const passed = percentage >= currentExam.passingMarks;

    setExamResults({ score, percentage, passed });
    setExamCompleted(true);
    setExamStarted(false);
    
    // Check if results should be shown immediately or wait for admin
    if (currentExam.autoShowResults) {
      // Show results immediately
    } else {
      // Show waiting message
      setShowResultsWaiting(true);
    }
    
    // Exit fullscreen
    if (isFullscreen) {
      await exitFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const resetExam = () => {
    setCurrentExam(dummyExam);
    setExamStarted(false);
    setExamCompleted(false);
    setTimeRemaining(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setReviewMarked({});
    setTabSwitchCount(0);
    setShowWarning(false);
    setExamResults(null);
    setShowInstructions(true);
    setExamTerminated(false);
    setTerminationReason(null);
    setShowResultsWaiting(false);
  };

  // Set initial exam
  useEffect(() => {
    if (availableExams.length > 0) {
      setCurrentExam(availableExams[0]);
    }
  }, []);

  // Get question status for navigation
  const getQuestionStatus = (questionId: number, index: number) => {
    const isAnswered = answers[questionId] !== undefined;
    const isReviewed = reviewMarked[questionId];
    const isCurrent = index === currentQuestionIndex;

    if (isCurrent) return 'current';
    if (isReviewed) return 'review';
    if (isAnswered) return 'answered';
    return 'unanswered';
  };

  const getQuestionStatusColor = (status: string) => {
    switch(status) {
      case 'current': return 'bg-emerald-600 text-white';
      case 'review': return 'bg-orange-500 text-white border border-orange-600';
      case 'answered': return 'bg-green-100 text-green-700 border border-green-300';
      case 'unanswered': return 'bg-gray-100 text-gray-600 hover:bg-gray-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Simulate checking exam status from admin
  useEffect(() => {
    if (currentExam?.status === 'waiting') {
      // Simulate admin starting the exam after 5 seconds
      const timer = setTimeout(() => {
        setCurrentExam(prev => prev ? { ...prev, status: 'active' } : null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [currentExam?.status]);

  if (!currentExam && availableExams.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <StudentHeader isCollapsed={isCollapsed} />
          
          <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-16">
                <div className="mb-8">
                  <BookOpen className="mx-auto h-24 w-24 text-gray-400 mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">No Exams Available</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    There are currently no scheduled exams. Check back later or contact your instructor.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
                  <Calendar className="mx-auto h-12 w-12 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Upcoming Exams</h3>
                  <p className="text-gray-600 mb-4">You'll be notified when new exams are scheduled.</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>• Check your email for exam notifications</p>
                    <p>• Ensure your documents are up to date</p>
                    <p>• Review course materials regularly</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <StudentHeader isCollapsed={isCollapsed} />
        
        {/* Warning Modal */}
        {showWarning && (
          <div className="fixed inset-0 bg-red-500 bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 text-center">
              <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                {tabSwitchCount >= 3 ? 'EXAM TERMINATED!' : 'WARNING!'}
              </h2>
              <p className="text-gray-700 mb-4">
                {tabSwitchCount >= 3 
                  ? 'You have exceeded the maximum allowed tab switches. Your exam is being submitted automatically.'
                  : 'Tab switching is not allowed during the exam. This incident has been recorded.'
                }
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Violations: {tabSwitchCount}/3
              </p>
              {tabSwitchCount >= 3 ? (
                <div className="text-red-600 font-semibold">
                  Submitting exam in 2 seconds...
                </div>
              ) : (
                <button
                  onClick={() => setShowWarning(false)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  I Understand
                </button>
              )}
            </div>
          </div>
        )}

        <main className={`${!examStarted ? 'pt-20' : 'pt-4'} px-4 md:px-6 lg:px-8 pb-8`}>
          {/* Waiting for Admin */}
          {currentExam?.status === 'waiting' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Hourglass className="text-white" size={24} />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{currentExam.title}</h1>
                      <p className="text-gray-600">{currentExam.subject}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 text-center">
                  <div className="mb-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Waiting for Instructor</h2>
                    <p className="text-gray-600">
                      Your exam is scheduled and ready. Please wait for your instructor to start the exam session.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Exam Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
                      <div>Duration: {currentExam.duration} minutes</div>
                      <div>Questions: {currentExam.totalQuestions}</div>
                      <div>Passing: {currentExam.passingMarks}%</div>
                      <div>Scheduled: {currentExam.scheduledTime}</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p>• Make sure you have a stable internet connection</p>
                    <p>• Close all unnecessary applications</p>
                    <p>• Ensure your device is charged or plugged in</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Exam Instructions */}
          {showInstructions && !examStarted && !examCompleted && currentExam && currentExam.status === 'active' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500 rounded-lg">
                      <FileText className="text-white" size={24} />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{currentExam.title}</h1>
                      <p className="text-gray-600">{currentExam.subject}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Timer className="text-blue-600" size={20} />
                        <span className="font-semibold text-blue-900">Duration</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{currentExam.duration} minutes</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="text-green-600" size={20} />
                        <span className="font-semibold text-green-900">Questions</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{currentExam.totalQuestions}</p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="text-orange-600" size={20} />
                        <span className="font-semibold text-orange-900">Passing Marks</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">{currentExam.passingMarks}%</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Shield className="text-emerald-600" size={20} />
                      Exam Instructions
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ul className="space-y-2">
                        {currentExam.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">{index + 1}.</span>
                            <span className="text-gray-700">{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="text-red-600 mt-0.5" size={20} />
                      <div>
                        <h4 className="font-semibold text-red-900 mb-1">Critical Security Notice</h4>
                        <p className="text-red-800 text-sm">
                          <strong>WARNING:</strong> After 3 tab switches, your exam will be automatically submitted. 
                          Your screen will be locked in fullscreen mode, and any attempt to switch tabs, use keyboard shortcuts, 
                          or right-click will be monitored and may result in immediate exam termination.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={startExam}
                      className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-lg font-semibold"
                    >
                      <Play size={20} />
                      Start Exam
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Exam Interface */}
          {examStarted && !examCompleted && currentExam && (
            <div className="max-w-6xl mx-auto">
              {/* Exam Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">{currentExam.title}</h1>
                    <p className="text-gray-600">Question {currentQuestionIndex + 1} of {currentExam.questions.length}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg">
                      <Clock className="text-red-600" size={20} />
                      <span className="font-mono text-lg font-bold text-red-600">
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                    
                    {tabSwitchCount > 0 && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                        tabSwitchCount >= 3 ? 'bg-red-100' : 'bg-yellow-50'
                      }`}>
                        <AlertTriangle className={`${
                          tabSwitchCount >= 3 ? 'text-red-600' : 'text-yellow-600'
                        }`} size={16} />
                        <span className={`text-sm font-medium ${
                          tabSwitchCount >= 3 ? 'text-red-700' : 'text-yellow-700'
                        }`}>
                          Violations: {tabSwitchCount}/3
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Question Panel */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Question {currentQuestionIndex + 1}
                      </h2>
                      <button
                        onClick={() => toggleReviewMark(currentExam.questions[currentQuestionIndex].id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                          reviewMarked[currentExam.questions[currentQuestionIndex].id]
                            ? 'bg-orange-100 text-orange-700 border border-orange-300'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {reviewMarked[currentExam.questions[currentQuestionIndex].id] ? (
                          <>
                            <Flag size={16} />
                            Marked for Review
                          </>
                        ) : (
                          <>
                            <FlagOff size={16} />
                            Mark for Review
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {currentExam.questions[currentQuestionIndex].question}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {currentExam.questions[currentQuestionIndex].options.map((option, index) => (
                        <label
                          key={index}
                          className={`
                            flex items-center p-4 border rounded-lg cursor-pointer transition-all
                            ${answers[currentExam.questions[currentQuestionIndex].id] === index
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name={`question-${currentExam.questions[currentQuestionIndex].id}`}
                            value={index}
                            checked={answers[currentExam.questions[currentQuestionIndex].id] === index}
                            onChange={() => handleAnswerSelect(currentExam.questions[currentQuestionIndex].id, index)}
                            className="sr-only"
                          />
                          <div className={`
                            w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center
                            ${answers[currentExam.questions[currentQuestionIndex].id] === index
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-gray-300'
                            }
                          `}>
                            {answers[currentExam.questions[currentQuestionIndex].id] === index && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {currentQuestionIndex === currentExam.questions.length - 1 ? (
                        <button
                          onClick={handleSubmitExam}
                          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Submit Exam
                        </button>
                      ) : (
                        <button
                          onClick={() => setCurrentQuestionIndex(Math.min(currentExam.questions.length - 1, currentQuestionIndex + 1))}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Question Navigation */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Question Navigator</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {currentExam.questions.map((question, index) => {
                        const status = getQuestionStatus(question.id, index);
                        return (
                          <button
                            key={question.id}
                            onClick={() => setCurrentQuestionIndex(index)}
                            className={`
                              w-10 h-10 rounded-lg text-sm font-medium transition-all relative
                              ${getQuestionStatusColor(status)}
                            `}
                          >
                            {index + 1}
                            {reviewMarked[question.id] && (
                              <Flag className="absolute -top-1 -right-1 w-3 h-3 text-orange-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="mt-4 space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-600 rounded"></div>
                        <span>Current</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                        <span>Answered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded"></div>
                        <span>Review</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-100 rounded"></div>
                        <span>Not Answered</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Answered: {Object.keys(answers).length}/{currentExam.questions.length}</p>
                        <p>Remaining: {currentExam.questions.length - Object.keys(answers).length}</p>
                        <p>Marked for Review: {Object.keys(reviewMarked).filter(id => reviewMarked[parseInt(id)]).length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Waiting */}
          {showResultsWaiting && !currentExam?.autoShowResults && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="text-center">
                    <div className="mb-4">
                      <Hourglass className="mx-auto h-16 w-16 text-blue-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Submitted Successfully!</h1>
                    <p className="text-lg text-gray-600">
                      Your exam has been submitted. Results will be published by your instructor.
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-center mb-8">
                    <div className="bg-blue-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">What happens next?</h3>
                      <div className="space-y-2 text-blue-800">
                        <p>• Your instructor will review all submissions</p>
                        <p>• Results will be published when ready</p>
                        <p>• You'll be notified via email when results are available</p>
                        <p>• Check your grades page regularly for updates</p>
                      </div>
                    </div>

                    {terminationReason === 'tab_violations' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="text-red-600" size={20} />
                          <div>
                            <h4 className="font-semibold text-red-900">Exam Auto-Submitted</h4>
                            <p className="text-red-800 text-sm">
                              Your exam was automatically submitted due to exceeding the maximum allowed tab switches (3 violations).
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {terminationReason === 'time_up' && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2">
                          <Clock className="text-orange-600" size={20} />
                          <div>
                            <h4 className="font-semibold text-orange-900">Time Expired</h4>
                            <p className="text-orange-800 text-sm">
                              Your exam was automatically submitted when the time limit was reached.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => window.location.href = '/student/grades'}
                      className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Award size={20} />
                      View Grades
                    </button>
                    <button
                      onClick={() => window.location.href = '/student'}
                      className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <BookOpen size={20} />
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Exam Results */}
          {examCompleted && examResults && currentExam && currentExam.autoShowResults && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className={`p-6 border-b border-gray-200 ${examResults.passed ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-red-50 to-orange-50'}`}>
                  <div className="text-center">
                    <div className="mb-4">
                      {examResults.passed ? (
                        <div className="flex items-center justify-center gap-2">
                          <Trophy className="h-16 w-16 text-yellow-500" />
                          <PartyPopper className="h-12 w-12 text-green-500" />
                          <Star className="h-14 w-14 text-yellow-400" />
                        </div>
                      ) : (
                        <XCircle className="mx-auto h-16 w-16 text-red-500" />
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {examResults.passed ? '🎉 Congratulations! 🎉' : 'Exam Completed'}
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                      {examResults.passed 
                        ? 'Outstanding performance! You have successfully passed the exam with flying colors!' 
                        : 'Don\'t worry! Every attempt is a learning opportunity. Keep studying and you\'ll succeed next time!'
                      }
                    </p>
                    {examResults.passed && (
                      <p className="text-emerald-600 font-semibold">
                        🌟 Excellent work! Your dedication and hard work have paid off! 🌟
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-1">{examResults.score}</div>
                      <div className="text-sm text-gray-600">Correct Answers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-1">{currentExam.questions.length}</div>
                      <div className="text-sm text-gray-600">Total Questions</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-1 ${examResults.passed ? 'text-green-600' : 'text-red-600'}`}>
                        {examResults.percentage.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Percentage</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-1 ${examResults.passed ? 'text-green-600' : 'text-red-600'}`}>
                        {examResults.passed ? '✅ PASS' : '❌ FAIL'}
                      </div>
                      <div className="text-sm text-gray-600">Result</div>
                    </div>
                  </div>

                  {/* Termination reason display */}
                  {terminationReason === 'tab_violations' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="text-red-600" size={20} />
                        <div>
                          <h4 className="font-semibold text-red-900">Exam Auto-Submitted</h4>
                          <p className="text-red-800 text-sm">
                            Your exam was automatically submitted due to exceeding the maximum allowed tab switches (3 violations).
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {terminationReason === 'time_up' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="text-orange-600" size={20} />
                        <div>
                          <h4 className="font-semibold text-orange-900">Time Expired</h4>
                          <p className="text-orange-800 text-sm">
                            Your exam was automatically submitted when the time limit was reached.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {tabSwitchCount > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="text-yellow-600" size={20} />
                        <div>
                          <h4 className="font-semibold text-yellow-900">Security Violations Detected</h4>
                          <p className="text-yellow-800 text-sm">
                            {tabSwitchCount} tab switching violation(s) were recorded during this exam.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Motivational message based on performance */}
                  {examResults.passed && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="text-center">
                        <h4 className="font-semibold text-green-900 mb-2">🎊 Fantastic Achievement! 🎊</h4>
                        <p className="text-green-800 text-sm">
                          You've demonstrated excellent understanding of the subject matter. 
                          Keep up the great work and continue your academic journey with confidence!
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={resetExam}
                      className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <RotateCcw size={20} />
                      Take Another Exam
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <FileText size={20} />
                      Print Results
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}