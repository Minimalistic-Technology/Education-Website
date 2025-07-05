"use client";
import React, { useState } from 'react';
import { MapPin, Facebook, Youtube, Linkedin, Instagram, Twitter, Mail, Phone, ArrowUp } from 'lucide-react';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    newsletter: ''
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out! We\'ll get back to you soon.');
  };

  const handleNewsletterSubmit = () => {
    console.log('Newsletter signup:', formData.newsletter);
    alert('Successfully subscribed to our newsletter!');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Platform Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg mr-3">
                <span className="text-sm font-bold text-white">EL</span>
              </div>
              <h3 className="text-lg font-bold">EduLearn Platform</h3>
            </div>
            <div className="space-y-2 text-sm leading-relaxed">
              <p className="font-medium">Your Gateway to Quality Education</p>
              <p className="text-gray-300">Empowering learners worldwide with innovative educational solutions and expert-led courses.</p>
              
              <div className="mt-4 space-y-2">
                <p className="text-orange-300 font-medium">🏆 Award-Winning Platform</p>
                <p className="text-orange-300 font-medium">🌍 Available in 25+ Countries</p>
              </div>
              
              <div className="mt-4 space-y-1">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>support@edulearn.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Resources */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-orange-400" />
                <h4 className="text-lg font-semibold">Learning Hub</h4>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Popular Categories</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-300 transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Data Science</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Business Skills</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Design & Arts</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Language Learning</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Personal Development</a></li>
              </ul>
            </div>
          </div>

          {/* Support & Community */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">Student Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-300 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Live Chat Support</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Course Forums</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Study Groups</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Career Services</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-300 transition-colors">Student Stories</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Events & Webinars</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Form & Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>

            <div className="space-y-3 mb-6">
                <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
                />
                <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
                />
                <input
                type="tel"
                name="contact"
                placeholder="Phone Number"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
                />
                <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                Send Message
                </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-600 hover:bg-slate-700 p-3 rounded-lg transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-red-600 hover:bg-red-700 p-3 rounded-lg transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="bg-blue-700 hover:bg-blue-800 p-3 rounded-lg transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-3 rounded-lg transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-slate-900 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 text-center md:text-left mb-4 md:mb-0">
            © 2025 EduLearn Platform. All rights reserved. | Privacy Policy | Terms of Service
          </p>
          <p className="text-sm text-gray-300 mt-2 md:mt-0">
            Designed & Developed By <span className="text-yellow-400 font-medium">Minimalistic Technology</span></p>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;