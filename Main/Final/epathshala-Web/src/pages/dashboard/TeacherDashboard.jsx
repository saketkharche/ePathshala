import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/auth';
import { markAttendance, getAttendanceByClass, getStudentsByClass } from '../../api/attendance';
import { enterGrade, getGradesByClass } from '../../api/grades';
import { uploadAssignment, getAssignmentsByClass, uploadAssignmentFile } from '../../api/assignments';
import { getLeavesByClass, approveLeaveAsTeacher } from '../../api/leave';
import { Button, Box, TextField, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function TeacherDashboard() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [students, setStudents] = useState([]);
  
  // Attendance form state
  const [attendanceForm, setAttendanceForm] = useState({
    studentId: '',
    date: '',
    status: 'PRESENT'
  });

  // Grade form state
  const [gradeForm, setGradeForm] = useState({
    studentId: '',
    subject: '',
    marks: '',
    remarks: ''
  });

  // Assignment form state
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    subject: '',
    className: 'Class 10A',
    dueDate: '',
    fileUrl: ''
  });

  // Leave approval state
  const [selectedLeaveId, setSelectedLeaveId] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('Approved');

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [attendanceData, gradesData, assignmentsData, leavesData, studentsData] = await Promise.all([
        getAttendanceByClass('Class 10A'),
        getGradesByClass('Class 10A'),
        getAssignmentsByClass('Class 10A'),
        getLeavesByClass('Class 10A'),
        getStudentsByClass('Class 10A')
      ]);
      
      console.log('Leave requests data:', leavesData);
      
      // Ensure data is always an array
      setAttendance(Array.isArray(attendanceData) ? attendanceData : []);
      setGrades(Array.isArray(gradesData) ? gradesData : []);
      setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
      setLeaveRequests(Array.isArray(leavesData) ? leavesData : []);
      setStudents(Array.isArray(studentsData) ? studentsData : []);
    } catch (error) {
      console.error('Error loading data:', error);
      // Set empty arrays on error
      setAttendance([]);
      setGrades([]);
      setAssignments([]);
      setLeaveRequests([]);
      setStudents([]);
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      await markAttendance(attendanceForm);
      setAttendanceForm({ studentId: '', date: '', status: 'PRESENT' });
      alert('Attendance marked successfully!');
      loadData();
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Error marking attendance');
    }
  };

  const handleEnterGrade = async (e) => {
    e.preventDefault();
    try {
      await enterGrade(gradeForm);
      setGradeForm({ studentId: '', subject: '', marks: '', remarks: '' });
      alert('Grade entered successfully!');
      loadData();
    } catch (error) {
      console.error('Error entering grade:', error);
      alert('Error entering grade');
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const fileUrl = await uploadAssignmentFile(file);
        setAssignmentForm(prev => ({ ...prev, fileUrl }));
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleUploadAssignment = async (e) => {
    e.preventDefault();
    try {
      await uploadAssignment(assignmentForm);
      setAssignmentForm({ title: '', subject: '', className: 'Class 10A', dueDate: '', fileUrl: '' });
      alert('Assignment uploaded successfully!');
      loadData();
    } catch (error) {
      console.error('Error uploading assignment:', error);
      alert('Error uploading assignment');
    }
  };

  const handleApproveLeave = async () => {
    if (!selectedLeaveId) {
      alert('Please select a leave request');
      return;
    }
    try {
      await approveLeaveAsTeacher({
        leaveId: selectedLeaveId,
        approverRole: 'TEACHER',
        approvalStatus: approvalStatus
      });
      setSelectedLeaveId('');
      setApprovalStatus('Approved');
      alert('Leave request processed successfully!');
      loadData();
    } catch (error) {
      console.error('Error approving leave:', error);
      alert('Error processing leave request');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Teacher Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Welcome, {user?.name}! (Mathematics - Class 10A)
      </Typography>

      <Grid container spacing={3}>
        {/* Mark Attendance Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mark Attendance
              </Typography>
              <form onSubmit={handleMarkAttendance}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Student</InputLabel>
                  <Select
                    value={attendanceForm.studentId}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, studentId: e.target.value })}
                    label="Student"
                    required
                  >
                    {students.map((student) => (
                      <MenuItem key={student.id} value={student.id}>
                        {student.name} ({student.studentClass})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  value={attendanceForm.date}
                  onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })}
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={attendanceForm.status}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, status: e.target.value })}
                    label="Status"
                  >
                    <MenuItem value="PRESENT">Present</MenuItem>
                    <MenuItem value="ABSENT">Absent</MenuItem>
                    <MenuItem value="LATE">Late</MenuItem>
                  </Select>
                </FormControl>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 2 }}
                >
                  Mark Attendance
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Enter Grades Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Enter Grades
              </Typography>
              <form onSubmit={handleEnterGrade}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Student</InputLabel>
                  <Select
                    value={gradeForm.studentId}
                    onChange={(e) => setGradeForm({ ...gradeForm, studentId: e.target.value })}
                    label="Student"
                    required
                  >
                    {students.map((student) => (
                      <MenuItem key={student.id} value={student.id}>
                        {student.name} ({student.studentClass})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Subject"
                  value={gradeForm.subject}
                  onChange={(e) => setGradeForm({ ...gradeForm, subject: e.target.value })}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  type="number"
                  label="Marks"
                  value={gradeForm.marks}
                  onChange={(e) => setGradeForm({ ...gradeForm, marks: e.target.value })}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Remarks"
                  value={gradeForm.remarks}
                  onChange={(e) => setGradeForm({ ...gradeForm, remarks: e.target.value })}
                  margin="normal"
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 2 }}
                >
                  Enter Grade
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Upload Assignment Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload Assignment
              </Typography>
              <form onSubmit={handleUploadAssignment}>
                <TextField
                  fullWidth
                  label="Title"
                  value={assignmentForm.title}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                  margin="normal"
                  required
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ margin: '16px 0' }}
                />
                <TextField
                  fullWidth
                  type="date"
                  label="Due Date"
                  value={assignmentForm.dueDate}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="Subject"
                  value={assignmentForm.subject}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, subject: e.target.value })}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Class Name"
                  value={assignmentForm.className}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, className: e.target.value })}
                  margin="normal"
                  required
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 2 }}
                >
                  Upload Assignment
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave Approval Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Leave Requests
              </Typography>
              <List>
                {leaveRequests && leaveRequests.length > 0 ? (
                  leaveRequests.map((leave, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`Student: ${leave.studentName}`}
                        secondary={`Reason: ${leave.reason} | From: ${leave.fromDate} | To: ${leave.toDate}`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No leave requests found" />
                  </ListItem>
                )}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Leave Request</InputLabel>
                <Select
                  value={selectedLeaveId}
                  onChange={(e) => setSelectedLeaveId(e.target.value)}
                  label="Select Leave Request"
                >
                  {leaveRequests && leaveRequests.length > 0 ? (
                    leaveRequests.map((leave, index) => (
                      <MenuItem key={index} value={leave.id}>
                        {leave.studentName} - {leave.reason}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No leave requests available</MenuItem>
                  )}
                </Select>
              </FormControl>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Approval Status</InputLabel>
                <Select
                  value={approvalStatus}
                  onChange={(e) => setApprovalStatus(e.target.value)}
                  label="Approval Status"
                >
                  <MenuItem value="Approved">Approve</MenuItem>
                  <MenuItem value="Rejected">Reject</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
              
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleApproveLeave}
                sx={{ mt: 2 }}
                disabled={!selectedLeaveId}
              >
                Process Leave Request
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* View Data Sections */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Class Attendance
              </Typography>
              <List>
                {attendance && attendance.length > 0 ? (
                  attendance.map((record, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`Student: ${record.studentName}`}
                        secondary={`Date: ${record.date} | Status: ${record.status}`}
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

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Class Grades
              </Typography>
              <List>
                {grades && grades.length > 0 ? (
                  grades.map((grade, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`Student: ${grade.studentName}`}
                        secondary={`Subject: ${grade.subject} | Marks: ${grade.marks}`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No grades found" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Class Assignments
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
      </Grid>
    </Box>
  );
}

export default TeacherDashboard; 