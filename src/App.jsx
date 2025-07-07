// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import PatientList from "./pages/admin/PatientList";
import AddPatient from "./pages/admin/AddPatient";
import EditPatient from "./pages/admin/EditPatient";
import IncidentList from "./pages/admin/IncidentList";
import AddIncident from "./pages/admin/AddIncident";
import EditIncident from "./pages/admin/EditIncident";
import Calendar from "./pages/admin/Calendar";

import PatientDashboard from "./pages/patient/PatientDashboard";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Login Page */}
      <Route path="/" element={<Login />} />

      {/* Admin Routes */}
      {user?.role === "Admin" && (
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="add-patient" element={<AddPatient />} />
          <Route path="edit-patient/:id" element={<EditPatient />} />
          <Route path="incidents" element={<IncidentList />} />
          <Route path="add-incident" element={<AddIncident />} />
          <Route path="edit-incident/:id" element={<EditIncident />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
      )}

      {/* Patient Routes */}
      {user?.role === "Patient" && (
        <Route path="/patient" element={<PatientDashboard />} />
      )}

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
