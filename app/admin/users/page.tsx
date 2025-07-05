"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/utils/api";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import { 
  Users,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Search,
  Filter,
  Download,
  User,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle,
  Eye,
  GraduationCap,
  BookOpen,
  Shield,
  UserCheck,
  UserX,
  TrendingUp,
  Clock
} from "lucide-react";

interface User {
  id: string;
  prNo: string;
  username: string;
  email: string;
  role: 'teacher' | 'student';
  phone: string;
  yearName: string;
  courseName: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export default function AdminUsers() {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const [formData, setFormData] = useState<Partial<User & { password?: string }>>({
    prNo: '',
    username: '',
    email: '',
    password: '',
    role: 'student',
    phone: '',
    yearName: '',
    courseName: '',
    status: 'Active'
  });

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      if (!initialLoad) {
        setLoading(true);
      }
      
      const response = await api.get('/adminuser');
      
      // Transform backend data to frontend format
      const transformedUsers = response.data.map((user: any) => ({
        id: user._id,
        prNo: user.prNo,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        yearName: user.yearName,
        courseName: user.courseName,
        status: user.status,
        createdAt: user.createdAt ? user.createdAt.split('T')[0] : new Date().toISOString().split('T')[0]
      }));
      
      setUsers(transformedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('error', 'Failed to load users. Please check if the backend server is running.');
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [initialLoad]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const roles = [
    { value: "teacher", label: "Teacher", icon: <Shield size={16} /> },
    { value: "student", label: "Student", icon: <GraduationCap size={16} /> }
  ];

  const yearOptions = ["First Year", "Second Year", "Third Year", "Fourth Year"];
  const courseOptions = ["Computer Science", "Mathematics", "Physics", "Engineering", "Biology", "Chemistry"];

  const stats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      icon: <Users className="text-indigo-500" size={24} />,
      change: `${users.filter(u => u.status === 'Active').length} active`,
      trend: "up",
      color: "from-indigo-500/10 to-indigo-600/10 border-indigo-200"
    },
    {
      title: "Teachers",
      value: users.filter(u => u.role === 'teacher').length.toString(),
      icon: <Shield className="text-blue-500" size={24} />,
      change: "Faculty members",
      trend: "neutral",
      color: "from-blue-500/10 to-blue-600/10 border-blue-200"
    },
    {
      title: "Students",
      value: users.filter(u => u.role === 'student').length.toString(),
      icon: <GraduationCap className="text-purple-500" size={24} />,
      change: "Enrolled students",
      trend: "up",
      color: "from-purple-500/10 to-purple-600/10 border-purple-200"
    },
    {
      title: "Active Users",
      value: users.filter(u => u.status === 'Active').length.toString(),
      icon: <UserCheck className="text-green-500" size={24} />,
      change: "Currently active",
      trend: "up",
      color: "from-green-500/10 to-green-600/10 border-green-200"
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const resetForm = () => {
    setFormData({
      prNo: '',
      username: '',
      email: '',
      password: '',
      role: 'student',
      phone: '',
      yearName: '',
      courseName: '',
      status: 'Active'
    });
    setEditingUser(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.prNo || !formData.username || !formData.email || !formData.phone || !formData.yearName || !formData.courseName) {
      showNotification('error', 'Please fill in all required fields');
      return;
    }

    if (!editingUser && !formData.password) {
      showNotification('error', 'Password is required for new users');
      return;
    }

    try {
      if (editingUser) {
        // Update existing user
        const updateData = { ...formData };
        delete updateData.password;
        delete updateData.id;
        
        const response = await api.put(`/adminuser/${editingUser.id}`, updateData);
        
        const updatedUser = {
          id: response.data._id,
          prNo: response.data.prNo,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          phone: response.data.phone,
          yearName: response.data.yearName,
          courseName: response.data.courseName,
          status: response.data.status,
          createdAt: response.data.createdAt ? response.data.createdAt.split('T')[0] : editingUser.createdAt
        };
        
        setUsers(prev => prev.map(user => 
          user.id === editingUser.id ? updatedUser : user
        ));
        showNotification('success', 'User updated successfully!');
      } else {
        // Add new user
        const createData = { ...formData };
        delete createData.id;
        
        const response = await api.post('/adminuser', createData);
        
        const newUser: User = {
          id: response.data._id,
          prNo: response.data.prNo,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          phone: response.data.phone,
          yearName: response.data.yearName,
          courseName: response.data.courseName,
          status: response.data.status,
          createdAt: response.data.createdAt ? response.data.createdAt.split('T')[0] : new Date().toISOString().split('T')[0]
        };
        
        setUsers(prev => [...prev, newUser]);
        showNotification('success', 'User added successfully!');
      }
    } catch (error: any) {
      console.error('Error saving user:', error);
      const errorMessage = error.response?.data?.error || 'Failed to save user. Please try again.';
      showNotification('error', errorMessage);
    }
    
    resetForm();
  };

  const handleEdit = (user: User) => {
    setFormData({ ...user, password: '' });
    setEditingUser(user);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/adminuser/${id}`);
      setUsers(prev => prev.filter(user => user.id !== id));
      setShowDeleteConfirm(null);
      showNotification('success', 'User deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting user:', error);
      const errorMessage = error.response?.data?.error || 'Failed to delete user. Please try again.';
      showNotification('error', errorMessage);
    }
  };

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'teacher': return 'bg-blue-100 text-blue-700';
      case 'student': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'teacher': return <Shield size={14} />;
      case 'student': return <GraduationCap size={14} />;
      default: return <User size={14} />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  const getStatusIcon = (status: string) => {
    return status === 'Active' ? <UserCheck size={14} /> : <UserX size={14} />;
  };

  // Show loading only on initial load
  if (initialLoad && loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
          <AdminHeader isCollapsed={isCollapsed} />
          
          <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Loading User Management</h3>
                <p className="text-gray-500">Please wait while we fetch your users...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <AdminHeader isCollapsed={isCollapsed} />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          {/* Notification */}
          {notification && (
            <div className={`fixed top-24 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
              notification.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center gap-2">
                {notification.type === 'success' ? (
                  <CheckCircle size={20} className="text-green-600" />
                ) : (
                  <AlertCircle size={20} className="text-red-600" />
                )}
                <span className="font-medium">{notification.message}</span>
              </div>
            </div>
          )}

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  User Management
                </h1>
                <p className="text-gray-600">Manage teachers and students, add new users, and update user information.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus size={16} />
                  <span className="hidden sm:inline">Add User</span>
                  <span className="sm:hidden">Add</span>
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

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
            <div className="grid grid-cols-1 gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search users, email, PR number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              {/* Filter Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Roles</option>
                  <option value="teacher">Teachers</option>
                  <option value="student">Students</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <div className="flex items-center justify-center sm:justify-start px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg">
                  {filteredUsers.length} of {users.length} users
                </div>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500 rounded-lg">
                  <Users className="text-white" size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Users List ({filteredUsers.length})
                </h2>
                {loading && !initialLoad && (
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                    <span className="text-sm text-gray-600">Refreshing...</span>
                  </div>
                )}
              </div>
            </div>

            {filteredUsers.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact Info
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Academic Info
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role & Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.username}</div>
                              <div className="text-sm text-gray-500">PR: {user.prNo}</div>
                              <div className="text-xs text-gray-400">Joined: {user.createdAt}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className="font-medium text-gray-900 flex items-center gap-1">
                                <Mail size={14} />
                                {user.email}
                              </div>
                              <div className="text-gray-500 flex items-center gap-1">
                                <Phone size={14} />
                                {user.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className="font-medium text-gray-900 flex items-center gap-1">
                                <BookOpen size={14} />
                                {user.courseName}
                              </div>
                              <div className="text-gray-500 flex items-center gap-1">
                                <GraduationCap size={14} />
                                {user.yearName}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <span className={`
                                inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full
                                ${getRoleColor(user.role)}
                              `}>
                                {getRoleIcon(user.role)}
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              </span>
                              <div>
                                <span className={`
                                  inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full
                                  ${getStatusColor(user.status)}
                                `}>
                                  {getStatusIcon(user.status)}
                                  {user.status}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEdit(user)}
                                className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                                title="Edit User"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(user.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete User"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden p-4 md:p-6">
                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{user.username}</h3>
                            <p className="text-sm text-gray-500">PR: {user.prNo}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`
                              inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full
                              ${getRoleColor(user.role)}
                            `}>
                              {getRoleIcon(user.role)}
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                            <span className={`
                              inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full
                              ${getStatusColor(user.status)}
                            `}>
                              {getStatusIcon(user.status)}
                              {user.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail size={14} />
                            <span className="truncate">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone size={14} />
                            <span>{user.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <BookOpen size={14} />
                            <span>{user.courseName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <GraduationCap size={14} />
                            <span>{user.yearName}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                          <span className="text-xs text-gray-500">Joined: {user.createdAt}</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleEdit(user)}
                              className="flex items-center gap-1 px-3 py-1 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-sm"
                            >
                              <Edit3 size={14} />
                              Edit
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(user.id)}
                              className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || selectedRole !== "all" || selectedStatus !== "all" 
                    ? "Try adjusting your search or filter criteria." 
                    : "Get started by adding your first user."}
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus size={16} />
                  Add User
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PR Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.prNo || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, prNo: e.target.value }))}
                    className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter PR number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.username || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div className={editingUser ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                {!editingUser && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={formData.password || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter password"
                      required={!editingUser}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.role || 'student'}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'teacher' | 'student' }))}
                    className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year/Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.yearName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, yearName: e.target.value }))}
                    className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select Year</option>
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                    <option value="N/A">N/A (for Teachers)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course/Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.courseName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value }))}
                    className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select Course</option>
                    {courseOptions.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                {editingUser && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.status || 'Active'}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'Active' | 'Inactive' }))}
                      className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Save size={16} />
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to permanently delete this user? This action cannot be undone and will remove all associated data.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}