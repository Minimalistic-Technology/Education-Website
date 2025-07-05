"use client";
import { useState, useEffect, useRef } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
import api from "@/utils/api";
import { 
  BookOpen,
  Play,
  Download,
  Eye,
  FileText,
  Video,
  Clock,
  User,
  Calendar,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  ChevronRight,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Star,
  StarOff,
  Share2,
  Bookmark,
  BookmarkCheck,
  AlertCircle,
  CheckCircle,
  X,
  Loader2
} from "lucide-react";

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video';
  course: string;
  courseId: string;
  instructor: string;
  duration?: string; // for videos
  pages?: number; // for PDFs
  fileSize: string;
  uploadDate: string;
  category: 'lecture' | 'tutorial' | 'assignment' | 'reference';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isBookmarked: boolean;
  viewCount: number;
  rating: number;
  url: string;
  thumbnail?: string;
}

export default function StudentLectures() {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Try to fetch from your actual API endpoint
        const response = await api.get('/api/study-materials', {
          timeout: 5000, // 5 second timeout
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const materials: StudyMaterial[] = response.data.map((item: any) => ({
          id: item._id || item.id,
          title: item.title,
          description: item.description,
          type: item.type,
          course: item.course,
          courseId: item.courseId,
          instructor: item.instructor,
          duration: item.duration,
          pages: item.pages,
          fileSize: item.fileSize,
          uploadDate: item.uploadDate,
          category: item.category,
          difficulty: item.difficulty,
          isBookmarked: item.isBookmarked || false,
          viewCount: item.viewCount || 0,
          rating: item.rating || 0,
          url: item.url,
          thumbnail: item.thumbnail,
        }));
        
        setStudyMaterials(materials);
      } catch (err: any) {
        console.error('Error fetching study materials:', err);
        
        // If API fails, use fallback data for development
        // const fallbackMaterials: StudyMaterial[] = [
        //   {
        //     id: "1",
        //     title: "Introduction to Data Structures",
        //     description: "Comprehensive overview of fundamental data structures including arrays, linked lists, and basic operations.",
        //     type: "video",
        //     course: "Data Structures",
        //     courseId: "ds",
        //     instructor: "Dr. Smith",
        //     duration: "45:30",
        //     fileSize: "18.5 MB",
        //     uploadDate: "2024-01-15",
        //     category: "lecture",
        //     difficulty: "beginner",
        //     isBookmarked: true,
        //     viewCount: 234,
        //     rating: 4.8,
        //     url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        //     thumbnail: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400"
        //   },
        //   {
        //     id: "2",
        //     title: "Array Operations and Complexity",
        //     description: "Detailed study of array operations, time complexity analysis, and practical implementations.",
        //     type: "pdf",
        //     course: "Data Structures",
        //     courseId: "ds",
        //     instructor: "Dr. Smith",
        //     pages: 25,
        //     fileSize: "2.3 MB",
        //     uploadDate: "2024-01-12",
        //     category: "lecture",
        //     difficulty: "intermediate",
        //     isBookmarked: false,
        //     viewCount: 189,
        //     rating: 4.6,
        //     url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        //   },
        //   {
        //     id: "3",
        //     title: "Calculus Fundamentals",
        //     description: "Basic concepts of differential and integral calculus with practical examples.",
        //     type: "video",
        //     course: "Calculus II",
        //     courseId: "calc",
        //     instructor: "Dr. Johnson",
        //     duration: "38:15",
        //     fileSize: "16.2 MB",
        //     uploadDate: "2024-01-10",
        //     category: "tutorial",
        //     difficulty: "beginner",
        //     isBookmarked: false,
        //     viewCount: 156,
        //     rating: 4.7,
        //     url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        //     thumbnail: "https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400"
        //   }
        // ];
        
        // setStudyMaterials(fallbackMaterials);
        
        if (err.code !== 'ECONNABORTED' && err.response?.status !== 404) {
          setError('Failed to load study materials from server. Using sample data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudyMaterials();
  }, []);

  const courses = [
    { id: "all", name: "All Courses" },
    { id: "ds", name: "Data Structures" },
    { id: "calc", name: "Calculus II" },
    { id: "web", name: "Web Development" },
    { id: "db", name: "Database Systems" },
    { id: "algo", name: "Algorithm Design" },
    { id: "os", name: "Operating Systems" }
  ];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "lecture", name: "Lectures" },
    { id: "tutorial", name: "Tutorials" },
    { id: "assignment", name: "Assignments" },
    { id: "reference", name: "Reference Materials" }
  ];

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesCourse = selectedCourse === "all" || material.courseId === selectedCourse;
    const matchesType = selectedType === "all" || material.type === selectedType;
    const matchesCategory = selectedCategory === "all" || material.category === selectedCategory;
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.course.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesType && matchesCategory && matchesSearch;
  });

  const stats = [
    {
      title: "Total Materials",
      value: studyMaterials.length.toString(),
      icon: <BookOpen className="text-blue-500" size={24} />,
      change: "Updated weekly",
      color: "from-blue-500/10 to-blue-600/10 border-blue-200"
    },
    {
      title: "Video Lectures",
      value: studyMaterials.filter(m => m.type === 'video').length.toString(),
      icon: <Video className="text-purple-500" size={24} />,
      change: "Interactive content",
      color: "from-purple-500/10 to-purple-600/10 border-purple-200"
    },
    {
      title: "PDF Documents",
      value: studyMaterials.filter(m => m.type === 'pdf').length.toString(),
      icon: <FileText className="text-green-500" size={24} />,
      change: "Downloadable",
      color: "from-green-500/10 to-green-600/10 border-green-200"
    },
    {
      title: "Bookmarked",
      value: studyMaterials.filter(m => m.isBookmarked).length.toString(),
      icon: <Bookmark className="text-orange-500" size={24} />,
      change: "Quick access",
      color: "from-orange-500/10 to-orange-600/10 border-orange-200"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'lecture': return <BookOpen size={14} className="text-blue-500" />;
      case 'tutorial': return <Play size={14} className="text-green-500" />;
      case 'assignment': return <FileText size={14} className="text-orange-500" />;
      case 'reference': return <Star size={14} className="text-purple-500" />;
      default: return <BookOpen size={14} className="text-gray-500" />;
    }
  };

  const toggleBookmark = async (materialId: string) => {
    try {
      // Update local state immediately for better UX
      setStudyMaterials(prev => 
        prev.map(material => 
          material.id === materialId 
            ? { ...material, isBookmarked: !material.isBookmarked }
            : material
        )
      );

      // Try to update on server
      await api.patch(`/api/study-materials/${materialId}/bookmark`);
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      // Revert local state if server update fails
      setStudyMaterials(prev => 
        prev.map(material => 
          material.id === materialId 
            ? { ...material, isBookmarked: !material.isBookmarked }
            : material
        )
      );
    }
  };

  const openViewer = (material: StudyMaterial) => {
    setSelectedMaterial(material);
    setShowViewer(true);
    setLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const closeViewer = () => {
    setShowViewer(false);
    setSelectedMaterial(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const downloadPDF = (material: StudyMaterial) => {
    console.log(`Downloading PDF: ${material.title}`);
    const link = document.createElement('a');
    link.href = material.url;
    link.download = `${material.title}.pdf`;
    link.click();
  };

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = async () => {
    if (!isFullscreen && viewerRef.current) {
      try {
        await viewerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (error) {
        console.log('Fullscreen not supported');
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (error) {
        console.log('Exit fullscreen failed');
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <StudentHeader isCollapsed={isCollapsed} />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Study Materials
                </h1>
                <p className="text-gray-600">Access video lectures and PDF documents for your courses.</p>
                {error && (
                  <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded-lg">
                    <p className="text-sm text-yellow-800">{error}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && studyMaterials.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-gray-600">Loading study materials...</span>
            </div>
          ) : (
            <>
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
              <div className="bg-white rounded-xl shadow-sm border text-gray-700 border-gray-200 p-4 md:p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" size={16} />
                      <input
                        type="text"
                        placeholder="Search materials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-400 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">All Types</option>
                    <option value="video">Videos</option>
                    <option value="pdf">PDFs</option>
                  </select>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Materials Grid/List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500 rounded-lg">
                      <BookOpen className="text-white" size={20} />
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                      Available Materials ({filteredMaterials.length})
                    </h2>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  {filteredMaterials.length > 0 ? (
                    <div className={`
                      ${viewMode === 'grid' 
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                        : 'space-y-4'
                      }
                    `}>
                      {filteredMaterials.map((material) => (
                        <div
                          key={material.id}
                          className={`
                            bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200
                            ${viewMode === 'grid' ? 'p-4' : 'p-4 flex items-center gap-4'}
                          `}
                        >
                          {viewMode === 'grid' ? (
                            <>
                              {/* Grid View */}
                              <div className="relative mb-4">
                                {material.type === 'video' ? (
                                  <div className="relative">
                                    <img
                                      src={material.thumbnail || 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400'}
                                      alt={material.title}
                                      className="w-full h-32 object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                                      <div className="p-3 bg-white bg-opacity-90 rounded-full">
                                        <Play className="text-emerald-600" size={24} />
                                      </div>
                                    </div>
                                    <div className="absolute top-2 right-2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded">
                                      {material.duration}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-full h-32 bg-red-100 rounded-lg flex items-center justify-center">
                                    <FileText className="text-red-500" size={48} />
                                  </div>
                                )}
                                <button
                                  onClick={() => toggleBookmark(material.id)}
                                  className="absolute top-2 left-2 p-1 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                                >
                                  {material.isBookmarked ? (
                                    <BookmarkCheck className="text-emerald-600" size={16} />
                                  ) : (
                                    <Bookmark className="text-gray-400" size={16} />
                                  )}
                                </button>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{material.title}</h3>
                                  <p className="text-sm text-gray-600 line-clamp-2">{material.description}</p>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  {getCategoryIcon(material.category)}
                                  <span>{material.category}</span>
                                  <span>•</span>
                                  <span>{material.course}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(material.difficulty)}`}>
                                      {material.difficulty}
                                    </span>
                                    <span className="text-xs text-gray-500">{material.fileSize}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Eye size={12} />
                                    <span>{material.viewCount}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => openViewer(material)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                                  >
                                    <Eye size={14} />
                                    View
                                  </button>
                                  {material.type === 'pdf' && (
                                    <button
                                      onClick={() => downloadPDF(material)}
                                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                      <Download size={14} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* List View */}
                              <div className="flex-shrink-0">
                                {material.type === 'video' ? (
                                  <div className="relative w-24 h-16">
                                    <img
                                      src={material.thumbnail || 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400'}
                                      alt={material.title}
                                      className="w-full h-full object-cover rounded"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded flex items-center justify-center">
                                      <Play className="text-white" size={16} />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-24 h-16 bg-red-100 rounded flex items-center justify-center">
                                    <FileText className="text-red-500" size={24} />
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <h3 className="font-semibold text-gray-900 truncate">{material.title}</h3>
                                  <button
                                    onClick={() => toggleBookmark(material.id)}
                                    className="flex-shrink-0 p-1 hover:bg-gray-200 rounded transition-colors"
                                  >
                                    {material.isBookmarked ? (
                                      <BookmarkCheck className="text-emerald-600" size={16} />
                                    ) : (
                                      <Bookmark className="text-gray-400" size={16} />
                                    )}
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-1">{material.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                                  <span className="flex items-center gap-1">
                                    {getCategoryIcon(material.category)}
                                    {material.category}
                                  </span>
                                  <span>{material.course}</span>
                                  <span>{material.instructor}</span>
                                  <span>{material.type === 'video' ? material.duration : `${material.pages} pages`}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(material.difficulty)}`}>
                                      {material.difficulty}
                                    </span>
                                    <span className="text-xs text-gray-500">{material.fileSize}</span>
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                      <Eye size={12} />
                                      {material.viewCount}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => openViewer(material)}
                                      className="flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700 transition-colors"
                                    >
                                      <Eye size={12} />
                                      View
                                    </button>
                                    {material.type === 'pdf' && (
                                      <button
                                        onClick={() => downloadPDF(material)}
                                        className="p-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                                      >
                                        <Download size={12} />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Material Viewer Modal */}
      {showViewer && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div 
            ref={viewerRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  {selectedMaterial.type === 'video' ? (
                    <Video className="text-white" size={20} />
                  ) : (
                    <FileText className="text-white" size={20} />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selectedMaterial.title}</h2>
                  <p className="text-sm text-gray-600">{selectedMaterial.course} • {selectedMaterial.instructor}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedMaterial.type === 'video' && (
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Maximize size={20} className="text-gray-600" />
                  </button>
                )}
                <button
                  onClick={closeViewer}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 text-emerald-500 animate-spin mb-4" />
                    <p className="text-gray-600">Loading {selectedMaterial.type}...</p>
                  </div>
                </div>
              ) : selectedMaterial.type === 'video' ? (
                <div className="h-full flex flex-col">
                  <div className="flex-1 bg-black relative">
                    <video
                      ref={videoRef}
                      src={selectedMaterial.url}
                      className="w-full h-full object-contain"
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onContextMenu={(e) => e.preventDefault()} // Disable right-click
                      controlsList="nodownload" // Disable download
                      disablePictureInPicture // Disable picture-in-picture
                    />
                    
                    {/* Custom Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <div className="flex items-center gap-4 text-white">
                        <button
                          onClick={togglePlay}
                          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        
                        <button
                          onClick={toggleMute}
                          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                        >
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        
                        <div className="flex-1 flex items-center gap-2">
                          <span className="text-sm">{formatTime(currentTime)}</span>
                          <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="flex-1 h-1 bg-white bg-opacity-30 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-sm">{formatTime(duration)}</span>
                        </div>
                        
                        <button
                          onClick={toggleFullscreen}
                          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                        >
                          <Maximize size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <iframe
                    src={selectedMaterial.url}
                    className="w-full h-full border-0"
                    title={selectedMaterial.title}
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Size: {selectedMaterial.fileSize}</span>
                  <span>•</span>
                  <span>Views: {selectedMaterial.viewCount}</span>
                  <span>•</span>
                  <span>Uploaded: {new Date(selectedMaterial.uploadDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedMaterial.type === 'pdf' && (
                    <button
                      onClick={() => downloadPDF(selectedMaterial)}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Download size={16} />
                      Download PDF
                    </button>
                  )}
                  <button
                    onClick={() => toggleBookmark(selectedMaterial.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedMaterial.isBookmarked
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedMaterial.isBookmarked ? (
                      <BookmarkCheck size={16} />
                    ) : (
                      <Bookmark size={16} />
                    )}
                    {selectedMaterial.isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}