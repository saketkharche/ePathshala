import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/auth';
import { addStudent, addTeacher, addParent, assignTeacher, getStudents, getTeachers, getParents, deleteUser, addEvent, getEvents, deleteEvent, getDashboardSummary } from '../../api/admin';
import { getAllActiveSessions, getUserSessions, logoutSession, logoutAllUserSessions } from '../../api/session';
import { Button, Box, TextField, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Alert, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';

function AdminDashboard() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [parents, setParents] = useState([]);
  const [events, setEvents] = useState([]);
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [activeSessions, setActiveSessions] = useState([]);
  const [selectedUserSessions, setSelectedUserSessions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Form states
  const [studentForm, setStudentForm] = useState({ name: '', email: '', password: '', studentClass: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', email: '', password: '', subject: '', assignedClass: '' });
  const [parentForm, setParentForm] = useState({ name: '', email: '', password: '' });
  const [eventForm, setEventForm] = useState({ eventName: '', date: '', description: '' });
  const [assign, setAssign] = useState({ email: '', subject: '', assignedClass: '' });
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  useEffect(() => {
    getStudents().then(setStudents);
    getTeachers().then(setTeachers);
    getParents().then(setParents);
    getEvents().then(setEvents);
    getDashboardSummary().then(setDashboardSummary);
    loadActiveSessions();
  }, []);

  const loadActiveSessions = async () => {
    try {
      const sessions = await getAllActiveSessions();
      setActiveSessions(sessions.sessions || []);
    } catch (error) {
      console.error('Error loading active sessions:', error);
      setError('Failed to load active sessions');
    }
  };

  const loadUserSessions = async (userId) => {
    try {
      // Convert string userId to number
      const numericUserId = parseInt(userId, 10);
      if (isNaN(numericUserId)) {
        setError('Invalid user ID. Please enter a valid number.');
        return;
      }
      
      console.log('Loading sessions for user ID:', numericUserId);
      const sessions = await getUserSessions(numericUserId);
      setSelectedUserSessions(sessions.sessions || []);
    } catch (error) {
      console.error('Error loading user sessions:', error);
      setError('Failed to load user sessions: ' + error.message);
    }
  };

  const handleLogoutSession = async (sessionId) => {
    try {
      await logoutSession(sessionId);
      setMessage('Session logged out successfully');
      loadActiveSessions();
      if (selectedUserId) {
        loadUserSessions(selectedUserId);
      }
    } catch (error) {
      console.error('Error logging out session:', error);
      setError('Failed to logout session');
    }
  };

  const handleLogoutAllUserSessions = async (userId) => {
    try {
      // Convert string userId to number
      const numericUserId = parseInt(userId, 10);
      if (isNaN(numericUserId)) {
        setError('Invalid user ID. Please enter a valid number.');
        return;
      }
      
      console.log('Logging out all sessions for user ID:', numericUserId);
      await logoutAllUserSessions(numericUserId);
      setMessage('All user sessions logged out successfully');
      loadActiveSessions();
      setSelectedUserSessions([]);
    } catch (error) {
      console.error('Error logging out all user sessions:', error);
      setError('Failed to logout all user sessions: ' + error.message);
    }
  };

  const handleAddStudent = async e => {
    e.preventDefault();
    await addStudent(studentForm);
    getStudents().then(setStudents);
  };
  const handleAddTeacher = async e => {
    e.preventDefault();
    await addTeacher(teacherForm);
    getTeachers().then(setTeachers);
  };
  const handleAddParent = async e => {
    e.preventDefault();
    await addParent(parentForm);
    getParents().then(setParents);
  };
  const handleAssignTeacher = async e => {
    e.preventDefault();
    await assignTeacher(assign);
    getTeachers().then(setTeachers);
  };
  const handleAddEvent = async e => {
    e.preventDefault();
    await addEvent(eventForm);
    getEvents().then(setEvents);
  };
  const handleDeleteEvent = async id => {
    await deleteEvent(id);
    getEvents().then(setEvents);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetMessage('');
    
    const token = localStorage.getItem('token');
    if (!token) {
      setResetMessage('Error: No authentication token found. Please login again.');
      return;
    }
    
    try {
      console.log('Attempting to reset password for:', resetEmail);
      console.log('Token available:', !!token);
      const res = await fetch(`/api/auth/reset-password?email=${resetEmail}&newPassword=${newPassword}`, { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      if (res.ok) {
        setResetMessage('Password reset successfully!');
        setResetEmail('');
        setNewPassword('');
      } else {
        setResetMessage(data.error || data.message || 'Password reset failed');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setResetMessage('Error resetting password: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Summary</h3>
      <ul>
        <li>Students: {dashboardSummary?.students}</li>
        <li>Teachers: {dashboardSummary?.teachers}</li>
        <li>Parents: {dashboardSummary?.parents}</li>
        <li>Events: {dashboardSummary?.events}</li>
      </ul>
      <h3>Add Student</h3>
      <form onSubmit={handleAddStudent}>
        <input placeholder="Name" value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} />
        <input placeholder="Email" value={studentForm.email} onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} />
        <input placeholder="Password" type="password" value={studentForm.password} onChange={e => setStudentForm({ ...studentForm, password: e.target.value })} />
        <input placeholder="Class" value={studentForm.studentClass} onChange={e => setStudentForm({ ...studentForm, studentClass: e.target.value })} />
        <button type="submit">Add Student</button>
      </form>
      <h3>Add Teacher</h3>
      <form onSubmit={handleAddTeacher}>
        <input placeholder="Name" value={teacherForm.name} onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })} />
        <input placeholder="Email" value={teacherForm.email} onChange={e => setTeacherForm({ ...teacherForm, email: e.target.value })} />
        <input placeholder="Password" type="password" value={teacherForm.password} onChange={e => setTeacherForm({ ...teacherForm, password: e.target.value })} />
        <input placeholder="Subject" value={teacherForm.subject} onChange={e => setTeacherForm({ ...teacherForm, subject: e.target.value })} />
        <input placeholder="Assigned Class" value={teacherForm.assignedClass} onChange={e => setTeacherForm({ ...teacherForm, assignedClass: e.target.value })} />
        <button type="submit">Add Teacher</button>
      </form>
      <h3>Add Parent</h3>
      <form onSubmit={handleAddParent}>
        <input placeholder="Name" value={parentForm.name} onChange={e => setParentForm({ ...parentForm, name: e.target.value })} />
        <input placeholder="Email" value={parentForm.email} onChange={e => setParentForm({ ...parentForm, email: e.target.value })} />
        <input placeholder="Password" type="password" value={parentForm.password} onChange={e => setParentForm({ ...parentForm, password: e.target.value })} />
        <button type="submit">Add Parent</button>
      </form>
      <h3>Assign Teacher to Class/Subject</h3>
      <form onSubmit={handleAssignTeacher}>
        <input placeholder="Teacher Email" value={assign.email} onChange={e => setAssign({ ...assign, email: e.target.value })} />
        <input placeholder="Subject" value={assign.subject} onChange={e => setAssign({ ...assign, subject: e.target.value })} />
        <input placeholder="Assigned Class" value={assign.assignedClass} onChange={e => setAssign({ ...assign, assignedClass: e.target.value })} />
        <button type="submit">Assign</button>
      </form>
      
      <h3>Reset User Password</h3>
      <form onSubmit={handleResetPassword}>
        <input 
          placeholder="User Email" 
          value={resetEmail} 
          onChange={e => setResetEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="New Password" 
          value={newPassword} 
          onChange={e => setNewPassword(e.target.value)} 
          required 
        />
        <button type="submit">Reset Password</button>
      </form>
      {resetMessage && (
        <div style={{ 
          color: resetMessage.includes('successfully') ? 'green' : 'red',
          marginTop: '10px',
          padding: '10px',
          border: '1px solid',
          borderRadius: '4px'
        }}>
          {resetMessage}
        </div>
      )}
      
      <h3>Academic Calendar</h3>
      <form onSubmit={handleAddEvent}>
        <input placeholder="Event Name" value={eventForm.eventName} onChange={e => setEventForm({ ...eventForm, eventName: e.target.value })} />
        <input type="date" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} />
        <input placeholder="Description" value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} />
        <button type="submit">Add Event</button>
      </form>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.eventName} - {event.date}
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Session Management Section */}
      <h3>Session Management</h3>
      
      {/* Active Sessions */}
      <div>
        <h4>Active Sessions ({activeSessions.length})</h4>
        <button onClick={loadActiveSessions}>Refresh Sessions</button>
        <ul>
          {activeSessions.map(session => (
            <li key={session.sessionId}>
              <strong>{session.userName}</strong> ({session.userEmail}) - {session.userRole}
              <br />
              <small>
                Login: {session.loginTime} | Last Activity: {session.lastActivityTime} | IP: {session.ipAddress}
              </small>
              <button onClick={() => handleLogoutSession(session.sessionId)}>Logout Session</button>
            </li>
          ))}
        </ul>
      </div>

      {/* User Sessions */}
      <div>
        <h4>User Sessions</h4>
        <input 
          placeholder="Enter User ID" 
          value={selectedUserId} 
          onChange={e => setSelectedUserId(e.target.value)} 
        />
        <button onClick={() => loadUserSessions(selectedUserId)}>Load User Sessions</button>
        <button onClick={() => handleLogoutAllUserSessions(selectedUserId)}>Logout All User Sessions</button>
        
        <ul>
          {selectedUserSessions.map(session => (
            <li key={session.sessionId}>
              <strong>Session ID:</strong> {session.sessionId}
              <br />
              <small>
                Login: {session.loginTime} | Last Activity: {session.lastActivityTime} | IP: {session.ipAddress}
                <br />
                Status: {session.isActive ? 'Active' : 'Inactive'} | Expired: {session.isExpired ? 'Yes' : 'No'}
              </small>
              {session.isActive && (
                <button onClick={() => handleLogoutSession(session.sessionId)}>Logout Session</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Messages */}
      {message && <Alert severity="success" onClose={() => setMessage('')}>{message}</Alert>}
      {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}
    </div>
  );
}

export default AdminDashboard;