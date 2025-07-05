"use client";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import { 
  Calendar,
  Clock,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Search,
  AlertCircle,
  CheckCircle,
  BookOpen,
  User,
  Filter,
  Download,
  Eye,
  MapPin,
  Timer
} from "lucide-react";

interface ScheduleEntry {
  _id: string;
  days: string[];
  subject: string;
  startTime: string;
  endTime: string;
  faculty: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSchedule() {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ScheduleEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<ScheduleEntry>>({
    days: [],
    subject: '',
    startTime: '',
    endTime: '',
    faculty: ''
  });

  // Day order for proper sorting
  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await api.get("schedules");
      setScheduleEntries(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      showNotification('error', 'Unable to fetch schedules');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const resetForm = () => {
    setFormData({
      days: [],
      subject: '',
      startTime: '',
      endTime: '',
      faculty: ''
    });
    setEditingEntry(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.days?.length || !formData.subject || !formData.startTime || !formData.endTime || !formData.faculty) {
      showNotification('error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (editingEntry) {
        await api.put("/schedule/${editingEntry._id}", {
          days: formData.days,
          subject: formData.subject,
          startTime: formData.startTime,
          endTime: formData.endTime,
          faculty: formData.faculty,
        });
        showNotification('success', 'Schedule entry updated successfully!');
      } else {
        await api.post("/schedule", {
          days: formData.days,
          subject: formData.subject,
          startTime: formData.startTime,
          endTime: formData.endTime,
          faculty: formData.faculty,
        });
        showNotification('success', 'Schedule entry added successfully!');
      }
      fetchSchedules();
      resetForm();
    } catch (error) {
      console.error("Error saving schedule entry:", error);
      showNotification('error', 'Unable to save schedule entry');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;

    setLoading(true);
    try {
      await api.delete("/schedule/${showDeleteConfirm}");
      setScheduleEntries(prev => prev.filter(entry => entry._id !== showDeleteConfirm));
      showNotification('success', 'Schedule entry deleted successfully!');
    } catch (error) {
      console.error("Error deleting schedule entry:", error);
      showNotification('error', 'Unable to delete schedule entry');
    } finally {
      setLoading(false);
      setShowDeleteConfirm(null);
    }
  };

  const handleEdit = (entry: ScheduleEntry) => {
    setFormData(entry);
    setEditingEntry(entry);
    setShowAddForm(true);
  };

  // Enhanced filtering and sorting function
  const getFilteredAndSortedEntries = () => {
    let filtered = scheduleEntries.filter(entry => {
      const matchesSearch = entry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entry.faculty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDay = selectedDay === "all" || entry.days.includes(selectedDay);
      return matchesSearch && matchesDay;
    });

    // Sort by day (Monday first) and then by start time
    return filtered.sort((a, b) => {
      // Get the first day for each entry for sorting
      const dayA = a.days[0];
      const dayB = b.days[0];
      
      const dayIndexA = dayOrder.indexOf(dayA);
      const dayIndexB = dayOrder.indexOf(dayB);
      
      if (dayIndexA !== dayIndexB) {
        return dayIndexA - dayIndexB;
      }
      
      // If same day, sort by start time
      return a.startTime.localeCompare(b.startTime);
    });
  };

  const filteredEntries = getFilteredAndSortedEntries();

  // Function to format days display
  const formatDays = (days: string[]) => {
    if (days.length === 0) return '';
    if (days.length === 1) return days[0];
    
    // Sort days according to week order
    const sortedDays = days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    
    if (sortedDays.length <= 3) {
      return sortedDays.join(', ');
    }
    
    return `${sortedDays.slice(0, 2).join(', ')} +${sortedDays.length - 2} more`;
  };

  // Function to get day color
  const getDayColor = (day: string) => {
    const colors = {
      'Monday': 'bg-blue-100 text-blue-700',
      'Tuesday': 'bg-green-100 text-green-700',
      'Wednesday': 'bg-purple-100 text-purple-700',
      'Thursday': 'bg-orange-100 text-orange-700',
      'Friday': 'bg-red-100 text-red-700',
      'Saturday': 'bg-yellow-100 text-yellow-700',
      'Sunday': 'bg-pink-100 text-pink-700'
    };
    return colors[day as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  // Stats calculation
  const stats = [
    {
      title: "Total Schedules",
      value: scheduleEntries.length.toString(),
      icon: <Calendar className="text-blue-500" size={24} />,
      change: "Active entries",
      color: "from-blue-500/10 to-blue-600/10 border-blue-200"
    },
    {
      title: "Unique Subjects",
      value: new Set(scheduleEntries.map(e => e.subject)).size.toString(),
      icon: <BookOpen className="text-green-500" size={24} />,
      change: "Different courses",
      color: "from-green-500/10 to-green-600/10 border-green-200"
    },
    {
      title: "Faculty Members",
      value: new Set(scheduleEntries.map(e => e.faculty)).size.toString(),
      icon: <User className="text-purple-500" size={24} />,
      change: "Teaching staff",
      color: "from-purple-500/10 to-purple-600/10 border-purple-200"
    },
    {
      title: "Weekly Classes",
      value: scheduleEntries.reduce((acc, entry) => acc + entry.days.length, 0).toString(),
      icon: <Timer className="text-orange-500" size={24} />,
      change: "Per week",
      color: "from-orange-500/10 to-orange-600/10 border-orange-200"
    }
  ];

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
                  Schedule Management
                </h1>
                <p className="text-gray-600">Manage class schedules, organize timetables, and coordinate faculty assignments.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus size={16} />
                  Add Schedule
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search subjects, faculty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Days</option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {filteredEntries.length} of {scheduleEntries.length} entries
                </span>
              </div>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500 rounded-lg">
                  <Calendar className="text-white" size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Class Schedule ({filteredEntries.length})
                </h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <span className="ml-2 text-gray-600">Loading schedules...</span>
                </div>
              ) : filteredEntries.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Days & Schedule
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Faculty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEntries.map((entry) => (
                      <tr key={entry._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {entry.days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)).map((day, idx) => (
                              <span
                                key={idx}
                                className={`px-2 py-1 text-sm font-medium rounded-full ${getDayColor(day)}`}
                              >
                                {day.substring(0,9)}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{entry.subject}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Clock size={14} className="text-gray-400" />
                            {entry.startTime} - {entry.endTime}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <User size={14} className="text-gray-400" />
                            {entry.faculty}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(entry)}
                              className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(entry._id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No schedule entries found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || selectedDay !== "all" 
                      ? "Try adjusting your search or filter criteria." 
                      : "Get started by adding your first schedule entry."}
                  </p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus size={16} />
                    Add Schedule Entry
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingEntry ? 'Edit Schedule Entry' : 'Add New Schedule Entry'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="font-bold text-red-600 hover:text-black hover:bg-red-400 " />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block font-bold text-gray-700 mb-2">
                    Days <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {daysOfWeek.map((day) => (
                      <label key={day} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.days?.includes(day) || false}
                          onChange={(e) => {
                            const updatedDays = e.target.checked
                              ? [...(formData.days || []), day]
                              : (formData.days || []).filter(d => d !== day);
                            setFormData(prev => ({ ...prev, days: updatedDays }));
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-700">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter subject name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-bold text-gray-700 mb-2">
                      Start Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={formData.startTime || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-2">
                      End Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={formData.endTime || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                      className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-2">
                    Faculty Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.faculty || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, faculty: e.target.value }))}
                    className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter faculty name"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save size={16} />
                  )}
                  {editingEntry ? 'Update Entry' : 'Add Entry'}
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
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this schedule entry? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}