import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  NavigateBefore,
  NavigateNext,
  Timer,
  Warning,
  CheckCircle
} from '@mui/icons-material';

const MCQExamInterface = ({ exam, questions, onSubmit, onTimeUp }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(exam.durationMinutes * 60);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        
        if (prev <= 300) { // 5 minutes warning
          setShowTimeWarning(true);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmit = () => {
    setShowSubmitDialog(false);
    onSubmit(answers);
  };

  const getProgress = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      {/* Header */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" component="h1">
              {exam.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Chip
                icon={<Timer />}
                label={formatTime(timeRemaining)}
                color={timeRemaining <= 300 ? 'error' : 'primary'}
              />
              <Chip
                label={`${getAnsweredCount()}/${questions.length} Answered`}
                color="info"
              />
            </Box>
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={getProgress()} 
            sx={{ height: 8, borderRadius: 4 }}
          />
          
          <Typography variant="body2" sx={{ mt: 1 }}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
        </CardContent>
      </Card>

      {/* Time Warning */}
      {showTimeWarning && (
        <Alert severity="warning" sx={{ mb: 2 }} icon={<Warning />}>
          Less than 5 minutes remaining! Please submit your exam soon.
        </Alert>
      )}

      {/* Question Card */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Question {currentQuestionIndex + 1}
          </Typography>
          
          <Typography variant="body1" paragraph>
            {currentQuestion.questionText}
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            >
              <FormControlLabel
                value="A"
                control={<Radio />}
                label={`A) ${currentQuestion.optionA}`}
              />
              <FormControlLabel
                value="B"
                control={<Radio />}
                label={`B) ${currentQuestion.optionB}`}
              />
              <FormControlLabel
                value="C"
                control={<Radio />}
                label={`C) ${currentQuestion.optionC}`}
              />
              <FormControlLabel
                value="D"
                control={<Radio />}
                label={`D) ${currentQuestion.optionD}`}
              />
            </RadioGroup>
          </FormControl>

          {answers[currentQuestion.id] && (
            <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
              <CheckCircle color="success" fontSize="small" />
              <Typography variant="body2" color="success.main">
                Answered
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="outlined"
          startIcon={<NavigateBefore />}
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        <Box display="flex" gap={1}>
          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              variant="contained"
              endIcon={<NavigateNext />}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
            >
              Submit Exam
            </Button>
          )}
        </Box>
      </Box>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit your exam? This action cannot be undone.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Answered: {getAnsweredCount()}/{questions.length} questions
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSubmitDialog(false)}>
            Cancel
          </Button>
          <Button onClick={confirmSubmit} variant="contained" color="success">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MCQExamInterface; 