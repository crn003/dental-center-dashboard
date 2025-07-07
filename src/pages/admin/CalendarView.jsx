// src/pages/admin/CalendarView.jsx
import { useEffect, useState } from "react";

const CalendarView = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("incidents")) || [];
    setIncidents(stored);
  }, []);

  // Group by date
  const grouped = incidents.reduce((acc, incident) => {
    const date = new Date(incident.appointmentDate).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(incident);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-2xl font-semibold text-blue-600 mb-4">📅 Calendar View</h1>
      {Object.keys(grouped).length === 0 ? (
        <p className="text-gray-500">No upcoming appointments.</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date} className="bg-white rounded shadow p-4">
              <h2 className="text-lg font-bold text-blue-500">{date}</h2>
              <ul className="list-disc pl-6 mt-2 text-sm">
                {items.map((incident) => (
                  <li key={incident.id}>
                    <strong>{incident.title}</strong> with patient ID: <code>{incident.patientId}</code> at{" "}
                    {new Date(incident.appointmentDate).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
