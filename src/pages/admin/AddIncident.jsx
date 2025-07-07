import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const AddIncident = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    title: "",
    description: "",
    comments: "",
    appointmentDate: "",
    cost: "",
    treatment: "",
    status: "Pending",
    nextDate: "",
  });
  const [files, setFiles] = useState([]);

  // Load patients on mount
  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(storedPatients);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Convert files to base64
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const previews = [];

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push({ name: file.name, url: reader.result });

        if (previews.length === selectedFiles.length) {
          setFiles(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.patientId || !form.title || !form.appointmentDate) {
      alert("Please fill all required fields.");
      return;
    }

    const newIncident = {
      id: uuid(),
      ...form,
      cost: parseFloat(form.cost) || 0,
      files,
    };

    const existing = JSON.parse(localStorage.getItem("incidents")) || [];
    const updated = [...existing, newIncident];
    localStorage.setItem("incidents", JSON.stringify(updated));
    navigate("/admin/incidents");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">➕ Add Incident</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Select */}
        <div>
          <label className="block text-sm font-medium mb-1">Patient</label>
          <select
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Select Patient --</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm font-medium mb-1">Comments</label>
          <textarea
            name="comments"
            value={form.comments}
            onChange={handleChange}
            rows="2"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Appointment Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Appointment Date & Time</label>
          <input
            type="datetime-local"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Cost */}
        <div>
          <label className="block text-sm font-medium mb-1">Treatment Cost (₹)</label>
          <input
            type="number"
            name="cost"
            value={form.cost}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Treatment */}
        <div>
          <label className="block text-sm font-medium mb-1">Treatment</label>
          <input
            type="text"
            name="treatment"
            value={form.treatment}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Follow-up">Follow-up</option>
          </select>
        </div>

        {/* Next Appointment */}
        <div>
          <label className="block text-sm font-medium mb-1">Next Appointment Date</label>
          <input
            type="date"
            name="nextDate"
            value={form.nextDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload Files</label>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="mb-2"
          />
          {files.length > 0 && (
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-600">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Save Incident
        </button>
      </form>
    </div>
  );
};

export default AddIncident;
