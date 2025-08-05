import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import ParentDashboard from "./pages/dashboard/ParentDashboard";
import ExamDashboard from "./pages/dashboard/ExamDashboard";
import Forum from "./components/forum/Forum";
import Chat from "./components/chat/Chat";
import ThreadedChat from "./components/chat/ThreadedChat";
import Notifications from "./components/notifications/Notifications";
import Navbar from "./components/common/Navbar";
import WebSocketTest from "./components/chat/WebSocketTest";
import SimpleTest from "./components/chat/SimpleTest";
import SimpleWebSocketTest from "./components/chat/SimpleWebSocketTest";
import SimpleChatTest from "./components/chat/SimpleChatTest";
import WebSocketDebug from "./components/chat/WebSocketDebug";
import MessageTest from "./components/chat/MessageTest";
import ChatDebug from "./components/chat/ChatDebug";
import ThreadDetail from "./components/forum/ThreadDetail";
import { Box, Alert, Typography } from '@mui/material';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error">
            <Typography variant="h6">Something went wrong!</Typography>
            <Typography variant="body2">
              Error: {this.state.error?.message || 'Unknown error'}
            </Typography>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

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
    <ErrorBoundary>
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
              <ThreadedChat />
            </DashboardLayout>
          } />
          <Route path="/admin/websocket-test" element={
            <DashboardLayout>
              <WebSocketTest />
            </DashboardLayout>
          } />
          <Route path="/admin/chat-simple" element={
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          } />
          <Route path="/admin/simple-test" element={
            <DashboardLayout>
              <SimpleTest />
            </DashboardLayout>
          } />
          <Route path="/admin/simple-websocket-test" element={
            <DashboardLayout>
              <SimpleWebSocketTest />
            </DashboardLayout>
          } />
          <Route path="/admin/simple-chat-test" element={
            <DashboardLayout>
              <SimpleChatTest />
            </DashboardLayout>
          } />
          <Route path="/admin/websocket-debug" element={
            <DashboardLayout>
              <WebSocketDebug />
            </DashboardLayout>
          } />
          <Route path="/admin/message-test" element={
            <DashboardLayout>
              <MessageTest />
            </DashboardLayout>
          } />
          <Route path="/admin/chat-debug" element={
            <DashboardLayout>
              <ChatDebug />
            </DashboardLayout>
          } />
          <Route path="/forum/thread/:threadId" element={
            <DashboardLayout>
              <ThreadDetail />
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
            <Route path="/student/exams" element={
              <DashboardLayout>
                <ExamDashboard />
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
            <Route path="/teacher/exams" element={
              <DashboardLayout>
                <ExamDashboard />
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
    </ErrorBoundary>
  );
}

export default App;