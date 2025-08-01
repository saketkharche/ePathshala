import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../utils/auth';
import { getStudentAttendance } from '../../api/attendance';
import { getStudentGrades } from '../../api/grades';
import { getStudentAssignments } from '../../api/assignments';
import { submitLeave, getStudentLeaveStatus } from '../../api/leave';
import { jsPDF } from 'jspdf';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Button, Box, TextField, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';

function StudentDashboard() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveFromDate, setLeaveFromDate] = useState('');
  const [leaveToDate, setLeaveToDate] = useState('');

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      console.log('Loading data for user:', user.id);
      const [attendanceData, gradesData, assignmentsData] = await Promise.all([
        getStudentAttendance(user.id),
        getStudentGrades(user.id),
        getStudentAssignments(user.id)
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
      // Set empty arrays on error
      setAttendance([]);
      setGrades([]);
      setAssignments([]);
    }
  }, [user?.id]);

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