import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import ParentDashboard from "./pages/dashboard/ParentDashboard";
import Forum from "./components/forum/Forum";
import Chat from "./components/chat/Chat";
import Notifications from "./components/notifications/Notifications";
import Navbar from "./components/common/Navbar";
import { Box } from '@mui/material';

// Layout component for authenticated pages
function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          } />
          <Route path="/admin/forum" element={
            <DashboardLayout>
              <Forum />
            </DashboardLayout>
          } />
          <Route path="/admin/chat" element={
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          } />
          <Route path="/admin/notifications" element={
            <DashboardLayout>
              <Notifications />
            </DashboardLayout>
          } />
          
          {/* Student Routes */}
          <Route path="/student" element={
            <DashboardLayout>
              <StudentDashboard />
            </DashboardLayout>
          } />
          <Route path="/student/forum" element={
            <DashboardLayout>
              <Forum />
            </DashboardLayout>
          } />
          <Route path="/student/chat" element={
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          } />
          <Route path="/student/notifications" element={
            <DashboardLayout>
              <Notifications />
            </DashboardLayout>
          } />
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={
            <DashboardLayout>
              <TeacherDashboard />
            </DashboardLayout>
          } />
          <Route path="/teacher/forum" element={
            <DashboardLayout>
              <Forum />
            </DashboardLayout>
          } />
          <Route path="/teacher/chat" element={
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          } />
          <Route path="/teacher/notifications" element={
            <DashboardLayout>
              <Notifications />
            </DashboardLayout>
          } />
          
          {/* Parent Routes */}
          <Route path="/parent" element={
            <DashboardLayout>
              <ParentDashboard />
            </DashboardLayout>
          } />
          <Route path="/parent/forum" element={
            <DashboardLayout>
              <Forum />
            </DashboardLayout>
          } />
          <Route path="/parent/chat" element={
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          } />
          <Route path="/parent/notifications" element={
            <DashboardLayout>
              <Notifications />
            </DashboardLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;