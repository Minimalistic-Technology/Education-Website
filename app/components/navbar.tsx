// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { FaHome, FaChevronDown, FaPhone, FaEnvelope, FaUser } from "react-icons/fa";
// import { FiSearch, FiMenu, FiX } from "react-icons/fi";

// interface NavSubItem {
//   name: string;
//   href: string;
// }

// interface NavItem {
//   name: string;
//   href: string;
//   hasDropdown: boolean;
//   items?: NavSubItem[];
// }

// export default function Navbar() {
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [quickLinksOpen, setQuickLinksOpen] = useState<boolean>(false);

//   const quickLinks: NavSubItem[] = [
//     { name: "Student Portal", href: "/login" },
//     { name: "Library", href: "/library" },
//     { name: "Online Admission", href: "/online-admission" },
//     { name: "Fee Payment", href: "/fee-payment" },
//     { name: "Academic Calendar", href: "/academic-calendar" },
//     { name: "Results", href: "/results" },
//     { name: "Grievance Portal", href: "/grievance-portal" }
//   ];

//   const navItems: NavItem[] = [
//     {
//       name: "About Us",
//       href: "/about-us",
//       hasDropdown: true,
//       items: [
//         { name: "History", href: "/about-us/history" },
//         { name: "Vision & Mission", href: "/about-us/vision-mission" },
//         { name: "Management", href: "/about-us/management" },
//         { name: "Principal's Message", href: "/about-us/principals-message" },
//         { name: "Faculty", href: "/about-us/faculty" }
//       ]
//     },
//     {
//       name: "Academics",
//       href: "/academics",
//       hasDropdown: true,
//       items: [
//         { name: "Undergraduate Courses", href: "/academics/undergraduate" },
//         { name: "Postgraduate Courses", href: "/academics/postgraduate" },
//         { name: "Academic Calendar", href: "/academics/academic-calendar" },
//         { name: "Syllabus", href: "/academics/syllabus" }
//       ]
//     },
//     {
//       name: "Examination",
//       href: "/examination",
//       hasDropdown: false
//     },
//     {
//       name: "Admission & Fee",
//       href: "/admission-fee",
//       hasDropdown: true,
//       items: [
//         { name: "Admission Process", href: "/admission-fee/process" },
//         { name: "Fee Structure", href: "/admission-fee/fee-structure" },
//         { name: "Eligibility Criteria", href: "/admission-fee/eligibility" },
//         { name: "Important Dates", href: "/admission-fee/important-dates" }
//       ]
//     },
//     {
//       name: "Research",
//       href: "/research",
//       hasDropdown: true,
//       items: [
//         { name: "Research Projects", href: "/research/projects" },
//         { name: "Publications", href: "/research/publications" },
//         { name: "Research Facilities", href: "/research/facilities" },
//         { name: "PhD Programs", href: "/research/phd-programs" }
//       ]
//     },
//     {
//       name: "Student Life",
//       href: "/student-life",
//       hasDropdown: true,
//       items: [
//         { name: "Student Activities", href: "/student-life/activities" },
//         { name: "Sports", href: "/student-life/sports" },
//         { name: "Cultural Events", href: "/student-life/cultural-events" },
//         { name: "Clubs & Societies", href: "/student-life/clubs-societies" }
//       ]
//     },
//     {
//       name: "Alumni",
//       href: "/alumni",
//       hasDropdown: false
//     },
//     {
//       name: "Information Corner",
//       href: "/information-corner",
//       hasDropdown: true,
//       items: [
//         { name: "Notices", href: "/information-corner/notices" },
//         { name: "Events", href: "/information-corner/events" },
//         { name: "News", href: "/information-corner/news" },
//         { name: "Downloads", href: "/information-corner/downloads" },
//         { name: "Tenders", href: "/information-corner/tenders" }
//       ]
//     },
//     {
//       name: "IQAC",
//       href: "/iqac",
//       hasDropdown: true,
//       items: [
//         { name: "About IQAC", href: "/iqac/about" },
//         { name: "AQAR Reports", href: "/iqac/aqar-reports" },
//         { name: "Best Practices", href: "/iqac/best-practices" },
//         { name: "Quality Initiatives", href: "/iqac/quality-initiatives" }
//       ]
//     },
//     {
//       name: "NAAC",
//       href: "/naac",
//       hasDropdown: true,
//       items: [
//         { name: "NAAC Certificate", href: "/naac/certificate" },
//         { name: "SSR Report", href: "/naac/ssr-report" },
//         { name: "Peer Team Report", href: "/naac/peer-team-report" },
//         { name: "DVV Clarifications", href: "/naac/dvv-clarifications" }
//       ]
//     },
//     {
//       name: "Picture Gallery",
//       href: "/picture-gallery",
//       hasDropdown: false
//     }
//   ];

