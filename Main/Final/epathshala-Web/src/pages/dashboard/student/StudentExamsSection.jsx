import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button, Alert, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Quiz as QuizIcon, PlayArrow as PlayIcon, Assessment as AssessmentIcon, Warning as WarningIcon } from '@mui/icons-material';
import { getAvailableExams, getExamHistory, startExam } from '../../../api/exams';
import { useAuth } from '../../../utils/auth';

function StudentExamsSection() {
  const { user } = useAuth();
  const [availableExams, setAvailableExams] = useState([]);
  const [examHistory, setExamHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [startingExam, setStartingExam] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [availableData, historyData] = await Promise.all([
        getAvailableExams(),
        getExamHistory()
      ]);
      setAvailableExams(Array.isArray(availableData) ? availableData : []);
      setExamHistory(Array.isArray(historyData) ? historyData : []);
    } catch (err) {
      setError('Failed to load exams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStartExam = (exam) => {
    setSelectedExam(exam);
    setConfirmDialogOpen(true);
  };

  const confirmStartExam = async () => {
    if (!selectedExam) return;

    setStartingExam(true);
    try {
      // Start the exam
      await startExam(selectedExam.id);
      
      // Navigate to exam interface
      window.location.href = `/student/exams/${selectedExam.id}`;
    } catch (err) {
      setError('Failed to start exam. Please try again.');
      setConfirmDialogOpen(false);
      setSelectedExam(null);
    } finally {
      setStartingExam(false);
    }
  };

  const handleViewResult = (examId) => {
    // Navigate to exam result page
    window.location.href = `/student/exams/${examId}/result`;
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  const formatDuration = (minutes) => {
    return `${minutes} minutes`;
  };

  const isExamOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            My Exams
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
            Available Exams
          </Typography>
          <List>
            {availableExams && availableExams.length > 0 ? (
              availableExams.map((exam, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {exam.title}
                        {isExamOverdue(exam.endTime) && (
                          <WarningIcon color="warning" fontSize="small" />
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          Duration: {formatDuration(exam.durationMinutes)} | Total Marks: {exam.totalMarks}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.secondary">
                          Questions: {exam.questionCount || 0}
                          {isExamOverdue(exam.endTime) && (
                            <span style={{ color: '#f57c00', fontWeight: 'bold' }}> | OVERDUE</span>
                          )}
                        </Typography>
                      </>
                    }
                  />
                  <Button
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={() => handleStartExam(exam)}
                    color={isExamOverdue(exam.endTime) ? "warning" : "primary"}
                    disabled={isExamOverdue(exam.endTime)}
                  >
                    {isExamOverdue(exam.endTime) ? 'Overdue' : 'Start Exam'}
                  </Button>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No available exams" />
              </ListItem>
            )}
          </List>

          <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
            Exam History
          </Typography>
          <List>
            {examHistory && examHistory.length > 0 ? (
              examHistory.map((exam, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={exam.examTitle}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          Completed: {formatDateTime(exam.endTime)} | Score: {exam.obtainedMarks}/{exam.totalMarks}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.secondary">
                          Percentage: {exam.percentage?.toFixed(2)}%
                        </Typography>
                      </>
                    }
                  />
                  <Button
                    variant="outlined"
                    startIcon={<AssessmentIcon />}
                    onClick={() => handleViewResult(exam.examId)}
                    size="small"
                  >
                    View Result
                  </Button>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No exam history" />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Start Exam</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to start the exam "{selectedExam?.title}"?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Duration: {selectedExam?.durationMinutes} minutes<br />
            Total Marks: {selectedExam?.totalMarks}<br />
            Questions: {selectedExam?.questionCount || 0}
          </Typography>
          <Typography variant="body2" color="warning.main" sx={{ mt: 2 }}>
            ⚠️ Once you start the exam, the timer will begin and cannot be paused.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={confirmStartExam} 
            variant="contained" 
            disabled={startingExam}
          >
            {startingExam ? 'Starting...' : 'Start Exam'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(StudentExamsSection); 