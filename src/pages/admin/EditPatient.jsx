// src/pages/admin/EditPatient.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    dob: "",
    contact: "",
    healthInfo: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("patients");
    if (stored) {
      const patients = JSON.parse(stored);
      const patient = patients.find((p) => p.id === id);
      if (patient) {
        setForm(patient);
      } else {
        alert("Patient not found.");
        navigate("/admin/patients");
      }
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem("patients");
    if (stored) {
      const patients = JSON.parse(stored);
      const updated = patients.map((p) => (p.id === id ? { ...p, ...form } : p));
      localStorage.setItem("patients", JSON.stringify(updated));
      navigate("/admin/patients");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">✏️ Edit Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Health Info</label>
          <textarea
            name="healthInfo"
            value={form.healthInfo}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            💾 Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatient;
