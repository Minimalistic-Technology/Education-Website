'use client';
import { useState, useEffect, useRef } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
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
  Plus,
  Edit,
  Trash2,
  Upload,
  X,
  Save,
  AlertCircle,
  CheckCircle,
  Users,
  BarChart3,
  TrendingUp,
  Star,
  Bookmark,
  Settings,
  MoreVertical,
  Copy,
  Share2,
  Archive,
  RefreshCw,
  ChevronDown,
  Loader2,
  Image as ImageIcon,
  Link,
  Tag,
  Globe
} from "lucide-react";

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'image' | 'link';
  course: string;
  courseId: string;
  instructor: string;
  duration?: string;
  pages?: number;
  fileSize: string;
  uploadDate: string;
  lastModified: string;
  category: 'lecture' | 'tutorial' | 'assignment' | 'reference';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isPublished: boolean;
  viewCount: number;
  downloadCount: number;
  rating: number;
  url: string;
  thumbnail?: string;
  tags: string[];
  createdBy: string;
  status: 'active' | 'archived' | 'draft';
}

export default function AdminStudyMaterials() {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'views' | 'rating'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const statusOptions = [
    { id: "all", name: "All Status" },
    { id: "active", name: "Active" },
    { id: "draft", name: "Draft" },
    { id: "archived", name: "Archived" }
  ];

  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([
    {
      id: "1",
      title: "Introduction to Data Structures",
      description: "Comprehensive overview of fundamental data structures including arrays, linked lists, and basic operations.",
      type: "video",
      course: "Data Structures",
      courseId: "ds",
      instructor: "Dr. Smith",
      duration: "45:30",
      fileSize: "18.5 MB",
      uploadDate: "2024-01-15",
      lastModified: "2024-01-16",
      category: "lecture",
      difficulty: "beginner",
      isPublished: true,
      viewCount: 234,
      downloadCount: 45,
      rating: 4.8,
      url: "https://youtu.be/xrj3zzaqODw?si=eCjXxDw5eopRo8GX",
      thumbnail: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["data-structures", "arrays", "beginner"],
      createdBy: "Admin",
      status: "active"
    },
    {
      id: "2",
      title: "Array Operations and Complexity",
      description: "Detailed study of array operations, time complexity analysis, and practical implementations.",
      type: "pdf",
      course: "Data Structures",
      courseId: "ds",
      instructor: "Dr. Smith",
      pages: 25,
      fileSize: "2.3 MB",
      uploadDate: "2024-01-12",
      lastModified: "2024-01-14",
      category: "lecture",
      difficulty: "intermediate",
      isPublished: true,
      viewCount: 189,
      downloadCount: 67,
      rating: 4.6,
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      tags: ["arrays", "complexity", "algorithms"],
      createdBy: "Dr. Smith",
      status: "active"
    },
    {
      id: "3",
      title: "JavaScript ES6+ Features",
      description: "Modern JavaScript features and best practices for web development.",
      type: "video",
      course: "Web Development",
      courseId: "web",
      instructor: "Prof. Davis",
      duration: "52:45",
      fileSize: "19.8 MB",
      uploadDate: "2024-01-05",
      lastModified: "2024-01-05",
      category: "lecture",
      difficulty: "advanced",
      isPublished: false,
      viewCount: 267,
      downloadCount: 23,
      rating: 4.8,
      url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["javascript", "es6", "web-development"],
      createdBy: "Prof. Davis",
      status: "draft"
    }
  ]);

  const [newMaterial, setNewMaterial] = useState<Partial<StudyMaterial>>({
    title: "",
    description: "",
    type: "pdf",
    courseId: "",
    instructor: "",
    category: "lecture",
    difficulty: "beginner",
    isPublished: false,
    tags: [],
    status: "draft"
  });

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesCourse = selectedCourse === "all" || material.courseId === selectedCourse;
    const matchesType = selectedType === "all" || material.type === selectedType;
    const matchesCategory = selectedCategory === "all" || material.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || material.status === selectedStatus;
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCourse && matchesType && matchesCategory && matchesStatus && matchesSearch;
  });

  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'views':
        aValue = a.viewCount;
        bValue = b.viewCount;
        break;
      case 'rating':
        aValue = a.rating;
        bValue = b.rating;
        break;
      case 'date':
      default:
        aValue = new Date(a.uploadDate).getTime();
        bValue = new Date(b.uploadDate).getTime();
        break;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const stats = [
    {
      title: "Total Materials",
      value: studyMaterials.length.toString(),
      icon: <BookOpen className="text-blue-500" size={24} />,
      change: "+12 this month",
      trend: "up",
      color: "from-blue-500/10 to-blue-600/10 border-blue-200"
    },
    {
      title: "Published",
      value: studyMaterials.filter(m => m.isPublished).length.toString(),
      icon: <Globe className="text-green-500" size={24} />,
      change: "Live content",
      trend: "neutral",
      color: "from-green-500/10 to-green-600/10 border-green-200"
    },
    {
      title: "Total Views",
      value: studyMaterials.reduce((sum, m) => sum + m.viewCount, 0).toLocaleString(),
      icon: <Eye className="text-purple-500" size={24} />,
      change: "+23% this week",
      trend: "up",
      color: "from-purple-500/10 to-purple-600/10 border-purple-200"
    },
    {
      title: "Avg Rating",
      value: (studyMaterials.reduce((sum, m) => sum + m.rating, 0) / studyMaterials.length).toFixed(1),
      icon: <Star className="text-orange-500" size={24} />,
      change: "4.7/5.0 overall",
      trend: "neutral",
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

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
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

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video size={16} className="text-red-500" />;
      case 'pdf': return <FileText size={16} className="text-blue-500" />;
      case 'image': return <ImageIcon size={16} className="text-green-500" />;
      case 'link': return <Link size={16} className="text-purple-500" />;
      default: return <FileText size={16} className="text-gray-500" />;
    }
  };

  const handleAddMaterial = () => {
    setNewMaterial({
      title: "",
      description: "",
      type: "pdf",
      courseId: "",
      instructor: "",
      category: "lecture",
      difficulty: "beginner",
      isPublished: false,
      tags: [],
      status: "draft"
    });
    setShowAddModal(true);
  };

  const handleEditMaterial = (material: StudyMaterial) => {
    setSelectedMaterial(material);
    setShowEditModal(true);
  };

  const handleDeleteMaterial = (materialId: string) => {
    if (confirm("Are you sure you want to delete this material?")) {
      setStudyMaterials(prev => prev.filter(m => m.id !== materialId));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedMaterials.length} materials?`)) {
      setStudyMaterials(prev => prev.filter(m => !selectedMaterials.includes(m.id)));
      setSelectedMaterials([]);
      setShowBulkActions(false);
    }
  };

  const handleBulkPublish = () => {
    setStudyMaterials(prev => prev.map(m => 
      selectedMaterials.includes(m.id) ? { ...m, isPublished: true, status: 'active' } : m
    ));
    setSelectedMaterials([]);
    setShowBulkActions(false);
  };

  const handleBulkArchive = () => {
    setStudyMaterials(prev => prev.map(m => 
      selectedMaterials.includes(m.id) ? { ...m, status: 'archived' } : m
    ));
    setSelectedMaterials([]);
    setShowBulkActions(false);
  };

  const toggleMaterialSelection = (materialId: string) => {
    setSelectedMaterials(prev => 
      prev.includes(materialId) 
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedMaterials.length === sortedMaterials.length) {
      setSelectedMaterials([]);
    } else {
      setSelectedMaterials(sortedMaterials.map(m => m.id));
    }
  };

  const saveMaterial = () => {
    setLoading(true);
    
    setTimeout(() => {
      if (showEditModal && selectedMaterial) {
        setStudyMaterials(prev => prev.map(m => 
          m.id === selectedMaterial.id ? { ...selectedMaterial, lastModified: new Date().toISOString().split('T')[0] } : m
        ));
        setShowEditModal(false);
        setSelectedMaterial(null);
      } else if (showAddModal) {
        const newId = (studyMaterials.length + 1).toString();
        const material: StudyMaterial = {
          ...newMaterial as StudyMaterial,
          id: newId,
          uploadDate: new Date().toISOString().split('T')[0],
          lastModified: new Date().toISOString().split('T')[0],
          viewCount: 0,
          downloadCount: 0,
          rating: 0,
          url: "",
          createdBy: "Admin",
          course: courses.find(c => c.id === newMaterial.courseId)?.name || ""
        };
        setStudyMaterials(prev => [...prev, material]);
        setShowAddModal(false);
      }
      setLoading(false);
    }, 1000);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      // Handle file upload logic here
    }
  };

  useEffect(() => {
    setShowBulkActions(selectedMaterials.length > 0);
  }, [selectedMaterials]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <AdminHeader isCollapsed={isCollapsed} />

        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Study Materials Management
                </h1>
                <p className="text-gray-600">Manage and organize educational content for students.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                </div>
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

          {/* Bulk Actions Bar */}
          {showBulkActions && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-indigo-900">
                    {selectedMaterials.length} materials selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBulkPublish}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    Publish
                  </button>
                  <button
                    onClick={handleBulkArchive}
                    className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                  >
                    Archive
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedMaterials([])}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Types</option>
                <option value="video">Videos</option>
                <option value="pdf">PDFs</option>
                <option value="image">Images</option>
                <option value="link">Links</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {statusOptions.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.length === sortedMaterials.length && sortedMaterials.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-600">Select All</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2 py-1 text-gray-700 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="date">Date</option>
                  <option value="title">Title</option>
                  <option value="views">Views</option>
                  <option value="rating">Rating</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronDown className={`transform transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Materials List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500 rounded-lg">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Materials ({sortedMaterials.length})
                  </h2>
                </div>
                <button
                  onClick={handleAddMaterial}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus size={16} />
                  Add Material
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6">
              {sortedMaterials.length > 0 ? (
                <div className="space-y-4">
                  {sortedMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(material.id)}
                          onChange={() => toggleMaterialSelection(material.id)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />

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
                            <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center">
                              {getTypeIcon(material.type)}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{material.title}</h3>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-1">{material.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  {getCategoryIcon(material.category)}
                                  {material.category}
                                </span>
                                <span>{material.course}</span>
                                <span>{material.instructor}</span>
                                <span>{material.type === 'video' ? material.duration : `${material.pages} pages`}</span>
                                <span className="flex items-center gap-1">
                                  <Eye size={12} />
                                  {material.viewCount}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Download size={12} />
                                  {material.downloadCount}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(material.difficulty)}`}>
                                {material.difficulty}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(material.status)}`}>
                                {material.status}
                              </span>
                              {material.isPublished && (
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                  Published
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {material.tags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                Modified: {new Date(material.lastModified).toLocaleDateString()}
                              </span>
                              <button
                                onClick={() => handleEditMaterial(material)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Edit size={14} className="text-gray-600" />
                              </button>
                              <button
                                onClick={() => handleDeleteMaterial(material.id)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Trash2 size={14} className="text-red-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
                  <p className="text-gray-500 mb-4">Get started by adding your first study material.</p>
                  <button
                    onClick={handleAddMaterial}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus size={16} />
                    Add Material
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Material Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {showEditModal ? 'Edit Material' : 'Add New Material'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setSelectedMaterial(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={showEditModal ? selectedMaterial?.title || '' : newMaterial.title || ''}
                      onChange={(e) => {
                        if (showEditModal && selectedMaterial) {
                          setSelectedMaterial({ ...selectedMaterial, title: e.target.value });
                        } else {
                          setNewMaterial({ ...newMaterial, title: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter material title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <select
                      value={showEditModal ? selectedMaterial?.type || '' : newMaterial.type || ''}
                      onChange={(e) => {
                        if (showEditModal && selectedMaterial) {
                          setSelectedMaterial({ ...selectedMaterial, type: e.target.value as any });
                        } else {
                          setNewMaterial({ ...newMaterial, type: e.target.value as any });
                        }
                      }}
                      className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="pdf">PDF Document</option>
                      <option value="video">Video</option>
                      <option value="image">Image</option>
                      <option value="link">External Link</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={showEditModal ? selectedMaterial?.description || '' : newMaterial.description || ''}
                    onChange={(e) => {
                      if (showEditModal && selectedMaterial) {
                        setSelectedMaterial({ ...selectedMaterial, description: e.target.value });
                      } else {
                        setNewMaterial({ ...newMaterial, description: e.target.value });
                      }
                    }}
                    rows={3}
                    className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter material description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course *
                    </label>
                    <select
                      value={showEditModal ? selectedMaterial?.courseId || '' : newMaterial.courseId || ''}
                      onChange={(e) => {
                        if (showEditModal && selectedMaterial) {
                          setSelectedMaterial({ 
                            ...selectedMaterial, 
                            courseId: e.target.value,
                            course: courses.find(c => c.id === e.target.value)?.name || ''
                          });
                        } else {
                          setNewMaterial({ ...newMaterial, courseId: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Course</option>
                      {courses.filter(c => c.id !== 'all').map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={showEditModal ? selectedMaterial?.category || '' : newMaterial.category || ''}
                      onChange={(e) => {
                        if (showEditModal && selectedMaterial) {
                          setSelectedMaterial({ ...selectedMaterial, category: e.target.value as any });
                        } else {
                          setNewMaterial({ ...newMaterial, category: e.target.value as any });
                        }
                      }}
                      className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {categories.filter(c => c.id !== 'all').map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={showEditModal ? selectedMaterial?.difficulty || '' : newMaterial.difficulty || ''}
                      onChange={(e) => {
                        if (showEditModal && selectedMaterial) {
                          setSelectedMaterial({ ...selectedMaterial, difficulty: e.target.value as any });
                        } else {
                          setNewMaterial({ ...newMaterial, difficulty: e.target.value as any });
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instructor
                    </label>
                    <input
                      type="text"
                      value={showEditModal ? selectedMaterial?.instructor || '' : newMaterial.instructor || ''}
                      onChange={(e) => {
                        if (showEditModal && selectedMaterial) {
                          setSelectedMaterial({ ...selectedMaterial, instructor: e.target.value });
                        } else {
                          setNewMaterial({ ...newMaterial, instructor: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter instructor name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={showEditModal ? selectedMaterial?.status || '' : newMaterial.status || ''}
                      onChange={(e) => {
                        if (showEditModal && selectedMaterial) {
                          setSelectedMaterial({ ...selectedMaterial, status: e.target.value as any });
                        } else {
                          setNewMaterial({ ...newMaterial, status: e.target.value as any });
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Upload
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <button
                      type="button"
                      onClick={handleFileUpload}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Choose File
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={onFileSelect}
                      className="hidden"
                      accept=".pdf,.mp4,.mov,.avi,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showEditModal ? selectedMaterial?.isPublished || false : newMaterial.isPublished || false}
                      onChange={(e) => {
                        if (showEditModal && selectedMaterial) {
                          setSelectedMaterial({ ...selectedMaterial, isPublished: e.target.checked });
                        } else {
                          setNewMaterial({ ...newMaterial, isPublished: e.target.checked });
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Publish immediately</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setSelectedMaterial(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveMaterial}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Save size={16} />
                )}
                {showEditModal ? 'Update' : 'Create'} Material
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}