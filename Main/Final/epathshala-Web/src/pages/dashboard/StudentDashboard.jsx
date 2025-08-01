import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, TextField, Button, Alert, Divider } from '@mui/material';
import { useAuth } from '../../utils/auth';
import { getStudentAttendance, debugDatabase, testAuth, testDatabase, getStudentDetails } from '../../api/attendance';
import { getStudentGrades } from '../../api/grades';
import { getStudentAssignments } from '../../api/assignments';
import { getStudentLeaveStatus, submitLeave } from '../../api/leave';

function StudentDashboard() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState([]);
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveFromDate, setLeaveFromDate] = useState('');
  const [leaveToDate, setLeaveToDate] = useState('');
  const [errors, setErrors] = useState([]);
  const [authTest, setAuthTest] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [dbTest, setDbTest] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);

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
  }, [user?.id, user?.email, testDatabaseState, testAuthentication, loadDebugInfo, loadStudentDetails]);

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
      </Grid>
    </Box>
  );
}

export default StudentDashboard; 