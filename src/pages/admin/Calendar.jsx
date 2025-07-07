import { useEffect, useState } from "react";

const Calendar = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setIncidents(storedIncidents);
    setPatients(storedPatients);
  }, []);

  const getPatientName = (id) => {
    const patient = patients.find((p) => p.id === id);
    return patient?.name || "Unknown";
  };

  const grouped = incidents.reduce((acc, incident) => {
    const dateKey = incident.appointmentDate.split("T")[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(incident);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">📅 Appointment Calendar</h2>
      {sortedDates.length === 0 ? (
        <p className="text-gray-500">No upcoming appointments.</p>
      ) : (
        <div className="space-y-6">
          {sortedDates.map((date) => (
            <div key={date}>
              <h3 className="text-md font-semibold text-gray-700 border-b pb-1 mb-2">
                {new Date(date).toDateString()}
              </h3>
              <ul className="space-y-2 text-sm">
                {grouped[date].map((item) => (
                  <li
                    key={item.id}
                    className="bg-gray-50 border px-4 py-2 rounded flex justify-between"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-600">
                        {getPatientName(item.patientId)} at{" "}
                        {new Date(item.appointmentDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p className="text-sm text-blue-600">{item.status || "Pending"}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
