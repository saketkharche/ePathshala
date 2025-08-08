import React from 'react';
import { useAuth } from '../../utils/auth';
import { Navigate } from 'react-router-dom';
import UnifiedNavigation from './UnifiedNavigation';

const UnifiedDashboardLayout = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on role if required role doesn't match
  if (requiredRole && user.role !== requiredRole) {
    const roleRoutes = {
      ADMIN: '/admin/dashboard',
      STUDENT: '/student/dashboard',
      TEACHER: '/teacher/dashboard',
      PARENT: '/parent/dashboard'
    };
    return <Navigate to={roleRoutes[user.role] || '/login'} replace />;
  }

  return (
    <UnifiedNavigation>
      {children}
    </UnifiedNavigation>
  );
};

export default UnifiedDashboardLayout;
