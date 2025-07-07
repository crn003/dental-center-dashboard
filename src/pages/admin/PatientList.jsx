// src/pages/admin/PatientList.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("patients");
    if (stored) {
      setPatients(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      const updated = patients.filter((p) => p.id !== id);
      localStorage.setItem("patients", JSON.stringify(updated));
      setPatients(updated);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">🧑‍⚕️ Patient List</h2>
        <Link
          to="/admin/add-patient"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          ➕ Add Patient
        </Link>
      </div>

      {patients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white rounded shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">DOB</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Health Info</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-t">
                  <td className="py-2 px-4">{patient.name}</td>
                  <td className="py-2 px-4">{patient.dob}</td>
                  <td className="py-2 px-4">{patient.contact}</td>
                  <td className="py-2 px-4">{patient.healthInfo}</td>
                  <td className="py-2 px-4 flex gap-3">
                    <Link
                      to={`/admin/edit-patient/${patient.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="text-red-600 hover:underline"
                    >
                      🗑️ Delete
                    </button>
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

export default PatientList;
