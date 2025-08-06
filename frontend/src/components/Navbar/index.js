import './index.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-title">Direction</div>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/patients">Patients</Link>
        <Link to="/tokens">Tokens</Link>
        <Link to="/prescriptions">Prescriptions</Link>
        <Link to="/bills">Bills</Link>
        <Link to="/logs">Logs</Link>
      </div>
    </nav>
  );
};

export default Navbar;
