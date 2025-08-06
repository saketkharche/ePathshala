import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/auth';
import { addStudent, addTeacher, addParent, assignTeacher, getStudents, getTeachers, getParents, deleteUser, addEvent, getEvents, deleteEvent, getDashboardSummary } from '../../api/admin';
import { getAllActiveSessions, getUserSessions, logoutSession, logoutAllUserSessions } from '../../api/session';
import { Box, Alert, CircularProgress, Typography } from '@mui/material';
import AdminSummary from './AdminSummary';
import AdminAddStudent from './AdminAddStudent';
import AdminAddTeacher from './AdminAddTeacher';
import AdminAddParent from './AdminAddParent';
import AdminAssignTeacher from './AdminAssignTeacher';
import AdminResetPassword from './AdminResetPassword';
import AdminAcademicCalendar from './AdminAcademicCalendar';
import AdminOnlineClasses from './AdminOnlineClasses';
import AdminSessionManagement from './AdminSessionManagement';

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
  const [onlineClasses, setOnlineClasses] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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
    const loadData = async () => {
      try {
        const [studentsData, teachersData, parentsData, eventsData, summaryData, onlineClassesData] = await Promise.all([
          getStudents(),
          getTeachers(),
          getParents(),
          getEvents(),
          getDashboardSummary(),
          fetch('/api/admin/online-classes', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }).then(res => res.ok ? res.json() : [])
        ]);
        setStudents(studentsData);
        setTeachers(teachersData);
        setParents(parentsData);
        setEvents(eventsData);
        setDashboardSummary(summaryData);
        setOnlineClasses(onlineClassesData);
        setLoading(false);
      } catch (error) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    loadData();
    loadActiveSessions();
  }, []);

  const loadActiveSessions = async () => {
    try {
      const sessions = await getAllActiveSessions();
      setActiveSessions(sessions.sessions || []);
    } catch (error) {
      setError('Failed to load active sessions');
    }
  };

  const loadUserSessions = async (userId) => {
    try {
      const numericUserId = parseInt(userId, 10);
      if (isNaN(numericUserId)) {
        setError('Invalid user ID. Please enter a valid number.');
        return;
      }
      const sessions = await getUserSessions(numericUserId);
      setSelectedUserSessions(sessions.sessions || []);
    } catch (error) {
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
      setError('Failed to logout session');
    }
  };

  const handleLogoutAllUserSessions = async (userId) => {
    try {
      const numericUserId = parseInt(userId, 10);
      if (isNaN(numericUserId)) {
        setError('Invalid user ID. Please enter a valid number.');
        return;
      }
      await logoutAllUserSessions(numericUserId);
      setMessage('All user sessions logged out successfully');
      loadActiveSessions();
      setSelectedUserSessions([]);
    } catch (error) {
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
      const res = await fetch(`/api/auth/reset-password?email=${resetEmail}&newPassword=${newPassword}`, { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setResetMessage('Password reset successfully!');
        setResetEmail('');
        setNewPassword('');
      } else {
        setResetMessage(data.error || data.message || 'Password reset failed');
      }
    } catch (error) {
      setResetMessage('Error resetting password: ' + error.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <span style={{ marginLeft: 8 }}>Loading dashboard...</span>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}
      {message && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setMessage('')}>{message}</Alert>
      )}
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <AdminSummary summary={dashboardSummary} />
      <AdminAddStudent studentForm={studentForm} setStudentForm={setStudentForm} onAddStudent={handleAddStudent} />
      <AdminAddTeacher teacherForm={teacherForm} setTeacherForm={setTeacherForm} onAddTeacher={handleAddTeacher} />
      <AdminAddParent parentForm={parentForm} setParentForm={setParentForm} onAddParent={handleAddParent} />
      <AdminAssignTeacher assign={assign} setAssign={setAssign} onAssignTeacher={handleAssignTeacher} />
      <AdminResetPassword resetEmail={resetEmail} setResetEmail={setResetEmail} newPassword={newPassword} setNewPassword={setNewPassword} resetMessage={resetMessage} onResetPassword={handleResetPassword} />
      <AdminAcademicCalendar eventForm={eventForm} setEventForm={setEventForm} onAddEvent={handleAddEvent} events={events} onDeleteEvent={handleDeleteEvent} />
      <AdminOnlineClasses onlineClasses={onlineClasses} />
      <AdminSessionManagement
        activeSessions={activeSessions}
        loadActiveSessions={loadActiveSessions}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        selectedUserSessions={selectedUserSessions}
        loadUserSessions={loadUserSessions}
        handleLogoutSession={handleLogoutSession}
        handleLogoutAllUserSessions={handleLogoutAllUserSessions}
      />
    </Box>
  );
}

export default AdminDashboard;