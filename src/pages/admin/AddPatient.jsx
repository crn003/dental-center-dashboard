import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const AddPatient = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    dob: "",
    contact: "",
    healthInfo: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPatient = {
      id: uuid(),
      ...form,
    };

    const stored = JSON.parse(localStorage.getItem("patients")) || [];
    localStorage.setItem("patients", JSON.stringify([...stored, newPatient]));

    navigate("/admin/patients");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">➕ Add New Patient</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={form.dob}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <textarea
          name="healthInfo"
          placeholder="Health Information"
          value={form.healthInfo}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          💾 Save Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
