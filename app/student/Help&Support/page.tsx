'use client';
import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Plus,
  Search,
  Send,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface Ticket {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: string;
  updatedAt: string;
  responses?: { sender: string; message: string; timestamp: string; }[];
}

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'create' | 'faq' | 'contact'>('tickets');
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // State for API data
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // New ticket form state
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'Technical',
    priority: 'medium' as const
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: ''
  });

  useEffect(() => {
    fetchTickets();
    fetchFaqs();

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get<Ticket[]>('/tickets');
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFaqs = async () => {
    try {
      const res = await api.get<FAQ[]>('/faqs');
      setFaqs(res.data);
    } catch (err) {
      console.error("Failed to fetch FAQs", err);
    }
  };

  const handleCreateTicket = async () => {
    if (!newTicket.title || !newTicket.description) return;

    try {
      setLoading(true);
      const res = await api.post<Ticket>('/tickets', newTicket);
      setTickets([res.data, ...tickets]);
      setNewTicket({ title: '', description: '', category: 'Technical', priority: 'medium' });
      setActiveTab('tickets');
    } catch (err) {
      console.error("Failed to create ticket", err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject || !contactForm.message) return;

    try {
      setLoading(true);
      // Assuming you have a contact endpoint
      await api.post('/contact', contactForm);
      setContactForm({ subject: '', message: '' });
      alert('Message sent successfully!');
    } catch (err) {
      console.error("Failed to send message", err);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
      case 'Open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertCircle size={16} />;
      case 'In Progress': return <Clock size={16} />;
      case 'Closed': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <StudentHeader isCollapsed={isCollapsed} />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
            <p className="text-gray-600">Get help with your questions, report issues, or contact support</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-gray-100 rounded-lg mb-6">
            {[
              { id: 'tickets', label: 'My Tickets', icon: <MessageSquare size={16} /> },
              { id: 'create', label: 'Create Ticket', icon: <Plus size={16} /> },
              { id: 'faq', label: 'FAQ', icon: <HelpCircle size={16} /> },
              { id: 'contact', label: 'Contact', icon: <Phone size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* My Tickets Tab */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 text-gray-700 border border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading tickets...</p>
                </div>
              )}

              {/* Tickets List */}
              <div className="space-y-4">
                {!loading && filteredTickets.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
                    <p className="text-gray-500 mb-4">
                      {searchTerm || filterStatus !== 'all' 
                        ? 'Try adjusting your search or filter criteria'
                        : 'You haven\'t created any support tickets yet'
                      }
                    </p>
                    <button
                      onClick={() => setActiveTab('create')}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Create Your First Ticket
                    </button>
                  </div>
                ) : (
                  filteredTickets.map((ticket) => (
                    <div key={ticket._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                            <span className="text-sm text-gray-500">#{ticket._id.slice(-6)}</span>
                          </div>
                          <p className="text-gray-600 mb-3">{ticket.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                              {getStatusIcon(ticket.status)}
                              {ticket.status.toUpperCase()}
                            </span>
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority.toUpperCase()} PRIORITY
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                              {ticket.category}
                            </span>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>Created: {new Date(ticket.createdAt).toLocaleDateString()}</div>
                          <div>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                      
                      {/* Responses */}
                      {ticket.responses && ticket.responses.length > 0 && (
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="font-medium text-gray-900 mb-3">Latest Response:</h4>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-emerald-700">{ticket.responses[0].sender}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(ticket.responses[0].timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700">{ticket.responses[0].message}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Create Ticket Tab */}
          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Support Ticket</h2>
                
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleCreateTicket(); }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                      placeholder="Brief description of your issue"
                      className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={newTicket.category}
                        onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                        className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="Technical">Technical Issue</option>
                        <option value="Academic">Academic Query</option>
                        <option value="Administrative">Administrative</option>
                        <option value="Financial">Financial</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={newTicket.priority}
                        onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as any })}
                        className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                      placeholder="Please provide detailed information about your issue..."
                      rows={6}
                      className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Creating...' : 'Create Ticket'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewTicket({ title: '', description: '', category: 'Technical', priority: 'medium' })}
                      className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div key={faq._id} className="bg-white border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFAQ === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-6 pb-4 border-t border-gray-200">
                        <div className="pt-4 text-gray-700">
                          {faq.answer}
                        </div>
                        <div className="mt-3">
                          <span className="inline-flex px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQ found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Phone className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Phone Support</h3>
                      <p className="text-gray-600 mb-2">Available 24/7 for urgent issues</p>
                      <p className="text-emerald-600 font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Email Support</h3>
                      <p className="text-gray-600 mb-2">Response within 24 hours</p>
                      <p className="text-blue-600 font-medium">support@university.edu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Office Hours</h3>
                      <p className="text-gray-600 mb-2">Student Support Center</p>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                        <p>Saturday: 9:00 AM - 5:00 PM</p>
                        <p>Sunday: 12:00 PM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="font-medium text-red-900 mb-2">Emergency Contact</h3>
                  <p className="text-red-700 text-sm mb-2">
                    For urgent technical issues during exams or critical situations
                  </p>
                  <p className="text-red-800 font-medium">Emergency Hotline: +1 (555) 999-0911</p>
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Contact</h2>
                
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      defaultValue="Alex Johnson"
                      className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue="alex.johnson@university.edu"
                      className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="Brief subject line"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Your message..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HelpSupport;