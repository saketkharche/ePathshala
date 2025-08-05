import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const ExamResultVisualization = ({ result }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Prepare data for pie chart (Answer Distribution)
  const answerDistributionData = Object.entries(result.answerDistribution || {}).map(([key, value]) => ({
    name: key,
    value: value
  }));

  // Prepare data for bar chart (Topic Performance)
  const topicPerformanceData = Object.entries(result.topicPerformance || {}).map(([topic, correct]) => ({
    topic: topic,
    correct: correct,
    total: result.questionResults?.filter(q => q.topic === topic).length || 0
  }));

  // Prepare data for difficulty performance
  const difficultyData = Object.entries(result.difficultyPerformance || {}).map(([difficulty, correct]) => ({
    difficulty: difficulty,
    correct: correct,
    total: result.questionResults?.filter(q => q.difficulty === difficulty).length || 0
  }));

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'success';
      case 'B+':
      case 'B':
        return 'info';
      case 'C+':
      case 'C':
        return 'warning';
      default:
        return 'error';
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      {/* Result Summary */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Exam Result
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {result.examTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Student: {result.studentName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Duration: {formatDuration(result.durationMinutes)}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Chip
                  label={`Score: ${result.obtainedMarks}/${result.totalMarks}`}
                  color="primary"
                  size="large"
                />
                <Chip
                  label={`${result.percentage.toFixed(1)}%`}
                  color="secondary"
                  size="large"
                />
                <Chip
                  label={`Grade: ${result.grade}`}
                  color={getGradeColor(result.grade)}
                  size="large"
                />
                <Chip
                  label={result.isPassed ? 'PASSED' : 'FAILED'}
                  color={result.isPassed ? 'success' : 'error'}
                  size="large"
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <Grid container spacing={3}>
        {/* Answer Distribution Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Answer Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={answerDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {answerDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Topic Performance Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Topic Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topicPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="topic" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="correct" fill="#8884d8" name="Correct" />
                  <Bar dataKey="total" fill="#82ca9d" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Difficulty Performance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Difficulty Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={difficultyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="difficulty" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="correct" fill="#ffc658" name="Correct" />
                  <Bar dataKey="total" fill="#ff7300" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Summary
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Total Questions:</Typography>
                  <Typography fontWeight="bold">{result.totalQuestions}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Answered:</Typography>
                  <Typography fontWeight="bold">{result.answeredQuestions}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Correct Answers:</Typography>
                  <Typography fontWeight="bold" color="success.main">
                    {result.correctAnswers}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Incorrect Answers:</Typography>
                  <Typography fontWeight="bold" color="error.main">
                    {result.incorrectAnswers}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Unanswered:</Typography>
                  <Typography fontWeight="bold" color="warning.main">
                    {result.getUnansweredQuestions()}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Accuracy:</Typography>
                  <Typography fontWeight="bold">
                    {result.answeredQuestions > 0 
                      ? ((result.correctAnswers / result.answeredQuestions) * 100).toFixed(1)
                      : 0}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Question-wise Results Table */}
      {result.questionResults && result.questionResults.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Question-wise Results
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Your Answer</TableCell>
                    <TableCell>Correct Answer</TableCell>
                    <TableCell>Result</TableCell>
                    <TableCell>Marks</TableCell>
                    <TableCell>Topic</TableCell>
                    <TableCell>Difficulty</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.questionResults.map((question, index) => (
                    <TableRow key={question.id}>
                      <TableCell>
                        <Typography variant="body2">
                          Q{index + 1}: {question.questionText.substring(0, 50)}...
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={question.selectedAnswer || 'Not answered'}
                          color={question.selectedAnswer ? 'primary' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={question.correctAnswer}
                          color="success"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={question.isCorrect ? 'Correct' : 'Incorrect'}
                          color={question.isCorrect ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {question.marksObtained}/{question.marks}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={question.topic} size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={question.difficulty} 
                          size="small"
                          color={question.difficulty === 'HARD' ? 'error' : 
                                 question.difficulty === 'MEDIUM' ? 'warning' : 'success'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ExamResultVisualization; 