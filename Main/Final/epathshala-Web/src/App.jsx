import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./utils/auth.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import AdminDashboard from "./pages/dashboard/AdminDashboard.jsx";
import StudentDashboard from "./pages/dashboard/StudentDashboard.jsx";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard.jsx";
import ParentDashboard from "./pages/dashboard/ParentDashboard.jsx";
import Navbar from "./components/common/Navbar.jsx";
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
          <Route path="/admin" element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          } />
          <Route path="/student" element={
            <DashboardLayout>
              <StudentDashboard />
            </DashboardLayout>
          } />
          <Route path="/teacher" element={
            <DashboardLayout>
              <TeacherDashboard />
            </DashboardLayout>
          } />
          <Route path="/parent" element={
            <DashboardLayout>
              <ParentDashboard />
            </DashboardLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;