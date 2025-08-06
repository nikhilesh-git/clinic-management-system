import './index.css';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/Navbar';

const Tokens = () => {
  const [tokens, setTokens] = useState([]);
  const [form, setForm] = useState({ patient_id: '', created_by: '' });

  const fetchTokens = () => {
    axios.get('/tokens').then((res) => setTokens(res.data));
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.patient_id || !form.created_by) return alert('All fields required');
    await axios.post('/tokens', form);
    setForm({ patient_id: '', created_by: '' });
    fetchTokens();
  };

  return (
    <>
      <Navbar />
      <div className="tokens">
        <h2 className="title">Tokens</h2>

        <form onSubmit={handleSubmit} className="token-form">
          <input
            name="patient_id"
            value={form.patient_id}
            onChange={handleChange}
            placeholder="Patient ID"
            className="input"
          />
          <input
            name="created_by"
            value={form.created_by}
            onChange={handleChange}
            placeholder="Receptionist ID"
            className="input"
          />
          <button type="submit" className="btn">Generate Token</button>
        </form>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Token</th>
              <th>Patient ID</th>
              <th>Created By</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.token_number}</td>
                <td>{t.patient_id}</td>
                <td>{t.created_by}</td>
                <td>{new Date(t.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tokens;