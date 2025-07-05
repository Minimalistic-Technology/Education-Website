"use client";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import axios from "axios";
import Image from "next/image";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
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
  GraduationCap,
  Clock,
} from "lucide-react";

interface StudentProfile {
  _id?: string; // backend document _id
  personalInfo: {
    fullName: string;
    studentId: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    emergencyContact: string;
    bloodGroup: string;
  };
  academic: {
    program: string;
    year: string;
    semester: string;
    batch: string;
    advisor: string;
    enrollmentDate: string;
    expectedGraduation: string;
  };
  performance: {
    currentGPA: number;
  };
}

const StudentProfilePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<StudentProfile | null>(null);

  const studentId = "STU5678"; // 🔷 Replace with actual studentId, maybe from auth/session

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/students`);
        const student = res.data.find(
          (s: StudentProfile) => s.personalInfo.studentId === studentId
        );
        setProfile(student);
        setEditedProfile(student);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile", err);
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
    if (!editedProfile || !editedProfile._id) return;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/students/${editedProfile._id}`,
        editedProfile
      );
      setProfile(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile", err);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (
    section: keyof StudentProfile,
    field: string,
    value: string
  ) => {
    if (!editedProfile) return;

    setEditedProfile((prev) => {
      if (!prev) return prev;

      const sectionData = prev[section] as Record<string, any>;

      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value,
        },
      };
    });
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!profile) {
    return <div className="p-8 text-center">Profile not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <StudentHeader isCollapsed={isCollapsed} />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Profile</h1>
                <p className="text-gray-600">Manage your personal and academic information</p>
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
                  <Image
                    src="/images/prof.png"
                    alt="Profile Logo"
                    width={100}
                    height={100}
                    className="rounded-full shadow-md border-2 border-emerald-300"
                    priority
                  />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700 transition-colors">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.personalInfo.fullName}</h2>
                <p className="text-emerald-600 font-semibold mb-2">{profile.personalInfo.studentId}</p>
                <p className="text-gray-600">{profile.academic.program}</p>
                <p className="text-gray-500 text-sm">{profile.academic.year} • {profile.academic.semester}</p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                    <p className="text-gray-900 font-medium">{profile.personalInfo.studentId}</p>
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
                        className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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

            {/* Academic Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="text-emerald-600" size={20} />
                Academic Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                  <p className="text-gray-900 font-medium">{profile.academic.program}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Year</label>
                    <p className="text-gray-900">{profile.academic.year}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label>
                    <p className="text-gray-900">{profile.academic.semester}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
                    <p className="text-gray-900">{profile.academic.batch}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Advisor</label>
                    <p className="text-gray-900">{profile.academic.advisor}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Clock size={14} />
                      Enrollment Date
                    </label>
                    <p className="text-gray-900">{new Date(profile.academic.enrollmentDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Graduation</label>
                    <p className="text-gray-900">{new Date(profile.academic.expectedGraduation).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Academic Performance Details */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Academic Performance</h4>
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <div className="text-lg font-bold text-emerald-700">{profile.performance.currentGPA}/5.0</div>
                    <div className="text-sm text-emerald-600">Current CGPA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentProfilePage;