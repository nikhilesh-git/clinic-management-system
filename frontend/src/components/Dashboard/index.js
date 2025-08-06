import React from 'react';
import Patients from '../Patients';
import Tokens from '../Tokens';
import Prescriptions from '../Prescriptions';
import Bills from '../Bills';
import './index.css';

const Dashboard = () => (
  <div className="dashboard">
    <h2>Dashboard</h2>
    <Patients />
    <Tokens />
    <Prescriptions />
    <Bills />
  </div>
);

export default Dashboard;