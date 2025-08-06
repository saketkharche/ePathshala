import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import PublicLayout from '../components/layout/PublicLayout';
import AdminDashboardLayout from '../components/layout/AdminDashboardLayout';
import StudentDashboardLayout from '../components/layout/StudentDashboardLayout';
import TeacherDashboardLayout from '../components/layout/TeacherDashboardLayout';
import ParentDashboardLayout from '../components/layout/ParentDashboardLayout';
import LoginPage from '../pages/auth/LoginPage';
import ForgotPassword from '../pages/auth/ForgotPassword';
import HomePage from '../pages/HomePage';
import ContactUs from '../pages/ContactUs';
import AboutUs from '../pages/AboutUs';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import StudentDashboard from '../pages/dashboard/StudentDashboard';
import TeacherDashboard from '../pages/dashboard/TeacherDashboard';
import ParentDashboard from '../pages/dashboard/ParentDashboard';
import ExamDashboard from '../pages/dashboard/ExamDashboard';
import Forum from '../components/forum/Forum';
import Chat from '../components/chat/Chat';
import ThreadedChat from '../components/chat/ThreadedChat';
import Notifications from '../components/notifications/Notifications';
import WebSocketTest from '../components/chat/WebSocketTest';
import SimpleTest from '../components/chat/SimpleTest';
import SimpleWebSocketTest from '../components/chat/SimpleWebSocketTest';
import SimpleChatTest from '../components/chat/SimpleChatTest';
import WebSocketDebug from '../components/chat/WebSocketDebug';
import MessageTest from '../components/chat/MessageTest';
import ChatDebug from '../components/chat/ChatDebug';
import ThreadDetail from '../components/forum/ThreadDetail';
import AdminSummary from '../pages/dashboard/AdminSummary';
import AdminAddStudent from '../pages/dashboard/AdminAddStudent';
import AdminAddTeacher from '../pages/dashboard/AdminAddTeacher';
import AdminAddParent from '../pages/dashboard/AdminAddParent';
import AdminAssignTeacher from '../pages/dashboard/AdminAssignTeacher';
import AdminResetPassword from '../pages/dashboard/AdminResetPassword';
import AdminAcademicCalendar from '../pages/dashboard/AdminAcademicCalendar';
import AdminOnlineClasses from '../pages/dashboard/AdminOnlineClasses';
import AdminSessionManagement from '../pages/dashboard/AdminSessionManagement';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes - Home is now the default landing page */}
      <Route path="/" element={
        <PublicLayout>
          <HomePage />
        </PublicLayout>
      } />
      <Route path="/home" element={
        <PublicLayout>
          <HomePage />
        </PublicLayout>
      } />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Main Pages with Public Layout */}
      <Route path="/about" element={
        <PublicLayout>
          <AboutUs />
        </PublicLayout>
      } />
      <Route path="/contact" element={
        <PublicLayout>
          <ContactUs />
        </PublicLayout>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<Navigate to="/admin/summary" replace />} />
      <Route path="/admin/forum" element={
        <AdminDashboardLayout>
          <Forum />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/chat" element={
        <AdminDashboardLayout>
          <ThreadedChat />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/websocket-test" element={
        <AdminDashboardLayout>
          <WebSocketTest />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/chat-simple" element={
        <AdminDashboardLayout>
          <Chat />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/simple-test" element={
        <AdminDashboardLayout>
          <SimpleTest />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/simple-websocket-test" element={
        <AdminDashboardLayout>
          <SimpleWebSocketTest />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/simple-chat-test" element={
        <AdminDashboardLayout>
          <SimpleChatTest />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/websocket-debug" element={
        <AdminDashboardLayout>
          <WebSocketDebug />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/message-test" element={
        <AdminDashboardLayout>
          <MessageTest />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/chat-debug" element={
        <AdminDashboardLayout>
          <ChatDebug />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/notifications" element={
        <AdminDashboardLayout>
          <Notifications />
        </AdminDashboardLayout>
      } />
      {/* Admin Section Routes */}
      <Route path="/admin/summary" element={
        <AdminDashboardLayout>
          <AdminSummary />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/add-student" element={
        <AdminDashboardLayout>
          <AdminAddStudent />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/add-teacher" element={
        <AdminDashboardLayout>
          <AdminAddTeacher />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/add-parent" element={
        <AdminDashboardLayout>
          <AdminAddParent />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/assign-teacher" element={
        <AdminDashboardLayout>
          <AdminAssignTeacher />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/reset-password" element={
        <AdminDashboardLayout>
          <AdminResetPassword />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/calendar" element={
        <AdminDashboardLayout>
          <AdminAcademicCalendar />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/online-classes" element={
        <AdminDashboardLayout>
          <AdminOnlineClasses />
        </AdminDashboardLayout>
      } />
      <Route path="/admin/sessions" element={
        <AdminDashboardLayout>
          <AdminSessionManagement />
        </AdminDashboardLayout>
      } />
      
      {/* Student Routes */}
      <Route path="/student" element={
        <StudentDashboardLayout>
          <StudentDashboard />
        </StudentDashboardLayout>
      } />
      <Route path="/student/exams" element={
        <StudentDashboardLayout>
          <ExamDashboard />
        </StudentDashboardLayout>
      } />
      <Route path="/student/forum" element={
        <StudentDashboardLayout>
          <Forum />
        </StudentDashboardLayout>
      } />
      <Route path="/student/chat" element={
        <StudentDashboardLayout>
          <Chat />
        </StudentDashboardLayout>
      } />
      <Route path="/student/notifications" element={
        <StudentDashboardLayout>
          <Notifications />
        </StudentDashboardLayout>
      } />
      
      {/* Teacher Routes */}
      <Route path="/teacher" element={
        <TeacherDashboardLayout>
          <TeacherDashboard />
        </TeacherDashboardLayout>
      } />
      <Route path="/teacher/exams" element={
        <TeacherDashboardLayout>
          <ExamDashboard />
        </TeacherDashboardLayout>
      } />
      <Route path="/teacher/forum" element={
        <TeacherDashboardLayout>
          <Forum />
        </TeacherDashboardLayout>
      } />
      <Route path="/teacher/chat" element={
        <TeacherDashboardLayout>
          <Chat />
        </TeacherDashboardLayout>
      } />
      <Route path="/teacher/notifications" element={
        <TeacherDashboardLayout>
          <Notifications />
        </TeacherDashboardLayout>
      } />
      
      {/* Parent Routes */}
      <Route path="/parent" element={
        <ParentDashboardLayout>
          <ParentDashboard />
        </ParentDashboardLayout>
      } />
      <Route path="/parent/forum" element={
        <ParentDashboardLayout>
          <Forum />
        </ParentDashboardLayout>
      } />
      <Route path="/parent/chat" element={
        <ParentDashboardLayout>
          <Chat />
        </ParentDashboardLayout>
      } />
      <Route path="/parent/notifications" element={
        <ParentDashboardLayout>
          <Notifications />
        </ParentDashboardLayout>
      } />
      
      {/* Shared Routes */}
      <Route path="/forum/thread/:threadId" element={
        <DashboardLayout>
          <ThreadDetail />
        </DashboardLayout>
      } />
      
      {/* Chat & Communication Routes */}
      <Route path="/chat" element={
        <DashboardLayout>
          <Chat />
        </DashboardLayout>
      } />
      <Route path="/threaded-chat" element={
        <DashboardLayout>
          <ThreadedChat />
        </DashboardLayout>
      } />
      <Route path="/websocket-test" element={
        <DashboardLayout>
          <WebSocketTest />
        </DashboardLayout>
      } />
      <Route path="/chat-debug" element={
        <DashboardLayout>
          <ChatDebug />
        </DashboardLayout>
      } />
      <Route path="/message-test" element={
        <DashboardLayout>
          <MessageTest />
        </DashboardLayout>
      } />
      <Route path="/simple-test" element={
        <DashboardLayout>
          <SimpleTest />
        </DashboardLayout>
      } />
      <Route path="/simple-websocket-test" element={
        <DashboardLayout>
          <SimpleWebSocketTest />
        </DashboardLayout>
      } />
      <Route path="/simple-chat-test" element={
        <DashboardLayout>
          <SimpleChatTest />
        </DashboardLayout>
      } />
      
      {/* Feature Routes */}
      <Route path="/forum" element={
        <DashboardLayout>
          <Forum />
        </DashboardLayout>
      } />
      <Route path="/notifications" element={
        <DashboardLayout>
          <Notifications />
        </DashboardLayout>
      } />
      <Route path="/exams" element={
        <DashboardLayout>
          <ExamDashboard />
        </DashboardLayout>
      } />
    </Routes>
  );
}

export default React.memo(AppRoutes); 