//   const handleDropdown = (item: string) => {
//     setOpenDropdown(openDropdown === item ? null : item);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     setOpenDropdown(null);
//     setQuickLinksOpen(false);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//     setOpenDropdown(null);
//     setQuickLinksOpen(false);
//   };

//   return (
//     <header className="relative z-50 w-full bg-white shadow-md">
//       {/* Top Strip */}
//       <div className="bg-[#1e3a8a] text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-2 text-sm">
//             <div className="flex items-center space-x-1">
//               <span className="font-semibold">ABC Committee's</span>
//             </div>

//             <div className="flex items-center space-x-6">
//               {/* Desktop Top Menu */}
//               <div className="hidden sm:flex items-center space-x-4">
//                 <div className="relative group">
//                   <button
//                     onClick={() => setQuickLinksOpen(!quickLinksOpen)}
//                     className="flex items-center space-x-1 hover:text-orange-500 transition-colors"
//                     aria-haspopup="true"
//                     aria-expanded={quickLinksOpen}
//                   >
//                     <FaHome className="w-3 h-3" />
//                     <span>Quick Links</span>
//                     <FaChevronDown
//                       className={`w-3 h-3 transition-transform ${quickLinksOpen ? "rotate-180" : ""
//                         }`}
//                     />
//                   </button>

//                   {/* Quick Links Dropdown */}
//                   {quickLinksOpen && (
//                     <div
//                       className="absolute left-0 top-full mt-2 w-48 bg-white shadow-md border border-gray-200 rounded-md z-50"
//                       role="menu"
//                       aria-label="Quick Links"
//                     >
//                       <div className="py-2">
//                         {quickLinks.map((link, index) => (
//                           <Link
//                             key={index}
//                             href={link.href}
//                             tabIndex={0}
//                             onClick={() => setQuickLinksOpen(false)}
//                             className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 text-sm transition-colors"
//                           >
//                             {link.name}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <span className="text-gray-300">|</span>
//                 <Link href="/contact" className="hover:text-orange-500 transition-colors">
//                   Contact Us
//                 </Link>
//               </div>

//               {/* Search Bar and Login - Desktop */}
//               <div className="hidden md:flex items-center space-x-3">
//                 <div className="flex items-center">
//                   <input
//                     type="text"
//                     placeholder="Search here..."
//                     className="w-40 lg:w-48 px-3 py-1 text-sm text-gray-900 bg-white rounded-l-full border-0 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                     aria-label="Search"
//                   />
//                   <button
//                     type="submit"
//                     className="bg-white text-gray-700 px-3 py-1 rounded-r-full border-l border-gray-300 hover:bg-gray-50 transition-colors"
//                     aria-label="Search button"
//                   >
//                     <FiSearch className="w-4 h-4" />
//                   </button>
//                 </div>
                
//                 {/* Login Button */}
//                 <Link
//                   href="/login"
//                   className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full transition-colors text-sm font-medium"
//                 >
//                   <FaUser className="w-3 h-3" />
//                   <span>Login</span>
//                 </Link>
//               </div>

//               {/* Mobile Menu Button - Moved to top strip */}
//               <button
//                 onClick={toggleMobileMenu}
//                 className="lg:hidden p-1 text-white hover:text-orange-300 transition-colors"
//                 aria-label="Toggle menu"
//                 aria-expanded={isMobileMenuOpen}
//               >
//                 {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Header - Logo + College Info */}
//       <div className="border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row justify-between items-center py-4 lg:py-6">
//             {/* Left Section - Logo & College Info */}
//             <div className="flex items-center space-x-6 mb-4 lg:mb-0">
//               {/* College Logo */}
//               <div className="flex-shrink-0">
//                 <Image
//                   src="/images/edu.png"
//                   alt="College Logo"
//                   width={80}
//                   height={80}
//                   className="rounded-full shadow-md border-2 border-orange-200"
//                   priority
//                 />
//               </div>

//               {/* College Information */}
//               <div className="text-center lg:text-left flex-1">
//                 <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-1">
//                   Minimalisttic Education
//                 </h1>
//                 <p className="text-base md:text-lg text-gray-700 font-semibold mb-2">
//                   of Arts, Science & Commerce
//                 </p>
//                 {/* <div className="text-sm text-gray-600 space-y-1 max-w-md mx-auto lg:mx-0">
//                   <p>Address! xyzhkdgsfgfsgg</p>
//                   <p>Affiliated by University of Abc & Recognized by Govt. of IND</p>
//                   <p className="text-orange-600 font-semibold">
//                     Accredited by N**C with 'A' Grade with CGPA of 5
//                   </p>
//                 </div> */}
//               </div>
//             </div>

//             {/* Right Section - Contact Info */}
//             <div className="flex-shrink-0 text-center lg:text-right">
//               {/* <div className="space-y-2 mb-4">
//                 <div className="flex items-center justify-center lg:justify-end space-x-2 text-sm">
//                   <FaPhone className="w-3 h-3 text-gray-600" />
//                   <span className="font-semibold text-gray-800">Tel: 924xxxxxxx</span>
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   <strong>MRI Center:</strong> 855xxxxxx / 810xxxxxxx
//                 </div>
//                 <div className="flex items-center justify-center lg:justify-end space-x-2 text-sm">
//                   <FaEnvelope className="w-3 h-3 text-gray-600" />
//                   <span className="text-gray-600">hi@Minimalistticedu.in</span>
//                 </div>
//               </div> */}

//               {/* Mobile Search and Login */}
//               <div className="flex md:hidden items-center justify-center space-x-2">
//                 <div className="flex items-center">
//                   <input
//                     type="text"
//                     placeholder="Search here..."
//                     className="w-32 px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                     aria-label="Search"
//                   />
//                   <button
//                     type="submit"
//                     className="bg-orange-500 text-white px-3 py-2 rounded-r-md hover:bg-orange-600 transition-colors border border-orange-500"
//                     aria-label="Search button"
//                   >
//                     <FiSearch className="w-4 h-4" />
//                   </button>
//                 </div>
                
//                 {/* Mobile Login Button */}
//                 <Link
//                   href="/login"
//                   className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-colors text-sm font-medium"
//                 >
//                   <FaUser className="w-3 h-3" />
//                   <span>Login</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Desktop Navigation */}
//           <div className="hidden lg:block">
//             <ul className="flex items-center justify-center xl:justify-start">
//               {navItems.map((item, index) => (
//                 <li key={index} className="relative group">
//                   {/* If has dropdown, clicking toggles the dropdown, else link */}
//                   {item.hasDropdown ? (
//                     <>
//                       <button
//                         onClick={() => handleDropdown(item.name)}
//                         className="flex items-center space-x-1 px-3 xl:px-4 py-4 text-white hover:bg-orange-600 hover:text-white transition-all duration-200 font-medium text-sm whitespace-nowrap border-r border-orange-300 border-opacity-50 last:border-r-0"
//                         aria-haspopup="true"
//                         aria-expanded={openDropdown === item.name}
//                       >
//                         <span>{item.name}</span>
//                         <FaChevronDown className="w-3 h-3 transition-transform duration-200" />
//                       </button>

//                       {/* Desktop Dropdown */}
//                       {openDropdown === item.name && (
//                         <div
//                           className="absolute left-0 top-full w-64 bg-white shadow-md border border-gray-200 rounded-md transition-opacity duration-300 z-50"
//                           role="menu"
//                           aria-label={`${item.name} submenu`}
//                         >
//                           <div className="py-2">
//                             {item.items?.map((subItem, subIndex) => (
//                               <Link
//                                 key={subIndex}
//                                 href={subItem.href}
//                                 className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 text-sm transition-colors border-b border-gray-100 last:border-b-0"
//                                 role="menuitem"
//                                 tabIndex={0}
//                                 onClick={() => {
//                                   setOpenDropdown(null);
//                                   setIsMobileMenuOpen(false);
//                                 }}
//                               >
//                                 {subItem.name}
//                               </Link>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <Link
//                       href={item.href}
//                       className="flex items-center space-x-1 px-3 xl:px-4 py-4 text-white hover:bg-orange-600 hover:text-white transition-all duration-200 font-medium text-sm whitespace-nowrap border-r border-orange-300 border-opacity-50 last:border-r-0"
//                     >
//                       <span>{item.name}</span>
//                     </Link>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div 
//           className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
//           onClick={closeMobileMenu}
//         />
//       )}

//       {/* Mobile Navigation Menu */}
//       <div className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
//         isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
//       }`}>
//         {/* Mobile Menu Header */}
//         <div className="bg-[#1e3a8a] text-white p-4 flex justify-between items-center">
//           <span className="font-semibold text-lg">Menu</span>
//           <button
//             onClick={closeMobileMenu}
//             className="p-1 hover:bg-blue-700 rounded transition-colors"
//             aria-label="Close menu"
//           >
//             <FiX className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Mobile Menu Content */}
//         <div className="h-full overflow-y-auto pb-20">
//           {/* Quick Links Section */}
//           <div className="p-4 border-b border-gray-200">
//             <button
//               onClick={() => setQuickLinksOpen(!quickLinksOpen)}
//               className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-2"
//             >
//               <span className="flex items-center space-x-2">
//                 <FaHome className="w-4 h-4 text-blue-600" />
//                 <span>Quick Links</span>
//               </span>
//               <FaChevronDown
//                 className={`w-4 h-4 transition-transform ${quickLinksOpen ? "rotate-180" : ""}`}
//               />
//             </button>
            
//             {quickLinksOpen && (
//               <div className="ml-6 space-y-2">
//                 {quickLinks.map((link, index) => (
//                   <Link
//                     key={index}
//                     href={link.href}
//                     onClick={closeMobileMenu}
//                     className="block text-sm text-gray-600 hover:text-orange-600 py-1 transition-colors"
//                   >
//                     {link.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Main Navigation */}
//           <div className="p-4">
//             <ul className="space-y-1">
//               {navItems.map((item, index) => (
//                 <li key={index}>
//                   {item.hasDropdown ? (
//                     <>
//                       <button
//                         onClick={() => handleDropdown(item.name)}
//                         className="flex items-center justify-between w-full px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
//                         aria-haspopup="true"
//                         aria-expanded={openDropdown === item.name}
//                       >
//                         <span>{item.name}</span>
//                         <FaChevronDown
//                           className={`w-4 h-4 transition-transform duration-200 ${
//                             openDropdown === item.name ? "rotate-180" : ""
//                           }`}
//                         />
//                       </button>

//                       {/* Mobile Dropdown */}
//                       {openDropdown === item.name && (
//                         <ul
//                           className="ml-4 mt-1 space-y-1 bg-gray-50 rounded-lg p-2"
//                           role="menu"
//                           aria-label={`${item.name} submenu`}
//                         >
//                           {item.items?.map((subItem, subIndex) => (
//                             <li key={subIndex}>
//                               <Link
//                                 href={subItem.href}
//                                 className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-white hover:text-orange-600 rounded text-sm transition-colors"
//                                 role="menuitem"
//                                 tabIndex={0}
//                                 onClick={closeMobileMenu}
//                               >
//                                 {subItem.name}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   ) : (
//                     <Link
//                       href={item.href}
//                       className="block w-full px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
//                       onClick={closeMobileMenu}
//                     >
//                       {item.name}
//                     </Link>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Us Link for Mobile */}
//           <div className="p-4 border-t border-gray-200">
//             <Link
//               href="/contact"
//               onClick={closeMobileMenu}
//               className="block text-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
//             >
//               Contact Us
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";
import React, { useState } from 'react';
import { Home, ChevronDown, Phone, Mail, User, Search, Menu, X } from 'lucide-react';

interface NavSubItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  hasDropdown: boolean;
  items?: NavSubItem[];
}

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState<boolean>(false);

  const quickLinks: NavSubItem[] = [
    { name: "Student Portal", href: "/portal" },
    { name: "Learning Resources", href: "/resources" },
    { name: "Course Enrollment", href: "/enrollment" },
    { name: "Payment Center", href: "/payments" },
    { name: "Academic Calendar", href: "/calendar" },
    { name: "Certificates", href: "/certificates" },
    { name: "Support Center", href: "/support" }
  ];

  const navItems: NavItem[] = [
    {
      name: "About Us",
      href: "/about",
      hasDropdown: true,
      items: [
        { name: "Our Story", href: "/about/story" },
        { name: "Vision & Mission", href: "/about/vision" },
        { name: "Our Team", href: "/about/team" },
        { name: "Leadership", href: "/about/leadership" },
        { name: "Instructors", href: "/about/instructors" }
      ]
    },
    {
      name: "Courses",
      href: "/courses",
      hasDropdown: true,
      items: [
        { name: "Online Courses", href: "/courses/online" },
        { name: "Live Classes", href: "/courses/live" },
        { name: "Skill Development", href: "/courses/skills" },
        { name: "Professional Training", href: "/courses/professional" },
        { name: "Certifications", href: "/courses/certifications" }
      ]
    },
    {
      name: "Programs",
      href: "/programs",
      hasDropdown: true,
      items: [
        { name: "Bootcamps", href: "/programs/bootcamps" },
        { name: "Workshops", href: "/programs/workshops" },
        { name: "Masterclasses", href: "/programs/masterclasses" },
        { name: "Corporate Training", href: "/programs/corporate" }
      ]
    },
    {
      name: "Resources",
      href: "/resources",
      hasDropdown: true,
      items: [
        { name: "Study Materials", href: "/resources/materials" },
        { name: "Practice Tests", href: "/resources/tests" },
        { name: "Video Library", href: "/resources/videos" },
        { name: "E-Books", href: "/resources/ebooks" },
        { name: "Blog", href: "/resources/blog" }
      ]
    },
    {
      name: "Student Life",
      href: "/student-life",
      hasDropdown: true,
      items: [
        { name: "Community", href: "/student-life/community" },
        { name: "Events", href: "/student-life/events" },
        { name: "Study Groups", href: "/student-life/groups" },
        { name: "Competitions", href: "/student-life/competitions" }
      ]
    },
    {
      name: "Success Stories",
      href: "/success-stories",
      hasDropdown: false
    },
    {
      name: "News & Updates",
      href: "/news",
      hasDropdown: true,
      items: [
        { name: "Latest News", href: "/news/latest" },
        { name: "Course Updates", href: "/news/courses" },
        { name: "Events", href: "/news/events" },
        { name: "Announcements", href: "/news/announcements" }
      ]
    },
    {
      name: "Careers",
      href: "/careers",
      hasDropdown: true,
      items: [
        { name: "Job Placement", href: "/careers/placement" },
        { name: "Career Guidance", href: "/careers/guidance" },
        { name: "Interview Prep", href: "/careers/interview-prep" },
        { name: "Industry Connect", href: "/careers/industry" }
      ]
    }
  ];

  const handleDropdown = (item: string) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
    setQuickLinksOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setQuickLinksOpen(false);
  };

  return (
    <header className="relative z-50 w-full bg-white shadow-md">
      {/* Top Strip */}
      <div className="bg-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-1">
              <span className="font-medium">🎓 EduLearn Platform</span>
            </div>

            <div className="flex items-center space-x-6">
              {/* Desktop Top Menu */}
              <div className="hidden sm:flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                    className="flex items-center space-x-1 hover:text-orange-300 transition-colors"
                    aria-haspopup="true"
                    aria-expanded={quickLinksOpen}
                  >
                    <Home className="w-3 h-3" />
                    <span>Quick Access</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${quickLinksOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Quick Links Dropdown */}
                  {quickLinksOpen && (
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-lg z-50">
                      <div className="py-2">
                        {quickLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            onClick={() => setQuickLinksOpen(false)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 text-sm transition-colors"
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-slate-400">|</span>
                <a href="/contact" className="hover:text-orange-300 transition-colors">
                  Contact Us
                </a>
              </div>

              {/* Search Bar and Login - Desktop */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-40 lg:w-48 px-3 py-1 text-sm text-gray-900 bg-white rounded-l-full border-0 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    aria-label="Search"
                  />
                  <button
                    type="submit"
                    className="bg-white text-gray-700 px-3 py-1 rounded-r-full border-l border-gray-300 hover:bg-gray-50 transition-colors"
                    aria-label="Search button"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                
                <a
                  href="/login"
                  className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors"
                >
                  <User className="w-3 h-3" />
                  <span>Sign In</span>
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-1 text-white hover:text-orange-300 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center py-6">
            {/* Left Section - Logo & Platform Info */}
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-xl font-bold text-white">EL</span>
              </div>

              <div className="text-center lg:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  EduLearn Platform
                </h1>
                <p className="text-gray-600 font-medium">
                  Your Gateway to Quality Education
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  Trusted by 10,000+ learners worldwide
                </p>
              </div>
            </div>

            {/* Right Section - Contact Info */}
            <div className="text-center lg:text-right">
              <div className="space-y-1 mb-4">
                <div className="flex items-center justify-center lg:justify-end space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700 font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Support:</strong> 24/7 Available
                </div>
                <div className="flex items-center justify-center lg:justify-end space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">support@edulearn.com</span>
                </div>
              </div>

              {/* Mobile Search and Login */}
              <div className="flex md:hidden items-center justify-center space-x-2">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-32 px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    aria-label="Search"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600 transition-colors border border-blue-500"
                    aria-label="Search button"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                
                <a
                  href="/login"
                  className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <User className="w-3 h-3" />
                  <span>Sign In</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <ul className="flex items-center">
              {navItems.map((item, index) => (
                <li key={index} className="relative">
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdown(item.name)}
                        className="flex items-center space-x-1 px-4 py-4 text-white hover:bg-white hover:bg-opacity-15 transition-all duration-200 font-medium text-sm border-r border-white border-opacity-20 last:border-r-0"
                        aria-haspopup="true"
                        aria-expanded={openDropdown === item.name}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                      </button>

                      {/* Desktop Dropdown */}
                      {openDropdown === item.name && (
                        <div className="absolute left-0 top-full w-64 bg-white shadow-lg border border-gray-200 rounded-lg z-50">
                          <div className="py-2">
                            {item.items?.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={subItem.href}
                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-sm transition-colors border-b border-gray-100 last:border-b-0"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center space-x-1 px-4 py-4 text-white hover:bg-white hover:bg-opacity-15 transition-all duration-200 font-medium text-sm border-r border-white border-opacity-20 last:border-r-0"
                    >
                      <span>{item.name}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Mobile Menu Header */}
        <div className="bg-slate-700 text-white p-4 flex justify-between items-center">
          <span className="font-medium text-lg">Menu</span>
          <button
            onClick={closeMobileMenu}
            className="p-1 hover:bg-slate-600 rounded transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="h-full overflow-y-auto pb-20">
          {/* Quick Links Section */}
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={() => setQuickLinksOpen(!quickLinksOpen)}
              className="flex items-center justify-between w-full text-left font-medium text-gray-800 mb-2"
            >
              <span className="flex items-center space-x-2">
                <Home className="w-4 h-4 text-blue-600" />
                <span>Quick Access</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${quickLinksOpen ? "rotate-180" : ""}`} />
            </button>
            
            {quickLinksOpen && (
              <div className="ml-6 space-y-2">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block text-sm text-gray-600 hover:text-orange-600 py-1 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Main Navigation */}
          <div className="p-4">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdown(item.name)}
                        className="flex items-center justify-between w-full px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                        aria-haspopup="true"
                        aria-expanded={openDropdown === item.name}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`} />
                      </button>

                      {/* Mobile Dropdown */}
                      {openDropdown === item.name && (
                        <ul className="ml-4 mt-1 space-y-1 bg-gray-50 rounded-lg p-2">
                          {item.items?.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <a
                                href={subItem.href}
                                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-white hover:text-blue-600 rounded text-sm transition-colors"
                                onClick={closeMobileMenu}
                              >
                                {subItem.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="block w-full px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Link for Mobile */}
          <div className="p-4 border-t border-gray-200">
            <a
              href="/contact"
              onClick={closeMobileMenu}
              className="block text-center bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}