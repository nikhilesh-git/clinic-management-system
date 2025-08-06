import './index.css';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/Navbar';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', gender: '', phone: '' });

  const fetchPatients = () => {
    axios.get('/patients').then((res) => setPatients(res.data));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.gender || !form.phone) return alert('All fields required');
    await axios.post('/patients', form);
    setForm({ name: '', age: '', gender: '', phone: '' });
    fetchPatients();
  };

  return (
    <>
      <Navbar />
      <div className="patients">
        <h2 className="title">Patients</h2>

        <form onSubmit={handleSubmit} className="patient-form">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
          <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" className="input" />
          <select name="gender" value={form.gender} onChange={handleChange} className="input">
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="input" />
          <button type="submit" className="btn">Add Patient</button>
        </form>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Patients;
