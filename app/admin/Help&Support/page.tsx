'use client';
import React, { useState, useEffect } from 'react';
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Calendar,
  Filter,
  Search,
  Eye,
  MessageCircle,
  Send,
  Archive,
  Flag,
  MoreHorizontal,
  Download,
  RefreshCw
} from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  student: {
    name: string;
    email: string;
    id: string;
    course: string;
  };
  category: 'Technical' | 'Academic' | 'Administrative' | 'Financial';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  responses: Array<{
    id: string;
    message: string;
    sender: 'student' | 'admin';
    senderName: string;
    timestamp: string;
  }>;
}

const AdminHelpSupport = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [responseMessage, setResponseMessage] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - in real app, this would come from API
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TKT-001',
      title: 'Unable to access online exam portal',
      description: 'I am trying to access the online exam portal for my Computer Networks exam, but I keep getting an error message saying "Access Denied". I have tried multiple browsers and cleared my cache, but the issue persists. The exam is scheduled for tomorrow and I am very worried.',
      student: {
        name: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        id: 'STU-2025-001',
        course: 'Computer Science'
      },
      category: 'Technical',
      priority: 'urgent',
      status: 'open',
      createdAt: '2025-05-15T10:30:00Z',
      updatedAt: '2025-05-15T10:30:00Z',
      responses: []
    },
    {
      id: 'TKT-002',
      title: 'Grade discrepancy in Mathematics course',
      description: 'I believe there is an error in my final grade calculation for Mathematics. According to my records, I should have received a higher grade based on my assignment and exam scores.',
      student: {
        name: 'Sarah Davis',
        email: 'sarah.davis@university.edu',
        id: 'STU-2025-002',
        course: 'Engineering'
      },
      category: 'Academic',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '2025-05-14T14:20:00Z',
      updatedAt: '2025-05-15T09:15:00Z',
      assignedTo: 'Dr. Sarah Wilson',
      responses: [
        {
          id: 'RES-001',
          message: 'Thank you for bringing this to our attention. I will review your grade calculation and get back to you within 24 hours.',
          sender: 'admin',
          senderName: 'Dr. Sarah Wilson',
          timestamp: '2025-05-15T09:15:00Z'
        }
      ]
    },
    {
      id: 'TKT-003',
      title: 'Request for transcript',
      description: 'I need an official transcript for my job application. Please let me know the process and timeline for obtaining this document.',
      student: {
        name: 'Michael Chen',
        email: 'michael.chen@university.edu',
        id: 'STU-2025-003',
        course: 'Business Administration'
      },
      category: 'Administrative',
      priority: 'low',
      status: 'resolved',
      createdAt: '2025-05-13T11:45:00Z',
      updatedAt: '2025-05-14T16:30:00Z',
      assignedTo: 'Admin Staff',
      responses: [
        {
          id: 'RES-002',
          message: 'You can request an official transcript through the student portal. Go to Documents > Request Transcript. Processing time is 3-5 business days.',
          sender: 'admin',
          senderName: 'Admin Staff',
          timestamp: '2025-05-14T16:30:00Z'
        },
        {
          id: 'RES-003',
          message: 'Thank you for the information. I have submitted the request.',
          sender: 'student',
          senderName: 'Michael Chen',
          timestamp: '2025-05-14T16:45:00Z'
        }
      ]
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technical': return <AlertCircle size={16} />;
      case 'Academic': return <MessageSquare size={16} />;
      case 'Administrative': return <User  size={16} />;
      case 'Financial': return <Clock size={16} />;
      default: return <MessageSquare size={16} />;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesTab = activeTab === 'all' || ticket.status === activeTab;
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || ticket.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    
    return matchesTab && matchesSearch && matchesCategory && matchesPriority;
  });

  const getTicketCounts = () => {
    return {
      all: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      'in-progress': tickets.filter(t => t.status === 'in-progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length
    };
  };

  const handleSendResponse = () => {
    if (!selectedTicket || !responseMessage.trim()) return;

    const newResponse = {
      id: `RES-${Date.now()}`,
      message: responseMessage,
      sender: 'admin' as const,
      senderName: 'Dr. Sarah Wilson',
      timestamp: new Date().toISOString()
    };

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          responses: [...ticket.responses, newResponse],
          status: 'in-progress' as const,
          updatedAt: new Date().toISOString(),
          assignedTo: 'Dr. Sarah Wilson'
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    setSelectedTicket({
      ...selectedTicket,
      responses: [...selectedTicket.responses, newResponse],
      status: 'in-progress',
      updatedAt: new Date().toISOString(),
      assignedTo: 'Dr. Sarah Wilson'
    });
    setResponseMessage('');
  };

  const handleStatusChange = (ticketId: string, newStatus: 'open' | 'in-progress' | 'resolved' | 'closed') => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
    }
  };

  const counts = getTicketCounts();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <AdminHeader isCollapsed={isCollapsed} />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Help & Support Management</h1>
                <p className="text-gray-600">Manage student support tickets and provide assistance</p>
              </div>
              {/* <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <RefreshCw size={16} />
                  Refresh
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download size={16} />
                  Export
                </button>
              </div> */}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">{counts.all}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">{counts.open}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{counts['in-progress']}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-gray-900">{counts.resolved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tickets List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { key: 'all', label: 'All Tickets', count: counts.all },
                      { key: 'open', label: 'Open', count: counts.open },
                      { key: 'in-progress', label: 'In Progress', count: counts['in-progress'] },
                      { key: 'resolved', label: 'Resolved', count: counts.resolved }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.key
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Search and Filters */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tickets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Filter size={16} />
                      Filters
                    </button>
                  </div>

                  {/* Filter Options */}
                  {showFilters && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="all">All Categories</option>
                          <option value="Technical">Technical</option>
                          <option value="Academic">Academic</option>
                          <option value="Administrative">Administrative</option>
                          <option value="Financial">Financial</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select
                          value={filterPriority}
                          onChange={(e) => setFilterPriority(e.target.value)}
                          className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="all">All Priorities</option>
                          <option value="urgent">Urgent</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tickets List */}
                <div className="divide-y divide-gray-200">
                  {filteredTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedTicket?.id === ticket.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-medium text-gray-500">{ticket.id}</span>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                              <Flag size={12} />
                              {ticket.priority.toUpperCase()}
                            </span>
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                              {ticket.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-2">{ticket.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {ticket.student.name}
                        </div>
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(ticket.category)}
                          {ticket.category}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {ticket.responses.length > 0 && (
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <MessageCircle size={14} />
                          {ticket.responses.length}
                        </span>
                      )}
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <MoreHorizontal size={16} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTickets.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Ticket Details */}
        <div className="lg:col-span-1">
          {selectedTicket ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Ticket Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">{selectedTicket.title}</h2>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedTicket.priority)}`}>
                        <Flag size={12} />
                        {selectedTicket.priority.toUpperCase()}
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </button>
                </div>

                {/* Student Info */}
                <div className="bg-gray-50 text-gray-500 rounded-lg p-4 mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Student Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-900">Name:</span> {selectedTicket.student.name}</p>
                    <p><span className="text-gray-900">Email:</span> {selectedTicket.student.email}</p>
                    <p><span className="text-gray-900">ID:</span> {selectedTicket.student.id}</p>
                    <p><span className="text-gray-900">Course:</span> {selectedTicket.student.course}</p>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="flex gap-2">
                  <select
                    value={selectedTicket.status}
                    onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value as any)}
                    className="flex-1 px-3 py-2 border text-gray-700 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button className="p-2 border border-gray-400 rounded-lg hover:bg-gray-50">
                    <Archive size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Ticket Description */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedTicket.description}</p>
                <div className="mt-3 text-xs text-gray-500">
                  Created: {new Date(selectedTicket.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Conversation */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Conversation</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {selectedTicket.responses.map((response) => (
                    <div
                      key={response.id}
                      className={`flex ${response.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        response.sender === 'admin'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{response.message}</p>
                        <div className={`text-xs mt-1 ${
                          response.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {response.senderName} • {new Date(response.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Form */}
              <div className="p-6">
                <div className="space-y-4">
                  <textarea
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    placeholder="Type your response..."
                    rows={4}
                    className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSendResponse}
                      disabled={!responseMessage.trim()}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send size={16} />
                      Send Response
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-12">
                <Eye className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Ticket</h3>
                <p className="text-gray-500">Choose a ticket from the list to view details and respond</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  </div>
</div>
  );
};

export default AdminHelpSupport;