"use client";
import { useState, useEffect } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
import api from "@/utils/api";

interface Class {
  day: string;
  subject: string;
  startTime: string;
  endTime: string;
  faculty: string;
}

const weekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ClassSchedulePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    const fetchClasses = async () => {
      try {
        const response = await api.get("/schedules");
        const data = response.data;
        const formattedClasses: Class[] = data.map((item: any) => ({
          day: item.days.join(", "),
          subject: item.subject,
          startTime: item.startTime,
          endTime: item.endTime,
          faculty: item.faculty,
        }));
        setClasses(formattedClasses);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const getTodayDay = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const isTodayClass = (classItem: Class) => {
    return classItem.day.includes(getTodayDay());
  };

  const sortedClasses = classes.sort((a, b) => {
    const dayAIndex = weekOrder.indexOf(a.day.split(", ")[0]); // Consider only the first day for sorting
    const dayBIndex = weekOrder.indexOf(b.day.split(", ")[0]); // Consider only the first day for sorting
    return dayAIndex - dayBIndex;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isMobile ? '' : isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <StudentHeader isCollapsed={isCollapsed} />
        
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
                  {sortedClasses.map((classItem, index) => (
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
