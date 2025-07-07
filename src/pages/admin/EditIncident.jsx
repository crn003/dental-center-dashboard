// src/pages/admin/EditIncident.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditIncident = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [incident, setIncident] = useState(null);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    comments: "",
    appointmentDate: "",
    cost: "",
    status: "",
    files: [],
    patientId: "",
  });

  useEffect(() => {
    const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    const incidentToEdit = storedIncidents.find((inc) => inc.id === id);
    setIncident(incidentToEdit);
    if (incidentToEdit) setForm(incidentToEdit);

    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(storedPatients);
  }, [id]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map((file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({ name: file.name, url: reader.result });
          };
          reader.readAsDataURL(file);
        })
      )
    ).then((fileData) => {
      setForm({ ...form, files: [...form.files, ...fileData] });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    const updatedIncidents = storedIncidents.map((inc) =>
      inc.id === id ? form : inc
    );
    localStorage.setItem("incidents", JSON.stringify(updatedIncidents));
    navigate("/admin/incidents");
  };

  if (!incident) return <p>Loading incident...</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold text-blue-600 mb-4">📝 Edit Incident</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium">Patient</label>
          <select
            value={form.patientId}
            onChange={(e) => setForm({ ...form, patientId: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        ></textarea>
        <textarea
          placeholder="Comments"
          value={form.comments}
          onChange={(e) => setForm({ ...form, comments: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        ></textarea>
        <input
          type="datetime-local"
          value={form.appointmentDate}
          onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Cost"
          value={form.cost}
          onChange={(e) => setForm({ ...form, cost: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex gap-2 flex-wrap">
          {form.files?.map((file, idx) => (
            <a
              key={idx}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 underline"
            >
              {file.name}
            </a>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditIncident;
