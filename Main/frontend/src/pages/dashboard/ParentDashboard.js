import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../utils/auth';
import { getParentChildAttendance } from '../../api/attendance';
import { getParentChildGrades } from '../../api/grades';
import { getStudentAssignments } from '../../api/assignments';
import { getParentChildLeaveStatus, approveLeaveAsParent } from '../../api/leave';
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Alert,
  Chip
} from '@mui/material';

function ParentDashboard() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState([]);
  const [className, setClassName] = useState('');
  const [leaveApproval, setLeaveApproval] = useState({ leaveId: '', approverRole: 'PARENT', approvalStatus: 'Approved' });
  const [message, setMessage] = useState('');

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const attendanceData = await getParentChildAttendance(user.id);
      setAttendance(Array.isArray(attendanceData) ? attendanceData : []);
    } catch (error) {
      console.error('Error loading attendance:', error);
      setAttendance([]);
    }

    try {
      const gradesData = await getParentChildGrades(user.id);
      setGrades(Array.isArray(gradesData) ? gradesData : []);
    } catch (error) {
      console.error('Error loading grades:', error);
      setGrades([]);
    }

    try {
      const leaveData = await getParentChildLeaveStatus(user.id);
      setLeaveStatus(Array.isArray(leaveData) ? leaveData : []);
    } catch (error) {
      console.error('Error loading leave status:', error);
      setLeaveStatus([]);
    }
  }, [user?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleGetAssignments = async () => {
    if (className) {
      try {
        const data = await getStudentAssignments(className);
        setAssignments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading assignments:', error);
        setAssignments([]);
      }
    }
  };

  const handleApproveLeave = async (e) => {
    e.preventDefault();
    try {
      await approveLeaveAsParent(leaveApproval);
      setMessage('Leave request updated successfully!');
      loadData(); // Refresh leave status
      setLeaveApproval({ leaveId: '', approverRole: 'PARENT', approvalStatus: 'Approved' });
    } catch (error) {
      console.error('Error approving leave:', error);
      setMessage('Error updating leave request');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Rejected': return 'error';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Parent Dashboard
      </Typography>

      {message && (
        <Alert severity="info" sx={{ mb: 2 }} onClose={() => setMessage('')}>
          {message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Child's Attendance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Child's Attendance
              </Typography>
              {attendance && attendance.length > 0 ? (
                <List>
                  {attendance.map((a) => (
                    <ListItem key={a.id}>
                      <ListItemText
                        primary={`${a.date}: ${a.status}`}
                        secondary={`Class: ${a.student?.className || 'N/A'}`}
                      />
                      <Chip 
                        label={a.status} 
                        color={a.status === 'Present' ? 'success' : 'error'}
                        size="small"
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No attendance records found
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Child's Grades */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Child's Grades
              </Typography>
              {grades && grades.length > 0 ? (
                <List>
                  {grades.map((g) => (
                    <ListItem key={g.id}>
                      <ListItemText
                        primary={`${g.subject}: ${g.marks}`}
                        secondary={`Teacher: ${g.teacher?.user?.name || 'N/A'}`}
                      />
                      <Chip 
                        label={`${g.marks}%`} 
                        color={g.marks >= 80 ? 'success' : g.marks >= 60 ? 'warning' : 'error'}
                        size="small"
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No grades found
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Assignments */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Assignments
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  placeholder="Class Name"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  size="small"
                />
                <Button variant="contained" onClick={handleGetAssignments}>
                  Get Assignments
                </Button>
              </Box>
              {assignments && assignments.length > 0 ? (
                <List>
                  {assignments.map((a) => (
                    <ListItem key={a.id}>
                      <ListItemText
                        primary={a.title}
                        secondary={`Due: ${a.dueDate} | Subject: ${a.subject}`}
                      />
                      {a.fileUrl && (
                        <Button
                          variant="outlined"
                          size="small"
                          href={a.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </Button>
                      )}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No assignments found
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Leave Approval Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Approve Leave Requests
              </Typography>
              <Box component="form" onSubmit={handleApproveLeave} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  placeholder="Leave ID"
                  value={leaveApproval.leaveId}
                  onChange={(e) => setLeaveApproval({ ...leaveApproval, leaveId: e.target.value })}
                  size="small"
                  required
                />
                <FormControl size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={leaveApproval.approvalStatus}
                    onChange={(e) => setLeaveApproval({ ...leaveApproval, approvalStatus: e.target.value })}
                    label="Status"
                  >
                    <MenuItem value="Approved">Approve</MenuItem>
                    <MenuItem value="Rejected">Reject</MenuItem>
                  </Select>
                </FormControl>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Leave Status
              </Typography>
              {leaveStatus && leaveStatus.length > 0 ? (
                <List>
                  {leaveStatus.map((l) => (
                    <ListItem key={l.id}>
                      <ListItemText
                        primary={l.reason}
                        secondary={`From: ${l.fromDate} To: ${l.toDate}`}
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Chip 
                          label={`Teacher: ${l.teacherApproval || 'Pending'}`}
                          color={getStatusColor(l.teacherApproval)}
                          size="small"
                        />
                        <Chip 
                          label={`Parent: ${l.parentApproval || 'Pending'}`}
                          color={getStatusColor(l.parentApproval)}
                          size="small"
                        />
                      </Box>
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
    </Container>
  );
}

export default ParentDashboard;