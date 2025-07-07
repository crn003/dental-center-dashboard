// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    setPatients(storedPatients);
    setIncidents(storedIncidents);
  }, []);

  const totalRevenue = incidents.reduce((sum, i) => sum + (Number(i.cost) || 0), 0);
  const completed = incidents.filter(i => i.status === "Completed").length;
  const pending = incidents.filter(i => i.status !== "Completed").length;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-blue-600 mb-4">📊 Admin KPIs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-600">Total Patients</h2>
          <p className="text-xl font-bold">{patients.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-600">Total Appointments</h2>
          <p className="text-xl font-bold">{incidents.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-600">Completed</h2>
          <p className="text-xl font-bold text-green-600">{completed}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-600">Total Revenue</h2>
          <p className="text-xl font-bold text-blue-600">₹ {totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
