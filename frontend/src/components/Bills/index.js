import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import './index.css';

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [form, setForm] = useState({ patient_id: '', receptionist_id: '', amount: '', details: '' });

  useEffect(() => {
    api.get('/bills').then(res => setBills(res.data));
  }, []);

  const handleAdd = async () => {
    const res = await api.post('/bills', form);
    setBills([...bills, res.data]);
  };

  return (
    <div className="bills-section">
      <h3>Bills</h3>
      {bills.map(b => <div key={b.id}>{b.amount} - {b.details}</div>)}
      <input placeholder="Patient ID" onChange={e => setForm({ ...form, patient_id: e.target.value })} />
      <input placeholder="Receptionist ID" onChange={e => setForm({ ...form, receptionist_id: e.target.value })} />
      <input placeholder="Amount" onChange={e => setForm({ ...form, amount: e.target.value })} />
      <input placeholder="Details" onChange={e => setForm({ ...form, details: e.target.value })} />
      <button onClick={handleAdd}>Generate Bill</button>
    </div>
  );
};

export default Bills;