import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/auth';
import { addStudent, addTeacher, addParent, assignTeacher, getStudents, getTeachers, getParents, deleteUser, addEvent, getEvents, deleteEvent, getDashboardSummary } from '../../api/admin';
import { getAllActiveSessions, getUserSessions, logoutSession, logoutAllUserSessions } from '../../api/session';
import { Box, Alert, CircularProgress, Typography, Grid, Card, CardContent } from '@mui/material';
import { useResponsive, typography, gridConfig, cardStyles } from '../../utils/responsive';
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
  const { isMobile, isTablet, isDesktop } = useResponsive();
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
      setError('Failed to logout session: ' + error.message);
    }
  };

  const handleLogoutAllUserSessions = async (userId) => {
    try {
      await logoutAllUserSessions(userId);
      setMessage('All sessions for user logged out successfully');
      loadActiveSessions();
      if (selectedUserId) {
        loadUserSessions(selectedUserId);
      }
    } catch (error) {
      setError('Failed to logout all user sessions: ' + error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail || !newPassword) {
      setError('Please provide both email and new password');
      return;
    }

    try {
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ email: resetEmail, newPassword })
      });

      if (response.ok) {
        setResetMessage('Password reset successfully');
        setResetEmail('');
        setNewPassword('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to reset password');
      }
    } catch (error) {
      setError('Failed to reset password: ' + error.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {/* Dashboard Summary */}
      {dashboardSummary && (
        <Box sx={{ mb: { xs: 3, sm: 4, md: 5 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              fontSize: typography.h4,
              mb: { xs: 2, sm: 3 }
            }}
          >
            Dashboard Overview
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                p: { xs: 2, sm: 3 },
                borderRadius: { xs: 2, sm: 3 },
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {dashboardSummary.totalStudents || 0}
                </Typography>
                <Typography variant="body2">Total Students</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                p: { xs: 2, sm: 3 },
                borderRadius: { xs: 2, sm: 3 },
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white'
              }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {dashboardSummary.totalTeachers || 0}
                </Typography>
                <Typography variant="body2">Total Teachers</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                p: { xs: 2, sm: 3 },
                borderRadius: { xs: 2, sm: 3 },
                textAlign: 'center',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white'
              }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {dashboardSummary.totalParents || 0}
                </Typography>
                <Typography variant="body2">Total Parents</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                p: { xs: 2, sm: 3 },
                borderRadius: { xs: 2, sm: 3 },
                textAlign: 'center',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: 'white'
              }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {dashboardSummary.totalEvents || 0}
                </Typography>
                <Typography variant="body2">Total Events</Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Admin Components */}
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        <Grid item xs={12} md={6}>
          <AdminSummary />
        </Grid>
        <Grid item xs={12} md={6}>
          <AdminAddStudent />
        </Grid>
        <Grid item xs={12} md={6}>
          <AdminAddTeacher />
        </Grid>
        <Grid item xs={12} md={6}>
          <AdminAddParent />
        </Grid>
        <Grid item xs={12} md={6}>
          <AdminAssignTeacher />
        </Grid>
        <Grid item xs={12} md={6}>
          <AdminResetPassword />
        </Grid>
        <Grid item xs={12}>
          <AdminAcademicCalendar />
        </Grid>
        <Grid item xs={12}>
          <AdminOnlineClasses />
        </Grid>
        <Grid item xs={12}>
          <AdminSessionManagement />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;