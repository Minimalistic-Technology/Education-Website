"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import { Users, FileText, CheckCircle, AlertCircle, Clock } from "lucide-react";

interface TimetableEntry {
  id: string;
  year_name: string;
  day: string;
  subject: string;
  start_time: string;
  end_time: string;
  faculty: string;
}

export default function Schedule() {
  const [isMobile, setIsMobile] = useState(false);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<TimetableEntry | null>(null);
  const [showExamModal, setShowExamModal] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Sample timetable data
  useEffect(() => {
    const sampleData: TimetableEntry[] = [
      {
        id: "1",
        year_name: "First Year",
        day: "Monday",
        subject: "Mathematics",
        start_time: "09:00",
        end_time: "10:30",
        faculty: "Prof. Johnson"
      },
      {
        id: "2",
        year_name: "First Year",
        day: "Tuesday",
        subject: "Physics",
        start_time: "11:00",
        end_time: "12:30",
        faculty: "Dr. Smith"
      },
      {
        id: "3",
        year_name: "Second Year",
        day: "Wednesday",
        subject: "Chemistry",
        start_time: "14:00",
        end_time: "15:30",
        faculty: "Prof. Williams"
      }
    ];
    setTimetable(sampleData);
  }, []);

  const handleEdit = (entry: TimetableEntry) => {
    setSelectedEntry(entry);
    setShowExamModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setTimetable(timetable.filter(entry => entry.id !== id));
      alert('Entry deleted successfully!');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEntry: TimetableEntry = {
      id: selectedEntry ? selectedEntry.id : Date.now().toString(), // Generate a new ID if adding
      year_name: formData.get('year_name') as string,
      day: formData.get('day') as string,
      subject: formData.get('subject') as string,
      start_time: formData.get('start_time') as string,
      end_time: formData.get('end_time') as string,
      faculty: formData.get('faculty') as string,
    };

    if (selectedEntry) {
      // Update existing entry
      setTimetable(timetable.map(entry => (entry.id === selectedEntry.id ? newEntry : entry)));
      alert('Entry updated successfully!');
    } else {
      // Add new entry
      setTimetable([...timetable, newEntry]);
      alert('Entry added successfully!');
    }

    // Reset form and close modal
    setSelectedEntry(null);
    setShowExamModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className={`flex-1 ${isMobile ? '' : 'ml-64'} transition-all duration-300`}>
        <AdminHeader />
        
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Update Timetable
            </h1>
            <p className="text-gray-600">Manage the timetable for classes.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Timetable Entries</h2>
            </div>
            <div className="p-4 md:p-6">
              <div className="table-container">
                <table className=" text-gray-700 w-full">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Day</th>
                      <th>Subject</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Faculty</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetable.map(entry => (
                      <tr key={entry.id} className=" text-gray-700 table-row">
                        <td>{entry.year_name}</td>
                        <td>{entry.day}</td>
                        <td>{entry.subject}</td>
                        <td>{entry.start_time}</td>
                        <td>{entry.end_time}</td>
                        <td>{entry.faculty}</td>
                        <td className=" text-gray-700 action-buttons">
                          <button className="edit-btn" onClick={() => handleEdit(entry)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDelete(entry.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Add/Update Timetable Entry Form */}
          <div className=" text-gray-700 update-form">
            <h3>{selectedEntry ? "Update Timetable Entry" : "Add Timetable Entry"}</h3>
            <form onSubmit={handleSubmit}>
              <input type="hidden" id="entryId" name="entryId" value={selectedEntry ? selectedEntry.id : ""} />
              
              <label htmlFor="year_name">Year:</label>
              <input type="text" id="year_name" name="year_name" defaultValue={selectedEntry ? selectedEntry.year_name : ""} required />

              <label htmlFor="day">Select Day:</label>
              <select id="day" name="day" defaultValue={selectedEntry ? selectedEntry.day : ""} required>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>

              <label htmlFor="start_time">Start Time:</label>
              <input type="time" id="start_time" name="start_time" defaultValue={selectedEntry ? selectedEntry.start_time : ""} required />

              <label htmlFor="end_time">End Time:</label>
              <input type="time" id="end_time" name="end_time" defaultValue={selectedEntry ? selectedEntry.end_time : ""} required />

              <label htmlFor="subject">Subject:</label>
              <input type="text" id="subject" name="subject" defaultValue={selectedEntry ? selectedEntry.subject : ""} required />

              <label htmlFor="faculty">Faculty Name:</label>
              <input type="text" id="faculty" name="faculty" defaultValue={selectedEntry ? selectedEntry.faculty : ""} required />

              <button type="submit">{selectedEntry ? "Update Timetable" : "Add Timetable Entry"}</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
