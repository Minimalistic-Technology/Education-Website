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
      { day: "Monday", subject: "Communication Skills", startTime: "10:45 AM", endTime: "12:15 PM", faculty: "Dr. Verma" },
      { day: "Monday", subject: "Web Technology", startTime: "09:00 AM", endTime: "10:30 AM", faculty: "Prof. Kapoor" },
      { day: "Tuesday", subject: "Data Structures", startTime: "10:45 AM", endTime: "12:15 PM", faculty: "Dr. Iyer" },
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

  const getTodayDay = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const isTodayClass = (classItem: Class) => {
    return classItem.day === getTodayDay();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />
      <div className={`flex-1 ${isMobile ? '' : 'ml-64'} transition-all duration-300`}>
        <StudentHeader />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Schedule</h1>
            <p className="text-gray-600">
              Today's Date: {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-emerald-700">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white">Day</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white">Subject</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white">Start Time</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white">End Time</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white">Faculty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {classes.map((classItem, index) => (
                    <tr 
                      key={index} 
                      className={`
                        transition-colors duration-200
                        ${isTodayClass(classItem) 
                          ? 'bg-emerald-200 hover:bg-emerald-300' 
                          : index % 2 === 1 
                            ? 'bg-gray-200 hover:bg-gray-300' 
                            : 'hover:bg-gray-100'
                        }
                      `}
                    >
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{classItem.day}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        {classItem.subject}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {classItem.startTime}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {classItem.endTime}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {classItem.faculty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default ClassSchedulePage;