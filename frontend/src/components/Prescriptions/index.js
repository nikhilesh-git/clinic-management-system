import React, { useState } from 'react';
import api from '../../api/axios';
import './index.css';

const Prescriptions = () => {
  const [form, setForm] = useState({
    patient_id: '',
    doctor_id: '',
    notes: '',
    items: []
  });

  const [med, setMed] = useState({ medicine_name: '', dosage: '', duration: '' });

  const handleAdd = () => {
    setForm({ ...form, items: [...form.items, med] });
    setMed({ medicine_name: '', dosage: '', duration: '' });
  };

  const handleSubmit = async () => {
    await api.post('/prescriptions', form);
    alert('Prescription submitted');
  };

  return (
    <div className="prescriptions-section">
      <h3>Prescriptions</h3>
      <input placeholder="Patient ID" onChange={e => setForm({ ...form, patient_id: e.target.value })} />
      <input placeholder="Doctor ID" onChange={e => setForm({ ...form, doctor_id: e.target.value })} />
      <input placeholder="Notes" onChange={e => setForm({ ...form, notes: e.target.value })} />
      <h4>Prescription Items</h4>
      <input placeholder="Medicine Name" value={med.medicine_name} onChange={e => setMed({ ...med, medicine_name: e.target.value })} />
      <input placeholder="Dosage" value={med.dosage} onChange={e => setMed({ ...med, dosage: e.target.value })} />
      <input placeholder="Duration" value={med.duration} onChange={e => setMed({ ...med, duration: e.target.value })} />
      <button onClick={handleAdd}>Add Item</button>
      <button onClick={handleSubmit}>Submit Prescription</button>
    </div>
  );
};

export default Prescriptions;
