import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../utils/auth';
import { getStudentAttendance, debugDatabase, testAuth, testDatabase } from '../../api/attendance';
import { getStudentGrades } from '../../api/grades';
import { getStudentAssignments } from '../../api/assignments';
import { submitLeave, getStudentLeaveStatus } from '../../api/leave';
import { jsPDF } from 'jspdf';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Button, Box, TextField, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Divider, Alert } from '@mui/material';

function StudentDashboard() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveFromDate, setLeaveFromDate] = useState('');
  const [leaveToDate, setLeaveToDate] = useState('');
  const [studentClass, setStudentClass] = useState('Class 10A'); // Default class
  const [debugInfo, setDebugInfo] = useState(null);
  const [authTest, setAuthTest] = useState(null);
  const [dbTest, setDbTest] = useState(null);
  const [errors, setErrors] = useState([]);

  // Simple mapping based on user email to determine class
  const getStudentClass = (email) => {
    switch(email) {
      case 'student1@epathshala.com':
        return 'Class 10A';
      case 'student2@epathshala.com':
        return 'Class 10B';
      case 'student3@epathshala.com':
        return 'Class 9A';
      default:
        return 'Class 10A'; // Default fallback
    }
  };

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
      const debugData = await debugDatabase();
      console.log('🔍 Debug Database Info:', debugData);
      setDebugInfo(debugData);
    } catch (error) {
      console.error('❌ Debug Database Failed:', error);
      setErrors(prev => [...prev, `Debug Database Failed: ${error.message}`]);
    }
  }, []);

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    
    // Test database state first
    await testDatabaseState();
    
    // Test authentication
    await testAuthentication();
    
    // Load debug info
    await loadDebugInfo();
    
    // Determine class based on user email
    const userClass = getStudentClass(user.email);
    setStudentClass(userClass);
    
    try {
      console.log('Loading data for user:', user.id);
      console.log('User email:', user.email);
      console.log('Using class:', userClass);
      
      const [attendanceData, gradesData, assignmentsData] = await Promise.all([
        getStudentAttendance(user.id),
        getStudentGrades(user.id),
        getStudentAssignments(userClass) // Use className instead of studentId
      ]);
      
      console.log('API Response - Attendance:', attendanceData);
      console.log('API Response - Grades:', gradesData);
      console.log('API Response - Assignments:', assignmentsData);
      
      // Ensure data is always an array
      setAttendance(Array.isArray(attendanceData) ? attendanceData : []);
      setGrades(Array.isArray(gradesData) ? gradesData : []);
      setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
    } catch (error) {
      console.error('Error loading data:', error);
      setErrors(prev => [...prev, `Data Loading Failed: ${error.message}`]);
      // Set empty arrays on error
      setAttendance([]);
      setGrades([]);
      setAssignments([]);
    }
  }, [user?.id, user?.email, testDatabaseState, testAuthentication, loadDebugInfo]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, loadData]);

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    try {
      await submitLeave({
        studentId: user.id,
        reason: leaveReason,
        fromDate: leaveFromDate,
        toDate: leaveToDate
      });
      setLeaveReason('');
      setLeaveFromDate('');
      setLeaveToDate('');
      alert('Leave request submitted successfully!');
    } catch (error) {
      console.error('Error submitting leave:', error);
      alert('Error submitting leave request');
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Student Grades Report', 10, 10);
    let y = 20;
    grades.forEach(g => {
      doc.text(`${g.subject}: ${g.marks}`, 10, y);
      y += 10;
    });
    doc.save('grades.pdf');
  };

  const handleCheckLeaveStatus = async () => {
    try {
      const status = await getStudentLeaveStatus(user.id);
      setLeaveStatus(status);
    } catch (error) {
      console.error('Error checking leave status:', error);
    }
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
        Class: {studentClass}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Email: {user?.email}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        User ID: {user?.id}
      </Typography>

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
                        primary={`Date: ${record.date}`}
                        secondary={`Status: ${record.status}`}
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
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleExportPDF} 
                sx={{ mb: 2 }}
                disabled={!grades || grades.length === 0}
              >
                Export Grades to PDF
              </Button>
              <List>
                {grades && grades.length > 0 ? (
                  grades.map((grade, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${grade.subject}: ${grade.marks}`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No grades found" />
                  </ListItem>
                )}
              </List>
              
              {/* Grades Analytics */}
              {grades && grades.length > 0 && (
                <>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Grades Analytics
                  </Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={grades} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="marks" fill="#1976d2" />
                    </BarChart>
                  </ResponsiveContainer>
                </>
              )}
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
              {leaveStatus && (
                <Typography variant="body2" color="text.secondary">
                  Leave Status: {leaveStatus}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentDashboard; 