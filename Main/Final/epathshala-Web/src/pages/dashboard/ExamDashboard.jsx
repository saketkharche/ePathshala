import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Tabs, 
  Tab, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import ExamCard from '../../components/exam/ExamCard';
import MCQExamInterface from '../../components/exam/MCQExamInterface';
import ExamResultVisualization from '../../components/exam/ExamResultVisualization';
import { 
  getAvailableExams, 
  getFacultyExams, 
  createExam, 
  startExam, 
  submitExam, 
  getExamResult,
  getExamHistory 
} from '../../api/exams';

const ExamDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentExam, setCurrentExam] = useState(null);
  const [examResult, setExamResult] = useState(null);
  const [isTakingExam, setIsTakingExam] = useState(false);
  const [createExamDialog, setCreateExamDialog] = useState(false);
  const [newExamData, setNewExamData] = useState({
    title: '',
    description: '',
    durationMinutes: 60,
    totalMarks: 100,
    negativeMarking: true,
    negativeMarkingPercentage: 25,
    startTime: '',
    endTime: ''
  });

  // Load exams based on user role
  const loadExams = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading exams for user role:', user.role);
      
      let examData;
      if (user.role === 'STUDENT') {
        console.log('Calling getAvailableExams...');
        examData = await getAvailableExams();
        console.log('Student exams response:', examData);
      } else if (user.role === 'TEACHER') {
        console.log('Calling getFacultyExams...');
        examData = await getFacultyExams();
        console.log('Teacher exams response:', examData);
      } else {
        console.log('Fallback to getAvailableExams...');
        examData = await getAvailableExams(); // fallback
      }
      
      setExams(examData || []);
    } catch (err) {
      console.error('Error loading exams:', err);
      console.error('Error details:', err.response?.data || err.message);
      setError('Failed to load exams. Please try again.');
      setExams([]); // Return empty array instead of mock data
    } finally {
      setLoading(false);
    }
  };

  // Mock data fallback
  const getMockExams = () => [
    {
      id: 1,
      title: "Mathematics Mid-Term",
      description: "Covers algebra and calculus topics",
      durationMinutes: 90,
      totalMarks: 100,
      questionCount: 25,
      startTime: "2024-01-15T10:00:00",
      endTime: "2024-01-15T11:30:00",
      status: "ACTIVE",
      courseName: "Mathematics",
      negativeMarking: true,
      negativeMarkingPercentage: 25
    },
    {
      id: 2,
      title: "Physics Quiz",
      description: "Basic physics concepts and formulas",
      durationMinutes: 60,
      totalMarks: 50,
      questionCount: 20,
      startTime: "2024-01-20T14:00:00",
      endTime: "2024-01-20T15:00:00",
      status: "UPCOMING",
      courseName: "Physics",
      negativeMarking: false,
      negativeMarkingPercentage: 0
    }
  ];

  useEffect(() => {
    loadExams();
  }, [user]);

  const handleStartExam = async (examId) => {
    try {
      const exam = exams.find(e => e.id === examId);
      if (!exam) {
        setError('Exam not found');
        return;
      }
      
      // Start the exam
      await startExam(examId);
      setCurrentExam(exam);
      setIsTakingExam(true);
    } catch (err) {
      console.error('Error starting exam:', err);
      setError('Failed to start exam. Please try again.');
    }
  };

  const handleViewResult = async (examId) => {
    try {
      const result = await getExamResult(examId);
      setExamResult(result);
    } catch (err) {
      console.error('Error loading exam result:', err);
      setError('Failed to load exam result. Please try again.');
      setExamResult(null); // Don't use mock data
    }
  };

  const handleSubmitExam = async (answers) => {
    try {
      if (!currentExam) return;
      
      // Submit the exam
      const result = await submitExam(currentExam.id, answers);
      setExamResult(result);
      setIsTakingExam(false);
      setCurrentExam(null);
      
      // Reload exams to update status
      await loadExams();
    } catch (err) {
      console.error('Error submitting exam:', err);
      setError('Failed to submit exam. Please try again.');
      setIsTakingExam(false);
      setCurrentExam(null);
    }
  };

  const handleViewDetails = (examId) => {
    console.log('View details for exam:', examId);
    // Implementation for viewing exam details
    // This can be expanded to show detailed exam information
  };

  const handleCreateExam = async () => {
    try {
      // Format dates to include seconds for backend compatibility
      const formattedExamData = {
        ...newExamData,
        startTime: newExamData.startTime ? newExamData.startTime + ':00' : null,
        endTime: newExamData.endTime ? newExamData.endTime + ':00' : null
      };
      
      await createExam(formattedExamData);
      setCreateExamDialog(false);
      setNewExamData({
        title: '',
        description: '',
        durationMinutes: 60,
        totalMarks: 100,
        negativeMarking: true,
        negativeMarkingPercentage: 25,
        startTime: '',
        endTime: ''
      });
      await loadExams(); // Reload exams
    } catch (err) {
      console.error('Error creating exam:', err);
      setError('Failed to create exam. Please try again.');
    }
  };

  const getFilteredExams = () => {
    if (currentTab === 0) {
      return exams.filter(exam => exam.status === 'ACTIVE' || exam.status === 'UPCOMING');
    } else if (currentTab === 1) {
      return exams.filter(exam => exam.status === 'COMPLETED');
    }
    return exams;
  };

  const getTabLabel = (index) => {
    if (index === 0) {
      return `Available (${exams.filter(e => e.status === 'ACTIVE' || e.status === 'UPCOMING').length})`;
    } else if (index === 1) {
      return `Completed (${exams.filter(e => e.status === 'COMPLETED').length})`;
    }
    return 'All';
  };

  if (isTakingExam && currentExam) {
    // Mock questions for the exam
    const mockQuestions = [
      {
        id: 1,
        questionText: "What is the derivative of x²?",
        options: {
          A: "x",
          B: "2x",
          C: "x²",
          D: "2x²"
        },
        correctAnswer: "B",
        marks: 4,
        difficulty: "Medium",
        topic: "Calculus"
      },
      {
        id: 2,
        questionText: "Solve for x: 2x + 5 = 13",
        options: {
          A: "3",
          B: "4",
          C: "5",
          D: "6"
        },
        correctAnswer: "B",
        marks: 4,
        difficulty: "Easy",
        topic: "Algebra"
      }
    ];

    return (
      <Box sx={{ p: 3 }}>
        <Button 
          variant="outlined" 
          onClick={() => {
            setIsTakingExam(false);
            setCurrentExam(null);
          }}
          sx={{ mb: 2 }}
        >
          Back to Exams
        </Button>
        <MCQExamInterface
          exam={currentExam}
          questions={mockQuestions}
          onSubmit={handleSubmitExam}
        />
      </Box>
    );
  }

  if (examResult) {
    return (
      <Box sx={{ p: 3 }}>
        <Button 
          variant="outlined" 
          onClick={() => setExamResult(null)}
          sx={{ mb: 2 }}
        >
          Back to Exams
        </Button>
        <ExamResultVisualization result={examResult} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          MCQ Exams
        </Typography>
        {user.role === 'TEACHER' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCreateExamDialog(true)}
          >
            Create Exam
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label={getTabLabel(0)} />
        <Tab label={getTabLabel(1)} />
      </Tabs>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {getFilteredExams().map((exam) => (
            <Grid item xs={12} md={6} lg={4} key={exam.id}>
              <ExamCard
                exam={exam}
                onStartExam={handleStartExam}
                onViewResult={handleViewResult}
                onViewDetails={handleViewDetails}
              />
            </Grid>
          ))}
          {getFilteredExams().length === 0 && (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No exams available
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentTab === 0 
                    ? "No active or upcoming exams at the moment."
                    : "No completed exams yet."}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* Create Exam Dialog */}
      <Dialog open={createExamDialog} onClose={() => setCreateExamDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Exam</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Exam Title"
                value={newExamData.title}
                onChange={(e) => setNewExamData({...newExamData, title: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={newExamData.description}
                onChange={(e) => setNewExamData({...newExamData, description: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Duration (minutes)"
                value={newExamData.durationMinutes}
                onChange={(e) => setNewExamData({...newExamData, durationMinutes: parseInt(e.target.value)})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Total Marks"
                value={newExamData.totalMarks}
                onChange={(e) => setNewExamData({...newExamData, totalMarks: parseInt(e.target.value)})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Start Time"
                value={newExamData.startTime}
                onChange={(e) => setNewExamData({...newExamData, startTime: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="End Time"
                value={newExamData.endTime}
                onChange={(e) => setNewExamData({...newExamData, endTime: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Negative Marking (%)"
                value={newExamData.negativeMarkingPercentage}
                onChange={(e) => setNewExamData({...newExamData, negativeMarkingPercentage: parseInt(e.target.value)})}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newExamData.negativeMarking}
                    onChange={(e) => setNewExamData({...newExamData, negativeMarking: e.target.checked})}
                  />
                }
                label="Enable Negative Marking"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateExamDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateExam} variant="contained">Create Exam</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExamDashboard; 