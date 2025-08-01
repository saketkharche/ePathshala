import React, { useState } from "react";
import { useAuth } from "../../utils/auth";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    if (res.ok) {
      const data = await res.json();
      login(data.token, data.role, data.userId, data.name);
      navigate(`/${data.role.toLowerCase()}`);
    } else {
      alert("Login failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="ADMIN">Admin</option>
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
          <option value="PARENT">Parent</option>
        </select>
        <button type="submit">Login</button>
      </form>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/forgot-password" style={{ color: '#1976d2', textDecoration: 'none' }}>
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;