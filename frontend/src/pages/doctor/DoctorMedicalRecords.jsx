import { useState } from 'react';
import axiosInstance from '../../axiosConfig';

const DoctorMedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [patientEmail, setPatientEmail] = useState('');
  const [form, setForm] = useState({
    date: '',
    diagnosis: '',
    prescription: '',
    notes: '',
  });

  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.get(`/api/records?patientEmail=${encodeURIComponent(patientEmail)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.error(res.data); //remove this later
      setRecords(res.data);
    } catch (err) {
      console.error('Error fetching records:', err);
      alert('No records found or invalid email');
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        patientEmail,
        ...form,
      };


      await axiosInstance.post('/api/records', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Record added successfully!');
      fetchRecords(); // refresh records list
      setForm({ date: '', diagnosis: '', prescription: '', notes: '' }); // clear form
    } catch (err) {
      console.error('Error saving record:', err);
      alert('Failed to add record');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Patient Medical Records</h2>

      {/* Email Input */}
      <div className="mb-6">
        <input
          type="email"
          placeholder="Enter Patient Email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          className="p-2 border rounded w-full mb-2"
        />
        <button onClick={fetchRecords} className="bg-green-600 text-white px-4 py-2 rounded">
          Fetch Records
        </button>
      </div>

      {/* Records List */}
      {records.length > 0 ? (
        <ul className="space-y-4 mb-8">
          {records.map((record) => (
            <li key={record._id} className="p-4 border rounded shadow">
              <p><strong>Date:</strong> {record.date}</p>
              <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p><strong>Prescription:</strong> {record.prescription}</p>
              <p><strong>Notes:</strong> {record.notes}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-8">No records found.</p>
      )}

      {/* Add New Record */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Add New Medical Record</h3>
        <form onSubmit={handleAddRecord} className="space-y-3">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="diagnosis"
            placeholder="Diagnosis"
            value={form.diagnosis}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="prescription"
            placeholder="Prescription"
            value={form.prescription}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
          <textarea
            name="notes"
            placeholder="Additional Notes"
            value={form.notes}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Record
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorMedicalRecords;
