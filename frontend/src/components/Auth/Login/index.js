import './index.css';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class Login extends Component {
  state = {
    role: 'doctor',
    email: '',
    password: '',
    redirectTo: null
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleRoleChange = (e) => {
    this.setState({ role: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { role,email,password } = this.state;
    const url='http://localhost:3000/auth/login/'
    if (role === 'doctor') {
      this.setState({ redirectTo: '/dashboard' });
    } else {  
      this.setState({ redirectTo: '/tokens' });
    }
  };

  render() {
    const { role, email, password, redirectTo } = this.state;

    if (redirectTo) {
      return <Navigate to={redirectTo} />;
    }

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <h2>Login</h2>

          <label htmlFor="role">Login as</label>
          <select id="role" value={role} onChange={this.handleRoleChange}>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
          </select>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Login</button>

          <p className="register-link">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
