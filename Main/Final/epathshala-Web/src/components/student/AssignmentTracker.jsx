import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  Download as DownloadIcon,
  Upload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useAuth } from '../../utils/auth';

function AssignmentTracker() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionDialog, setSubmissionDialog] = useState(false);
  const [submissionFile, setSubmissionFile] = useState(null);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      // Get student's class from user details or API
      const studentClass = user?.studentClass || 'Class 10'; // Default fallback
      
      const response = await fetch(`/api/student/assignments/${studentClass}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAssignments(data);
      } else {
        setError('Failed to load assignments');
      }
    } catch (error) {
      setError('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (fileUrl) => {
    window.open(`/api/files/assignments/${fileUrl}`, '_blank');
  };

  const handleSubmitAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionDialog(true);
  };

  const handleFileChange = (event) => {
    setSubmissionFile(event.target.files[0]);
  };

  const handleSubmissionSubmit = async () => {
    if (!submissionFile) {
      setError('Please select a file to submit');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', submissionFile);
      formData.append('assignmentId', selectedAssignment.id);

      const response = await fetch('/api/student/submit-assignment', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });

      if (response.ok) {
        setSubmissionDialog(false);
        setSubmissionFile(null);
        setSelectedAssignment(null);
        loadAssignments(); // Refresh the list
        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to submit assignment');
      }
    } catch (error) {
      setError('Failed to submit assignment');
    }
  };

  const getStatusChip = (assignment) => {
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);
    const isOverdue = now > dueDate;
    const isSubmitted = assignment.submitted; // Assuming this field exists

    if (isSubmitted) {
      return <Chip icon={<CheckCircleIcon />} label="Submitted" color="success" size="small" />;
    } else if (isOverdue) {
      return <Chip icon={<WarningIcon />} label="Overdue" color="error" size="small" />;
    } else {
      return <Chip icon={<ScheduleIcon />} label="Pending" color="warning" size="small" />;
    }
  };

  const getDaysRemaining = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `${diffDays} days remaining`;
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Assignment Tracker</Typography>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Assignment Tracker
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {assignments.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" color="text.secondary" align="center">
              No assignments found for your class
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <List>
          {assignments.map((assignment) => (
            <Card key={assignment.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6">{assignment.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Subject: {assignment.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()} - {getDaysRemaining(assignment.dueDate)}
                    </Typography>
                  </Box>
                  {getStatusChip(assignment)}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {assignment.fileUrl && (
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownload(assignment.fileUrl)}
                      size="small"
                    >
                      Download Assignment
                    </Button>
                  )}
                  
                  {!assignment.submitted && (
                    <Button
                      variant="contained"
                      startIcon={<UploadIcon />}
                      onClick={() => handleSubmitAssignment(assignment)}
                      size="small"
                      color={new Date() > new Date(assignment.dueDate) ? 'error' : 'primary'}
                    >
                      Submit Assignment
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      )}

      {/* Submission Dialog */}
      <Dialog open={submissionDialog} onClose={() => setSubmissionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Assignment: {selectedAssignment?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please select a file to submit for this assignment.
          </Typography>
          <input
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            style={{ display: 'none' }}
            id="assignment-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="assignment-file">
            <Button variant="outlined" component="span" startIcon={<UploadIcon />}>
              Choose File
            </Button>
          </label>
          {submissionFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {submissionFile.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmissionDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmissionSubmit} variant="contained" disabled={!submissionFile}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AssignmentTracker; 