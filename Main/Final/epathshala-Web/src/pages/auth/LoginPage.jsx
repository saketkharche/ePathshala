import React, { useState } from "react";
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
  IconButton
} from '@mui/material';
import {
  School as SchoolIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from "../../utils/auth.jsx";
import Navbar from "../../components/common/Navbar";

function LoginPage() {
  const { login } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessage("Login successful! Redirecting...");
        
        // Use auth context to login
        login(data.token, data.role, data.userId, data.name);
        
        // Redirect based on role
        setTimeout(() => {
          window.location.href = `/${data.role.toLowerCase()}`;
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message + " Check terminal for OTP code.");
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <Box sx={{ 
        flex: 1,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 4 }
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
            {/* Left Side - Welcome Content */}
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                textAlign: { xs: 'center', md: 'left' },
                color: 'white',
                mb: { xs: 4, md: 0 }
              }}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 3 }}>
                  <SchoolIcon sx={{ fontSize: { xs: 60, md: 80 }, mr: 2 }} />
                  <Box>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        mb: 1
                      }}
                    >
                      ePathshala
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        opacity: 0.9,
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                      }}
                    >
                      School Management System
                    </Typography>
                  </Box>
                </Box>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.75rem' },
                    fontWeight: 600
                  }}
                >
                  Welcome Back!
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    opacity: 0.9,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    lineHeight: 1.6,
                    maxWidth: { md: 400 }
                  }}
                >
                  Access your personalized dashboard and manage your academic activities with our comprehensive school management platform.
                </Typography>
                
                {/* Features List */}
                <Box sx={{ mt: 4, display: { xs: 'none', md: 'block' } }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Key Features:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {[
                      'Interactive Learning Management',
                      'Real-time Communication',
                      'Comprehensive Analytics',
                      'Secure Data Management'
                    ].map((feature, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          bgcolor: 'white', 
                          mr: 2 
                        }} />
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right Side - Login Form */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Card sx={{ 
                  maxWidth: 450, 
                  width: '100%', 
                  boxShadow: 8,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    <Typography 
                      variant="h4" 
                      gutterBottom 
                      align="center" 
                      sx={{ 
                        mb: 3, 
                        color: '#1976d2',
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                      }}
                    >
                      Sign In
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      align="center" 
                      sx={{ 
                        mb: 4, 
                        color: 'text.secondary',
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                      }}
                    >
                      Enter your credentials to access your account
                    </Typography>

                    <Box component="form" onSubmit={handleLogin}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{ mb: 3 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      
                      <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{ mb: 3 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleTogglePasswordVisibility}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      
                      <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel id="role-select-label">Select Role</InputLabel>
                        <Select
                          labelId="role-select-label"
                          id="role-select"
                          value={role}
                          label="Select Role"
                          onChange={(e) => setRole(e.target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              <PersonIcon color="action" />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="ADMIN">Administrator</MenuItem>
                          <MenuItem value="STUDENT">Student</MenuItem>
                          <MenuItem value="TEACHER">Teacher</MenuItem>
                          <MenuItem value="PARENT">Parent</MenuItem>
                        </Select>
                      </FormControl>
                      
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{ 
                          mb: 3, 
                          py: { xs: 1.5, sm: 2 },
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                          fontWeight: 600,
                          borderRadius: 2,
                          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                          }
                        }}
                      >
                        {loading ? 'Signing In...' : 'Sign In'}
                      </Button>
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                      <Button
                        variant="text"
                        onClick={handleForgotPassword}
                        disabled={loading || !email}
                        sx={{ 
                          color: '#1976d2',
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                          '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.1)'
                          }
                        }}
                      >
                        Forgot Password?
                      </Button>
                    </Box>

                    {/* Back to Home Link */}
                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                      <Button
                        component={Link}
                        to="/"
                        variant="text"
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                          '&:hover': {
                            color: '#1976d2'
                          }
                        }}
                      >
                        ← Back to Home
                      </Button>
                    </Box>

                    {message && (
                      <Alert severity="success" sx={{ mt: 3 }}>
                        {message}
                      </Alert>
                    )}
                    
                    {error && (
                      <Alert severity="error" sx={{ mt: 3 }}>
                        {error}
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default LoginPage;