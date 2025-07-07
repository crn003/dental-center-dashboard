// src/pages/patient/PatientDashboard.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("incidents")) || [];
    const filtered = all.filter((i) => i.patientId === user?.patientId);
    setIncidents(filtered);
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-blue-600 mb-4">👤 Patient Dashboard</h1>

      {incidents.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div key={incident.id} className="bg-white p-4 shadow rounded">
              <h2 className="font-semibold text-blue-500">{incident.title}</h2>
              <p className="text-sm text-gray-600">{incident.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Appointment: {new Date(incident.appointmentDate).toLocaleString()}
              </p>
              <p className="text-xs mt-1">
                Status: <span className="font-medium">{incident.status || "Pending"}</span>
              </p>
              <p className="text-xs">Cost: ₹{incident.cost || "--"}</p>

              {incident.files?.length > 0 && (
                <div className="mt-2 text-xs">
                  <p className="font-semibold">Files:</p>
                  <ul className="list-disc pl-5">
                    {incident.files.map((file, idx) => (
                      <li key={idx}>
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
