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

// Teacher Dashboard Pages
import TeacherAttendancePage from '../pages/dashboard/teacher/TeacherAttendancePage';
import TeacherGradesPage from '../pages/dashboard/teacher/TeacherGradesPage';
import TeacherAssignmentsPage from '../pages/dashboard/teacher/TeacherAssignmentsPage';
import TeacherLeaveRequestsPage from '../pages/dashboard/teacher/TeacherLeaveRequestsPage';
import TeacherCalendarPage from '../pages/dashboard/teacher/TeacherCalendarPage';
import TeacherOnlineClassesPage from '../pages/dashboard/teacher/TeacherOnlineClassesPage';
import TeacherExamsPage from '../pages/dashboard/teacher/TeacherExamsPage';

// Student Dashboard Pages
import StudentAssignmentsPage from '../pages/dashboard/student/StudentAssignmentsPage';
import StudentExamsPage from '../pages/dashboard/student/StudentExamsPage';
import StudentGradesPage from '../pages/dashboard/student/StudentGradesPage';
import StudentAttendancePage from '../pages/dashboard/student/StudentAttendancePage';
import StudentLeaveRequestsPage from '../pages/dashboard/student/StudentLeaveRequestsPage';
import StudentCalendarPage from '../pages/dashboard/student/StudentCalendarPage';
import StudentExamResultPage from '../pages/dashboard/student/StudentExamResultPage';

// Parent Dashboard Pages
import ParentChildProgressPage from '../pages/dashboard/parent/ParentChildProgressPage';
import ParentLeaveApprovalsPage from '../pages/dashboard/parent/ParentLeaveApprovalsPage';
import ParentCalendarPage from '../pages/dashboard/parent/ParentCalendarPage';

function AppRoutes() {
  console.log("AppRoutes component rendering...");
  
  try {
    return (
      <Routes>
        {/* Public Routes - Home is the default landing page */}
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
        <Route path="/student/assignments" element={
          <StudentDashboardLayout>
            <StudentAssignmentsPage />
          </StudentDashboardLayout>
        } />
        <Route path="/student/exams" element={
          <StudentDashboardLayout>
            <StudentExamsPage />
          </StudentDashboardLayout>
        } />
        <Route path="/student/exams/:examId/result" element={
          <StudentDashboardLayout>
            <StudentExamResultPage />
          </StudentDashboardLayout>
        } />
        <Route path="/student/grades" element={
          <StudentDashboardLayout>
            <StudentGradesPage />
          </StudentDashboardLayout>
        } />
        <Route path="/student/attendance" element={
          <StudentDashboardLayout>
            <StudentAttendancePage />
          </StudentDashboardLayout>
        } />
        <Route path="/student/leave-requests" element={
          <StudentDashboardLayout>
            <StudentLeaveRequestsPage />
          </StudentDashboardLayout>
        } />
        <Route path="/student/calendar" element={
          <StudentDashboardLayout>
            <StudentCalendarPage />
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
        <Route path="/teacher/attendance" element={
          <TeacherDashboardLayout>
            <TeacherAttendancePage />
          </TeacherDashboardLayout>
        } />
        <Route path="/teacher/grades" element={
          <TeacherDashboardLayout>
            <TeacherGradesPage />
          </TeacherDashboardLayout>
        } />
        <Route path="/teacher/assignments" element={
          <TeacherDashboardLayout>
            <TeacherAssignmentsPage />
          </TeacherDashboardLayout>
        } />
        <Route path="/teacher/leave-requests" element={
          <TeacherDashboardLayout>
            <TeacherLeaveRequestsPage />
          </TeacherDashboardLayout>
        } />
        <Route path="/teacher/calendar" element={
          <TeacherDashboardLayout>
            <TeacherCalendarPage />
          </TeacherDashboardLayout>
        } />
        <Route path="/teacher/online-classes" element={
          <TeacherDashboardLayout>
            <TeacherOnlineClassesPage />
          </TeacherDashboardLayout>
        } />
        <Route path="/teacher/exams" element={
          <TeacherDashboardLayout>
            <TeacherExamsPage />
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
        <Route path="/parent/child-progress" element={
          <ParentDashboardLayout>
            <ParentChildProgressPage />
          </ParentDashboardLayout>
        } />
        <Route path="/parent/leave-approvals" element={
          <ParentDashboardLayout>
            <ParentLeaveApprovalsPage />
          </ParentDashboardLayout>
        } />
        <Route path="/parent/calendar" element={
          <ParentDashboardLayout>
            <ParentCalendarPage />
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
  } catch (error) {
    console.error("Error in AppRoutes component:", error);
    return (
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
        <h1 style={{ color: '#1976d2' }}>AppRoutes Error</h1>
        <p>Error: {error.message}</p>
      </div>
    );
  }
}

export default React.memo(AppRoutes); 