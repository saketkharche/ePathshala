import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button, Alert, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Upload as UploadIcon, Download as DownloadIcon } from '@mui/icons-material';
import { getStudentAssignments, submitAssignment } from '../../../api/assignments';
import { useAuth } from '../../../utils/auth';

function StudentAssignmentsSection() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionForm, setSubmissionForm] = useState({ text: '', file: null });
  const [submitting, setSubmitting] = useState(false);

  const className = 'Class 10A'; // TODO: Replace with dynamic class from user profile

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const assignmentsData = await getStudentAssignments(className);
      setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
    } catch (err) {
      setError('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownload = async (filename) => {
    try {
      const response = await fetch(`/api/assignments/download/${filename}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handleSubmitAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionForm({ text: '', file: null });
    setSubmitDialogOpen(true);
  };

  const handleFileChange = (event) => {
    setSubmissionForm({ ...submissionForm, file: event.target.files[0] });
  };

  const handleSubmitSubmission = async () => {
    if (!selectedAssignment) {
      setError('No assignment selected');
      return;
    }

    if (!user?.id) {
      setError('User ID not found. Please log in again.');
      return;
    }

    if (!submissionForm.text && !submissionForm.file) {
      setError('Please provide either submission text or a file.');
      return;
    }

    console.log('Submitting assignment:', {
      assignmentId: selectedAssignment.id,
      studentId: user?.id,
      hasText: !!submissionForm.text,
      hasFile: !!submissionForm.file,
      user: user
    });

    setSubmitting(true);
    try {
      const result = await submitAssignment(
        selectedAssignment.id,
        user?.id,
        submissionForm.text,
        submissionForm.file
      );

      if (result) {
        setSubmitDialogOpen(false);
        setSelectedAssignment(null);
        setSubmissionForm({ text: '', file: null });
        setSuccess('Assignment submitted successfully!');
        setError(''); // Clear any previous errors
        fetchData(); // Refresh assignments
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit assignment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            My Assignments
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          
          <List>
            {assignments && assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={assignment.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          Due: {assignment.dueDate} | Subject: {assignment.subject}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.secondary">
                          Status: {assignment.status || 'Not Submitted'}
                        </Typography>
                      </>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {assignment.fileUrl && (
                      <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownload(assignment.fileName)}
                        size="small"
                      >
                        Download
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      startIcon={<UploadIcon />}
                      onClick={() => handleSubmitAssignment(assignment)}
                      size="small"
                    >
                      Submit
                    </Button>
                  </Box>
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

      {/* Submission Dialog */}
      <Dialog open={submitDialogOpen} onClose={() => {
        setSubmitDialogOpen(false);
        setSelectedAssignment(null);
        setSubmissionForm({ text: '', file: null });
      }} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Assignment: {selectedAssignment?.title}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Submission Text"
            multiline
            rows={4}
            value={submissionForm.text}
            onChange={(e) => setSubmissionForm({ ...submissionForm, text: e.target.value })}
            margin="normal"
            placeholder="Enter your submission text here..."
          />
          <Box sx={{ mt: 2 }}>
            <input
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
              id="submission-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="submission-file">
              <Button variant="outlined" component="span">
                Attach File
              </Button>
            </label>
            {submissionForm.file && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {submissionForm.file.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitSubmission} 
            variant="contained" 
            disabled={submitting || (!submissionForm.text && !submissionForm.file)}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(StudentAssignmentsSection); 