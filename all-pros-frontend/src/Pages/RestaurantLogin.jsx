import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Divider,
  Avatar,
  Card,
  CardContent,
  Container,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios
import CustomSnackbar from '../components/CustomSnackbar';
import AdminIcon from '../assets/adminlogin.jpg';
import logo from '../assets/logo.png';

const RestaurantLogin = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const navigate = useNavigate();

  // New function to handle login navigation
  const handleLogin = () => {
    navigate('/verification', { 
      state: { loginType: 'restaurant-login' }, 
      replace: true 
    });
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        // Make API call to login
        const response = await axios.post('http://localhost:5000/api/restaurants/login', {
          supportEmail: values.email,
          password: values.password
        });

        // Handle successful login
        setSnackbarMessage('Login successful! Redirecting...');
        setSnackbarOpen(true);
        
        // Optional: Store token or user info
        localStorage.setItem('restaurantToken', response.data.token);
        
        // Redirect after a short delay
        setTimeout(() => {
          handleLogin();
        }, 1500);

      } catch (error) {
        // Handle login error
        const errorMessage = error.response?.data?.message 
          || 'Login failed. Please try again.';
        
        setSnackbarMessage(errorMessage);
        setSnackbarOpen(true);
        
        // Optional: Log the error for debugging
        console.error('Login Error:', error.response?.data);
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 4, sm: 8 }, mb: 4 }}>
      <Card
        elevation={12}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          background: 'linear-gradient(to bottom, #ffffff, #f0f8ff)',
          border: '1px solid rgba(41, 128, 185, 0.2)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 22px 45px 2px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Grid container>
            {/* Left Side - EXACTLY as in original code */}
            <Grid
              item
              xs={0}
              md={5}
              sx={{
                display: { xs: 'none', md: 'flex' },
                background: 'linear-gradient(135deg, #8B0000, #A0522D)',
                p: 4,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
              }}
            >
              {[...Array(20)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    width: `${Math.random() * 50 + 20}px`,
                    height: `${Math.random() * 50 + 20}px`,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${Math.random() * 5 + 5}s infinite ease-in-out`,
                  }}
                />
              ))}
              <Box sx={{
                position: 'relative',
                top: 0,
                left: '15%',
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                transform: 'rotate(45deg)',
                background: 'white',
                opacity: 0.2,
                animation: 'rotate 6s infinite linear'
              }} />
              <Box sx={{ position: 'relative', mb: 3 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    border: '3px solid rgba(255,255,255,0.4)',
                    animation: 'pulseRing 3s infinite',
                    '@keyframes pulseRing': {
                      '0%': { transform: 'scale(0.8)', opacity: 0.8 },
                      '50%': { transform: 'scale(1)', opacity: 0.4 },
                      '100%': { transform: 'scale(0.8)', opacity: 0.8 },
                    },
                  }}
                />
                <Avatar
                  src={AdminIcon}
                  alt="Admin"
                  sx={{
                    width: 100,
                    height: 100,
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    border: '4px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 1,
                  }}
                />
              </Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                RESTAURANT LOGIN
              </Typography>
              <Divider sx={{ width: '40%', mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
              <Typography variant="body2" sx={{ mb: 4, fontStyle: 'italic' }}>
                Revolutionize Restaurant Recruitment
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  textTransform: 'none',
                  borderRadius: 2,
                }}
              >
                Sign In
              </Button>
            </Grid>

            {/* Right Side - Existing code */}
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    mb: 5,
                    mx: 'auto',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.05)' },
                      '100%': { transform: 'scale(1)' },
                    },
                  }}
                />
                <Typography variant="h4" fontWeight="bold" color="#8B0000">
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Sign in to access your admin dashboard
                </Typography>
              </Box>

              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  margin="normal"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#8B0000' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#8B0000' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <VisibilityOff sx={{ color: '#8B0000' }} />
                          ) : (
                            <Visibility sx={{ color: '#8B0000' }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        sx={{ color: '#8B0000', '&.Mui-checked': { color: '#8B0000' } }}
                      />
                    }
                    label="Remember me"
                  />
                  <Button
                    variant="text"
                    sx={{
                      color: '#8B0000',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot Password?
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 4,
                      py: 1.8,
                      px: 8,
                      background: 'linear-gradient(135deg, #8B0000, #890303)',
                      color: '#fff',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      borderRadius: '50px',
                      boxShadow: '0 8px 25px rgba(189, 34, 34, 0.47)',
                      transition: 'all 0.4s ease',
                      fontSize: '1.1rem',
                      '&:hover': {
                        background: 'linear-gradient(135deg , #A0522Da ,rgba(163, 12, 12, 0.85))',
                        transform: 'scale(1.05)',
                        boxShadow: '0 10px 30px rgba(163, 12, 12, 0)',
                      },
                    }}
                  >
                    Login
                  </Button>
                </Box>
 
                <Typography
                  variant="body2"
                  sx={{ mt: 2, textAlign: 'center', color: '#555' }}
                >
                  Don&apos;t have an account?{' '}
                  <Button
                    variant="text"
                    sx={{ color: '#8B0000', textTransform: 'none' }}
                    onClick={() => navigate('/restaurant-signup')}
                  >
                    Create Account
                  </Button>
                </Typography>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Snackbar */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </Container>
  );
};

export default RestaurantLogin;