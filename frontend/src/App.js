import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import Tokens from './components/Tokens';
import Prescriptions from './components/Prescriptions';
import Bills from './components/Bills';
import './App.css';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/patients" element={token ? <Patients /> : <Navigate to="/" />} />
        <Route path="/tokens" element={token ? <Tokens /> : <Navigate to="/" />} />
        <Route path="/prescriptions" element={token ? <Prescriptions /> : <Navigate to="/" />} />
        <Route path="/bills" element={token ? <Bills /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
