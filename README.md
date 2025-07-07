# 🦷 Dental Center Management Dashboard

A responsive, role-based web dashboard built with **React**, **Tailwind CSS**, and **React Router** to simulate a Dental Center's internal operations. This app provides **Admins** with full patient and treatment management capabilities, while **Patients** can securely log in to view their appointment and treatment history.

🎯 Developed as part of the ENTNT Frontend Assignment.



## 🔐 Login Credentials

| Role     | Email              | Password     |
|----------|--------------------|--------------|
| Admin    | admin@entnt.in     | admin123     |
| Patient  | john@entnt.in      | patient123   |

---

## 📌 Features

### 👨‍⚕️ Admin Panel
- Secure login and role-based routing
- Dashboard with KPIs (Patients, Appointments, Revenue)
- Add/Edit/Delete patients
- Create and manage treatment incidents
- Upload and view treatment-related documents
- Appointment calendar view




### 👤 Patient Panel
- Secure login access
- View personal treatment history and appointments
- See uploaded medical/treatment files
- Logout functionality

---

## 🧱 Tech Stack

| Layer         | Technologies Used                                |
|---------------|--------------------------------------------------|
| Frontend      | React + Vite                                     |
| Styling       | Tailwind CSS                                     |
| Routing       | React Router DOM                                 |
| Auth/State    | React Context API                                |
| Persistence   | localStorage (fully simulated frontend storage)  |
| File Uploads  | Base64 Preview Uploads                           |

---

## 🗂️ Project Structure

src/
├── assets/                 # Static images/files
├── components/             # Reusable UI elements
├── context/                # Auth context & provider
├── layouts/                # Admin layout (sidebar + header)
├── pages/
│ ├── admin/                # Admin views (patients, incidents, calendar)
│ └── patient/              # Patient dashboard
├── App.jsx                 # Route definitions
├── main.jsx                # Entry point
└── index.css               # Tailwind base styles



---

## 📈 Admin KPIs Dashboard

- ✅ Total Registered Patients  
- 📋 Total Appointments/Treatments  
- 📦 Completed vs Pending Cases  
- 💰 Total Revenue (₹ calculated from treatment costs)

---

## 📅 Calendar View

A clean visual calendar for admins to see upcoming appointments by date.

---

## 🗃️ Data Persistence

All data is **stored locally** via `localStorage`, including:
- User session
- Patients list
- Appointments/Treatments
- Uploaded treatment documents (as base64)

> ⚠️ No backend or API used – purely frontend simulation as per assignment spec.

---

## ✅ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dental-center-dashboard.git
cd dental-center-dashboard
2. Install Dependencies
npm install
3. Start Development Server
npm run dev
App runs on: http://localhost:5173

🧪 Testing the App
Log in as Admin → Add patients, create incidents with date/cost/status/files.

Log in as Patient → View personalized dashboard with only assigned incidents.

Logout to return to login screen.


📁 Sample Data
You may manually inject localStorage entries for testing:

patients → array of patient objects

incidents → array of treatment records with patientId, title, description, appointmentDate, cost, status, and files

📬 Submission
📧 Submit both links to: hr@entnt.in

👨‍💻 Developer Info
Name: CHARAN UNNAM
GitHub: https://github.com/crn003

Email: charanchowdaryunnam@gmail.com


✅ Final Notes
All functionalities completed as per the ENTNT frontend assignment

No plagiarism or code generators used — all code manually written and original

Fully responsive and mobile-friendly interface

Clean, readable code structure using React best practices
