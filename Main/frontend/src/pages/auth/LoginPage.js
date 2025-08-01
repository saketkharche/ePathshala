import React, { useState } from "react";
import { useAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");

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

  const handleForgot = async (e) => {
    e.preventDefault();
    setForgotMsg("");
    const res = await fetch(`/api/auth/forgot-password?email=${forgotEmail}`, { method: "POST" });
    const data = await res.json();
    setForgotMsg(data.message || data.error);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setResetMsg("");
    const res = await fetch(`/api/auth/reset-password?email=${resetEmail}&newPassword=${newPassword}`, { method: "POST" });
    const data = await res.json();
    setResetMsg(data.message || data.error);
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
      <button style={{ marginTop: 10 }} onClick={() => setShowForgot(true)}>Forgot Password?</button>
      {showForgot && (
        <div style={{ border: '1px solid #ccc', padding: 20, marginTop: 20, maxWidth: 400 }}>
          <h3>Forgot Password</h3>
          <form onSubmit={handleForgot}>
            <input placeholder="Email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required />
            <button type="submit">Request Reset</button>
          </form>
          {forgotMsg && <div style={{ color: forgotMsg.includes('error') ? 'red' : 'green' }}>{forgotMsg}</div>}
          <h4>Reset Password</h4>
          <form onSubmit={handleReset}>
            <input placeholder="Email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} required />
            <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            <button type="submit">Reset Password</button>
          </form>
          {resetMsg && <div style={{ color: resetMsg.includes('error') ? 'red' : 'green' }}>{resetMsg}</div>}
          <button onClick={() => setShowForgot(false)} style={{ marginTop: 10 }}>Close</button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;