import React, { useState } from 'react';
import { forgotPassword, verifyOtp } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  Card, 
  CardContent,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await forgotPassword(email);
      setMessage(response.message);
      setStep(1);
      console.log('OTP sent. Check terminal for OTP code.');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await verifyOtp(email, otp, newPassword);
      setMessage(response.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const steps = ['Request OTP', 'Verify OTP & Reset Password'];

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      padding: 2
    }}>
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Forgot Password
          </Typography>

          <Stepper activeStep={step} sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {step === 0 && (
            <Box component="form" onSubmit={handleRequestOtp}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter your email address to receive an OTP for password reset.
              </Typography>
              
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mb: 2 }}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </Box>
          )}

          {step === 1 && (
            <Box component="form" onSubmit={handleVerifyOtp}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter the OTP sent to your email and your new password.
                <br />
                <strong>Check the terminal for the OTP code!</strong>
              </Typography>
              
              <TextField
                fullWidth
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                sx={{ mb: 2 }}
                placeholder="Enter 6-digit OTP"
              />
              
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mb: 2 }}
              >
                {loading ? 'Verifying...' : 'Reset Password'}
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setStep(0)}
                sx={{ mb: 2 }}
              >
                Back to Email
              </Button>
            </Box>
          )}

          {message && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ForgotPassword; 