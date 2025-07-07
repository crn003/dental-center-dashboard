import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setIncidents(storedIncidents);
    setPatients(storedPatients);
  }, []);

  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient?.name || "Unknown";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-blue-600">📁 Incident Management</h1>
        <Link
          to="/admin/add-incident"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded"
        >
          ➕ Add Incident
        </Link>
      </div>

      {/* Table */}
      {incidents.length === 0 ? (
        <p className="text-gray-500">No incidents found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Patient</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Cost</th>
                <th className="px-4 py-2">Files</th>
              </tr>
            </thead>
            <tbody>
              {incidents.slice().reverse().map((incident) => (
                <tr key={incident.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{getPatientName(incident.patientId)}</td>
                  <td className="px-4 py-2">{incident.title}</td>
                  <td className="px-4 py-2">
                    {new Date(incident.appointmentDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        incident.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {incident.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2">₹ {incident.cost || "--"}</td>
                  <td className="px-4 py-2">
                    {incident.files?.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-1">
                        {incident.files.map((file, index) => (
                          <li key={index}>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline text-xs"
                            >
                              {file.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400 text-xs">No files</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IncidentList;
