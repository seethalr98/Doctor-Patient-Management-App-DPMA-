import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig';

const AddTreatmentSummary = () => {
  const [form, setForm] = useState({
    patientId: '',
    date: '',
    diagnosis: '',
    prescription: '',
    notes: '',
  });

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get('/api/patients/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(res.data);
      } catch (err) {
        console.error('Failed to load patients', err);
      }
    };
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.post('/api/records', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Treatment summary added successfully.');
      setForm({ patientId: '', date: '', diagnosis: '', prescription: '', notes: '' });
    } catch (err) {
      alert('Failed to add treatment summary.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Treatment Summary</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.name} ({patient.email})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnosis"
          value={form.diagnosis}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="prescription"
          placeholder="Prescription"
          value={form.prescription}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Summary
        </button>
      </form>
    </div>
  );
};

export default AddTreatmentSummary;
