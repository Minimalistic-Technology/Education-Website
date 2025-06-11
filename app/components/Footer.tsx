"use client";
import React, { useState } from 'react';
import { MapPin, Facebook, Youtube, Linkedin, Instagram } from 'lucide-react';

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
    // Handle form submission logic here
    alert('Thank you for your message!');
  };

  const handleNewsletterSubmit = () => {
    console.log('Newsletter signup:', formData.newsletter);
    // Handle newsletter subscription logic here
    alert('Successfully subscribed to newsletter!');
  };

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* College Information */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">XYZ Committee</h3>
            <div className="space-y-2 text-sm leading-relaxed">
              <p className="font-medium">Minimalistic Education of Arts, Science & Commerce (Autonomous)</p>
              <p>Address! xyzhkdgsfgfsgg</p>
              
              <div className="mt-4 space-y-2">
                <p className="text-yellow-300">Affiliated by University of ABC & Recognized by Govt. of IND</p>
                <p className="text-yellow-300">Accredited by N88C with 'A' Grade with CGPA of 5</p>
              </div>
              
              <div className="mt-4 space-y-1">
                <p><span className="font-medium">Tel:</span> 92xxxxxxx / 92xxxxxx</p>
                <p><span className="font-medium">Email:</span> hi@Minimalistticedu.in</p>
              </div>
            </div>
          </div>

          {/* Map & Important Links */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <h4 className="text-lg font-semibold">Map & Direction</h4>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Important Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">About M Edu.</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Infrastructure</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Admission</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Exams</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Faculty</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">College Reports</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Awards & Recognitions</a></li>
              </ul>
            </div>
          </div>

          {/* Media & Others */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">Media</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Picture Gallery</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Video Gallery</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">College Magazine</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">YouTube Channel</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Others</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">NSS</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">NCC</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">DLLE</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Get in touch with us:</h4>

            <div className="space-y-3 mb-6">
                <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-full text-gray-800 bg-white border border-blue-900 focus:outline-none focus:ring-2 focus:ring-[#f7941d]"
                />
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-full text-gray-800 bg-white border border-blue-900 focus:outline-none focus:ring-2 focus:ring-[#f7941d]"
                />
                <input
                type="tel"
                name="contact"
                placeholder="Contact number"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-full text-gray-800 bg-white border border-blue-900 focus:outline-none focus:ring-2 focus:ring-[#f7941d]"
                />
                <button
                onClick={handleSubmit}
                className="bg-[#f7941d] hover:bg-orange-600 text-black font-semibold px-8 py-2 rounded-full transition-colors"
                >
                Submit
                </button>
            </div>

            {/* Newsletter Signup */}
            {/* <div className="flex gap-2">
                <input
                type="email"
                name="newsletter"
                placeholder="Signup to our newsletter"
                value={formData.newsletter}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2 rounded-full text-gray-800 bg-white border border-blue-900 focus:outline-none focus:ring-2 focus:ring-[#f7941d]"
                />
                <button
                onClick={handleNewsletterSubmit}
                className="bg-[#f7941d] hover:bg-orange-600 text-black font-semibold px-6 py-2 rounded-full transition-colors"
                >
                Subscribe
                </button>
            </div> */}

            {/* Social Media Icons */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-black hover:bg-gray-800 p-2 rounded transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="bg-red-600 hover:bg-red-700 p-2 rounded transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="bg-blue-700 hover:bg-blue-800 p-2 rounded transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-2 rounded transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 bg-opacity-50 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 text-center md:text-left">
            MINIMALISTIC EDUCATION OF ARTS, SCIENCE & COMMERCE . ALL RIGHTS RESERVED
          </p>
          <p className="text-sm text-gray-300 mt-2 md:mt-0">
            Designed & Developed By <span className="text-yellow-400 font-medium">Minimalistic Technology</span>
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded-full shadow-lg transition-colors z-50"
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;