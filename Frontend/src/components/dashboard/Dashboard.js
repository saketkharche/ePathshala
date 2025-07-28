import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import ParentDashboard from './ParentDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'Admin':
      return <AdminDashboard />;
    case 'Teacher':
      return <TeacherDashboard />;
    case 'Student':
      return <StudentDashboard />;
    case 'Parent':
      return <ParentDashboard />;
    default:
      return <div>Loading...</div>;
  }
};

export default Dashboard; 