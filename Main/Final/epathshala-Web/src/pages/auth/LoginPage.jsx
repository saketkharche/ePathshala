import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  InputAdornment,
  IconButton,
  Paper,
  Fade,
  Zoom,
  LinearProgress
} from '@mui/material';
import {
  School as SchoolIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useAuth } from "../../utils/auth.jsx";
import Navbar from "../../components/common/Navbar";
import { useResponsive, typography, buttonStyles, textAlign, containerStyles } from "../../utils/responsive";
import { loginValidationSchema, getPasswordStrength } from "../../utils/formikValidation";

function LoginPage() {
  const { login } = useAuth();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const theme = useTheme();
  const location = useLocation();
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check for session expiration message from navigation state
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      // Clear the state to prevent showing the message again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleLogin = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setError("");
    setMessage("");
    
    try {
      await login(values.email, values.password, values.role);
      // Login successful - redirect will be handled by useAuth
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
      resetForm();
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const initialValues = {
    email: "",
    password: "",
    role: "ADMIN",
    showPassword: false
  };

  const loginFields = [
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'STUDENT', label: 'Student' },
        { value: 'TEACHER', label: 'Teacher' },
        { value: 'PARENT', label: 'Parent' }
      ],
      gridProps: { xs: 12 }
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      startIcon: <EmailIcon />,
      placeholder: 'Enter your email address',
      gridProps: { xs: 12 }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      startIcon: <LockIcon />,
      placeholder: 'Enter your password',
      gridProps: { xs: 12 }
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }
    }}>
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 } }}>
        <Fade in timeout={800}>
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, sm: 4, md: 5, lg: 6, xl: 7 },
              borderRadius: { xs: 3, sm: 4, md: 5, lg: 6, xl: 7 },
              boxShadow: theme.shadows[12],
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4, md: 5, lg: 6, xl: 7 } }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: 60, sm: 72, md: 84, lg: 96, xl: 108 },
                  height: { xs: 60, sm: 72, md: 84, lg: 96, xl: 108 },
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  mb: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
                  boxShadow: 4,
                }}
              >
                <SchoolIcon 
                  sx={{ 
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem', xl: '4rem' },
                    color: 'white' 
                  }} 
                />
              </Box>
              
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem', lg: '2.75rem', xl: '3.25rem' },
                  color: 'primary.main',
                  mb: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 }
                }}
              >
                Welcome to ePathshala
              </Typography>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.375rem' },
                  lineHeight: 1.6
                }}
              >
                Sign in to access your personalized learning experience
              </Typography>
            </Box>

            {/* Success/Error Messages */}
            {message && (
              <Alert
                severity="success"
                sx={{ 
                  mb: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.375rem' }
                }}
                onClose={() => setMessage('')}
              >
                {message}
              </Alert>
            )}

            {error && (
              <Alert
                severity="error"
                sx={{ 
                  mb: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.375rem' }
                }}
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <Formik
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting, isValid, dirty }) => (
                <Form>
                  <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
                    {/* Role Selection */}
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.375rem' } }}>
                          Role
                        </InputLabel>
                        <Select
                          name="role"
                          value={values.role}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Role"
                          sx={{
                            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.375rem' },
                            minHeight: { xs: 48, sm: 56, md: 64, lg: 72, xl: 80 },
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.02)',
                              },
                            },
                          }}
                        >
                          {loginFields[0].options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Email Field */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email Address"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.375rem' },
                          minHeight: { xs: 48, sm: 56, md: 64, lg: 72, xl: 80 },
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(0,0,0,0.02)',
                            },
                          },
                        }}
                      />
                    </Grid>

                    {/* Password Field */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                sx={{ color: 'text.secondary' }}
                              >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.375rem' },
                          minHeight: { xs: 48, sm: 56, md: 64, lg: 72, xl: 80 },
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(0,0,0,0.02)',
                            },
                          },
                        }}
                      />
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={isSubmitting || loading || !isValid || !dirty}
                        sx={{
                          px: { xs: 3, sm: 4, md: 5, lg: 6, xl: 7 },
                          py: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
                          fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.375rem' },
                          borderRadius: 3,
                          fontWeight: 600,
                          textTransform: 'none',
                          minHeight: { xs: 48, sm: 56, md: 64, lg: 72, xl: 80 },
                          mt: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 6,
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {isSubmitting || loading ? 'Signing In...' : 'Sign In'}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>

            {/* Forgot Password Link */}
            <Box sx={{ textAlign: 'center', mt: { xs: 3, sm: 4, md: 5, lg: 6, xl: 7 } }}>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.375rem' } }}
              >
                Forgot your password?{' '}
                <Link 
                  to="/forgot-password"
                  style={{ 
                    color: theme.palette.primary.main, 
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Reset it here
                </Link>
              </Typography>
            </Box>

            {/* Divider */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              my: { xs: 3, sm: 4, md: 5, lg: 6, xl: 7 },
              '&::before, &::after': {
                content: '""',
                flex: 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
            }}>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  px: 2,
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.375rem' }
                }}
              >
                New to ePathshala?
              </Typography>
            </Box>

            {/* Contact Support */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.375rem' } }}
              >
                Need help?{' '}
                <Link 
                  to="/contact"
                  style={{ 
                    color: theme.palette.primary.main, 
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Contact support
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

export default LoginPage;