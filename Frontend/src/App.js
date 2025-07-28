import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import StudentDashboard from './components/dashboard/StudentDashboard';
import ParentDashboard from './components/dashboard/ParentDashboard';
import Students from './components/admin/Students';
import Teachers from './components/admin/Teachers';
import Parents from './components/admin/Parents';
import Assignments from './components/assignments/Assignments';
import Attendance from './components/attendance/Attendance';
import Grades from './components/grades/Grades';
import LeaveApplications from './components/leave/LeaveApplications';
import AcademicCalendar from './components/calendar/AcademicCalendar';
import Layout from './components/layout/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function PrivateRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/students" element={
              <PrivateRoute allowedRoles={['Admin']}>
                <Layout>
                  <Students />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/admin/teachers" element={
              <PrivateRoute allowedRoles={['Admin']}>
                <Layout>
                  <Teachers />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/admin/parents" element={
              <PrivateRoute allowedRoles={['Admin']}>
                <Layout>
                  <Parents />
                </Layout>
              </PrivateRoute>
            } />
            
            {/* Teacher Routes */}
            <Route path="/assignments" element={
              <PrivateRoute allowedRoles={['Teacher']}>
                <Layout>
                  <Assignments />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/attendance" element={
              <PrivateRoute allowedRoles={['Teacher']}>
                <Layout>
                  <Attendance />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/grades" element={
              <PrivateRoute allowedRoles={['Teacher']}>
                <Layout>
                  <Grades />
                </Layout>
              </PrivateRoute>
            } />
            
            {/* Student Routes */}
            <Route path="/student/assignments" element={
              <PrivateRoute allowedRoles={['Student']}>
                <Layout>
                  <Assignments />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/student/grades" element={
              <PrivateRoute allowedRoles={['Student']}>
                <Layout>
                  <Grades />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/student/leave" element={
              <PrivateRoute allowedRoles={['Student']}>
                <Layout>
                  <LeaveApplications />
                </Layout>
              </PrivateRoute>
            } />
            
            {/* Parent Routes */}
            <Route path="/parent/children" element={
              <PrivateRoute allowedRoles={['Parent']}>
                <Layout>
                  <Students />
                </Layout>
              </PrivateRoute>
            } />
            
            {/* Common Routes */}
            <Route path="/calendar" element={
              <PrivateRoute>
                <Layout>
                  <AcademicCalendar />
                </Layout>
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
