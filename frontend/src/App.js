import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import DoctorHome from './pages/doctor/DoctorHome';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorProfile from './pages/doctor/DoctorProfile';
import DoctorMedicalRecords from './pages/doctor/DoctorMedicalRecords';
import PatientHome from './pages/patient/PatientHome';
import PatientProfile from './pages/patient/PatientProfile';
import ScheduleAppointment from './pages/patient/ScheduleAppointment';
import PatientAppointments from './pages/patient/PatientAppointments';
import AddTreatmentSummary from './pages/doctor/AddTreatmentSummary';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/doctor" element={<DoctorHome />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/doctor/records" element={<DoctorMedicalRecords />} />

        <Route path="/patient" element={<PatientHome />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/patient/schedule" element={<ScheduleAppointment />} />
        <Route path="/patient/appointments" element={<PatientAppointments />} />
        <Route path="/doctor/add-summary" element={<AddTreatmentSummary />} />

      </Routes>
    </Router>
  );
}

export default App;
