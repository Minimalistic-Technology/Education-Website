"use client";
import { useState, useEffect } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
import api from "@/utils/api";
import {
  Upload,
  FileText,
  Image,
  Download,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  Plus,
  Search,
  X,
  Camera,
  CreditCard,
  Shield,
  Award,
  Edit3,
  FileCheck,
  Folder
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'rejected';
  url?: string;
  description?: string;
}

export default function StudentDocuments() {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadCategory, setUploadCategory] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");

  const documentCategories = [
    { id: "all", name: "All Documents", icon: <Folder size={20} />, count: 0 },
    { id: "id-card", name: "ID Cards", icon: <CreditCard size={20} />, count: 0 },
    { id: "aadhar", name: "Aadhar Card", icon: <Shield size={20} />, count: 0 },
    { id: "photo", name: "Photos", icon: <Camera size={20} />, count: 0 },
    { id: "result", name: "Results", icon: <Award size={20} />, count: 0 },
    { id: "signature", name: "Signatures", icon: <Edit3 size={20} />, count: 0 },
    { id: "certificate", name: "Certificates", icon: <FileCheck size={20} />, count: 0 }
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/documents");
      const data = res.data.map((doc: any) => ({
        id: doc._id,
        name: doc.documentType,
        type: doc.documentType.toLowerCase().replace(/\s+/g, '-'),
        fileName: doc.fileUrl.split('/').pop(),
        fileSize: "N/A",
        fileType: doc.fileFormat,
        uploadDate: doc.createdAt,
        status: "verified",
        url: doc.fileUrl,
        description: doc.description || ""
      }));
      setDocuments(data);
    } catch (err) {
      console.error("Error fetching documents:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileFormat = file.type.split("/")[1] || "jpg";

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', uploadCategory || 'Photo');
      formData.append('description', uploadDescription);

      await api.post("/document", {
        studentId: "student123", // replace with actual student ID
        documentType: uploadCategory || "Photo",
        fileUrl: `/uploads/${file.name}`,
        fileFormat,
        description: uploadDescription
      });

      setShowUploadModal(false);
      setUploadCategory("");
      setUploadDescription("");
      fetchDocuments(); // Refresh the documents list
    } catch (err) {
      console.error("Error uploading:", err);
    }
  };

  const deleteDocument = async (docId: string) => {
    try {
      await api.delete(`/document/${docId}`);
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const downloadDocument = (doc: Document) => {
    if (doc.url) {
      window.open(doc.url, "_blank");
    }
  };

  const previewDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setShowPreview(true);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === "all" || doc.type === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf": return <FileText className="text-red-500" size={20} />;
      case "jpg":
      case "png": return <Image className="text-blue-500" size={20} />;
      default: return <FileText className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "text-green-600 bg-green-50 border-green-200";
      case "pending": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "rejected": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle size={14} className="text-green-600" />;
      case "pending": return <Clock size={14} className="text-yellow-600" />;
      case "rejected": return <AlertCircle size={14} className="text-red-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case "id-card": return <CreditCard className="text-blue-500" size={16} />;
      case "aadhar": return <Shield className="text-green-500" size={16} />;
      case "photo": return <Camera className="text-purple-500" size={16} />;
      case "result": return <Award className="text-yellow-500" size={16} />;
      case "signature": return <Edit3 className="text-indigo-500" size={16} />;
      case "certificate": return <FileCheck className="text-emerald-500" size={16} />;
      default: return <FileText className="text-gray-500" size={16} />;
    }
  };

  // Calculate category counts
  const categoryCounts = documentCategories.map(category => ({
    ...category,
    count: category.id === "all" ? documents.length : documents.filter(doc => doc.type === category.id).length
  }));

  // Calculate stats
  const verifiedCount = documents.filter(doc => doc.status === "verified").length;
  const pendingCount = documents.filter(doc => doc.status === "pending").length;
  const totalSize = documents.reduce((sum, doc) => sum + (parseFloat(doc.fileSize) || 0), 0);

  const stats = [
    {
      title: "Total Documents",
      value: documents.length.toString(),
      icon: <FileText className="text-blue-500" size={24} />,
      change: "Documents uploaded",
      color: "from-blue-500/10 to-blue-600/10 border-blue-200"
    },
    {
      title: "Verified",
      value: verifiedCount.toString(),
      icon: <CheckCircle className="text-green-500" size={24} />,
      change: `${documents.length > 0 ? Math.round((verifiedCount / documents.length) * 100) : 0}% verification rate`,
      color: "from-green-500/10 to-green-600/10 border-green-200"
    },
    {
      title: "Pending Review",
      value: pendingCount.toString(),
      icon: <Clock className="text-yellow-500" size={24} />,
      change: "Under verification",
      color: "from-yellow-500/10 to-yellow-600/10 border-yellow-200"
    },
    {
      title: "Storage Used",
      value: totalSize > 0 ? `${totalSize.toFixed(1)} MB` : "0 MB",
      icon: <Upload className="text-purple-500" size={24} />,
      change: "of 100 MB limit",
      color: "from-purple-500/10 to-purple-600/10 border-purple-200"
    }
  ];

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
                  Document Manager
                </h1>
                <p className="text-gray-600">Upload, organize, and manage your important academic documents.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Plus size={16} />
                  Upload Document
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

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8">
            {/* Document Categories Sidebar */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
                <div className="space-y-2">
                  {categoryCounts.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left
                        ${selectedCategory === category.id 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'hover:bg-gray-50 text-gray-700'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {category.icon}
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`
                        text-xs px-2 py-1 rounded-full
                        ${selectedCategory === category.id 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-gray-100 text-gray-600'
                        }
                      `}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Usage */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Storage Usage</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Used</span>
                    <span className="text-gray-400 font-medium">{totalSize.toFixed(1)} MB / 100 MB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((totalSize / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{(100 - totalSize).toFixed(1)} MB remaining</p>
                </div>
              </div>
            </div>

            {/* Documents List */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500 rounded-lg">
                        <FileText className="text-white" size={20} />
                      </div>
                      <h2 className="text-lg md:text-xl font-semibold text-gray-900">My Documents</h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          placeholder="Search documents..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                      <p className="text-gray-500">Loading documents...</p>
                    </div>
                  ) : filteredDocuments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200 hover:border-gray-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getFileIcon(doc.fileType)}
                              <div className="flex items-center gap-1">
                                {getCategoryIcon(doc.type)}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => previewDocument(doc)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                title="Preview"
                              >
                                <Eye size={14} className="text-gray-500" />
                              </button>
                              <button
                                onClick={() => downloadDocument(doc)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                title="Download"
                              >
                                <Download size={14} className="text-gray-500" />
                              </button>
                              <button
                                onClick={() => deleteDocument(doc.id)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={14} className="text-red-500" />
                              </button>
                            </div>
                          </div>

                          <h3 className="font-medium text-gray-900 mb-1 truncate">{doc.name}</h3>
                          <p className="text-xs text-gray-500 mb-2 truncate">{doc.fileName}</p>
                          
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500">{doc.fileSize}</span>
                            <span className={`
                              px-2 py-1 text-xs rounded-full border flex items-center gap-1
                              ${getStatusColor(doc.status)}
                            `}>
                              {getStatusIcon(doc.status)}
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </span>
                          </div>

                          <div className="text-xs text-gray-400">
                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                      <p className="text-gray-500 mb-4">
                        {searchTerm ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
                      </p>
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        <Plus size={16} />
                        Upload Document
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Upload Document</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center transition-colors
                  ${dragOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-gray-400'}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drop files here or click to upload
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Supports JPG, PNG, PDF files up to 10MB
                </p>
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  <Plus size={16} />
                  Choose Files
                </label>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Category
                </label>
                <select 
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select category</option>
                  <option value="ID Card">ID Card</option>
                  <option value="Aadhar Card">Aadhar Card</option>
                  <option value="Photo">Photo</option>
                  <option value="Result">Result</option>
                  <option value="Signature">Signature</option>
                  <option value="Certificate">Certificate</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Add a description for this document..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                  if (fileInput?.files) {
                    handleFileUpload(fileInput.files);
                  }
                }}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedDocument && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{selectedDocument.name}</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
                {getFileIcon(selectedDocument.fileType)}
                <p className="text-gray-500 mt-2">Preview not available</p>
                <p className="text-sm text-gray-400">Click download to view the file</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">File Name:</span>
                  <span className="text-sm text-gray-600 font-medium">{selectedDocument.fileName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">File Size:</span>
                  <span className="text-sm text-gray-600 font-medium">{selectedDocument.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Upload Date:</span>
                  <span className="text-sm text-gray-600 font-medium">
                    {new Date(selectedDocument.uploadDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`
                    text-sm px-2 py-1 rounded-full border flex items-center gap-1 w-fit
                    ${getStatusColor(selectedDocument.status)}
                  `}>
                    {getStatusIcon(selectedDocument.status)}
                    {selectedDocument.status.charAt(0).toUpperCase() + selectedDocument.status.slice(1)}
                  </span>
                </div>
                {selectedDocument.description && (
                  <div>
                    <span className="text-sm text-gray-600">Description:</span>
                    <p className="text-sm mt-1">{selectedDocument.description}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => downloadDocument(selectedDocument)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Download size={16} />
                Download
              </button>
              <button
                onClick={() => {
                  deleteDocument(selectedDocument.id);
                  setShowPreview(false);
                }}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}