import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, TextField, Button, Alert, Box } from '@mui/material';
import { getAssignmentsByClass, uploadAssignment } from '../../../api/assignments';
import { useAuth } from '../../../utils/auth';

function TeacherAssignmentsSection() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [assignmentForm, setAssignmentForm] = useState({ title: '', dueDate: '', subject: '', className: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const className = user?.assignedClass || 'Class 10A'; // Use dynamic class from user profile

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const assignmentsData = await getAssignmentsByClass(className);
      setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
    } catch (err) {
      setError('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (className) {
      fetchData();
      setAssignmentForm(prev => ({ ...prev, className }));
    }
  }, [className]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadAssignment = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const formData = new FormData();
      formData.append('title', assignmentForm.title);
      formData.append('dueDate', assignmentForm.dueDate);
      formData.append('subject', assignmentForm.subject);
      formData.append('className', assignmentForm.className);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      await uploadAssignment(formData);
      setAssignmentForm({ title: '', dueDate: '', subject: '', className });
      setSelectedFile(null);
      setSuccess('Assignment uploaded successfully!');
      fetchData();
    } catch (err) {
      setError('Error uploading assignment');
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload Assignment
        </Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleUploadAssignment}>
          <TextField
            fullWidth
            label="Title"
            value={assignmentForm.title}
            onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
            margin="normal"
            required
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
          <Box sx={{ mt: 2, mb: 2 }}>
            <input
              accept=".pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
              id="assignment-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="assignment-file">
              <Button variant="outlined" component="span">
                Choose File
              </Button>
            </label>
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {selectedFile.name}
              </Typography>
            )}
          </Box>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
            Upload Assignment
          </Button>
        </form>
        <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
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
  );
}

export default React.memo(TeacherAssignmentsSection); 