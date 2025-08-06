import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, TextField, Button, Alert, Divider, Tabs, Tab, IconButton, Snackbar, Chip } from '@mui/material';
import { VideoCall as VideoCallIcon, Launch as LaunchIcon, ContentCopy as CopyIcon, Close as CloseIcon, Quiz as QuizIcon } from '@mui/icons-material';
import { useAuth } from '../../utils/auth';
import { getStudentAttendance, debugDatabase, testAuth, testDatabase, getStudentDetails } from '../../api/attendance';
import { getStudentGrades } from '../../api/grades';
import { getStudentAssignments } from '../../api/assignments';
import { getStudentLeaveStatus, submitLeave } from '../../api/leave';
import { getEvents } from '../../api/calendar';
import OnlineClassJoiner from '../../components/student/OnlineClassJoiner';
import StudentExamInterface from '../../components/exam/StudentExamInterface';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [onlineClasses, setOnlineClasses] = useState([]);
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveFromDate, setLeaveFromDate] = useState('');
  const [leaveToDate, setLeaveToDate] = useState('');
  const [errors, setErrors] = useState([]);
  const [authTest, setAuthTest] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [dbTest, setDbTest] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [showMeetingIdNotification, setShowMeetingIdNotification] = useState(false);
  const [currentMeetingId, setCurrentMeetingId] = useState('');
  const [currentMeetingUrl, setCurrentMeetingUrl] = useState('');

  const testAuthentication = useCallback(async () => {
    try {
      const authResult = await testAuth();
      console.log('🔐 Auth Test Result:', authResult);
      setAuthTest(authResult);
    } catch (error) {
      console.error('❌ Auth Test Failed:', error);
      setErrors(prev => [...prev, `Auth Test Failed: ${error.message}`]);
    }
  }, []);

  const loadDebugInfo = useCallback(async () => {
    try {
      const debugResult = await debugDatabase();
      console.log('🔍 Debug Info Result:', debugResult);
      setDebugInfo(debugResult);
    } catch (error) {
      console.error('❌ Debug Info Failed:', error);
      setErrors(prev => [...prev, `Debug Info Failed: ${error.message}`]);
    }
  }, []);

  const testDatabaseState = useCallback(async () => {
    try {
      const dbResult = await testDatabase();
      console.log('🗄️ Database Test Result:', dbResult);
      setDbTest(dbResult);
    } catch (error) {
      console.error('❌ Database Test Failed:', error);
      setErrors(prev => [...prev, `Database Test Failed: ${error.message}`]);
    }
  }, []);

  const loadStudentDetails = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const details = await getStudentDetails(user.id);
      console.log('👤 Student Details:', details);
      setStudentDetails(details);
    } catch (error) {
      console.error('❌ Error loading student details:', error);
      setErrors(prev => [...prev, `Student details failed: ${error.message}`]);
    }
  }, [user?.id]);

  const loadCalendarEvents = useCallback(async () => {
    try {
      const events = await getEvents();
      console.log('📅 Calendar events:', events);
      setCalendarEvents(events);
    } catch (error) {
      console.error('❌ Error loading calendar events:', error);
      setErrors(prev => [...prev, `Calendar events failed: ${error.message}`]);
    }
  }, []);

  const loadOnlineClasses = useCallback(async () => {
    try {
      console.log('🔍 Loading online classes...');
      const token = localStorage.getItem('token');
      console.log('🔑 Token available:', !!token);
      
      const response = await fetch('/api/student/online-classes/available', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);
      
      if (response.ok) {
        const classes = await response.json();
        console.log('🎥 Online classes loaded:', classes);
        console.log('📊 Number of classes:', classes.length);
        setOnlineClasses(classes);
        
        // Auto-show meeting ID notification for active classes
        const activeClasses = classes.filter(c => c.status === 'active');
        console.log('🔥 Active classes:', activeClasses);
        if (activeClasses.length > 0) {
          const firstActiveClass = activeClasses[0];
          setCurrentMeetingId(firstActiveClass.roomId);
          setCurrentMeetingUrl(firstActiveClass.meetingUrl);
          setShowMeetingIdNotification(true);
        }
      } else {
        const errorText = await response.text();
        console.error('❌ Error loading online classes:', response.status, errorText);
        setErrors(prev => [...prev, `Online classes failed: ${response.status} - ${errorText}`]);
      }
    } catch (error) {
      console.error('❌ Error loading online classes:', error);
      setErrors(prev => [...prev, `Online classes failed: ${error.message}`]);
    }
  }, []);

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    
    // Test database state first
    await testDatabaseState();
    
    // Test authentication
    await testAuthentication();
    
    // Load debug information
    await loadDebugInfo();
    
    // Load student details (including class)
    await loadStudentDetails();
    
    // Load calendar events
    await loadCalendarEvents();
    
    // Load online classes
    await loadOnlineClasses();
    
    try {
      console.log('📊 Loading data for user ID:', user.id);
      
      // Load attendance
      const attendanceData = await getStudentAttendance(user.id);
      console.log('📊 Attendance data:', attendanceData);
      setAttendance(attendanceData);
      
      // Load grades
      const gradesData = await getStudentGrades(user.id);
      console.log('📊 Grades data:', gradesData);
      setGrades(gradesData);
      
      // Load leave status
      const leaveData = await getStudentLeaveStatus(user.id);
      console.log('📊 Leave data:', leaveData);
      setLeaveStatus(leaveData);
      
    } catch (error) {
      console.error('❌ Error loading data:', error);
      setErrors(prev => [...prev, `Data loading failed: ${error.message}`]);
    }
  }, [user?.id, user?.email, testDatabaseState, testAuthentication, loadDebugInfo, loadStudentDetails, loadCalendarEvents, loadOnlineClasses]);

  // Load assignments after student details are available
  const loadAssignments = useCallback(async () => {
    if (!studentDetails?.studentClass) return;
    
    try {
      const assignmentsData = await getStudentAssignments(studentDetails.studentClass);
      console.log('📊 Assignments data for class:', studentDetails.studentClass, assignmentsData);
      setAssignments(assignmentsData);
    } catch (error) {
      console.error('❌ Error loading assignments:', error);
      setErrors(prev => [...prev, `Assignments loading failed: ${error.message}`]);
    }
  }, [studentDetails?.studentClass]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    try {
      const result = await submitLeave({
        studentId: user.id,
        reason: leaveReason,
        fromDate: leaveFromDate,
        toDate: leaveToDate
      });
      
      if (result.error) {
        setErrors(prev => [...prev, result.error]);
      } else {
        // Clear form and reload leave status
        setLeaveReason('');
        setLeaveFromDate('');
        setLeaveToDate('');
        const updatedLeaveStatus = await getStudentLeaveStatus(user.id);
        setLeaveStatus(updatedLeaveStatus);
      }
    } catch (error) {
      console.error('Error submitting leave:', error);
      setErrors(prev => [...prev, `Leave submission failed: ${error.message}`]);
    }
  };

  const handleExportPDF = () => {
    const { jsPDF } = require('jspdf');
    const doc = new jsPDF();
    doc.text('Student Grades Report', 20, 20);
    grades.forEach((grade, index) => {
      doc.text(`${grade.subject}: ${grade.marks}`, 20, 40 + (index * 10));
    });
    doc.save('grades.pdf');
  };

  const handleCheckLeaveStatus = async () => {
    try {
      const status = await getStudentLeaveStatus(user.id);
      setLeaveStatus(status);
    } catch (error) {
      console.error('Error checking leave status:', error);
      setErrors(prev => [...prev, `Leave status check failed: ${error.message}`]);
    }
  };

  const copyMeetingId = (meetingId) => {
    navigator.clipboard.writeText(meetingId);
    console.log('Meeting ID copied to clipboard:', meetingId);
  };

  const joinClass = (meetingUrl) => {
    window.open(meetingUrl, '_blank');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Welcome, {user?.name}!
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Class: {studentDetails?.studentClass || 'Loading...'}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Email: {user?.email}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        User ID: {user?.id}
      </Typography>

      {/* All Available Online Classes Display */}
      {onlineClasses && onlineClasses.length > 0 ? (
        <Card sx={{ 
          mb: 3, 
          backgroundColor: '#e3f2fd', 
          border: '3px solid #2196f3',
          position: 'relative',
          overflow: 'visible'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ color: '#1565c0', fontWeight: 'bold' }}>
                🎥 AVAILABLE ONLINE CLASSES
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<VideoCallIcon />}
                  onClick={loadOnlineClasses}
                  sx={{ color: '#1976d2', borderColor: '#1976d2' }}
                >
                  Refresh Classes
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    console.log('🧪 Testing online classes API...');
                    fetch('/api/student/online-classes/available', {
                      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                    })
                    .then(response => {
                      console.log('🧪 Test response status:', response.status);
                      return response.json();
                    })
                    .then(data => {
                      console.log('🧪 Test data:', data);
                    })
                    .catch(error => {
                      console.error('🧪 Test error:', error);
                    });
                  }}
                  sx={{ color: '#ff9800', borderColor: '#ff9800' }}
                >
                  Test API
                </Button>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 3, color: '#1976d2' }}>
              {onlineClasses.length} online class{onlineClasses.length > 1 ? 'es' : ''} available for you to join
            </Typography>
            
            <Grid container spacing={3}>
              {onlineClasses.map((classItem, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #e0e0e0',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      borderColor: classItem.status === 'active' ? '#4caf50' : '#2196f3'
                    }
                  }}>
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                          {classItem.title}
                        </Typography>
                        <Chip 
                          label={classItem.status} 
                          size="small"
                          sx={{ 
                            backgroundColor: classItem.status === 'active' ? '#4caf50' : 
                                           classItem.status === 'scheduled' ? '#2196f3' : '#ff9800',
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      </Box>

                      {/* Class Details */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>Teacher:</strong> {classItem.teacherName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>Subject:</strong> {classItem.subject}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>Duration:</strong> {classItem.duration} minutes
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>Participants:</strong> {classItem.currentParticipants || 0}/{classItem.maxParticipants}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Scheduled:</strong> {new Date(classItem.scheduledTime).toLocaleString()}
                        </Typography>
                      </Box>

                      {/* Meeting ID Section */}
                      <Box sx={{ 
                        p: 2, 
                        backgroundColor: '#f5f5f5', 
                        borderRadius: 1, 
                        border: '1px solid #e0e0e0',
                        mb: 2
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: '1.1rem' }}>
                            🎥 Meeting ID: {classItem.roomId}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => copyMeetingId(classItem.roomId)}
                            title="Copy Meeting ID"
                            sx={{ color: '#1976d2' }}
                          >
                            <CopyIcon />
                          </IconButton>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>
                          Meeting URL: {classItem.meetingUrl}
                        </Typography>
                      </Box>

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<LaunchIcon />}
                          onClick={() => joinClass(classItem.meetingUrl)}
                          sx={{ 
                            backgroundColor: classItem.status === 'active' ? '#4caf50' : '#2196f3',
                            '&:hover': { 
                              backgroundColor: classItem.status === 'active' ? '#45a049' : '#1976d2' 
                            }
                          }}
                        >
                          {classItem.status === 'active' ? 'Join Now' : 'Join Class'}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Summary Stats */}
            <Box sx={{ mt: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#495057' }}>
                📊 Class Summary: {onlineClasses.filter(c => c.status === 'active').length} Active • {onlineClasses.filter(c => c.status === 'scheduled').length} Scheduled • {onlineClasses.filter(c => c.status === 'completed').length} Completed
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ 
          mb: 3, 
          backgroundColor: '#fff3cd', 
          border: '2px solid #ffc107'
        }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" sx={{ color: '#856404', fontWeight: 'bold', mb: 2 }}>
              📚 No Online Classes Available
            </Typography>
            <Typography variant="body1" sx={{ color: '#856404', mb: 2 }}>
              There are currently no online classes scheduled or available for you to join.
            </Typography>
            <Typography variant="body2" sx={{ color: '#856404' }}>
              Check back later or contact your teacher for upcoming classes.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Prominent Meeting ID Display Banner */}
      {onlineClasses && onlineClasses.filter(c => c.status === 'active').length > 0 && (
        <Card sx={{ 
          mb: 3, 
          backgroundColor: '#e8f5e8', 
          border: '3px solid #4caf50',
          position: 'relative',
          overflow: 'visible'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  🎥 LIVE CLASS AVAILABLE!
                </Typography>
                <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
                  Meeting ID: {onlineClasses.filter(c => c.status === 'active')[0]?.roomId}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Click "Join Now" to enter the online class immediately
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<LaunchIcon />}
                  onClick={() => joinClass(onlineClasses.filter(c => c.status === 'active')[0]?.meetingUrl)}
                  sx={{ 
                    backgroundColor: '#4caf50', 
                    '&:hover': { backgroundColor: '#45a049' },
                    fontSize: '1.1rem',
                    px: 3,
                    py: 1.5
                  }}
                >
                  JOIN NOW
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CopyIcon />}
                  onClick={() => copyMeetingId(onlineClasses.filter(c => c.status === 'active')[0]?.roomId)}
                  sx={{ color: '#1976d2', borderColor: '#1976d2' }}
                >
                  Copy Meeting ID
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Quick Meeting ID Access */}
      {onlineClasses && onlineClasses.length > 0 && (
        <Card sx={{ mb: 3, backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: '#495057', fontWeight: 'bold' }}>
              📋 Quick Meeting ID Access
            </Typography>
            <Grid container spacing={2}>
              {onlineClasses.map((classItem, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ 
                    p: 2, 
                    backgroundColor: 'white', 
                    borderRadius: 1, 
                    border: '1px solid #e9ecef',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                  }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#495057' }}>
                      {classItem.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {classItem.teacherName} - {classItem.subject}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        ID: {classItem.roomId}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => copyMeetingId(classItem.roomId)}
                        title="Copy Meeting ID"
                        sx={{ color: '#1976d2', p: 0.5 }}
                      >
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Chip 
                      label={classItem.status} 
                      size="small"
                      sx={{ 
                        backgroundColor: classItem.status === 'active' ? '#4caf50' : 
                                       classItem.status === 'scheduled' ? '#2196f3' : '#ff9800',
                        color: 'white',
                        alignSelf: 'flex-start'
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Active Online Classes Quick Access */}
      {onlineClasses && onlineClasses.filter(c => c.status === 'active').length > 0 && (
        <Card sx={{ mb: 3, backgroundColor: '#e3f2fd', border: '2px solid #2196f3' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              🎥 Active Online Classes Available
            </Typography>
            <Grid container spacing={2}>
              {onlineClasses.filter(c => c.status === 'active').map((classItem, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {classItem.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Teacher: {classItem.teacherName} | Subject: {classItem.subject}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        Meeting ID: {classItem.roomId}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => copyMeetingId(classItem.roomId)}
                        title="Copy Meeting ID"
                      >
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<LaunchIcon />}
                      onClick={() => joinClass(classItem.meetingUrl)}
                      sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#45a049' } }}
                    >
                      Join Now
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Tabs for different sections */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
          <Tab label="Dashboard" />
          <Tab 
            label="Join Online Classes" 
            icon={<VideoCallIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Exams" 
            icon={<QuizIcon />} 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Online Classes Tab */}
      {currentTab === 1 && (
        <OnlineClassJoiner />
      )}

      {/* Exams Tab */}
      {currentTab === 2 && (
        <StudentExamInterface />
      )}

      {/* Main Dashboard Tab */}
      {currentTab === 0 && (
        <>
          {/* Error Messages */}
      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Errors:</Typography>
          {errors.map((error, index) => (
            <Typography key={index} variant="body2">
              {error}
            </Typography>
          ))}
        </Alert>
      )}

      {/* Database Test */}
      {dbTest && (
        <Card sx={{ mb: 2, bgcolor: '#fff3cd' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🗄️ Database Test
            </Typography>
            <Typography variant="body2">
              Total Users: {dbTest.totalUsers}
            </Typography>
            <Typography variant="body2">
              Total Students: {dbTest.totalStudents}
            </Typography>
            <Typography variant="body2">
              Timestamp: {new Date(dbTest.timestamp).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Authentication Test */}
      {authTest && (
        <Card sx={{ mb: 2, bgcolor: '#e8f5e8' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🔐 Authentication Test
            </Typography>
            <Typography variant="body2">
              Status: {authTest.message}
            </Typography>
            <Typography variant="body2">
              Timestamp: {new Date(authTest.timestamp).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Debug Information */}
      {debugInfo && (
        <Card sx={{ mb: 2, bgcolor: '#f5f5f5' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🔍 Debug Information
            </Typography>
            <Typography variant="body2">
              Total Students in DB: {debugInfo.totalStudents}
            </Typography>
            {debugInfo.students && debugInfo.students.map((student, index) => (
              <Typography key={index} variant="body2">
                Student {index + 1}: ID={student.id}, Name={student.name}, Email={student.email}, Class={student.class}, UserID={student.userId}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3}>
        {/* Attendance Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance
              </Typography>
              <List>
                {attendance && attendance.length > 0 ? (
                  attendance.map((record, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${record.date} - ${record.status}`}
                        secondary={`Marked by: ${record.markedByTeacher}`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No attendance records found" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Grades Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Grades
              </Typography>
              <List>
                {grades && grades.length > 0 ? (
                  grades.map((grade, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${grade.subject}: ${grade.marks}`}
                        secondary={`Teacher: ${grade.teacherName}`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No grades found" />
                  </ListItem>
                )}
              </List>
              <Button 
                variant="outlined" 
                onClick={handleExportPDF}
                sx={{ mt: 1 }}
              >
                Export PDF
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Assignments Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Assignments
              </Typography>
              <List>
                {assignments && assignments.length > 0 ? (
                  assignments.map((assignment, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={assignment.title}
                        secondary={`Due: ${assignment.dueDate} | Subject: ${assignment.subject}`}
                      />
                      {assignment.fileUrl && (
                        <Button
                          variant="outlined"
                          size="small"
                          href={assignment.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ ml: 1 }}
                        >
                          Download
                        </Button>
                      )}
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No assignments found" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave Management Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Leave Management
              </Typography>
              
              <form onSubmit={handleSubmitLeave}>
                <TextField
                  fullWidth
                  label="Reason"
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  type="date"
                  label="From Date"
                  value={leaveFromDate}
                  onChange={(e) => setLeaveFromDate(e.target.value)}
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  type="date"
                  label="To Date"
                  value={leaveToDate}
                  onChange={(e) => setLeaveToDate(e.target.value)}
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 2 }}
                >
                  Submit Leave Request
                </Button>
              </form>

              <Divider sx={{ my: 2 }} />
              
              <Button 
                variant="outlined" 
                onClick={handleCheckLeaveStatus}
                sx={{ mb: 1 }}
              >
                Check Leave Status
              </Button>
              
              {/* Leave Status Display */}
              {leaveStatus && leaveStatus.length > 0 ? (
                <List>
                  {leaveStatus.map((leave, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${leave.reason} (${leave.fromDate} to ${leave.toDate})`}
                        secondary={`Status: ${leave.status} | Teacher: ${leave.teacherApproval} | Parent: ${leave.parentApproval}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No leave requests found
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Academic Calendar Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Academic Calendar
              </Typography>
              <List>
                {calendarEvents && calendarEvents.length > 0 ? (
                  calendarEvents.map((event, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={event.eventName}
                        secondary={`${event.date} - ${event.description}`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No calendar events found" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Available Online Classes Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Online Classes
              </Typography>
              <List>
                {onlineClasses && onlineClasses.length > 0 ? (
                  onlineClasses.map((classItem, index) => (
                    <ListItem key={index} sx={{ border: '1px solid #e0e0e0', borderRadius: 1, mb: 1 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {classItem.title}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                backgroundColor: classItem.status === 'active' ? '#4caf50' : 
                                               classItem.status === 'scheduled' ? '#2196f3' : '#ff9800',
                                color: 'white',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                textTransform: 'uppercase'
                              }}
                            >
                              {classItem.status}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Teacher: {classItem.teacherName} | Subject: {classItem.subject}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Duration: {classItem.duration} minutes | Participants: {classItem.currentParticipants || 0}/{classItem.maxParticipants}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Scheduled: {new Date(classItem.scheduledTime).toLocaleString()}
                            </Typography>
                            <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: '1.1rem' }}>
                                  🎥 Meeting ID: {classItem.roomId}
                                </Typography>
                                <IconButton 
                                  size="small" 
                                  onClick={() => copyMeetingId(classItem.roomId)}
                                  title="Copy Meeting ID"
                                  sx={{ color: '#1976d2' }}
                                >
                                  <CopyIcon />
                                </IconButton>
                              </Box>
                              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', mb: 1 }}>
                                Meeting URL: {classItem.meetingUrl}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<LaunchIcon />}
                                  onClick={() => joinClass(classItem.meetingUrl)}
                                  sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#45a049' } }}
                                >
                                  Join Class
                                </Button>
                                <Typography variant="caption" sx={{ color: '#888', fontStyle: 'italic', alignSelf: 'center' }}>
                                  Click to join the class directly
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No online classes available" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Exams Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  <QuizIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Exams
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<QuizIcon />}
                  onClick={() => navigate('/student/exams')}
                  sx={{ textTransform: 'none' }}
                >
                  View All Exams
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Access your upcoming exams, take tests, and view your results with detailed performance analytics.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label="MCQ Tests" 
                  color="primary" 
                  variant="outlined"
                  icon={<QuizIcon />}
                />
                <Chip 
                  label="Performance Analytics" 
                  color="secondary" 
                  variant="outlined"
                />
                <Chip 
                  label="Result Charts" 
                  color="info" 
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
        </>
      )}

      {/* Floating Meeting ID Notification */}
      <Snackbar
        open={showMeetingIdNotification}
        autoHideDuration={10000}
        onClose={() => setShowMeetingIdNotification(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 8 }}
      >
        <Card sx={{ 
          backgroundColor: '#fff3cd', 
          border: '2px solid #ffc107',
          minWidth: 400,
          maxWidth: 600
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6" sx={{ color: '#856404', fontWeight: 'bold' }}>
                  🎥 Online Class Available!
                </Typography>
                <Typography variant="body1" sx={{ color: '#1976d2', fontWeight: 'bold', mt: 1 }}>
                  Meeting ID: {currentMeetingId}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Click "Join" to enter the class or "Copy" to share the meeting ID
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<LaunchIcon />}
                  onClick={() => {
                    joinClass(currentMeetingUrl);
                    setShowMeetingIdNotification(false);
                  }}
                  sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#45a049' } }}
                >
                  Join
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CopyIcon />}
                  onClick={() => copyMeetingId(currentMeetingId)}
                  sx={{ color: '#1976d2', borderColor: '#1976d2' }}
                >
                  Copy ID
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Snackbar>
    </Box>
  );
}

export default StudentDashboard; 