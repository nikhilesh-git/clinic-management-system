import React, { useState } from 'react';
import api from '../../../api/axios';
import './index.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'receptionist' });

  const handleRegister = async () => {
    await api.post('/auth/register', form);
    alert('Registered!');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="doctor">Doctor</option>
        <option value="receptionist">Receptionist</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;