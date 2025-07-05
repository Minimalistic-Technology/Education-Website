'use client';
import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3, 
  Camera, 
  Save, 
  X,
  Shield,
  Clock,
  Building,
  Award,
  Users,
  Key
} from 'lucide-react';

interface AdminProfile {
  _id: string;
  personalInfo: {
    fullName: string;
    employeeId: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    emergencyContact: string;
    bloodGroup: string;
  };
  professional: {
    jobTitle: string;
    department: string;
    reportingManager: string;
    employmentType: string;
    joiningDate: string;
    yearsOfExperience: number;
    officeLocation: string;
    workHours: string;
  };
  administrative: {
    accessLevel: string;
    permissions: string[];
    managedDepartments: string[];
    directReports: number;
    systemRoles: string[];
  };
}

const AdminProfilePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fetch admin profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admins');
        const firstAdmin = res.data[0];
        setProfile(firstAdmin);
        setEditedProfile(firstAdmin);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch admin profile", err);
        setError("Failed to load admin profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = async () => {
    if (!editedProfile?._id) return;
    try {
      const res = await api.put(
        `/admins/${editedProfile._id}`,
        editedProfile
      );
      setProfile(res.data);
      setEditedProfile(res.data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error("Failed to save admin profile", err);
      setError("Failed to save changes. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (
    section: keyof Omit<AdminProfile, '_id'>,
    field: string,
    value: string | number
  ) => {
    setEditedProfile((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
          <AdminHeader isCollapsed={isCollapsed} />
          <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading admin profile...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
          <AdminHeader isCollapsed={isCollapsed} />
          <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-red-600 text-lg mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Retry
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
          <AdminHeader isCollapsed={isCollapsed} />
          <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="text-gray-400 text-6xl mb-4">👤</div>
                <p className="text-gray-600 text-lg">No admin profile found</p>
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
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Administrator Profile</h1>
                <p className="text-gray-600">Manage your professional and administrative information</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex gap-3">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Picture Section */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={32} />
                  </div>
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700 transition-colors">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.personalInfo.fullName}</h2>
                <p className="text-emerald-600 font-semibold mb-2">{profile.personalInfo.employeeId}</p>
                <p className="text-gray-600">{profile.professional.jobTitle}</p>
                <p className="text-gray-500 text-sm">{profile.professional.department}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <Shield className="text-amber-500" size={16} />
                  <span className="text-amber-700 font-medium">{profile.administrative.accessLevel}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="text-emerald-600" size={20} />
                Personal Information
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile?.personalInfo.fullName || ''}
                        onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                        className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profile.personalInfo.fullName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                    <p className="text-gray-900 font-medium">{profile.personalInfo.employeeId}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Mail size={14} />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile?.personalInfo.email || ''}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.personalInfo.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Phone size={14} />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile?.personalInfo.phone || ''}
                        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                        className="w-full px-3 py-2 text-gray-600  border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.personalInfo.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Calendar size={14} />
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedProfile?.personalInfo.dateOfBirth || ''}
                        onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{new Date(profile.personalInfo.dateOfBirth).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <MapPin size={14} />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editedProfile?.personalInfo.address || ''}
                      onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.personalInfo.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile?.personalInfo.emergencyContact || ''}
                        onChange={(e) => handleInputChange('personalInfo', 'emergencyContact', e.target.value)}
                        className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.personalInfo.emergencyContact}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    {isEditing ? (
                      <select
                        value={editedProfile?.personalInfo.bloodGroup || ''}
                        onChange={(e) => handleInputChange('personalInfo', 'bloodGroup', e.target.value)}
                        className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{profile.personalInfo.bloodGroup}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building className="text-emerald-600" size={20} />
                Professional Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.professional.jobTitle || ''}
                      onChange={(e) => handleInputChange('professional', 'jobTitle', e.target.value)}
                      className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profile.professional.jobTitle}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.professional.department || ''}
                      onChange={(e) => handleInputChange('professional', 'department', e.target.value)}
                      className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.professional.department}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Manager</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.professional.reportingManager || ''}
                      onChange={(e) => handleInputChange('professional', 'reportingManager', e.target.value)}
                      className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.professional.reportingManager}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                    {isEditing ? (
                      <select
                        value={editedProfile?.professional.employmentType || ''}
                        onChange={(e) => handleInputChange('professional', 'employmentType', e.target.value)}
                        className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option>Full-time Permanent</option>
                        <option>Full-time Contract</option>
                        <option>Part-time</option>
                        <option>Consultant</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{profile.professional.employmentType}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Clock size={14} />
                      Joining Date
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedProfile?.professional.joiningDate || ''}
                        onChange={(e) => handleInputChange('professional', 'joiningDate', e.target.value)}
                        className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{new Date(profile.professional.joiningDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Award size={14} />
                      Years of Experience
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedProfile?.professional.yearsOfExperience || ''}
                        onChange={(e) => handleInputChange('professional', 'yearsOfExperience', parseInt(e.target.value))}
                        className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.professional.yearsOfExperience} years</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Office Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile?.professional.officeLocation || ''}
                        onChange={(e) => handleInputChange('professional', 'officeLocation', e.target.value)}
                        className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.professional.officeLocation}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Hours</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.professional.workHours || ''}
                      onChange={(e) => handleInputChange('professional', 'workHours', e.target.value)}
                      className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.professional.workHours}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Administrative Information - Full Width */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="text-emerald-600" size={20} />
              Administrative Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Key size={14} />
                  Access Level
                </label>
                <div className="flex items-center gap-2">
                  <Shield className="text-amber-500" size={16} />
                  <span className="text-amber-700 font-semibold">{profile.administrative.accessLevel}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Users size={14} />
                  Direct Reports
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile?.administrative.directReports || ''}
                    onChange={(e) => handleInputChange('administrative', 'directReports', parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profile.administrative.directReports} staff members</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Managed Departments</label>
                <p className="text-gray-900">{profile.administrative.managedDepartments.length} departments</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">System Permissions</label>
                <div className="space-y-2">
                  {profile.administrative.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-emerald-700">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">System Roles</label>
                <div className="space-y-2">
                  {profile.administrative.systemRoles.map((role, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-blue-700">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Managed Departments</label>
              <div className="flex flex-wrap gap-2">
                {profile.administrative.managedDepartments.map((dept, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProfilePage;