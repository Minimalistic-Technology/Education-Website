"use client";

import { useState, useEffect } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";

interface Class {
  day: string;
  subject: string;
  startTime: string;
  endTime: string;
  faculty: string;
}

const ClassSchedulePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Dummy data for class schedule
    const dummyClasses: Class[] = [
      { day: "Tuesday", subject: "Communication Skills", startTime: "10:45 AM", endTime: "12:15 PM", faculty: "Dr. Verma" },
      { day: "Wednesday", subject: "Web Technology", startTime: "09:00 AM", endTime: "10:30 AM", faculty: "Prof. Kapoor" },
      { day: "Wednesday", subject: "Data Structures", startTime: "10:45 AM", endTime: "12:15 PM", faculty: "Dr. Iyer" },
      { day: "Thursday", subject: "Operating Systems", startTime: "09:00 AM", endTime: "10:30 AM", faculty: "Prof. Das" },
      { day: "Thursday", subject: "Database Management Systems", startTime: "10:45 AM", endTime: "12:15 PM", faculty: "Dr. Nair" },
      { day: "Friday", subject: "Python Programming", startTime: "09:00 AM", endTime: "10:30 AM", faculty: "Prof. Bajpai" },
      { day: "Friday", subject: "Software Engineering", startTime: "10:45 AM", endTime: "12:15 PM", faculty: "Dr. Joshi" },
      { day: "Saturday", subject: "Web Technology", startTime: "09:00 AM", endTime: "10:30 AM", faculty: "Prof. Kapoor" },
      { day: "Saturday", subject: "Data Structures", startTime: "10:45 AM", endTime: "12:15 PM", faculty: "Dr. Iyer" },
    ];

    setClasses(dummyClasses);
  }, []);
    
  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />
      <div className={`flex-1 ${isMobile ? '' : 'ml-64'} transition-all duration-300`}>
        <StudentHeader />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Class Schedule</h1>
          <p className="text-gray-600 mb-8">Today's Date: {new Date().toLocaleDateString()}</p>
          
          <table className="min-w-full bg-gray-500 border border-gray-600 rounded-lg">
            <thead className="bg-emerald-700">
              <tr>
                <th className="py-2 px-4 border-b">Day</th>
                <th className="py-2 px-4 border-b">Subject</th>
                <th className="py-2 px-4 border-b">Start Time</th>
                <th className="py-2 px-4 border-b">End Time</th>
                <th className="py-2 px-4 border-b">Faculty</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem, index) => (
                <tr key={index} className={`hover:bg-gray-100 ${index % 2 ? 'bg-gray-200' : 'bg-white'}`}>
                  <td className="py-2 text-gray-500 px-4 border-b">{classItem.day}</td>
                  <td className="py-2 text-gray-500 px-4 border-b">{classItem.subject}</td>
                  <td className="py-2 text-gray-500 px-4 border-b">{classItem.startTime}</td>
                  <td className="py-2 text-gray-500 px-4 border-b">{classItem.endTime}</td>
                  <td className="py-2 text-gray-500 px-4 border-b">{classItem.faculty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default ClassSchedulePage;
