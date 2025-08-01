import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AdminDashboard from "./pages/dashboard/AdminDashboard.jsx";
import StudentDashboard from "./pages/dashboard/StudentDashboard.jsx";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard.jsx";
import ParentDashboard from "./pages/dashboard/ParentDashboard.jsx";
import { AuthProvider, useAuth } from "./utils/auth.jsx";
import Navbar from "./components/common/Navbar.jsx";

function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  
  if (!user || user.role !== role) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute role="ADMIN">
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/student" 
            element={
              <PrivateRoute role="STUDENT">
                <StudentDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/teacher" 
            element={
              <PrivateRoute role="TEACHER">
                <TeacherDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/parent" 
            element={
              <PrivateRoute role="PARENT">
                <ParentDashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;