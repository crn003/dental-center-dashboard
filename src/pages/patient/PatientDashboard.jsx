// src/pages/patient/PatientDashboard.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("incidents")) || [];
    const patientIncidents = stored.filter(
      (i) => i.patientId === user?.patientId
    );
    setIncidents(patientIncidents);
  }, [user]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-600">👤 Patient Dashboard</h1>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:underline"
        >
          🔓 Logout
        </button>
      </div>

      {incidents.length === 0 ? (
        <p className="text-gray-500">No appointments or treatments found.</p>
      ) : (
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-white border border-gray-200 p-4 rounded shadow"
            >
              <h2 className="text-lg font-semibold text-blue-500">{incident.title}</h2>
              <p className="text-sm text-gray-700">{incident.description}</p>
              <div className="mt-2 text-sm text-gray-600">
                <p>📅 Appointment: {new Date(incident.appointmentDate).toLocaleString()}</p>
                <p>💰 Cost: ₹{incident.cost || "--"}</p>
                <p>📌 Status: {incident.status || "Pending"}</p>
              </div>

              {incident.files?.length > 0 && (
                <div className="mt-3">
                  <p className="font-medium text-xs text-gray-500 mb-1">Attached Files:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {incident.files.map((file, index) => (
                      <li key={index}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
