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
  const [studentId, setStudentId] = useState(null);

  const className = 'Class 10A'; // TODO: Replace with dynamic class from user profile

  useEffect(() => {
    // Fetch studentId using user.id
    const fetchStudentId = async () => {
      const token = localStorage.getItem('token');
      if (user && user.id && token) {
        try {
          const res = await fetch(`/api/student/details/${user.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setStudentId(data.id);
          } else {
            setError('Failed to fetch student details.');
          }
        } catch (err) {
          setError('Failed to fetch student details.');
        }
      }
    };
    fetchStudentId();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const assignmentsData = await getStudentAssignments(className);
      console.log('Assignments data:', assignmentsData); // Debug log
      setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
    } catch (err) {
      console.error('Error fetching assignments:', err);
      setError('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownload = async (assignment) => {
    if (!assignment || !assignment.fileUrl) {
      setError('No file available for download.');
      return;
    }
    const downloadUrl = `/api/assignments/download/${assignment.fileUrl}`;
    try {
      const response = await fetch(downloadUrl, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (!response.ok) throw new Error(`Download failed: ${response.status} ${response.statusText}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = assignment.fileName || 'assignment-file';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(`Download failed: ${err.message}`);
    }
  };

  const handleSubmitAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionForm({ text: '', file: null });
    setSubmitDialogOpen(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (1MB = 1,048,576 bytes)
      const maxSize = 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        setError(`File size must be less than 1MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        event.target.value = ''; // Clear the file input
        return;
      }
      setSubmissionForm({ ...submissionForm, file });
      setError(''); // Clear any previous errors
    }
  };

  const handleSubmitSubmission = async () => {
    if (!selectedAssignment) {
      setError('No assignment selected');
      return;
    }
    if (!studentId) {
      setError('Student ID not found. Please log in again.');
      return;
    }
    if (!submissionForm.text && !submissionForm.file) {
      setError('Please provide either submission text or a file.');
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitAssignment(
        selectedAssignment.id,
        studentId, // <-- use the correct studentId
        submissionForm.text,
        submissionForm.file
      );
      if (result) {
        setSubmitDialogOpen(false);
        setSelectedAssignment(null);
        setSubmissionForm({ text: '', file: null });
        setSuccess('Assignment submitted successfully!');
        setError('');
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
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
                        onClick={() => handleDownload(assignment)}
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
            <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
              Maximum file size: 1MB. Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG
            </Typography>
            {submissionForm.file && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {submissionForm.file.name} ({(submissionForm.file.size / 1024).toFixed(1)}KB)
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